<template>
  <div>
    <SvgPanZoom
      id="svgroot"
      :style="{ width: width + 'px', height: height + 'px', border:'1px solid black'}"
      :zoom-enabled="zoomEnabled"
      :pan-enabled="panEnabled"
      :control-icons-enabled="true"
      :fit="true"
      :center="true"
      viewport-selector="#svgroot2"
      :prevent-mouse-events-default="false"
      :before-pan="beforePan"
    >
      <svg
        id="svgroot2"
        ref="dragramRoot"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="'0 0 ' + width + ' ' + height"
        :width="width"
        :height="height"
        preserveAspectRatio="xMinYMin meet"
        class="svg-content"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      >
        <defs>
          <pattern id="smallGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="gray" stroke-width="0.5" />
          </pattern>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="url(#smallGrid)" />
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" stroke-width="1" />
          </pattern>
        </defs>

        <rect ref="grid" x="-5000px" y="-5000px" width="10000px" height="10000px" fill="url(#grid)" class="svg-pan-zoom_viewport" @mousedown="clearSelection" />
        <g id="viewport" ref="viewPort" x="50" y="50">
          <DiagramLink
            v-for="(link, index) in model._model.links"
            :id="link.id"
            :key="link.id"
            :ref="'link-' + index"
            :position-from="link.positionFrom"
            :position-to="link.positionTo"
            :points="link.points"
            :index="index"
            @onStartDrag="startDragPoint"
            @onCreatePoint="createPoint"
          />
          <line
            v-if="newLink"
            :x1="getPortHandlePosition(newLink.startPortId).x"
            :y1="getPortHandlePosition(newLink.startPortId).y"
            :x2="convertXYtoViewPort(mouseX, 0).x"
            :y2="convertXYtoViewPort(0, mouseY).y"
            style="stroke:rgb(255,0,0);stroke-width:2"
          />
          <DiagramNode
            v-for="(node, nodeIndex) in model._model.nodes"
            :key="node.id"
            :ref="'node-' + nodeIndex"
            :title="node.title"
            :x="node.x"
            :y="node.y"
            :width="node.width"
            :height="node.height"
            :color="node.color"
            :deletable="node.deletable"
            :ports="node.ports"
            :selected="selectedItem.type === 'nodes' && selectedItem.index === nodeIndex"
            :index="nodeIndex"
            @onStartDrag="startDragItem"
            @delete="model.deleteNode(node)"
          >
            <DiagramPort
              v-for="(port, portIndex) in node.ports"
              :id="port.id"
              :key="port.id"
              :ref="'port-' + port.id"
              :node-index="nodeIndex"
              :y="portIndex * 20"
              :node-width="node.width"
              :type="port.type"
              :name="port.name"
              @onStartDragNewLink="startDragNewLink"
              @mouseUpPort="mouseUpPort"
            />
          </DiagramNode>
        </g>
      </svg>
    </SvgPanZoom>
  </div>
</template>

<script>
import SvgPanZoom from 'vue-svg-pan-zoom'

import DiagramModel from './../DiagramModel'
import DiagramNode from './DiagramNode'
import DiagramLink from './DiagramLink'
import DiagramPort from './DiagramPort'

const generateId = function () {
  return Math.trunc(Math.random() * 1000)
}

function getAbsoluteXY (element) {
  const viewportElement = document.documentElement
  const box = element.getBoundingClientRect()
  const scrollLeft = viewportElement.scrollLeft
  const scrollTop = viewportElement.scrollTop
  const x = box.left + scrollLeft
  const y = box.top + scrollTop
  return { x, y }
}

function snapToGrip (val, gridSize) {
  return gridSize * Math.round(val / gridSize)
}

