<template>
  <transition-group
      tag="p" :class="`fine-text__rotate-${rotateDirection}--${reverse ? 'reverse' : 'normal'}`"
      :style="{'--rotate-origin': rotateOriginVal, '--gap': gap}">
    <span key="prefix">{{ prefix }}</span>
    <span v-for="(el, index) in text" :key="`${index}-${el}`" class="fine-text__item">
      {{ el === ' ' ? '&nbsp;' : el }}
    </span>
    <span key="suffix">{{ suffix }}</span>
  </transition-group>
</template>

<script>
export default {
  name: 'FineText',
  props: {
    text: {
      type: String,
      default: ''
    },
    /**
     * @type {String}
     * @description Type of animation default is 'fadeIn' types: ['fadeIn']
     */
    animation: {
      type: String,
      default: 'fadeIn'
    },
    /**
     * @type {String}
     * @description Animation direction default: 'rtl' types: ['rtl', 'ltr', 'ttb', 'btt']
     */
    direction: {
      type: String,
      default: 'rtl'
    },
    rotateDirection: {
      type: String,
      default: 'bottom'
    },
    rotateOrigin: {
      type: String,
      default: null
    },
    reverse: {
      type: Boolean,
      default: false
    },
    gap: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    }
  },
  computed: {
    rotateOriginVal () {
      if (this.rotateOrigin) return this.rotateOrigin
      switch (this.rotateDirection) {
        case 'top':
          return '0% 0%'
        case 'bottom':
          return '0% 100%'
        case 'left':
          return 'bottom left'
        case 'right':
          return 'top left'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p::v-deep {
  span.fine-text__item {
    display: inline-block;
    margin: var(--gap);
  }

  &.fine-text__rotate-top {
    span {

    }
  }

  &.fine-text__rotate-left--normal {
    transform-origin: var(--rotate-origin);
    transform: rotate(-90deg) translateY(100%);
  }

  &.fine-text__rotate-right--normal {
    transform-origin: var(--rotate-origin);
    transform: translateX(100%) rotate(90deg);
  }

  &.fine-text__rotate-left--reverse {
    transform-origin: var(--rotate-origin);
    transform: rotate(-90deg) translateX(-100%);
  }

  &.fine-text__rotate-right--reverse {
    transform-origin: var(--rotate-origin);
    transform: rotate(90deg) translateY(100%);
  }

  .v-enter-active,
  .v-leave-active,
  .v-move {
    transition: all 1s;
  }

  .v-leave-active {
    //position: absolute;
  }

  .v-enter,
  .v-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
}
</style>
