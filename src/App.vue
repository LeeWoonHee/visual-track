<template>
  <div
      ref="app"
      id="app"
  >
    <loading/>
    <the-nav v-if="$route.name !== 'intro'"/>
    <router-view
        :key="$route.fullPath"
        id="app-content"
        ref="app-content"
    />
    <awwwards-marker/>
    <hi-cursor v-if="$route.name !== 'intro' && $store.state.windowWidth > 1024"/>
    <made-by-else-logo/>
  </div>
</template>

<script>
import TheNav from '@/components/TheNav.vue'
import HiCursor from '@/components/HiCursor.vue'
import MadeByElseLogo from '@/components/MadeByElseLogo.vue'
import Loading from '@/components/Loading.vue'
import AwwwardsMarker from '@/components/AwwwardsMarker.vue'


export default {
  name: 'App',
  components: {
    MadeByElseLogo,
    HiCursor,
    TheNav,
    Loading,
    AwwwardsMarker
  },
  data: () => ({
    scrollSmoother: null,
    isComponent : 'intro'
  }),
  methods: {
    handleWindowResize() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      document.documentElement.style.setProperty('--vh-raw', `${vh}`)
      const vw = window.innerWidth * 0.01
      document.documentElement.style.setProperty('--vw', `${vw}px`)
      document.documentElement.style.setProperty('--vw-raw', `${vw}`)
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)
      this.$store.commit('UPDATE_WINDOW_HEIGHT', window.innerHeight)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)

  },
  async created() {
    const dir = this.$vs.rtl ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    window.addEventListener('resize', this.handleWindowResize)

  },
  mounted() {
    if (this.$route.path !== '/main') {
      this.scrollSmoother = () => {
        return null
      }

    }
    this.$nextTick(() => {
      this.handleWindowResize()
    })
  }
}
</script>

<style
    scoped
    lang="scss"
>
#app::v-deep {
  background: #000000;
  position: relative;

}
</style>