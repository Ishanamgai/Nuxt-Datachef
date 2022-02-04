<template>
  <g>
    <svg v-if="type === 'in'" :y="y + 55">
      <rect
        ref="handle"
        :fill="fill"
        x="0"
        y="0"
        rx="3"
        ry="3"
        width="10"
        height="10"
        @mouseenter="enter"
        @mouseleave="leave"
        @mousedown="startDragNewLink"
        @mouseup="mouseup"
      />
      <text x="12" y="9" font-size="8pt" fill="#000000">{{ name }}</text>
    </svg>
    <svg v-else :y="y + 55">
      <rect
        ref="handle"
        :fill="fill"
        :x="nodeWidth"
        y="0"
        rx="3"
        ry="3"
        width="10"
        height="10"
        @mouseenter="enter"
        @mouseleave="leave"
        @mousedown="startDragNewLink"
        @mouseup="mouseup"
      />
      <text :x="nodeWidth - 6" y="9" text-anchor="end" font-size="8pt" fill="#000000">{{ name }}</text>
    </svg>
  </g>
</template>

<script>
export default {
  name: 'DiagramPort',

  props: ['id', 'y', 'type', 'name', 'nodeWidth', 'nodeIndex'], // eslint-disable-line

  data () {
    return {
      fill: '#444444',
    }
  },
  methods: {
    mouseup () {
      this.$emit('mouseUpPort', this.id)
    },

    enter () {
      this.fill = '#888888'
    },

    leave () {
      this.fill = '#444444'
    },
    startDragNewLink () {
      this.$emit('onStartDragNewLink', this.id)
    },
  },
}
</script>
