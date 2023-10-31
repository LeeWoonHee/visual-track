<template>
  <nav>
    <div
        :class="{'open': open}"
        @click="open = !open"
        class="h-menu cursor-pointer"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <transition
        name="fade"
        mode="out-in"
    >
      <div v-if="open" class="open-menu">
        <div class="open-menu-container">
          <div class="top-move-text-animation">
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
          </div>
          <div class="bottom-move-text-animation">
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
            <div class="move-text">VISUAL TRACK</div>
          </div>
          <!--   Menu Left Text     -->
          <div class="blex-left w-full">
            <div class="open-menu-title">
              <span class="text-shaker-a">D</span>
              <span class="text-shaker-b">I</span>
              <span class="text-shaker-c">V</span>
              <span class="text-shaker-d">E</span>

              <span class="text-shaker-e">I</span>
              <span class="text-shaker-f">N</span>
              <span class="text-shaker-g">T</span>
              <span class="text-shaker-h">O</span>

              <span class="text-shaker-i">V</span>
              <span class="text-shaker-j">I</span>
              <span class="text-shaker-k">S</span>
              <span class="text-shaker-l">U</span>
              <span class="text-shaker-m">A</span>
              <span class="text-shaker-n">L</span>

              <span class="text-shaker-o">T</span>
              <span class="text-shaker-p">R</span>
              <span class="text-shaker-q">A</span>
              <span class="text-shaker-r">C</span>
              <span class="text-shaker-s">K</span>
              <span class="text-shaker-t">’</span>
              <span class="text-shaker-u">S</span>

              <span class="text-shaker-v">R</span>
              <span class="text-shaker-w">E</span>
              <span class="text-shaker-x">A</span>
              <span class="text-shaker-y">L</span>
              <span class="text-shaker-z">M</span>

<!--              dive into visual track’s realm-->
            </div>
            <div class="open-menu-description font-frag">
              “Where each pixel narrates and every frame paints.<br>
              We’re more than a production house; we’re a vibrant<br>
              community of artists, innovators, and dreamers.<br>
              With each venture, we champion creativity and inspiration.<br>
              Join us, explore, and let’s make the extraordinary together”
            </div>
          </div>
          <div class="blex-top w-full">
            <div class="blex-right w-full">
              <div class="menu-list-wrapper">
                <router-link
                    class="menu-list"
                    tag="a"
                    :to="{name: 'main'}"
                    exact-active-class="menu-active"
                    @click.native="open = false"
                >
                  MAIN
                </router-link>
                <router-link
                    class="menu-list"
                    tag="a"
                    :to="{name: 'portfolio'}"
                    exact-active-class="menu-active"
                    @click.native="open = false"
                >
                  PORTFOLIO
                </router-link>
                <router-link
                    class="menu-list"
                    tag="a"
                    :to="{name: 'contact'}"
                    exact-active-class="menu-active"
                    @click.native="open = false"
                >
                  CONTACT
                </router-link>
              </div>
            </div>
          </div>
          <made-by-else-logo/>
        </div>
      </div>
    </transition>
  </nav>
</template>
<script>
import MadeByElseLogo from '@/components/MadeByElseLogo.vue'

export default {
  name      : 'TheNav',
  components: {
    MadeByElseLogo
  },
  data      : () => ({
    open: false
  })
}

</script>

<style
    scoped
    lang="scss"
