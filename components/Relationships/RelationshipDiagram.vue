<template>
  <div ref="container">
    <client-only>
      <VueDiagram v-if="model" ref="diagram" :width="width" :model="model" />
    </client-only>
  </div>
</template>

<script>
let VueDiagram
if (process.client) {
  VueDiagram = require('@/packages/vue-diagrams/components/Diagram').default
}

export default {
  components: { VueDiagram },

  props: {
    relationships: { type: Object, required: true },
    column: { type: Object, required: true },
  },

  data: () => ({
    model: null,
    width: 500,
  }),

  watch: {
    relationships: {
      deep: true,
      handler () {
        this.setModel()
      },
    },
  },

  mounted () {
    this.initDiagram()
  },

  methods: {
    initDiagram () {
      this.setModel()
      this.width = this.$refs.container.clientWidth
    },

    setModel () {
      if (!VueDiagram) { return null }

      const model = new VueDiagram.Model()

      const mainColumn = model.addNode(this.column.table_name, 300, 50, 177, 100)
      const inPort = mainColumn.addInPort(this.column.name)
      const outPort = mainColumn.addOutPort('')

      this.relationships.left.forEach((r) => {
        const leftCol = model.addNode(r.key_right.table_name, 10, 0, 177, 75)
        const leftOutPort = leftCol.addOutPort(r.key_right.name)
        leftCol.color = '#f0f0f0'
        model.addLink(leftOutPort, inPort)
      })

      this.relationships.right.forEach((r, idx) => {
        const rightCol = model.addNode(r.key_left.table_name, 587, idx * 100, 177, 75)
        const rightInPort = rightCol.addInPort(r.key_left.name)
        rightCol.color = '#f0f0f0'
        model.addLink(outPort, rightInPort)
      })

      this.model = model
    },
  },
}
</script>
