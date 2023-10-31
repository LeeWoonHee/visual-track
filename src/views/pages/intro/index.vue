<template>
  <div class="intro-wrapper">
<!--  Four TV Layout   -->
    <intro v-if="!isEnter" @enterToIndex="enterToIndex" />
<!--  Go TO Main Page   -->
    <go-to-main-page v-else/>
  </div>
</template>
<script>
import Intro from '@/views/pages/intro/components/Intro.vue'
import GoToMainPage from '@/views/pages/intro/components/GoToMainPage.vue'
import {EventBus} from '@/EventBus'
export default {
  name : 'index',
  components: {
    GoToMainPage,
    Intro
  },
  data: () => ({
    isEnter : false
  }),
  methods : {
    enterToIndex(val) {
      this.isEnter = val
      if(val) {
        EventBus.$emit('logoVisible', 'hidden')
      }else {
        EventBus.$emit('logoVisible', val)
      }
    }
  },
  beforeCreate () {
    this.isEnter = null
  }
}
</script>
<style scoped lang="scss">
  .intro-wrapper{
    @media screen and (max-width: 1024px) {
      @supports (-webkit-touch-callout: none) {
        height : -webkit-fill-available;
      }
    }

  }
</style>