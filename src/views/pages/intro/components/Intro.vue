<template>
  <div
      ref="container"
      class="intro-container"
  >
    <div
        v-if="!isBack"
        class="intro-vt-logo"
    >
      <div>
        VISUAL TRACK
      </div>
      <vt-logo class="vt-logo"/>
    </div>

    <div
        v-else
        class="video-title-box"
    >
      <div class="video-title">{{ videoTitle[ screenIndex - 1 ].title }}</div>
      <div>PERFORMANCE VIDEO</div>
    </div>
    <center-enter-button @click="clickRemote"/>
    <remote @click="clickRemote"/>
    <div
        ref="entrance-light"
        class="entrance-light"
    ></div>
    <div
        v-if="isBack"
        ref="intro-back-button"
        class="intro-back-button"
        @click="cameraReset"
    >
      <img
          class="intro-back-button-image"
          src="@/assets/images/icons/intro-back-button.png"
          alt=""
      />
      <div class="intro-back-button-text">BACK</div>
    </div>
  </div>
</template>
|
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import MadeByElseLogo from '@/components/MadeByElseLogo.vue'
import VtLogo from '@/components/svg/VtLogo.vue'
import { EventBus } from '@/EventBus'
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import Remote from '@/views/pages/intro/components/Remote.vue'
import CenterEnterButton from '@/views/pages/intro/components/CenterEnterButton.vue'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

let camera,
    scene,
    renderer,
    container,
    renderRatio,
    testMode = false,
    secondLight,
    firstLight,
    controls,
    mouse,
    floorMesh,
    raycaster,
    intersects,
    canvas,
    stats,
    floor,
    localVideoTexture,
    video,
    tempVideo,
    videos = {},
    centerTvLight,
    gsapTimeline,
    //Mask Scene
    rtParameters,
    clearMask,
    fxaaPass,
    pixelRatio,
    shaderVignette,
    effectBloom,
    renderScene,
    effectVignette,
    composerScene,
    composerEffect,
    filmPass,
    renderPass

