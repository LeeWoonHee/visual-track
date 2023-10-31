<template>
  <div
      class="main"
      ref="main"
  >

    <div
        class="main-container"
        ref="main-container"
    >codepen

      <div
          class="pin-trigger"
          ref="trigger"
      >

        <!--    Main Title Wrapper      -->
        <canvas ref="star-field-canvas" id="canvas" class="star-field-canvas"/>
        <div
            class="main-title-wrapper"
            ref="main-title-wrapper"
        >

          <div class="main-top-wrapper">
            <div
                class="main-title"
                ref="main-title"
            >
              <!--    Start Text Animation Wrapper          -->
              <div class="hi">
                <div
                    class="hi__cuboid-top"
                    ref="hi-cuboid-top"
                >
                  <div class="face face--front"><p
                      class="hi__word"
                      ref="main-text-top-front"
                  >IGNITING CREATIVITY;</p>
                  </div>
                  <div class="face face--back"><p
                      class="hi__word"
                      ref="main-text-top-back"
                  >IGNITING CREATIVITY;</p>
                  </div>
                  <div class="face face--top"><p
                      class="hi__word"
                      ref="main-text-top-top"
                  >IGNITING CREATIVITY;</p></div>
                  <div class="face face--bottom"><p
                      class="hi__word"
                      ref="main-text-top-bottom"
                  >IGNITING CREATIVITY;</p>
                  </div>
                </div>
                <div
                    class="hi__cuboid-bottom"
                    ref="hi-cuboid-bottom"
                >
                  <div class="face face--front"><p class="hi__word">INSPIRING STORIES</p></div>
                  <div class="face face--back"><p class="hi__word">INSPIRING STORIES</p></div>
                  <div class="face face--top"><p class="hi__word">INSPIRING STORIES</p></div>
                  <div class="face face--bottom"><p class="hi__word">INSPIRING STORIES</p></div>
                </div>
              </div>
              <!--     End Text Animation Wrapper         -->
              <div class="scroll-image">
                <img
                    src="@/assets/images/mainpage-scroller.png"
                    alt=""
                />
              </div>
            </div>
          </div>

          <!--   Start Warning Text Wrapper      -->
          <div class="main-bottom-wrapper">
            <div class="bottom-warning">
              <div class="bottom-warning-title">
                WARNING
              </div>
              <vue-typer
                  class="bottom-warning-desc"
                  text="“side effects of our content may include overwhelming inspiration, sudden bursts of creativity, and an irrepressible urge to dance”"
                  :type-delay="25"
              >
              </vue-typer>

            </div>
            <div class="w-full blex-right pt-30 opacity-80 z-20">
              <a
                  href="/"
                  class="go-back-to-tv"
              >
                  GO BACK TO TV >
              </a>
            </div>
          </div>
          <!-- End Warning Text Wrapper -->
          <scroll-down-animation/>
        </div>

        <div class="video-wrapper">
          <div class="video-container">
            <!--    Start Video Wrapper Top Title      -->
            <div class="video-top-wrapper">
              <div class="blex">
                <div class="vt-title">VISUAL TRACK</div>
                <vt-logo class="vt-logo"/>
              </div>
              <div>

              </div>
            </div>
            <!--    End Video Wrapper Top Title      -->

            <!--    Start Video Wrapper Bottom Video List      -->
            <div class="video-bottom-wrapper">
              <div
                  @click="goToPortfolio(portfolio.index)"
                  class="video-list"
                  ref="video-list"
                  v-for="portfolio in portfolios"
              >
                <div class="video">
                  <video
                      class="portfolio-video cursor-pointer"
                      :src="portfolio.video"
                      crossorigin="anonymous"
                      muted
                      loop
                      autoplay
                      playsinline
                  />
                </div>
                <div class="video-title">
                  <div class="video-name cursor-pointer">{{ portfolio.title }}</div>
                  <div class="video-desc cursor-pointer">{{ portfolio.description }}</div>
                </div>
              </div>
              <router-link
                  tag="a"
                  to="/portfolios"
              >
              <div
                  @click="goToPortfolio(1)"
                  class="video-list"
                  ref="video-list"
              >
                <div class="see-more-project-box">
                  <div class="see-more-project">
                    SEE MORE PROJECT
                    <img
                        class="more-arrow"
                        height="31"
                        width="21"
                        src="@/assets/images/icons/big-white-arrow.png"
                        alt=""
                    />
                  </div>
                </div>
              </div>
              </router-link>
            </div>
            <!--    End Video Wrapper Bottom Video List      -->
          </div>
          <div class="scroll-animation">
            SCROLL TO SEE PORTFOLIO
            <img
                class="h-full ml-6"
                width="6"
                src="@/assets/images/icons/right-white-arrow.png"
                alt=""
            />
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>


