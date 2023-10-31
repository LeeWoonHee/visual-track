<template>
  <div
      id="wrapper"
      class="content-wrapper"
  >
    <router-view
        :key="$route.fullPath"
        @router-mounted="routerMounted"
    />
  </div>
</template>


<script>
import LocomotiveScroll from 'locomotive-scroll'
import { EventBus } from '@/EventBus'
import _ from 'lodash'

export default {
  name: 'Main',
  data () {
    return {
      load: false,
      isRouterMounted: false,
      locoScroll: null
    }
  },
  mounted () {
    if ( this.load === false && this.isRouterMounted ) {
      this.initLocoScroll()
      this.$emit('router-mounted')
    }
    console.log(this.locoScroll)
    this.load = true
  },
  computed: {
    scroller () {
      return document.getElementById('wrapper')
    },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    routerMounted () {
      if ( this.load ) {
        this.initLocoScroll()
        this.$emit('router-mounted')
      } else {
        this.isRouterMounted = true
      }

    },
    initLocoScroll () {
      if ( window.locoScroll || this.locoScroll ) {
        this.destroyLoco()
      }
      window.locoScroll = this.locoScroll = new LocomotiveScroll({
        el: this.scroller,
        inertia: 0.8,
        smooth: true,
        mobile: {
          breakpoint: 0,
          smooth: true,
          inertia: 2
        },
        tablet: {
          breakpoint: 0,
          smooth: true,
          inertia: 2
        },
        getDirection: true
      })

      this.$scrollTrigger.scrollerProxy(this.scroller, {
        scrollTop: (value) => {
          console.log(value)
          return arguments.length ?
              this.locoScroll.scrollTo(value, 0, 0) :
              this.locoScroll.scroll.instance.scroll.y
        },
        getBoundingClientRect () {
          return {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight
          }
        },
        pinType: this.scroller.style.transform ? 'transform' : 'fixed'
      })

      EventBus.$on('scrollTo', (obj) => {
        if ( obj ) {
          this.locoScroll.scrollTo(obj)
        } else {
          this.locoScroll.scrollTo(this.scroller)
        }
        this.$scrollTrigger.update()
      })

      this.locoScroll.on('scroll', this.scrollLoco)

      this.$scrollTrigger.addEventListener('refresh', this.scrollTriggerRefreshed)
      this.$scrollTrigger.refresh()
    },
    scrollTriggerRefreshed () {
      this.$scrollTrigger.sort()
      this.locoScroll.update()
    },
    scrollLoco (...args) {
      this.updateY(...args)
      this.$scrollTrigger.update(...args)
    },
    updateY: _.throttle(function (arg) {
      this.$store.commit('UPDATE_WINDOW_SCROLL_Y', arg.scroll.y)
    }, 300),
    destroyLoco () {
      this.$scrollTrigger.update()
      this.$scrollTrigger.removeEventListener('refresh', this.scrollTriggerRefreshed)
      EventBus.$off('scrollTo')
      window.locoScroll.destroy()
      this.locoScroll.destroy()
      window.locoScroll = null
      this.locoScroll = null
    }
  },
  destroyed () {
    this.$scrollTrigger.removeEventListener('refresh', this.scrollTriggerRefreshed)
    EventBus.$off('scrollTo')
  }
}

</script>

