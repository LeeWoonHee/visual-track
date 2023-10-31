<template>
  <div class="hi-cursor-wrapper"
       :class="forceStatus || status"
       ref="hi-cursor"
  >
    <div class="hi-cursor">
      <svg class="hi-cursor-text" viewBox="0 0 60 60" width="60" height="60">
        <defs>
          <path id="circle"
                d="
        M 30, 30
        m -13, -3
        a 17,17 0 1,1 34,0
        a 17,17 0 1,1 -34,0"/>
        </defs>
        <text font-size="10">
          <textPath xlink:href="#circle">
            CLICK ME!&nbsp;CLICK ME!
          </textPath>
        </text>
      </svg>
    </div>
    <svg class="hi-cursor-niddle" width="31" height="28" viewBox="0 0 31 28" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_402_156)">
        <circle cx="1.2833" cy="1.2833" r="1.2833"
                transform="matrix(0.935513 0.353291 0.353291 -0.935513 23.9561 5.15582)" fill="white"/>
        <path
            d="M7.9619 16.268C8.52025 16.1057 9.09876 16.4522 9.21922 17.0211L9.36949 17.7306C9.48916 18.2957 9.10657 18.8444 8.53497 18.9274L5.61925 19.3511C5.11099 19.4249 4.62943 19.1017 4.50517 18.6034L4.42853 18.296C4.29853 17.7746 4.6038 17.2437 5.1198 17.0938L7.9619 16.268Z"
            fill="white"/>
        <path
            d="M24.687 4.53665L25.4002 5.4571L16.0932 14.1902C15.6956 14.5633 15.2489 14.5353 15.0092 14.1222V14.1222L24.687 4.53665Z"
            fill="white"/>
        <path
            d="M8.36233 17.388L15.37 13.8795L16.3478 13.926C15.9396 14.318 15.7216 14.5519 15.559 14.6342C15.3964 14.7165 8.61257 18.2249 8.61257 18.2249L8.36233 17.388Z"
            fill="white"/>
      </g>
      <defs>
        <filter id="filter0_d_402_156" x="0.398438" y="3.125" width="30.4951" height="24.2365"
                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                         result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_402_156"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_402_156" result="shape"/>
        </filter>
      </defs>
    </svg>
    <div class="hi-cursor-content" v-if="content">
      <img v-if="content.type === 'img'" :src="content.src" :alt="content.alt"/>
      <video v-else-if="content.type === 'video'" :src="content.src" loop playsinline preload="auto"
             oncontextmenu="return false"/>
      <div v-else-if="content.type === 'text'">{{ content.text }}</div>
    </div>
  </div>
</template>

<script>
import {EventBus} from "@/EventBus";
import gsap from 'gsap'

export default {
  name: 'HiCursor',
  data: () => ({
    status: 'hide',
    forceStatus: null,
    acc: 10,
    content: null,
    text: null
  }),
  methods: {
    mousemove(event) {
      gsap.to(this.$refs['hi-cursor'], {
        duration: 0.2,
        x: event.clientX,
        y: event.clientY,
        ease: 'power1'
      })

      if (!event.target.classList.contains('hi-cursor') && !event.target.classList.contains('cursor')) {
        if (
            this.$store.state.windowWidth > 1023 &&
            (event.target.tagName === 'A'
            || event.target.classList.contains('cursor-pointer'))
        ) {
          this.status = 'pointer'
        } else {
          this.status = 'normal'
        }
      } else {
        console.log(event)
      }
    },
    mouseout(e) {
      if (e.screenX < 0 || e.screenY < 0 || e.screenX > window.innerWidth || e.screenY > window.innerHeight) {
        this.status = 'hide'
      }
    },
    mouseenter() {
      this.status = 'normal'
    }
  },
  mounted() {
    if(this.$store.state.windowWidth > 1023) {
      EventBus.$off('cursor')
      EventBus.$off('cursor-content')
      document.body.classList.remove('hi-cursor')
      window.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseout', this.mouseout)
      document.removeEventListener('mouseenter', this.mouseenter)
    }
    document.body.classList.add('hi-cursor')
    window.addEventListener('mousemove', this.mousemove)
    document.addEventListener('mouseout', this.mouseout)
    document.addEventListener('mouseenter', this.mouseenter)
    EventBus.$on('cursor', (status) => {
      this.forceStatus = status
    })
    EventBus.$on('cursor-content', (content) => {
      this.content = content
    })

  },
  beforeDestroy() {
    document.body.classList.remove('hi-cursor')
    window.removeEventListener('mousemove', this.mousemove)
    document.removeEventListener('mouseout', this.mouseout)
    document.removeEventListener('mouseenter', this.mouseenter)
    EventBus.$off('cursor')
    EventBus.$off('cursor-content')
  }
}
</script>

<style lang="scss">
body.hi-cursor {
  cursor: none;
}

.hi-cursor-wrapper {
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  z-index: 999;
  position: fixed;
  mix-blend-mode: exclusion;
  backface-visibility: hidden;
  pointer-events: none;

  &.hide {
    visibility: hidden;
  }

  .hi-cursor {
    z-index: 1000;
    background-color: #fff;
    transition: all .2s linear;
    border-radius: 50%;
    position: relative;

    &::after {
      border-radius: 50%;
      border: 1px solid #fff;
      background-color: transparent;
      position: absolute;
      content: '';
      transition: all .2s linear;
    }

    .hi-cursor-text {
      position: absolute;
      fill: #fff;
      height: 60px;
      transform-origin: center;
      width: 60px;
      top: -23px;
      left: -30px;
      transition: all .2s linear;
    }
  }

  .hi-cursor-niddle {
    opacity: 0;
    visibility: hidden;
    transition: opacity .2s linear;
    position: absolute;
    top: 7px;
    left: 14px;
    transform: rotate(-5deg);
  }

  .hi-cursor-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: cursor-content-showing .2s linear forwards;
    transform: translateY(-50%);

    img {
      border-radius: 10px;
      width: 100%;
    }

    video {
      width: 100%;
    }

    div {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &.normal {
    .hi-cursor {
      width: 10px;
      height: 10px;

      &::after {
        width: 10px;
        height: 10px;
        top: 0;
        left: 0;
      }

      .hi-cursor-text {
        opacity: 0;
        visibility: hidden;
      }
    }
  }

  &.pointer {
    .hi-cursor {
      top: 0;
      left: 0;
      width: 7px;
      height: 7px;
      -webkit-animation: cursor-rotating 3s linear infinite;
      -moz-animation: cursor-rotating 3s linear infinite;
      -ms-animation: cursor-rotating 3s linear infinite;
      -o-animation: cursor-rotating 3s linear infinite;
      animation: cursor-rotating 3s linear infinite;

      &::after {
        position: absolute;
        content: '';
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid #fff;
        top: -26.5px;
        left: -26.5px;
      }

      .hi-cursor-text {
        opacity: 1;
        visibility: visible;
      }
    }

    .hi-cursor-niddle {
      opacity: 1;
      visibility: visible;
    }
  }

  @media screen and (max-width: 1024px) {
    visibility: hidden !important;
    > * {
      visibility: hidden !important;
    }
  }
}

@keyframes cursor-rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes cursor-content-showing {
  from {
    opacity: 0;
    visibility: hidden;
    width: 0;
    height: 0;
  }
  to {
    opacity: 1;
    visibility: visible;
    width: calc(var(--vw) * 60);
    height: auto;
  }
}
</style>