import VtLogo from '@/components/svg/VtLogo.vue'
import {EventBus} from '../../EventBus'
import ScrollDownAnimation from '@/views/pages/components/ScrollDownAnimation.vue'
export default {
  name: 'home',
  components: {
    VtLogo,
    ScrollDownAnimation
  },
  data: () => ({
    canvas: null,
    context: null,
    w: 0,
    h: 0,
    stars: [],
    prevTime: 0,
    scrollSmoother: null,
    rotateAnimationTrigger: null,
    timeline: null,
    hasScrolled : false,
    scrollY : 0,
    load: false,
    portfolios: [
      {
        index: 6,
        title: 'Just Jerk - 1973 천마를 깨우다',
        description: 'Dancing under a glass ceiling with Just Just Dance Crew was an experience of cinematic magic. Their dark, cool, and suave moves transformed the dome into a stage for creativity. Open to ideas and fun to work with, they turned a dance performance into a collaboration of vision and style. It was a project full of surprises and joy, led by some truly inspiring artists.',
        video: require('@/assets/videos/01_intro.mp4')
      },
      {
        index: 8,
        title: '[WDBZ Dance Album] #4. The Finesse by Y2',
        description: 'Dancing in a forest and shack with Wedemboyz for \'The Finesse\' by Y2 was a cool and hostile experiment in creativity. Their unique style and willingness to take risks made this more than a dance video; it was a collaborative adventure. Fun, professional, humble, and chill, working with them was a true pleasure, and the result was something uniquely fresh.',
        video: require('@/assets/videos/02_intro.mp4')
      },
      {
        index: 3,
        title: 'LE SSERAFIM (르세라핌) ‘ANTIFRAGILE’ Special Performance Video',
        description: 'Filming \'Antifragile\' with LE SSERAFIM was nothing short of thrilling. In a setting filled with shipping containers, these five hardworking and beautiful girls delivered an edgy and unique performance that was downright addictive. The fire spark effects? They added a touch of magic to every move. But what really stood out was their chemistry, their cute interactions, and their absolute dedication to the craft. It wasn\'t just a dance; it was a dance with spirit, a shared moment of creativity that I\'m proud to have been a part of.',
        video: require('@/assets/videos/03_intro.mp4')
      },
      {
        index: 10,
        title: '비(RAIN) X SMF - DOMESTIC (팔각정) MV',
        description: 'Teaming up with Rain and dance crews from MNET\'s SMF for \'Domestic\' was like a family reunion with an adrenaline boost. At a historic palace in South Korea, we ignited the set with fire effects, creating a hype and dynamic masterpiece. Having worked with each crew before, it felt amazing to bring everyone together. And working with Rain? An absolute honor. We danced hard, laughed harder, and put together the hardest hitting dance video ever. Pure fun, pure energy!',
        video: require('@/assets/videos/04_intro.mp4')
      },
      {
        index: 18,
        title: '[THE 8 Contemporary ART] THE 8 - 深渊 (Abyss)',
        description: 'Diving into \'Abyss\' with THE8 felt like we were tapping into the deeper layers of dance and artistry. Those underwater scenes? Seriously cool and gave a surreal vibe to the whole piece. It wasn\'t just another dance video; with THE8\'s unique touch, we were creating something special together.',
        video: require('@/assets/videos/05_intro.mp4')
      },
      {
        index: 23,
        title: 'LUN8(루네이트) | "SAAY - Talk 2 Me Nice" Dance Performance',
        description: 'Filming \'Talk 2 Me Nice\' with Lun8 was all about that slick, noir vibe. In a white studio, under a perfect spotlight, we just clicked. They were new but full of promise, and we brought sexy back, just like that. It was fun, natural, and I\'m really looking forward to seeing them shine in the industry.',
        video: require('@/assets/videos/06_intro.mp4')
      },
      {
        index: 5,
        title: '강다니엘(KANGDANIEL) - Don\'t Tell (Feat. Jessi) M/V',
        description: 'Creating \'Don\'t Tell\' with Kang Daniel and Jessi was like a classy dance in a high-end hotel. Our fourth collaboration, this performance music video was filled with Latin vibes and posh elegance. Daniel\'s humor and humility, Jessi\'s flair, and the talent of many made it not just a project but a joyful creation. It was more than a shoot; it was a gathering of friends crafting something uniquely stylish and fun.',
        video: require('@/assets/videos/07_intro.mp4')
      },
      {
        index: 4,
        title: '[XG TAPE #3-B] Nothin\' (JURIN, COCONA)',
        description: 'Working on \'Nothin\'\' with Jurin and Cococa of XG was a lesson in reinvention. On top of shipping containers, classic cars, and bikes, they performed a rap cover that was hip hop at its slickest. Their rewritten lyrics turned an old classic into something fresh and swag-filled. Their eye-catching performance, filled with hype and dynamic moves, wasn\'t just a cover—it was a reinvention. Working with such well-trained artists who could take something old and make it trendy again was both a joy and an inspiration.',
        video: require('@/assets/videos/08_intro.mp4')
      },
      {
        index: 19,
        title: 'MCND \'W.A.T.1\'ㅣTRACK VIDEO',
        description: 'Diving into \'W.A.T.1\' with MCND was like tapping into the pulsing heart of pop. Their youthful energy and unwavering passion are absolutely infectious. What really amplified this project was the moment we flew an FPV drone over the scene with 30 backup dancers. The vibrancy of MCND combined with that dynamic shot? Pure magic on screen. These young guns give their all, and it was a joy to capture it.',
        video: require('@/assets/videos/09_intro.mp4')
      }
    ]
  }),
  methods: {
    test() {
      this.$router.push({
        name: 'portfolio'
      })
    },
    //===============================
    //Start Star Field Canvas Function
    initCanvas() {
      this.canvas = this.$refs['star-field-canvas']
      this.context = this.canvas.getContext('2d')
      this.setCanvasExtents()
      this.makeStars(1000)
      requestAnimationFrame(this.init)

    },
    setCanvasExtents() {
      this.w = window.innerWidth
      this.h = window.innerHeight
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
      if(this.canvas){
        this.context.fillStyle = '#000000'
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
      }
    },
    putPixel(x, y, brightness) {
      const intensity = brightness * 255
      this.context.fillStyle = `rgb(${ intensity },${ intensity },${ intensity })`
      this.context.fillRect(x, y, 2.5,2.5)
    },
    moveStars(distance) {
      const count = this.stars.length
      for (let i = 0; i < count; i++) {
        const s = this.stars[i]
        this.hasScrolled ? s.z -= distance * 10 : s.z -= distance
        while (s.z <= 1) {
          s.z += 1000
        }
      }
    },
    init(time) {
      this.prevTime = time
      requestAnimationFrame(this.tick)
    },
    tick(time) {
      window.addEventListener('scroll', this.scrollEvent)
      window.addEventListener('resize', this.setCanvasExtents)
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
      this.hasScrolled = false
      requestAnimationFrame(this.tick)

    },
    scrollEvent(event) {
      if(event){
        this.hasScrolled = true
      }
    },
    //End Star Field Canvas Function
    //==============================
    goToPortfolio(index) {
      this.$router.push({
        name: 'portfolio',
        params: {indexFromMain: index}
      })
    },
    initAnimation() {
      //=============================================
      //First Text Animation Init Function
      //=============================================
      let winH = 0
      const container = this.$refs['main-title']
      const cuboidTop = this.$refs['hi-cuboid-top']
      const cuboidBottom = this.$refs['hi-cuboid-bottom']

      winH = window.innerHeight

      this.$gsap.set(container, {autoAlpha: 1})

      this.$gsap.timeline({delay: 0.5})
          .from(cuboidTop, {
            y: winH,
            duration: 3,
            stagger: 0.14,
            ease: 'elastic(0.4,0.3)'
          }, 0)
          .from(cuboidBottom, {
            y: winH,
            duration: 3,
            stagger: 0.14,
            ease: 'elastic(0.4,0.3)'
          }, 0)

      this.$gsap.to(cuboidTop, {
        rotateX: -360,
        duration: 8,
        repeat: -1,
        ease: 'none'
      })

      this.$gsap.fromTo(cuboidTop, {
        rotateY: 8,
        rotate: -10
      }, {
        rotateY: -8,
        rotate: 10,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      })

      this.$gsap.to(cuboidBottom, {
        rotateX: -360,
        duration: 8,
        repeat: -1,
        ease: 'none'
      })

      this.$gsap.fromTo(cuboidBottom, {
        rotateY: 8,
        rotate: -10
      }, {
        rotateY: -8,
        rotate: 10,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      })

      EventBus.$emit('loaded')
    },

    //=======================================================================
    //====================Init Setting Gsap =================================
    //=======================================================================
    setGsap() {
      this.media = this.$gsap.matchMedia()
      this.media.add('(min-width: 1025px)', () => {
        if (this.timeline) {
          this.timeline.kill()
          this.timeline = null
        }
        this.timeline = this.initGsap()
        return () => {
          if (this.timeline) {
            this.timeline.kill()
            this.timeline = null
          }
        }
      }).add('(max-width: 1024px)', () => {
        if (this.timeline) {
          this.timeline.kill()
          this.timeline = null
        }
        this.timeline = this.initMGsap()
        return () => {
          if (this.timeline) {
            this.timeline.kill()
            this.timeline = null
          }
        }
      })
    },
    //=======================================================================
    //=====================Init Gsap ========================================
    //=======================================================================
    initGsap() {
      if (this.scrollSmoother) {
        this.scrollSmoother.kill()
        this.scrollSmoother = null
      }

      this.scrollSmoother = this.$gsapScrollSmoother.create({
        content: this.$refs['main-container'],
        smooth: 3,
        effects: true,
        smoothTouch: true
      })

      return this.$gsap.timeline({
        scrollTrigger: {
          trigger: '.pin-trigger',
          start: 'top',
          end: 'bottom',
          pin: true,
          scrub: 0.5,
          toggleActions: 'restart none none none'
        }
      })
          .to('.scroll-image', {
            rotate: 90,
            duration: 1.5
          }, '-=3')
          .to('.main-top-wrapper', {
            yPercent: -500,
            duration: 2
          }, '-=1.5')
          .to('.main-bottom-wrapper', {
            yPercent: 500,
            duration: 2
          }, '-=2')
          .to('.scroll-down-animation', {
            yPercent: 500,
            duration: 1.5
          }, '-=2')
          .fromTo('.video-wrapper', {
            opacity: 0,
            zIndex: -1
          }, {
            opacity: 1,
            zIndex: 999,
            duration: 1.5
          }, '-=1')
          .to('.video-list', {
            visibility: 'visible',
            opacity:1,
            duration : 1
          }, '-=1')
          .to('.portfolio-video', {
            height: '32vw',
            duration: 1
          }, '-=0.1')
          .to('.video-title', {
            left: '20px',
            duration: 1
          }, '-=1.1')
          .to('.video', {
            width: '77.8vw',
            duration: 1
          }, '-=0.9')
          .to('.video-list', {
            marginRight: '2vw',
            duration: 1.5
          }, '>')
          .to('.video', {
            width: '38vw',
            duration: 1.5
          }, '-=1.5')
          .to('.pin-trigger', {
            backgroundImage: 'none'

          }, '>')
          .to('.video-bottom-wrapper', {
            xPercent: -80,
            duration: 10
          }, '>')
    },

    //=======================================================================
    //=====================Init Mobile Gsap =================================
    //=======================================================================
    initMGsap() {
      if (this.scrollSmoother) {
        this.scrollSmoother.kill()
        this.scrollSmoother = null
      }
      this.scrollSmoother = this.$gsapScrollSmoother.create({
        content: this.$refs['main-container'],
        smooth: 3,
        effects: true,
        smoothTouch: true,
        normalizeScroll: true
      })
      return this.$gsap.timeline({
        scrollTrigger: {
          trigger: '.pin-trigger',
          start: 'top',
          end: 'bottom',
          pin: true,
          scrub: 0.5,
          toggleActions: 'restart none reverse none'
        }
      })
          .to('.scroll-image', {
            rotate: 90,
            duration: 1.5
          }, '-=3')
          .to('.main-top-wrapper', {
            yPercent: -500,
            zIndex: 9999,
            duration: 1.5
          }, '-=1.5')
          .to('.main-bottom-wrapper', {
            yPercent: 500,
            duration: 1.5
          }, '-=1.5')
          .to('.scroll-down-animation', {
            yPercent: 500,
            duration: 1.5
          }, '-=1.5')
          .fromTo('.video-wrapper', {
            opacity: 0,
            visibility: 'hidden',
            duration: 1.5
          }, {
            opacity: 1,
            visibility: 'visible',
            duration: 1.5
          }, '-=0.5')
          .to('.video-list', {
            visibility: 'visible',
            opacity:1,
            duration : 1
          }, '-=1')
          .to('.video-list', {
              height: '100vw',
              marginBottom: '7vw',
              duration : 1
          },'-=0.1')
          .to('.pin-trigger', {
            background: '#000',
            duration: 1
          }, '-=1.1')
          .to('.video-title', {
            bottom: '30px',
            duration: 1
          }, '-=1.1')
          .to('.portfolio-video', {
            height: '100vw',
            duration: 1
          }, '-=1')
          .to('.video-bottom-wrapper', {
            yPercent: -95,
            duration: 10
          }, '>')
    }
  },
  beforeCreate () {
    EventBus.$emit('logoVisible', null)
  },
  mounted() {
    this.$nextTick(() => {
      this.setGsap()
      this.initAnimation()
      this.initCanvas()
      window.addEventListener('resize', this.windowResize)
      this.$refs['main-container'].style.height = `${(this.$refs['main-title-wrapper'].clientHeight + this.$refs['main-title-wrapper'].clientHeight * this.portfolios.length + 1) / 1080 * 100}vh `
    })

  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollEvent)
    window.removeEventListener('resize', this.setCanvasExtents)
    window.cancelAnimationFrame(this.init)
    window.cancelAnimationFrame(this.tick)
    this.timeline.kill()
    this.timeline = null
    this.scrollSmoother.kill()
    this.scrollSmoother = null
    this.stars = []
    this.context = null
    this.canvas = null
    this.w = null
    this.h = null
    this.prevTime = 0
    this.rotateAnimationTrigger = null
    this.hasScrolled = null
    this.scrollY = null
    this.load = null

  }
}
</script>