export default {
  name: 'intro',
  components: {
    Remote,
    MadeByElseLogo,
    VtLogo,
    CenterEnterButton
  },
  data: () => ({
    screenIndex: null,
    videoTitle: [
      {
        title: 'RAIN [DOMESTIC]'
      },
      {
        title: 'LE SSERAFIM [ANTIFRAGILE]'
      },
      {
        title: 'XG TAPE [Nothin\']'
      },
      {
        title: 'WDBZ [The Finesse by Y2]'
      }
    ],
    isBack: false,
    load: {
      tvScene: 0,
      centerTv: 0,
      left: 0,
      rightTop: 0,
      rightBottom: 0,
      center: 0
    },
    subscribes: []
  }),
  methods: {
    progress (key, value, total) {
      this.load[ key ] = value / total * 100
      EventBus.$emit('progress', (
          this.load.tvScene +
          this.load.centerTv +
          ((this.load.left +
              this.load.rightTop +
              this.load.rightBottom +
              this.load.center) / 4)
      ) / 3)
    },
    objectOnLoad (type, object, onLoad) {

      this.load[ type ] = 100
      this.subscribes.push({
        object,
        onLoad
      })
      if (
          this.load.tvScene === 100 &&
          this.load.centerTv === 100
      ) {

        while ( this.subscribes.length > 0 ) {
          const subscribe = this.subscribes.shift()
          if ( subscribe.onLoad ) {
            subscribe.onLoad(subscribe.object)
          }
        }
        //========================================
        //===========Init Shader Material=========
        //========================================

      }
    },
    init (renderRatio, testMode) {
      container = this.$refs.container
      this.loadRender(renderRatio, testMode)
      this.loadFloor()
      this.loadLight()
      this.loadCamera()
      this.loadControls()
      this.loadModels(testMode)
      this.loadMaskScene()
    },
    loadRender (renderRatio, testMode) {
      //Set Origin Scene
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000000)
      if ( window.innerWidth < 1024 ) {
        scene.scale.set(0.6, 0.6, 0.6)
        scene.position.set(0, 0, 7)
      }
      if ( testMode ) {
        scene.add(new THREE.AxesHelper(5))
      }
      renderer = new THREE.WebGLRenderer(
          {
            antialias: true,
            alpha: true
          }
      )
      renderer.setPixelRatio(window.devicePixelRatio * 0.7)
      renderRatio = Math.min(window.devicePixelRatio, 2)

      renderer.setSize(window.innerWidth / renderRatio, window.innerHeight / renderRatio)
      renderer.autoClear = false
      renderer.outputEncoding = THREE.LinearEncoding
      container.appendChild(renderer.domElement)

      if ( testMode ) {
        stats = new Stats()
        container.appendChild(stats.dom)
      }

    },
    loadMaskScene () {
      const rtParameters = {
        stencilBuffer: false,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding
      }
      //Composer Scene

      clearMask = new ClearMaskPass()
      composerScene = new EffectComposer(renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, rtParameters))
      renderPass = new RenderPass(scene, camera)
      composerScene.addPass(renderPass)
      composerScene.addPass(clearMask)
      //Composer Effect

      fxaaPass = new ShaderPass(FXAAShader)
      pixelRatio = 1
      fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / (container.offsetWidth * pixelRatio)
      fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / (container.offsetHeight * pixelRatio)
      renderScene = new TexturePass(composerScene.renderTarget2.texture)
      composerEffect = new EffectComposer(renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, rtParameters))
      filmPass = new FilmPass(.5, 0.01, 1230, false)


      //mobile version
      if ( window.innerWidth < 1024 ) effectBloom = new BloomPass(0.3)
      else effectBloom = new BloomPass(0.6)
      //

      shaderVignette = VignetteShader
      effectVignette = new ShaderPass(shaderVignette)
      effectVignette.uniforms[ 'offset' ].value = 1
      effectVignette.uniforms[ 'darkness' ].value = 3
      effectVignette.renderToScreen = true

      composerEffect.addPass(renderScene)
      composerEffect.addPass(effectBloom)
      composerEffect.addPass(filmPass)
      composerEffect.addPass(effectVignette)
      composerEffect.addPass(fxaaPass)

      renderScene.uniforms[ 'tDiffuse' ].value = composerScene.renderTarget2.texture
    },
    loadFloor () {
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.2,
        metalness: 0.2
      })

      const floorGeometry = new THREE.PlaneGeometry(100, 100)
      floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)

      //Floor Mobile Version
      if ( window.innerWidth > 1024 ) {
        floorMesh.position.set(0, 2.55, 0)
      } else {
        floorMesh.position.set(0, 1, 0)
      }
      //

      floorMesh.rotation.x = -Math.PI / 2
      scene.add(floorMesh)
    },
    loadLight () {
      //Left TV Light
      firstLight = new THREE.DirectionalLight(0xfffffff, 1)
      firstLight.position.set(0, 15, 40)
      firstLight.target.position.set(-50, -10, 0)
      scene.add(firstLight)

      //Center TV && Right TV Light
      secondLight = new THREE.SpotLight(0xffffff, 7, 59)
      secondLight.position.set(-5, 40, 35)

      //Ceenter TV && Right TV Ligth Mobile Version
      if ( window.innerWidth > 1024 ) {
        secondLight.target.position.set(91, -5, 10)
      } else {
        secondLight.target.position.set(60, -5, 10)
      }
      scene.add(secondLight)
    },
    loadCamera () {
      camera = new THREE.PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          0.1,
          10000
      )
      camera.position.set(0, 14, 45)
    },
    loadControls () {
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableZoom = false
      controls.enabled = false
      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    loadModels (testMode) {
      const manager = new THREE.LoadingManager()
      const gltfLoader = new GLTFLoader(manager)
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
      dracoLoader.setDecoderConfig({ type: 'js' })
      gltfLoader.setDRACOLoader(dracoLoader)


      //Load TV Model

      gltfLoader.load('/glb/v2/basicTvSet.glb', (object) => this.objectOnLoad('tvScene', object, (object) => {
        object.scene.position.set(-5, 3.2, 30)
        object.scene.rotation.set(0, -1.1, 0)
        object.scene.scale.set(3, 3, 3)
        scene.add(object.scene)

      }), ({
        loaded,
        total
      }) => this.progress('tvScene', loaded, total), (error) => {
        if ( testMode ) {
          console.log(error)
        }
      })

      //Load TV Screen

      gltfLoader.load('/glb/v2/tvCenterTestFront.glb', (object) => this.objectOnLoad('centerTv', object, (object) => {
        // Center TV Screen
        this.getScene(object.scene, [-6.4, 4, 6.5], [0, 0.465, 0], [2.8, 3, 2.5], '/videos/03_intro.mp4', 'center')
        // Left TV Screen
        this.getScene(object.scene, [-13, 3, 14.2], [0, 0.15, 0], [2.6, 3.2, 3], '/videos/04_intro.mp4', 'left')
        // Right Bottom TV
        this.getScene(object.scene, [23.4, 2.3, 9.9], [0, -1.02, 0], [3.6, 3.9, 3], '/videos/08_intro.mp4', 'rightBottom')
        // Right Top TV
        this.getScene(object.scene, [23.3, 10.7, 9.9], [0, -1.03, 0], [3.6, 3.9, 3], '/videos/02_intro.mp4', 'rightTop')
      }), ({
        loaded,
        total
      }) => this.progress(['centerTv', 'left', 'center', 'rightTop', 'rightBottom'], loaded, total), (error) => {
        if ( testMode ) {
          console.log(error)
        }
      })
    },
    onDocumentMouseMove (event) {
      //Camera Move Event
      mouse = new THREE.Vector2()
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      const cameraRotationY = camera.rotation.y + (mouse.x / 1000)
      const cameraPositionX = camera.position.x + (mouse.x / 100)
      const cameraPositionY = camera.position.y + (mouse.y / 100)

      if ( cameraRotationY - camera.rotation.y < 0.00085
          && cameraRotationY - camera.rotation.y > -0.00085 ) {
        camera.rotation.y = cameraRotationY
      }
      if ( cameraPositionX - camera.position.x < 0.008
          && cameraPositionX - camera.position.x > -0.008 ) {
        camera.position.x = cameraPositionX
      }
      if ( cameraPositionY - camera.position.y < 0.008
          && cameraPositionY - camera.position.y > -0.008 ) {
        camera.position.y = cameraPositionY
      }

    },
    //
    //Remote Click Event
    //
    clickRemote (val) {
      if ( gsapTimeline ) {
        gsapTimeline.kill()
        gsapTimeline = null
      }
      gsapTimeline = this.$gsap.timeline()
      gsapTimeline.autoRemoveChildren = true
      if ( typeof val === 'number' ) {
        this.clickRemoteNumber(val)
      } else if ( val === 'prev' ) {
        this.clickRemotePrev()
      } else if ( val === 'next' ) {
        this.clickRemoteNext()
      } else if ( val === 'play' ) {
        this.clickRemoteStop()
      } else if ( val === 'enter' ) {
        this.clickRemoteEnter()
      }
    },
    clickRemoteNumber (val) {
      this.allVideosPause()
      const index = val
      this.screenIndex = index
      this.toTvBridge(index)
      this.videoAutoPlay(index)
    },
    clickRemotePrev () {
      this.allVideosPause()
      if ( this.screenIndex === null ) {
        this.screenIndex = 2
      } else if ( this.screenIndex === 1 ) {
        this.screenIndex = 5
      }
      this.screenIndex--
      this.toTvBridge(this.screenIndex)
      this.videoAutoPlay(this.screenIndex)
    },
    clickRemoteNext () {
      this.allVideosPause()
      if ( this.screenIndex === null ) {
        this.screenIndex = 2
      } else if ( this.screenIndex === 4 ) {
        this.screenIndex = 0
      }
      this.screenIndex++
      this.toTvBridge(this.screenIndex)
      this.videoAutoPlay(this.screenIndex)
    },
    clickRemoteStop () {
      switch ( this.screenIndex ) {
      case 1 :
        videos.left.paused ? videos.left.play() : videos.left.pause()
        break
      case 2 :
        videos.center.paused ? videos.center.play() : videos.center.pause()
        break
      case 3 :
        videos.rightBottom.paused ? videos.rightBottom.play() : videos.rightBottom.pause()
        break
      case 4 :
        videos.rightTop.paused ? videos.rightTop.play() : videos.rightTop.pause()
        break
      }
    },
    clickRemoteEnter () {
      this.isBack = false
      if ( window.innerWidth > 1024 ) {
        if ( this.screenIndex === 1 ) {
          gsapTimeline.fromTo(camera.position, {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
          }, {
            x: 16,
            y: 8,
            z: 48,
            onUpdate: () => {
              camera.lookAt(-10, 7, 0)
            },
            ease: 'power2',
            duration: 3
          }, 'start')
              .to(camera.position, {
                z: 15,
                duration: 2,
                onUpdate: () => {
                  camera.lookAt(-10, 7, 0)
                },
                ease: 'power2.inOut'
              }, '-=2')
              .to(camera.position, {
                x: -2,
                duration: 2,
                onUpdate: () => {
                  camera.lookAt(-10, 7, 0)
                },
                ease: 'power2.inOut'
              }, '-=2')

        } else if ( this.screenIndex === 2 ) {
          gsapTimeline.to(camera.position, {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z,
            duration: 2
          }, 'start')
              .to(camera.position, {
                x: -1,
                y: 8,
                z: 17,
                duration: 3,
                ease: 'power2.inOut'
              }, '-=2')
        } else if ( this.screenIndex === 3 || this.screenIndex === 4 ) {
          gsapTimeline.fromTo(camera.position, {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
          }, {
            x: 12,
            y: 7,
            z: 48,
            ease: 'power2',
            duration: 2
          }, 'start')
          if ( this.screenIndex === 4 ) {
            gsapTimeline.to(camera.rotation, {
              z: -0.02,
              duration: 2
            }, '-=2')
          }
          gsapTimeline.to(camera.rotation, {
            y: Math.PI / 8,
            duration: 2
          }, '-=2')
              .to(camera.position, {
                z: 17,
                duration: 2,
                ease: 'power2.inOut'
              }, '-=1')
              .to(camera.position, {
                x: -1,
                y: 8,
                duration: 2,
                ease: 'power2.inOut'
              }, '-=2')
        } else if ( this.screenIndex === null ) {
          gsapTimeline.fromTo(camera.position, {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
          }, {
            x: 12,
            y: 8,
            z: 36,
            onUpdate: () => {
              camera.lookAt(-11, 7, 0)
            },
            ease: 'power2',
            duration: 2
          }, 'start')
              .to(camera.position, {
                x: -1,
                y: 8,
                z: 17,
                duration: 2,
                onUpdate: () => {
                  camera.lookAt(-11, 7, 0)
                },
                ease: 'power2.inOut'
              }, '-=1')
        }
        if ( this.screenIndex === 2 ) {
          gsapTimeline.to(this.$refs[ 'entrance-light' ], {
            scale: 100,
            opacity: 1
          }, '-=1.2')
        } else {
          gsapTimeline.to(this.$refs[ 'entrance-light' ], {
            scale: 100,
            opacity: 1
          }, '-=0.8')
        }

      } else {
        if ( this.screenIndex === 1 ) {
          gsapTimeline.fromTo(camera.position, {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
          }, {
            x: 16,
            y: camera.position.y,
            z: 48,
            onUpdate: () => {
              camera.lookAt(-10, 7, 0)
            },
            ease: 'power2',
            duration: 2
          }, 'start')
              .to(camera.position, {
                z: 15,
                duration: 2,
                onUpdate: () => {
                  camera.lookAt(-10, 7, 0)
                },
                ease: 'power2.inOut'
              }, '-=1')
              .to(camera.position, {
                x: -2,
                duration: 2,
                onUpdate: () => {
                  camera.lookAt(-10, 7, 0)
                },
                ease: 'power2.inOut'
              }, '-=2')

        } else if ( this.screenIndex === 2 ) {
          gsapTimeline.to(camera.position, {
            x: 10,
            y: 2,
            duration: 1
          }, 'start')
              .to(camera.position, {
                x: -1,
                y: 5,
                z: 17,
                duration: 2,
                ease: 'power2.inOut'
              }, '-=1')
        } else if ( this.screenIndex === 3 || this.screenIndex === 4 ) {
          gsapTimeline.fromTo(camera.position, {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
          }, {
            x: 12,
            y: 4,
            z: 44,
            ease: 'power2',
            duration: 2
          }, 'start')
              .to(camera.rotation, {
                y: Math.PI / 8,
                duration: 2
              }, '-=2')
              .to(camera.position, {
                z: 17,
                duration: 2,
                ease: 'power2.inOut'
              }, '-=1')
              .to(camera.position, {
                x: -1,
                y: 5,
                duration: 2,
                ease: 'power2.inOut'
              }, '-=2')
        } else if ( this.screenIndex === null ) {
          gsapTimeline.fromTo(camera.position, {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
          }, {
            x: 12,
            y: 2,
            z: 36,
            onUpdate: () => {
              camera.lookAt(-11, 7, 0)
            },
            ease: 'power2',
            duration: 2
          }, 'start')
              .to(camera.position, {
                x: -1,
                y: 5,
                z: 17,
                duration: 2,
                onUpdate: () => {
                  camera.lookAt(-11, 7, 0)
                },
                ease: 'power2.inOut'
              }, '-=1')
        }
        gsapTimeline.to(this.$refs[ 'entrance-light' ], {
          scale: 100,
          opacity: 0.9,
          duration: 2
        }, '-=1.2')

      }

      const timeOutInterval = window.innerWidth > 1024 ? this.screenIndex === 2 || this.screenIndex === null ? 2500 : 3200 : this.screenIndex === 2 ? 1800 : 2600
      setTimeout(() => {
        this.$emit('enterToIndex', true)
      }, timeOutInterval)
    },
    videoAutoPlay (index) {
      const fixedIndex = index.toString()
      switch ( fixedIndex ) {
      case '1' :
        videos.left.pause ? videos.left.play() : videos.left.pause()
        break
      case '2' :
        videos.center.pause ? videos.center.play() : videos.center.pause()
        break
      case '3' :
        videos.rightBottom.pause ? videos.rightBottom.play() : videos.rightBottom.pause()
        break
      case '4' :
        videos.rightTop.pause ? videos.rightTop.play() : videos.rightTop.pause()
        break
      }
    },
    allVideosPause () {
      videos.center.pause()
      videos.left.pause()
      videos.rightTop.pause()
      videos.rightBottom.pause()
    },
    toTvBridge (index) {
      const fixedIndex = index.toString()
      switch ( fixedIndex ) {
      case '1':
        if ( window.innerWidth > 1024 ) {
          this.toTv(1, {
            x: -10,
            y: 10,
            z: 45
          }, {
            x: -14,
            y: 0,
            z: 0
          })
        } else {
          this.toTv(1, {
            x: -2,
            y: 5,
            z: 44
          }, {
            x: -10,
            y: 7,
            z: 0
          })
        }
        break
      case '2':
        if ( window.innerWidth > 1024 ) {
          this.toTv(2, {
            x: 7,
            y: 7,
            z: 35
          }, {
            x: -7,
            y: 7,
            z: 0
          })
        } else {
          this.toTv(2, {
            x: 10,
            y: 2,
            z: 36
          }, {
            x: -11,
            y: 7,
            z: 0
          })
        }
        break
      case '3':
        if ( window.innerWidth > 1024 ) {
          this.toTv(3, {
            x: -5,
            y: 7,
            z: 26
          }, {
            x: 52,
            y: 7,
            z: 0
          })
        } else {
          this.toTv(3, {
            x: -5,
            y: 4,
            z: 30
          }, {
            x: 20,
            y: 5,
            z: 0
          })
        }
        break
      case '4':
        if ( window.innerWidth > 1024 ) {
          this.toTv(4, {
            x: -6,
            y: 16,
            z: 30
          }, {
            x: 52,
            y: 18,
            z: 0
          })
        } else {
          this.toTv(4, {
            x: -6,
            y: 10,
            z: 30
          }, {
            x: 25,
            y: 10,
            z: 0
          })
        }
      }
    },
    toTv (index, position, cameraPosition) {
      this.screenIndex = index
      this.isBack = true

      gsapTimeline.to(camera.position, {
        duration: 1,
        x: position.x,
        y: position.y,
        z: position.z,
        onUpdate: () => {
          camera.lookAt(cameraPosition.x, cameraPosition.y, cameraPosition.z)
        }
      })
    },
    //
    //End Remote Click Event
    //
    cameraReset () {
      this.isBack = false
      this.screenIndex = null
      if ( gsapTimeline ) {
        gsapTimeline.kill()
        gsapTimeline = null
      }
      this.allVideosPause()
      videos.center.play()
      gsapTimeline = this.$gsap.timeline()
      gsapTimeline.to(camera.position, {
        x: 2,
        y: 15,
        z: 45,
        duration: 1,
        onUpdate: () => {
          camera.lookAt(0, 0, 0)
        }
      }, 'start')
    },
    onWindowResize () {
      renderer.setPixelRatio(window.devicePixelRatio * 0.7)
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      composerScene.render()
      composerEffect.render()

      if ( window.innerWidth < 1024 ) {
        scene.scale.set(0.6, 0.6, 0.6)
        scene.position.set(0, 0, 7)
        secondLight.target.position.set(91, -5, 10)
        effectBloom = new BloomPass(0.3)
      } else {
        scene.scale.set(1, 1, 1)
        scene.position.set(0, 0, 0)
        secondLight.position.set(-5, 40, 35)
        effectBloom = new BloomPass(0.6)
      }
    },
    animate () {
      if ( stats ) {
        stats.update()
      }
      if ( container ) {

        composerScene.render()
        composerEffect.render()
        container.addEventListener('mousemove', this.onDocumentMouseMove, false)
        window.addEventListener('resize', this.onWindowResize)
        requestAnimationFrame(this.animate)
      }
    },
    getScene (objectScene, position, rotation, scale, videoPath, eventName) {
      const model = objectScene.clone()
      scene.add(model)
      model.position.set(position[ 0 ], position[ 1 ], position[ 2 ])
      model.rotation.set(rotation[ 0 ], rotation[ 1 ], rotation[ 2 ])
      model.scale.set(scale[ 0 ], scale[ 1 ], scale[ 2 ])
      model.traverse(child => {
        if ( child.name === 'Screen' ) {
          videos[ eventName ] = this.getVideoElement(videoPath, eventName, () => {
            if ( localVideoTexture && videos[ eventName ].readyState >= videos[ eventName ].HAVE_ENOUGH_DATA ) {
              localVideoTexture.needsUpdate = true
              this.objectOnLoad('video', eventName, null)
              videos.center.play()
            } else {
              const timer = setTimeout(() => {
                clearTimeout(timer)
                localVideoTexture.needsUpdate = true
                videos.center.play()
                this.objectOnLoad('video', eventName, null)
              }, 500)
            }

          })

          localVideoTexture = new THREE.VideoTexture(videos[ eventName ])
          localVideoTexture.minFilter = THREE.LinearFilter
          localVideoTexture.magFilter = THREE.LinearFilter
          // 잊지말자 The Else여... Video texture는 LinearSRGBColorSpace를 사용해야한다.
          localVideoTexture.colorSpace = THREE.LinearSRGBColorSpace
          // localVideoTexture.colorSpace = THREE.SRGBColorSpace
          localVideoTexture.crossOrigin = 'anonymous'
          child.material = new THREE.MeshBasicMaterial({
            map: localVideoTexture,
            side: THREE.FrontSide
          })
        }
      })
      this.progress(`${ eventName }`, 100, 100)
    },
    getVideoElement (path, eventName, loadeddata) {
      tempVideo = document.createElement('video')
      tempVideo.addEventListener('loadeddata', loadeddata, false)
      tempVideo.type = 'video/mp4'
      tempVideo.src = path
      tempVideo.preload = 'auto'
      tempVideo.muted = true
      tempVideo.crossOrigin = 'anonymous'
      tempVideo.style.display = 'none'
      tempVideo.loop = true
      tempVideo.autoplay = false
      tempVideo.setAttribute('webkit-playsinline', 'webkit-playsinline')
      tempVideo.setAttribute('playsinline', '')
      tempVideo.load()

      return tempVideo
    }
  },
  mounted () {
    this.init()
    this.animate()
  },
  beforeDestroy () {
    if ( container ) {
      if ( gsapTimeline ) {
        gsapTimeline.kill()
        gsapTimeline = null
      }

      window.removeEventListener('resize', this.onWindowResize)
      camera = null
      scene = null
      renderer = null
      container = null
      renderRatio = null
      testMode = null
      secondLight = null
      firstLight = null
      controls = null
      mouse = null
      floorMesh = null
      raycaster = null
      intersects = null
      canvas = null
      stats = null
      floor = null
      localVideoTexture = null
      video = null
      tempVideo = null
      videos = {}
      centerTvLight = null
      gsapTimeline = null
      //Mask Scene
      rtParameters = null
      clearMask = null
      fxaaPass = null
      pixelRatio = null
      shaderVignette = null
      effectBloom = null
      renderScene = null
      effectVignette = null
      composerScene = null
      composerEffect = null
      filmPass = null
      renderPass = null
    }
    window.cancelAnimationFrame(this.animate)
  }
}
</script>
<style
    scoped
    lang="scss"
