<template>
    <canvas ref="star-field-canvas" id="canvas" class="star-field-canvas"/>
</template>

<script>
export default {
  name: 'starField',
  data: () => ({
      canvas: null,
      context: null,
      w: 0,
      h: 0,
      stars: [],
      prevTime: 0
  }),
  methods: {
    initCanvas() {
      this.canvas = this.$refs['star-field-canvas']
      this.context = this.canvas.getContext('2d')

      this.setCanvasExtents()
      window.onresize = () => {
        this.setCanvasExtents()
      }

      this.makeStars(10000)
      requestAnimationFrame(this.init)
    },
    setCanvasExtents() {
      this.w = document.body.clientWidth
      this.h = document.body.clientHeight
      this.canvas.width = this.w
      this.canvas.height = this.h
    },
    makeStars(count) {
      const out = []
      for (let i = 0; i < count; i++) {
        const s = {
          x: Math.random() * 1600 - 800,
          y: Math.random() * 900 - 450,
          z: Math.random() * 1000
        }
        out.push(s)
      }
      this.stars = out
    },
    clear() {
      this.context.fillStyle = 'black'
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    },
    putPixel(x, y, brightness) {
      const intensity = brightness * 255
      this.context.fillStyle = `rgb(${ intensity },${ intensity },${ intensity })`
      this.context.fillRect(x, y, 1, 1)
    },
    moveStars(distance) {
      const count = this.stars.length
      for (let i = 0; i < count; i++) {
        const s = this.stars[i]
        s.z -= distance
        while (s.z <= 1) {
          s.z += 1000
        }
      }
    },
    init(time) {
      this.prevTime = time;
      requestAnimationFrame(this.tick)
    },
    tick(time) {
      let elapsed = time - this.prevTime
      this.prevTime = time

      this.moveStars(elapsed * 0.05)

      this.clear()

      const cx = this.w / 2
      const cy = this.h / 2

      const count = this.stars.length
      for (let i = 0; i < count; i++) {
        const star = this.stars[i]

        const x = cx + star.x / (star.z * 0.001)
        const y = cy + star.y / (star.z * 0.001)

        if (x < 0 || x >= this.w || y < 0 || y >= this.h) {
          continue
        }

        const d = star.z / 1000.0
        const b = 1 - d * d

        this.putPixel(x, y, b)
      }
      requestAnimationFrame(this.tick)
    }
  },
  mounted() {
    this.initCanvas()
  }
}

</script>
<style
    scoped
    lang="scss"
>

  .star-field-canvas::v-deep{
    position:absolute;
    top:0;
    left:0;
    z-index : 99999!important;
    height:   100vh;
    width:    100%;
  }
</style>