<template>
  <div class="neon-box"
       :style="{'--color': color}"
       :class="{'clickable': !clickDisabled}"
  >
    <span class="neon-line neon-top"></span>
    <span class="neon-line neon-bottom"></span>
    <span class="neon-line neon-right"></span>
    <span class="neon-line neon-left"></span>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NeonBox',
  props: {
    color: {
      type: String,
      default: '#fff'
    },
    clickDisabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
div.neon-box::v-deep {
  position: relative;
  overflow: hidden;
  padding: 2px;

  span.neon-line {
    position: absolute;
    display: block;

    &.neon-top {
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--color));
      animation: animate1 1s linear infinite;
    }

    &.neon-right {
      top: -100%;
      right: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, transparent, var(--color));
      animation: animate2 1s linear infinite;
      animation-delay: 1s;
    }

    &.neon-bottom {
      bottom: 0;
      right: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(270deg, transparent, var(--color));
      animation: animate3 1s linear infinite;
    }

    &.neon-left {
      bottom: -100%;
      left: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(360deg, transparent, var(--color));
      animation: animate4 1s linear infinite;
      animation-delay: 1s;
    }
  }

  &.clickable {
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      background: var(--color);
      box-shadow: 0 0 5px var(--color),
      0 0 25px var(--color),
      0 0 50px var(--color),
      0 0 200px var(--color);
      -webkit-box-reflect: below 1px linear-gradient(transition, #0005);

      .content {
        mix-blend-mode: difference;
      }
    }
  }
}


@keyframes animate1 {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

@keyframes animate2 {
  0% {
    top: -100%;
  }
  50%, 100% {
    top: 100%;
  }
}

@keyframes animate3 {
  0% {
    right: -100%;
  }
  50%, 100% {
    right: 100%;
  }
}

@keyframes animate4 {
  0% {
    bottom: -100%;
  }
  50%, 100% {
    bottom: 100%;
  }
}
</style>