>
.intro-container::v-deep {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;

  .intro-vt-logo {
    display: flex;
    text-align: center;
    align-items: center;
    color: #fff;
    font-size: 6.667vw;
    position: fixed !important;
    top: 70px;
    left: 70px;
    z-index: 2;
    @media screen and (max-width: 1024px) {
      font-size: 40px;
      top: 40px;
      left: 26px;
    }

    .vt-logo {
      width: 4.427vw;
      height: 4.427vw;
      margin-top: 1vw;
      margin-left: 1.823vw;
      @media screen and (max-width: 1024px) {
        width: 30px;
        height: 30px;
        margin-top: 0;
        margin-bottom: 4px;
        margin-left: 12px;
      }
    }
  }

  .video-title-box {
    color: #fff;
    position: fixed !important;
    top: 70px;
    left: 70px;
    z-index: 2;
    @media screen and (max-width: 1024px) {
      top: 80px;
      left: 32px;
    }

    .video-title {
      font-size: 6.667vw;
      letter-spacing: 3.2px;
    }
  }

  .entrance-light {
    position: fixed;
    top: 35%;
    left: 50%;
    width: 200px;
    height: 200px;
    opacity: 0;
    background-color: #fff;
    border-radius: 50%;
  }

  .intro-back-button {
    position: fixed;
    top: 128px;
    right: 70px;
    @media screen and (max-width: 1024px) {
      top: 20px;
      right: 20px;
    }

    &:hover {
      cursor: pointer;
    }


    .intro-back-button-image {
      width: 2.135vw;
      height: 2.083vw;
      @media screen and (max-width: 1024px) {
        width: 32px;
        height: 29px;

      }
    }

    .intro-back-button-text {
      color: #fff;
      font-size: 1.042vw;
      letter-spacing: 2.9px;
      @media screen and (max-width: 1024px) {
        font-size: 14px;
      }
    }
  }


  //.init-button {
  //  position: relative;
  //  width: 100px;
  //  height: 50px;
  //  margin-left: auto;
  //  margin-right: auto;
  //  margin-top: 8vh;
  //  overflow: hidden;
  //  border: 1px solid #000;
  //  font-family: 'Lato', sans-serif;
  //  font-weight: 300;
  //  transition: 0.5s;
  //  letter-spacing: 1px;
  //  border-radius: 8px;
  //
  //   {
  //    width: 101%;
  //    height: 100%;
  //    font-weight: 300;
  //    font-size: 11px;
  //    letter-spacing: 1px;
  //    font-weight: bold;
  //
  //
  //    @include button(#000, "https://raw.githubusercontent.com/pizza3/asset/master/natureSmaller.png",
  //        7100%,
  //        100%,
  //        none,
  //        #fff);
  //    cursor: pointer;
  //    -webkit-animation: ani2 0.7s steps(70) forwards;
  //    animation: ani2 0.7s steps(70) forwards;
  //
  //    &:hover {
  //      -webkit-animation: ani 0.7s steps(70) forwards;
  //      animation: ani 0.7s steps(70) forwards;
  //    }
  //  }
  //}

}

</style>