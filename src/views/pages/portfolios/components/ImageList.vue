<template>
  <div
      class="portfolio-list" ref="portfolio-list"
      :style="{'--index': index}"
      @wheel.prevent="wheel"
      @touchstart.prevent="touchstart"
      @touchend.prevent="touchend"
  >
    <div
        class="portfolio-list-wrapper"
        ref="scroller"
    >
      <div class="portfolio-img-wrapper cursor-pointer"
           v-for="item in images"
           :class="{active : active === item.index}"
           @click="index = item.index"
      >
        <img :ref="`${item.index}-img`" class="portfolio-img cursor-pointer"
             :id="`portfolios${item.index}`"
             :src="require(`@/assets/images/portfolios/thumbnails/low/${item.index}.png`)"
             alt="">
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name   : 'ImageList',
  props  : {
    images: {
      type    : Array,
      required: true
    }
  },
  watch  : {
    index: {
      immediate: true,
      handler  : _.debounce(function (index) {
        this.indexing(index)
        // this.$gsap.to('.portfolio-list-wrapper', {
        //   duration: 0.5,
        //   opacity: 1,
        //   scrollTo: `#${this.$refs[`${index}-img`].id}`,
        //   ease: 'power1'
        // })
        // this.$emit('change', index)
      }, 500)
    }
  },
  data   : () => ({
    active   : 1,
    index    : 1,
    isLoading: false,
    touch    : null
  }),
  methods: {
    next() {
      this.index++
    },
    prev() {
      this.index--
    },
    indexing(index) {
      if (index > this.images.length) {
        this.index = 1
        this.active = 1
        // this.$refs['scroller'].$el.scrollTop = 0
        this.$emit('change', 1)
      }
      else if (index <= 0) {
        this.index = this.images.length
        this.active = this.images.length
        // this.$refs['scroller'].$el.scrollTop = 180 * (this.images.length - 1)
        this.$emit('change', this.images.length)
      }
      else {
        this.active = index
        // this.$refs['scroller'].$el.scrollTop = 180 * (index - 1)
        this.$emit('change', index)
      }
    },
    wheel(e) {
      if (e.deltaY > 0 || e.deltaX > 0) {
        this.next()
      }
      else {
        this.prev()
      }
    },
    goToIndex(index) {
      this.index = index
    },
    touchstart(e) {
      this.touch = {
        'y': e.touches[0].clientY,
        'x': e.touches[0].clientX
      }
    },
    touchend(e) {
      if(window.innerWidth > 1024) {
        if( this.touch.y - e.changedTouches[0].clientY > 0 ) {
          this.next()
        }else {
          this.prev()
        }
      }else {
        if(this.touch.x - e.changedTouches[0].clientX > 0) {
          this.next()
        }
        else {
          this.prev()
        }
      }


      this.touch = null
    }
  }
}
</script>
<style lang="scss" scoped>
.portfolio-list::v-deep {
  width: 267px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  .portfolio-list-wrapper {
    height: 100%;
    transition: all .5s ease-in-out;
    transform: translateY(calc(-138px * (var(--index) - 1)));

    .portfolio-img-wrapper {
      position: relative;
      width: 100%;

      .portfolio-img {
        width: 263px;
        height: 134px;
        border-radius: 6px;
        object-fit: cover;
        margin: 9px 2px;
        position: relative;
        box-sizing: border-box;
      }

      filter: brightness(15%);
      transition: filter 0.5s ease-in-out;


      &.active {
        filter: brightness(50%);

        .portfolio-img {
        }

        &:after {
          content: '';
          position: absolute;
          top: -2px;
          left: 0;
          border-radius: 6px;
          border-style: dotted;
          --border-size: 2px;
          --border-angle: 0turn;
          width: 267px;
          height: 138px;
          background-image: conic-gradient(
                  from var(--border-angle),
                  transparent,
                  transparent 50%,
                  transparent
          ),
          conic-gradient(from var(--border-angle), transparent 20%, #ffffff, #797979);
          z-index: -1;
          background-size: calc(100% - (var(--border-size) * 2)) calc(100% - (var(--border-size) * 2)),
          cover;
          background-position: center center;
          background-repeat: no-repeat;
          -webkit-animation: webkit-bg-spin 3s linear infinite;
          animation: bg-spin 3s linear infinite;
          @keyframes bg-spin {
            to {
              --border-angle: 1turn;
            }
          }
          @-webkit-keyframes bg-spin {
            to {
              --border-angle: 1turn;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    height: 120px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    .portfolio-list-wrapper {
      height: 120px;
      min-width: 100%;
      flex: 0 0 auto;
      transition: all .5s ease-in-out;
      transform: translateX(calc(-200px * (var(--index) - 1)));
      display: flex;
      flex-wrap: nowrap;
      white-space: nowrap;

      .portfolio-img-wrapper {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin: 2px;
        width: 200px;
        flex: 0 0 auto;

        .portfolio-img {
          margin: 0;
          width: calc(100% - 4px);
          height: 116px;
          object-fit: cover;
        }


        &.active {

          &:after {
            top: -2px;
            left: 0;
            width: 100%;
            height: 120px;
          }
        }
      }
    }

  }
}
</style>