>
nav::v-deep {
  .h-menu {
    position: fixed;
    top: 9vh;
    right: 4vw;
    z-index: 100;
    width: 46px;
    height: 36px;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;

    span {
      display: block;
      position: absolute;
      height: 3px;
      width: 50%;
      background: #FFFFFF;
      opacity: 1;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: .25s ease-in-out;
      -moz-transition: .25s ease-in-out;
      -o-transition: .25s ease-in-out;
      transition: .25s ease-in-out;

      &:nth-child(even) {
        left: 50%;
      }

      &:nth-child(odd) {
        left: 0;
      }

      &:nth-child(1), &:nth-child(2) {
        top: 0;
      }

      &:nth-child(3), &:nth-child(4) {
        top: 16px;
      }

      &:nth-child(5), &:nth-child(6) {
        bottom: 0;
      }
    }

    &.open {
      span {
        &:nth-child(1), &:nth-child(6) {
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }

        &:nth-child(2), &:nth-child(5) {
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }

        &:nth-child(1) {
          left: 5px;
          top: 11px;
        }

        &:nth-child(2) {
          left: calc(50% - 5px);
          top: 11px;
        }

        &:nth-child(3) {
          left: -50%;
          opacity: 0;
        }

        &:nth-child(4) {
          left: 100%;
          opacity: 0;
        }

        &:nth-child(5) {
          left: 5px;
          top: 24px;
        }

        &:nth-child(6) {
          left: calc(50% - 5px);
          top: 24px;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .h-menu {
      width: 40px;
      top: 7vh !important;
      bottom: 7vw !important;
    }

  }


  .open-menu {
    width: 100%;
    height: calc(var(--vh) * 100);
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000;
    z-index: 10;
    display: flex;
    justify-content: center;
    color: #fff;

    .open-menu-container {
      width: calc(100% - 46px);
      height: 100%;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      padding: 3.229vw 0 9.896vw 2.813vw;

      @media screen and (max-width: 1024px) {
        width: calc(100% - 30px);
        padding: 0 16px;
      }
      .top-move-text-animation{
        display:flex;
        position:absolute;
        justify-content: space-around;
        top:0;
        overflow:hidden;
        flex-wrap : nowrap;
        left:0;
        animation: right-to-left 40s -40s linear infinite;
        .move-text{
          font-size : 1.354vw;
          width:10.417vw;
          text-align:center;
          @media screen and(max-width: 1024px){
            font-size: 14px;
            width: 110px;
          }
        }
      }
      .bottom-move-text-animation{
        display:flex;
        position:absolute;
        justify-content: space-around;
        bottom:0;
        overflow:hidden;
        flex-wrap : nowrap;
        right:0;
        animation: left-to-right 40s -40s linear infinite;
        .move-text{
          font-size : 1.354vw;
          width:10.417vw;
          text-align:center;
          @media screen and(max-width: 1024px){
            font-size: 14px;
            width: 110px;
          }
        }
      }

      .open-menu-title {
        font-size: 1.563vw;
        width: 100%;
        animation: appear 0.5s linear forwards;
        display:flex;
        @media screen and (max-width: 1024px) {
          span{
            font-size: 24px;
          }

        }
      }

      .open-menu-description {
        max-width: 30.781vw;
        margin-top: 20px;
        font-size: 0.833vw;
        animation: appear 0.5s linear forwards;
        @media screen and (max-width: 1024px) {
          max-width: 100% !important;
          font-size:10px !important;
        }

      }

      .menu-list-wrapper {
        margin-right: 9.063vw;
        display:flex;
        flex-wrap: wrap;
        max-width:35vw;
        @media screen and(max-width: 1024px) {
          margin-right: 0;
          max-width:50vw;
        }
        @media screen and(max-width: 360px) {
          max-width:70vw;
        }


        .menu-list {
          color: #b9b9b9;
          display: flex;
          align-items: center;
          width: 100%;
          font-size: 8.854vw;
          letter-spacing: 13.6px !important;
          //text-shadow: 14px 18px 4px #000;
          height: 10.625vw;
          transition:all 0.5s ease-in-out;
          position: relative;
          animation: appear 0.5s linear forwards;
          line-height: normal;

          @media screen and(max-width: 1024px) {
            font-size: 54px;
            height: auto;
            letter-spacing: 3.6px !important;
          }

          &:first-child {
            opacity: 0;
            transform: translateY(100%);
            animation-delay: 0.1s;
          }

          &:nth-child(2) {
            opacity: 0;
            transform: translateY(100%);
            animation-delay: 0.2s;
          }

          &:last-child {
            opacity: 0;
            transform: translateY(100%);
            animation-delay: 0.3s;
          }

          &::before {
            content: '';
            display: block;
            position: absolute;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            transition: 0.5s;
            background-color: #fff;
            left: -41px;
            top: 45%;
            @media screen and(max-width: 1024px) {
              width: 10px;
              height: 10px;
              left: -7vw;
            }
          }
          &::after{
            content:'';
            height:0;
          }
          @media screen and(min-width: 1024px) {
            &:hover {
              &::after{
                content:'';
                position:absolute;
                width:200vw;
                background : #fff;
                height:100%;
                left:-100vw;
                z-index:-1;
                align-items:center;
                transition:0.5s;
              }
              &::before{
                background:#000000;
              }
              color:#000000 !important;
              margin-left:-40px;
            }
          }


        }

        .menu-active {
          color: #fff;

          &::before {
            opacity: 1;
            animation: scale-up 1.5s infinite alternate;
          }
        }
      }
      .bottom-else-logo{
        @media screen and (max-width: 1024px) {
          bottom: 5vw !important;
        }
        .else-logo {
          animation: appear 0.5s linear forwards;
          left: 0 !important;
        }
      }

    }

  }

  @media screen and (max-width: 1024px) {

    .h-menu {
      position: fixed;
      top: 6vh;
      right: 4vw;
      z-index: 100;
      width: 36px;
      height: 24px;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: .5s ease-in-out;
      -moz-transition: .5s ease-in-out;
      -o-transition: .5s ease-in-out;
      transition: .5s ease-in-out;

      span {
        display: block;
        position: absolute;
        height: 3px;
        width: 50%;
        background: #FFFFFF;
        opacity: 1;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;

        &:nth-child(even) {
          left: 50%;
        }

        &:nth-child(odd) {
          left: 0;
        }

        &:nth-child(1), &:nth-child(2) {
          top: 0;
        }

        &:nth-child(3), &:nth-child(4) {
          top: 10px;
        }

        &:nth-child(5), &:nth-child(6) {
          bottom: 0;
        }
      }

      &.open {
        span {
          &:nth-child(1), &:nth-child(6) {
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
          }

          &:nth-child(2), &:nth-child(5) {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
          }

          &:nth-child(1) {
            left: 3px;
            top: 6px;
          }

          &:nth-child(2) {
            left: calc(50% - 3px);
            top: 6px;
          }

          &:nth-child(3) {
            left: -50%;
            opacity: 0;
          }

          &:nth-child(4) {
            left: 100%;
            opacity: 0;
          }

          &:nth-child(5) {
            left: 3px;
            top: 17px;
          }

          &:nth-child(6) {
            left: calc(50% - 3px);
            top: 17px;
          }
        }
      }
    }


  }
}

@keyframes right-to-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes left-to-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(50%);
  }
}

@keyframes scale-up {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.4);
  }
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>