<style
    scoped
    lang="scss"
>
@mixin cuboid($cWidth, $cHeight, $cDepth, $cColor) {
  position: relative;
  width: $cWidth;
  height: $cHeight;
  transform-style: preserve-3d;

  .face {
    position: absolute;
    left: 0;
    top: 0;
    background-color: black;
  }

  .face--front {
    width: $cWidth;
    height: $cHeight;
    transform: translateZ(calc(#{$cDepth} / 2));
  }

  .face--back {
    width: $cWidth;
    height: $cHeight;
    transform: translateZ(calc(#{$cDepth} / 2 * -1)) rotateY(180deg) rotate(180deg);
  }

  .face--left {
    width: $cDepth;
    height: $cHeight;
    transform: translateX(calc(#{$cDepth} / 2 * -1)) rotateY(-90deg);
  }

  .face--right {
    width: $cDepth;
    height: $cHeight;
    transform: translateX(calc(#{$cWidth} - #{$cDepth} / 2)) rotateY(90deg);
  }

  .face--top {
    width: $cWidth;
    height: $cDepth;
    transform: translateY(calc(#{$cDepth} / 2 * -1)) rotateX(90deg);
  }

  .face--bottom {
    width: $cWidth;
    height: $cDepth;
    transform: translateY(calc(#{$cHeight} - #{$cDepth} / 2)) rotateX(-90deg);
  }
}

.main::v-deep {
  width: 100%;
  min-height: calc(var(--vh) * 100);
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: fixed;
  top: 0;
  overflow:hidden;
  @media screen and (max-width: 1024px) {
    height:100%;
    overflow: hidden;
  }


  .main-container {
    width: 100%;
    height: calc(var(--vh) * 100);
    display: flex;
    box-sizing: border-box;
    text-align: center;
    align-items: center;
    align-content: center;
    line-height: normal;
    flex-wrap: wrap;
    color: #ffffff;
    justify-content: center;
    position:relative;


    .pin-trigger {
      width: 100%;
      height: 100%;
      display: flex;
      box-sizing: border-box;
      text-align: center;
      align-items: center;
      align-content: center;
      justify-content: center;
      position:fixed;
      top:0;
      left:0;
      flex-wrap: wrap;

      &::after {
        content: '';
        position: fixed;
        width: 98%;
        top: 60px;
        left: 1.146vw;
        height: 1px;
        background-color: #ffffff;
      }

      @media screen and (max-width: 1024px) {
        &::after {
          top: 20px;
        }
      }
      .star-field-canvas{
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height: calc(var(--vh) * 100);
      }
      .main-title-wrapper {
        width: 90%;
        height: calc(var(--vh) * 100);
        padding-top: 10.156vw;
        position: absolute;
        top: 0;
        @media screen and (max-width: 1024px) {
          width: 92%;
        }

        .main-top-wrapper {
          width: 100%;
          height: 50%;
          position: absolute;
          left: 0;
          top: 8vw;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          @media screen and (max-width: 1024px) {
            top: 20px !important;
          }
          .main-title {
            position: relative;
            width: 100%;
            height:100%;
            display: flex;
            align-items: center;
            justify-content: center;
            perspective: 900px;
            visibility: hidden;

            .hi {
              position: relative;
              z-index: 1;
              font-size: 100px;
              font-stretch: 400%;
              font-weight: 600;
              line-height: 1;
              text-transform: uppercase;
              text-align: center;
              transform-style: preserve-3d;


              .hi__cuboid-top {
                @include cuboid(50vw, 7vw, 7vw, black);
                margin: 70px auto;
              }

              .hi__cuboid-bottom {
                @include cuboid(45vw, 7vw, 7vw, black);
                margin: 70px auto;
              }

              @media screen and (max-width: 1024px) {
                .hi__cuboid-top {
                  @include cuboid(65vw, 12.695vw, 12.695vw, black);
                }
                .hi__cuboid-bottom {
                  @include cuboid(60vw, 12.695vw, 12.695vw, black);
                }
              }

              .face {
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;

                &.face--top, &.face--bottom {
                  background: white;
                  color: black;
                }
              }

              .hi__word {
                font-size: 7vw;
                margin: 0;
                transform: translateY(-10px);
                @media screen and (max-width: 1024px) {
                  transform: translateY(0);
                }

              }

            }

            .scroll-image {
              position: absolute;
              right: 0;
              top: 30%;
              width: 4.271vw;
            }

            @media screen and (max-width: 1024px) {
              .scroll-image {
                width: 53px;
                z-index: -1;
                top: 100px;
              }
            }
          }


        }

        @media screen and (max-width: 1024px) {
          .main-top-wrapper {
            top: 80px !important;
          }
        }
      }

      .main-bottom-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        margin-top: 3vw;
        position: absolute;
        bottom: 1.510vw;
        left: 0;

        .bottom-warning {
          text-align: left;
          letter-spacing: 1.6px;
          font-size: 1.146vw;
          border: 1px solid #ffffff;
          padding: 2.135vw 4.844vw 1.979vw 4.740vw;
          width: 100%;

          @media screen and (max-width: 1024px) {
            padding: 34px 24px;

          }

          .bottom-warning-title {
            margin-bottom: 0.521vw;
            font-size: 1.563vw;
            letter-spacing: 1.5px;
            animation: blink-effect 1.8s infinite;
            @media screen and (max-width: 1024px) {
              font-size: 20px;
            }
          }

          .bottom-warning-desc {
            font-size: 1.146vw;
            letter-spacing: 2.2px;
            @media screen and (max-width : 1024px){
              font-size : 12px;
            }
            & .custom.char.typed {
              color: #fff;
              word-break: keep-all;
            }

            & .custom.caret {
              background-color: #fff;
            }
          }
        }
        .go-back-to-tv{
          letter-spacing : 1.6px;
          z-index : 9999;
          font-size: 0.833vw;
          @media screen and (max-width: 1024px){
            font-size : 12px;
          }
        }

      }

      .video-wrapper {
        display: flex;
        width: 100%;
        height: calc(var(--vh) * 100);
        flex-wrap: wrap;
        position: fixed;
        justify-content: center;
        top: 0;
        opacity: 0;

        &::after {
          content: '';
          position: absolute;
          width: 98%;
          bottom: 20px;
          left: 1.146vw;
          height: 1px;
          background-color: #ffffff;
          @media screen and (max-width: 1024px) {
            bottom: 32px;
          }
        }

        .video-container {
          width: 92%;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          padding: 60px 0;

          .video-top-wrapper {
            width: 100%;
            display: flex;
            top: 2vw;
            justify-content: space-between;
            z-index: 10;

            .vt-title {
              font-size: 7vw;
              line-height: 1;
              @media screen and (max-width: 1024px) {
                font-size: 40px;
              }
            }

            .vt-logo {
              width: 4.427vw;
              height: 4.427vw;
              margin-top: 1vw;
              margin-left: 1.823vw;
            }

            @media screen and (max-width: 1024px) {
              padding-bottom: 10px;
              top: 30px;

              .vt-logo {
                width:30px;
                height:30px;
                margin-top: 0;
                margin-bottom:4px;
                margin-left : 12px;
              }
            }
          }

          .video-bottom-wrapper {
            display: flex;
            bottom: 100px;
            @media screen and (max-width: 1024px) {
              top: 88px;
              flex-wrap: wrap;
            }

            .video-list {
              width: 92%;
              margin-right: 4vw;
              position: relative;
              height: 30.365vw;
              visibility: hidden;
              opacity:0;
              @media screen and (max-width: 1024px) {
                margin-right: 0;
                width: 100vw;
                height: 78vh;
                margin-bottom: 26vw;
              }

              .video {
                width: 92vw;
                height: 70%;
                .portfolio-video {
                  width: 100%;
                  height: 100%;
                  border-radius: 27px;
                  object-fit: cover;
                  @media screen and (max-width: 1024px) {
                    height: 100vw;
                  }
                }
              }

              .video-title {
                text-align: left;
                position: absolute;
                bottom: 0;
                z-index : 1;
                @media screen and (max-width: 1024px) {
                  bottom: 5px;
                  padding: 0 20px;
                  max-width:92vw;
                }

                .video-name {
                  font-size: 2.083vw;
                  @media screen and (max-width: 1024px) {
                    font-size: 22px;
                    letter-spacing: 1.1px;
                    overflow: hidden;
                    white-space: normal;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: keep-all;
                  }
                }

                .video-desc {
                  font-size: 0.833vw;
                  margin-top: 12px;
                  @media screen and (max-width: 1024px) {
                    font-size: 12px;
                    letter-spacing: 1.2px;
                    overflow: hidden;
                    white-space: normal;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    word-break: keep-all;
                  }
                }
              }

              .see-more-project-box {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 2.604vw;
                height: 100%;
                width: 38.5vw;

                @media screen and (max-width: 1024px) {
                  width: 100%;
                  font-size: 22px;
                  .more-arrow {
                    width: 9px;
                    height: 13px;
                  }
                }

                .see-more-project {
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  &:hover {
                    .more-arrow {
                      animation: arrow-animation 1s linear alternate infinite;
                    }
                  }

                  .more-arrow {
                    margin-left: 24px;

                  }
                }
              }
            }
          }
        }

        .scroll-animation {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          bottom: 1.758vw;
          right: 76px;
          font-size: 0.938vw;
          animation: blink-effect 1.2s infinite;
          @media screen and (max-width: 1024px) {
            font-size: 14px;
            right: 16px;
          }
          @media screen and (max-width: 360px) {
            font-size:10px;
          }
        }
      }
    }
  }
}


@keyframes blink-effect {
  10% {
    opacity: 0.8;
  }
  20% {
    opacity: 0.6;
  }
  30% {
    opacity: 0.4;
  }
  40% {
    opacity: 0.2;
  }
  50% {
    opacity: 0;
  }
  60% {
    opacity: 0.2;
  }
  70% {
    opacity: 0.4;
  }
  80% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
</style>