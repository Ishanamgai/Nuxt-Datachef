<template>
  <svg :x="x" :y="y">
    <rect
      :fill="color"
      stroke="#000000"
      :stroke-width="selected ? 2 : 0"
      x="5"
      y="15"
      rx="3"
      ry="3"
      :width="width"
      :height="height"
      class="node-dark-background"
    />
    <svg x="0" y="0">
      <rect
        fill="#000000"
        :fill-opacity="titleFillOpacity"
        x="7"
        y="17"
        rx="3"
        ry="3"
        :width="width-4"
        height="16"
        class="node-dark-background"
      />
      <text :x="10" :y="30" font-size="14" font-weight="bold" fill="#000000">{{ title }}</text>
    </svg>
    <rect
      fill="#ffffff"
      x="7"
      y="35"
      rx="3"
      ry="3"
      :width="width-4"
      :height="height - 22"
      class="node-light-background"
    />
    <slot />
  </svg>
</template>

<script>
export default {
  name: 'DiagramNode',

  props: {
    title: {
      type: String,
      required: true,
    },
    index: Number,
    ports: {
      type: Array,
      default: () => {
        return []
      },
    },
    x: Number,
    y: Number,
    width: {
      type: Number,
      default: 72,
    },
    height: {
      type: Number,
      default: 100,
    },
    color: {
      type: String,
      default: '#cdbaff',
    },
    selected: Boolean,
  },

  data () {
    return {
      nodeStrokeWidth: 0,
      titleFillOpacity: 0.25,
    }
  },

  methods: {
    mouseDown (event) {
      this.$emit(
        'onStartDrag',
        { type: 'nodes', index: this.index },
        event.x - this.x,
        event.y - this.y,
      )
    },

    mouseenter () {
      this.titleFillOpacity = 0.5
    },

    mouseleave () {
      this.titleFillOpacity = 0.25
    },
  },
}
</script>
