<template>
  <a
      class="bottom-else-logo"
      :class="visible"
      :style="$route.name === 'intro' ? { right : '1.563vw ' } : {left : $store.state.windowWidth < 1024 ? '1.6vw' : '5vw'}"
      ref="elseLogo"
      target="_blank"
      href="https://else.red"
      @mouseover="mouseOverLocation"
      @mouseleave="mouseLeaveLocation"
  >
    <vs-tooltip
        text="WHAT THE FUCK IS THE ELSE"
        class="logo-tooltip"
    >
      <made-by-icon class="made-by"/>
      <div class="else">
        Else
      </div>
    </vs-tooltip>
  </a>
</template>

<script>
import MadeByIcon from '@/components/svg/MadeByIcon.vue'
import ElseLogo from '@/components/svg/ElseLogo.vue'
import { EventBus } from '@/EventBus'

export default {
  name: 'MadeByElseLogo',
  components: {
    MadeByIcon,
    ElseLogo
  },
  data: () => ({
    visible: null
  }),
  methods: {
    mouseOverLocation () {
      EventBus.$emit('cursor', 'pointer')
    },
    mouseLeaveLocation () {
      EventBus.$emit('cursor', null)
    }
  },
  mounted () {
    EventBus.$on('logoVisible', (status) => {
      this.visible = status
    })
  }
}
</script>


<style
    scoped
    lang="scss"
>
.bottom-else-logo::v-deep {
  position: fixed;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  overflow: hidden;
  cursor: pointer !important;
  bottom: 1.2vw;
  z-index: 2;
  @media screen and (max-width : 1024px) {
    .bottom-else-logo {
      bottom: 1.172vw;
    }
  }
  &.hidden {
    visibility: hidden;
  }

  .logo-tooltip {
    font-size: 30px !important;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    @media screen and(max-width: 1024px) {
      font-size: 15px !important;
    }
  }


  .made-by {
    color: #fff;
    width: 5.417vw;
    height: 1.458vw;
    @media screen and (max-width : 1024px) {
      width: 64px;
      height: 29px;
    }
  }

  .else {
    color: #fff;
    font-weight: 600;
    margin-left: 12px;
    font-size: 1.979vw;
    text-align:center;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fill-in 20s linear infinite;
    background-image: url(~@/assets/svg/pattern.svg);
      @media screen and (max-width : 1024px) {
        margin-left: 7px;
        font-size: 23px;
        line-height:0.7;
      }
    }
}

@keyframes fill-in {

  0% {
    background-position: 25% 25%;
  }
  15% {
    background-position: 10% 50%;
  }
  30% {
    background-position: 25% 75%;
  }
  45% {
    background-position: 50% 75%;
  }
  60% {
    background-position: 75% 50%;
  }
  75% {
    background-position: 65% 25%;
  }
  90% {
    background-position: 50% 10%;
  }
  100% {
    background-position: 25% 25%;
  }
}
</style>