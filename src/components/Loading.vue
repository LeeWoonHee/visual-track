<template></template>
<script>
import {EventBus} from "@/EventBus"

export default {
  name: 'Loading',
  methods: {},
  watch: {},
  data: () => ({
    progress: 0
  }),
  mounted() {
    EventBus.$on('progress', (progress) => {
      this.progress = progress
      //check progress value
      // console.log(progress)
      const root = document.documentElement
      root.style.setProperty('--progress', `${progress}`)
      document.getElementById('loadingProgress').innerText = `${progress.toFixed(0)}`
      if(progress === 100){
        document.getElementById('loading').style.opacity = 0
        document.getElementById('loading').style.display = 'none'
      }
    })
    EventBus.$on('loaded', () => {
      this.progress = 100
      const root = document.documentElement
      root.style.setProperty('--progress', '100')
      document.getElementById('loadingProgress').innerText = '100'
      document.getElementById('loading').style.opacity = 0
      setInterval(() => {
        document.getElementById('loading').style.display = 'none'
      }, 1000)

    })
    EventBus.$on('entrance', () => {
      const root = document.documentElement
      root.style.setProperty('--progress', '0')
      document.getElementById('loadingProgress').innerText = '0'
      document.getElementById('loading').style.opacity = 1
      document.getElementById('loading').style.display = 'block'

    })

  },
  beforeDestroy() {
    EventBus.$off('progress')
    EventBus.$off('loaded')
    EventBus.$off('entrance')
  }
}
</script>