export default {
  name: 'Diagram',
  Model: DiagramModel,
  components: {
    DiagramNode,
    DiagramLink,
    DiagramPort,
    SvgPanZoom,
  },

  props: {
    model: { type: DiagramModel, required: true },
    width: { type: Number, default: 500 },
    height: { type: Number, default: 500 },
    gridSnap: { type: Number, default: 1 },
  },

  data () {
    this.updateLinksPositions()

    return {
      document,
      zoomEnabled: false,
      panEnabled: true,
      draggedItem: undefined,
      selectedItem: {},
      initialDragX: 0,
      initialDragY: 0,
      newLink: undefined,
      mouseX: 0,
      mouseY: 0,
    }
  },
  computed: {
    querySelector () {
      return document.querySelector('#viewport')
    },
  },

  watch: {
    'model._model.links' () {
      this.updateLinksPositions()
    },
  },

  methods: {
    convertXYtoViewPort (x, y) {
      const rootelt = document.getElementById('svgroot2')
      const rec = document.getElementById('viewport')
      const point = rootelt.createSVGPoint()
      const rooteltPosition = getAbsoluteXY(rootelt)
      point.x = x - rooteltPosition.x
      point.y = y - rooteltPosition.y
      const ctm = rec.getCTM().inverse()
      return point.matrixTransform(ctm)
    },

    beforePan () {
      return !(this.selectedItem.type || this.draggedItem || this.newLink)
    },

    createPoint (x, y, linkIndex, pointIndex) {
      const coords = this.convertXYtoViewPort(x, y)
      const links = this.model._model.links

      // FIXME works well only on links created at startup
      if (links[linkIndex].points === undefined) { links[linkIndex].points = [] }

      const points = links[linkIndex].points
      points.splice(pointIndex, 0, coords)
      links[linkIndex].points = points
    },

    clearSelection () {
      this.selectedItem = {}
    },

    updateLinksPositions () {
      let links = []

      if (this.model && this.model._model) { links = this.model._model.links }

      this.$nextTick(() => {
        setTimeout(() => {
          for (let i = 0; i < links.length; i++) {
            let coords
            coords = this.getPortHandlePosition(links[i].from)
            links[i].positionFrom = { x: coords.x, y: coords.y }
            coords = this.getPortHandlePosition(links[i].to)
            links[i].positionTo = { x: coords.x, y: coords.y }
          }
        }, 100)
      })
    },

    startDragNewLink (startPortId) {
      this.panEnabled = false
      this.newLink = {
        startPortId,
      }
    },

    getPortHandlePosition (portId) {
      if (this.$refs['port-' + portId].length) {
        const port = this.$refs['port-' + portId][0]
        const node = this.$refs['node-' + port.nodeIndex][0]
        let x
        let y
        if (port.type === 'in') {
          x = node.x + 10
          y = node.y + port.y + 64
        } else {
          x = node.x + node.width + 10
          y = node.y + port.y + 64
        }

        return { x, y }
      } else {
        console.warn( // eslint-disable-line
          `port "${portId}" not found. you must call this method after the first render`,
        )
        return 0
      }
    },

    mouseMove (pos) {
      const links = this.model._model.links
      this.mouseX = pos.x
      this.mouseY = pos.y
      if (this.draggedItem) {
        const index = this.draggedItem.index
        const type = this.draggedItem.type
        if (type === 'points') {
          const coords = this.convertXYtoViewPort(this.mouseX, this.mouseY)

          coords.x = snapToGrip(coords.x, this.gridSnap) - this.gridSnap / 2
          coords.y = snapToGrip(coords.y, this.gridSnap)

          links[this.draggedItem.linkIndex].points[
            this.draggedItem.pointIndex
          ].x =
            coords.x
          links[this.draggedItem.linkIndex].points[
            this.draggedItem.pointIndex
          ].y =
            coords.y
          this.updateLinksPositions()
        } else {
          const coords = this.convertXYtoViewPort(this.mouseX, this.mouseY)

          coords.x = snapToGrip(coords.x, this.gridSnap) - this.gridSnap / 2
          coords.y = snapToGrip(coords.y, this.gridSnap)

          this.model._model[type][index].x = coords.x - 30 // eslint-disable-line
          this.model._model[type][index].y = coords.y - 30 // eslint-disable-line
          this.updateLinksPositions()
        }
      }
    },

    mouseUp () {
      this.draggedItem = undefined
      this.newLink = undefined
    },

    mouseUpPort (portId) {
      const links = this.model._model.links

      if (this.draggedItem && this.draggedItem.type === 'points') {
        const pointIndex = this.draggedItem.pointIndex
        const linkIndex = this.draggedItem.linkIndex

        if (this.$refs['port-' + portId][0].type === 'in') {
          const l = links[linkIndex].points.length
          links[linkIndex].points.splice(
            pointIndex,
            l - this.draggedItem.pointIndex,
          )
        } else {
          links[linkIndex].points.splice(0, pointIndex + 1)
        }
        this.updateLinksPositions()
      }

      if (this.newLink !== undefined) {
        const port1Id = this.newLink.startPortId
        const port2Id = portId

        const port1 = this.$refs['port-' + port1Id][0]
        const port2 = this.$refs['port-' + port2Id][0]

        if (port1.type === 'in' && port2.type === 'out') {
          links.push({
            id: generateId(),
            from: port2.id,
            to: port1.id,
            positionFrom: {},
            positionTo: {},
            points: [],
          })
        } else if (port2.type === 'in' && port1.type === 'out') {
          links.push({
            id: generateId(),
            from: port1.id,
            to: port2.id,
            positionFrom: {},
            positionTo: {},
            points: [],
          })
        } else {
          console.warn('You must link one out port and one in port') // eslint-disable-line
        }

        this.model._model.links = links // eslint-disable-line

        this.updateLinksPositions()
      }
    },

    startDragPoint (pointInfo) {
      this.draggedItem = pointInfo
    },

    startDragItem (item, x, y) {
      this.panEnabled = false
      this.draggedItem = item
      this.selectedItem = item
      this.initialDragX = x
      this.initialDragY = y
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  svg {
    user-select: none;
    /*font-family: Helvetica;*/
  }
</style>
