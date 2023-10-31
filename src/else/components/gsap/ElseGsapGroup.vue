<template>
  <slot></slot>
</template>

<script>
export default {
  name: 'ElseGsapGroup',
  props: {
    options: {
      type: Object,
      default: null
    },
    invalidateOnRefresh: {
      default: false
    },
    trigger: {},
    scroller: {},
    start: {},
    end: {},
    scrub: {},
    pin: {},
    preventOverlaps: {},
    fastScrollEnd: {},
    toggleActions: {},
    onEnter: {},
    onUpdate: {},
    onToggle: {},
    snap: {},
  },
  data: () => ({
    timeline: null
  }),
  beforeCreate () {
    if (!this.options) {
      Object.assign(this, this.options)
    }
  },
  mounted () {

  },
  beforeDestroy () {
    if (this.timeline) {
      this.timeline.kill()
      this.timeline = null
    }
  }
}
</script>

<style scoped>

</style>
