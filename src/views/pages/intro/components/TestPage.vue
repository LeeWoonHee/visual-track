<template>
  <div
      ref="container"
      class="intro-container"
  >
    <div
        v-if="!isBack"
        class="intro-vt-logo">
      <div>
        VISUAL TRACK
      </div>
      <vt-logo class="vt-logo"/>
    </div>
    <div
        v-else
        class="video-title-box"
    >
      <div class="video-title">{{ videoTitle[screenIndex - 1].title }}</div>
      <div>PERFORMANCE VIDEO</div>
    </div>
    <div ref="entrance-light" class="entrance-light"></div>
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
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import MadeByElseLogo from '@/components/MadeByElseLogo.vue'
import VtLogo from '@/components/svg/VtLogo.vue'
import { EventBus } from '@/EventBus'
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass'
import { ClearMaskPass, MaskPass } from 'three/examples/jsm/postprocessing/MaskPass'
import { ClearPass } from 'postprocessing'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'



let camera,
    scene,
    renderer,
    container,
    renderRatio = 1,
    testMode = false,
    secondLight,
    firstLight,
    controls,
    mouse,
    floorMesh,
    raycaster,
    intersects,
    SELECTED,
    gapX,
    gapY,
    remoteItem = [],
    remote,
    remoteY,
    canvas,
    stats,
    floor,
    localVideoTexture,
    video,
    tempVideo,
    videos = {},
    centerTvLight,
    mouseX,
    remoteRotationY,
    windowHalf,
    target,
    rotateX,
    gsapTimeline,
    rendererRemote,
    sceneRemote,
    cameraRemote,
    //Mask Scene
    renderScene,
    outlinePass,
    shaderSepia,
    shaderVignette,
    effectSepia,
    effectVignette,
    effectBloom,
    composerScene,
    composerRemote,
    composerEffect,
    filmPass,
    renderPass,
    renderRemotePass

export default {
  name: 'intro',
  components: {
    MadeByElseLogo,
    VtLogo
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
      remote: 0,
      centerTv: 0,
      videos: {
        left: 0,
        rightTop: 0,
        rightBottom: 0,
        center: 0
      }
    },
    subscribes: []
  }),
  methods: {
    progress(key, value, total) {
      if (key.indexOf('videos') && key.indexOf('.') > -1) {
        key = key.split('.')[1]
      }
      this.load[key] = value / total * 100
      EventBus.$emit('progress', (
          this.load.tvScene +
          this.load.remote +
          this.load.centerTv +
          ((this.load.videos.left +
              this.load.videos.rightTop +
              this.load.videos.rightBottom +
              this.load.videos.center) / 4)
      ) / 4)
    },
    objectOnLoad(type, object, onLoad) {
      if (type === 'video') {
        this.load.videos[object] = 100
      } else {
        this.load[type] = 100
        this.subscribes.push({
          object,
          onLoad
        })
      }
      if (
          this.load.remote === 100 &&
          this.load.tvScene === 100 &&
          this.load.centerTv === 100
      ) {
        while (this.subscribes.length > 0) {
          const subscribe = this.subscribes.shift()
          if (subscribe.onLoad) subscribe.onLoad(subscribe.object)
        }
        if (
            this.load.videos.left === 100 &&
            this.load.videos.rightTop === 100 &&
            this.load.videos.rightBottom === 100 &&
            this.load.videos.center === 100
        ) {
          //========================================
          //===========Init Shader Material=========
          //========================================
          EventBus.$emit('loaded')
          if (container) {
            renderer.gammaFactor = 2.2
            renderer.gammaOutput = true
            container.appendChild(renderer.domElement)

            this.animate()

          }
        }
      }
    },
    init(renderRatio, testMode) {
      container = this.$refs.container
      this.loadRender(renderRatio, testMode)
      this.loadFloor()
      this.loadLight()
      this.loadCamera()
      this.loadControls()
      this.loadMouse()
      this.loadModels(testMode)
      this.loadMaskScene()
    },
    loadRender(renderRatio, testMode) {
      //Set Origin Scene
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000000)

      //Origin Scene Mobile Version
      if (window.innerWidth < 1024) {
        scene.scale.set(0.6, 0.6, 0.6)
        scene.position.set(0, 0, 7)
      }
      //

      if (testMode) scene.add(new THREE.AxesHelper(5))
      renderer = new THREE.WebGLRenderer(
          {
            antialias: false,
            alpha: true
          }
      )

      renderer.setSize(window.innerWidth / renderRatio, window.innerHeight / renderRatio)
      renderer.gammaOutput = false
      renderer.shadowMap.enabled = true
      renderer.autoClear = false
      renderer.outputEncoding = THREE.sRGBEncoding

      // Set Remote Scene
      sceneRemote = new THREE.Scene()

      rendererRemote = new THREE.WebGLRenderer({antialias: false, alpha: true})
      rendererRemote.setSize(window.innerWidth / renderRatio, window.innerHeight / renderRatio)
      rendererRemote.gammaOutput = false
      rendererRemote.shadowMap.enabled = true
      rendererRemote.autoClear = false

      //Remote Scene Mobile Version
      if (window.innerWidth > 1024) sceneRemote.position.z = 12
      else sceneRemote.position.z = 18
      //

      if (testMode) {
        stats = new Stats()
        container.appendChild(stats.dom)
      }

    },
    loadMaskScene() {
      const rtParameters = {
        stencilBuffer: false
      }
      const clearMask = new ClearMaskPass()
      const renderMaskInverse = new MaskPass(scene,camera)

      renderMaskInverse.inverse = true

      //Composer Scene
      composerScene = new EffectComposer(renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, rtParameters))
      renderPass = new RenderPass(scene, camera)

      const fxaaPass = new ShaderPass(FXAAShader)
      const pixelRatio = renderer.getPixelRatio()

      fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( container.offsetWidth * pixelRatio)
      fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( container.offsetHeight * pixelRatio)
      composerScene.addPass(renderPass)
      composerScene.addPass(clearMask)

      //Composer Effect


      renderScene = new TexturePass(composerScene.renderTarget2.texture)
      composerEffect = new EffectComposer(renderer, new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, rtParameters))
      filmPass = new FilmPass(0.35, 0.025, 1000, false)
      effectBloom = new BloomPass(0.4)
      shaderVignette = VignetteShader
      effectVignette = new ShaderPass(shaderVignette)
      effectVignette.uniforms['offset'].value = 0.95
      effectVignette.uniforms['darkness'].value = 1.6
      effectVignette.renderToScreen = true

      composerEffect.addPass(renderScene)
      composerEffect.addPass(effectBloom)
      composerEffect.addPass(filmPass)
      composerEffect.addPass(effectVignette)
      composerEffect.addPass(fxaaPass)

      renderScene.uniforms['tDiffuse'].value = composerScene.renderTarget1.texture

    },
    loadFloor() {
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.2,
        metalness: 0.2
      })

      const floorGeometry = new THREE.PlaneGeometry(100, 100)
      floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)

      //Floor Mobile Version
      if (window.innerWidth > 1024) floorMesh.position.set(0, 2.55, 0)
      else floorMesh.position.set(0, 1, 0)
      //

      floorMesh.rotation.x = -Math.PI / 2
      scene.add(floorMesh)
    },
    loadLight() {
      //Left TV Light
      firstLight = new THREE.DirectionalLight(0xfffffff, 1)
      firstLight.position.set(0, 15, 40)
      firstLight.target.position.set(-50, -10, 0)
      scene.add(firstLight)

      //Center TV && Right TV Light
      secondLight = new THREE.SpotLight(0xffffff, 7, 59)
      secondLight.position.set(-5, 40, 35)

      //Ceenter TV && Right TV Ligth Mobile Version
      if (window.innerWidth > 1024) secondLight.target.position.set(91, -5, 10)
      else secondLight.target.position.set(60, -5, 10)
      //
      scene.add(secondLight)

      const sceneRemoteLight = new THREE.SpotLight(0xffffff, 7, 59)
      sceneRemoteLight.position.set(0, 15, 30)
      sceneRemoteLight.target.position.set(0, 0, 0)
      sceneRemote.add(sceneRemoteLight)

    },
    loadCamera() {
      camera = new THREE.PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          0.1,
          10000
      )
      camera.position.set(0, 14, 45)

      cameraRemote = new THREE.PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          0.1,
          10000
      )
      cameraRemote.position.set(0, 14, 45)

    },
    loadControls() {
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableZoom = false
      controls.enabled = false
      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    loadMouse() {
      mouse = new THREE.Vector2()
      target = new THREE.Vector2()
      windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2)
      raycaster = new THREE.Raycaster()
      intersects = raycaster.intersectObjects(sceneRemote.children)
    },
    loadModels(testMode) {
      const manager = new THREE.LoadingManager()
      const gltfLoader = new GLTFLoader(manager)

      //Load TV Scene
      gltfLoader.load('/glb/v2/tvSet2.glb', (object) => this.objectOnLoad('tvScene', object, (object) => {
        object.scene.position.set(-5, 0, 30)
        object.scene.rotation.set(0, -1.1, 0)
        object.scene.scale.set(3, 3, 3)
        scene.add(object.scene)
      }), ({
        loaded,
        total
      }) => this.progress('tvScene', loaded, total), (error) => {
        if (testMode) console.log(error)
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
      }) => this.progress('centerTv', loaded, total), (error) => {
        if (testMode) console.log(error)
      })

      //Load Remote Controller

      gltfLoader.load('/glb/v2/remoteController.glb', (object) => this.objectOnLoad('remote', object, (object) => {
        object.scene.position.set(0, 10.5, 22)
        object.scene.rotation.set(1, 1.6, 0)
        object.scene.scale.set(0.8, 0.8, 0.8)
        if (window.innerWidth < 1024) {
          object.scene.position.set(0, 12.2, 22)
          object.scene.scale.set(0.3, 0.3, 0.3)
        }
        object.scene.name = 'remote'
        remote = object.scene
        remoteY = object.scene.rotation.y
        sceneRemote.add(object.scene)
        // this.progress('remote', 100, 100)
      }), ({
        loaded,
        total
      }) => this.progress('remote', loaded, total), (error) => {
        if (testMode) console.log(error)
      })
    },
    toTvBridge(index) {
      const fixedIndex = index.toString()
      switch (fixedIndex) {
      case '1':
        if (window.innerWidth > 1024) this.toTv(1, {x: -10, y: 10, z: 45}, {x: -14, y: 0, z: 0})
        else this.toTv(1, {x: -2, y: 5, z: 44}, {x: -10, y: 7, z: 0})
        break
      case '2':
        if (window.innerWidth > 1024) this.toTv(2, {x: 5, y: 7, z: 35}, {x: -7, y: 7, z: 0})
        else this.toTv(2, {x: 10, y: 2, z: 36}, {x: -11, y: 7, z: 0})
        break
      case '3':
        if (window.innerWidth > 1024) this.toTv(3, {x: -5, y: 7, z: 26}, {x: 52, y: 7, z: 0})
        else this.toTv(3, {x: -5, y: 4, z: 30}, {x: 20, y: 5, z: 0})
        break
      case '4':
        if (window.innerWidth > 1024) this.toTv(4, {x: -6, y: 16, z: 30}, {x: 52, y: 18, z: 0})
        else this.toTv(4, {x: -6, y: 10, z: 30}, {x: 25, y: 10, z: 0})
      }


    },
    toTv(index, position, cameraPosition) {
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
    videoAutoPlay(index) {
      const fixedIndex = index.toString()

      switch (fixedIndex) {

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
    allVideosPause() {
      videos.center.pause()
      videos.left.pause()
      videos.rightTop.pause()
      videos.rightBottom.pause()
    },
    cameraReset() {
      this.isBack = false
      this.screenIndex = null
      this.allVideosPause()
      if (gsapTimeline) {
        gsapTimeline.kill()
        gsapTimeline = null
      }
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
    onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      renderer.setSize(window.innerWidth, window.innerHeight)
      rendererRemote.setSize(window.innerWidth, window.innerHeight)
      camera.updateProjectionMatrix()
    },
    animate() {
      if (stats) {
        stats.update()
      }
      if (container && remote) {

        requestAnimationFrame(this.animate)
        composerScene.render()
        composerEffect.render()
        // composerRemote.render()
        window.addEventListener('resize', this.onWindowResize)

        //Immediate Remote Rotation
        if(window.innerWidth > 1024 && intersects.length === 0) {
          target.x = (1 - rotateX) * 0.01
          const remoteRotation = remote.rotation.y + (target.x / 100)
          if (0.6 < remoteRotation && remoteRotation < 2.4) {
            remote.rotation.y += (target.x / 60)
          }
        }

      }
    },
    getScene(objectScene, position, rotation, scale, videoPath, eventName) {
      const model = objectScene.clone()
      scene.add(model)
      model.position.set(position[0], position[1], position[2])
      model.rotation.set(rotation[0], rotation[1], rotation[2])
      model.scale.set(scale[0], scale[1], scale[2])
      model.traverse(child => {
        if (child.name === 'Screen') {
          video = this.getVideoElement(videoPath, eventName, () => {
            if (localVideoTexture && video.readyState === video.HAVE_ENOUGH_DATA) {
              localVideoTexture.needsUpdate = true
              this.objectOnLoad('video', eventName, null)
            } else {
              const timer = setTimeout(() => {
                clearTimeout(timer)
                localVideoTexture.needsUpdate = true
                this.objectOnLoad('video', eventName, null)
              }, 500)
            }
          })
          localVideoTexture = new THREE.VideoTexture(video)
          localVideoTexture.minFilter = THREE.LinearFilter
          localVideoTexture.magFilter = THREE.LinearFilter
          // 잊지말자 The Else여... Video texture는 LinearSRGBColorSpace를 사용해야한다.
          localVideoTexture.colorSpace = THREE.LinearSRGBColorSpace
          localVideoTexture.crossOrigin = 'anonymous'
          child.material = new THREE.MeshBasicMaterial({
            map: localVideoTexture,
            side: THREE.FrontSide
          })
          videos[eventName] = video
        }
      })
      // this.progress(`${eventName}Tv`, 100, 100)
    },
    getVideoElement(path, eventName, loadeddata) {
      tempVideo = document.createElement('video')
      tempVideo.addEventListener('loadeddata', loadeddata, false)
      tempVideo.type = 'video/mp4'
      tempVideo.src = path
      tempVideo.preload = 'auto'
      tempVideo.muted = true
      tempVideo.crossOrigin = 'anonymous'
      tempVideo.style.display = 'none'
      tempVideo.loop = true
      tempVideo.autoplay = true
      tempVideo.setAttribute('webkit-playsinline', 'webkit-playsinline')
      tempVideo.setAttribute('playsinline', '')
      tempVideo.load()
      return tempVideo

    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    if (container) {
      if (gsapTimeline) {
        gsapTimeline.kill()
        gsapTimeline = null
      }
      this.load = null
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
      SELECTED = null
      gapX = null
      gapY = null
      remoteItem = null
      remote = null
      remoteY = null
      canvas = null
      stats = null
      floor = null
      localVideoTexture = null
      video = null
      tempVideo = null
      videos = {}
      centerTvLight = null
      mouseX = null
      remoteRotationY = null
      windowHalf = null
      target = null
      rotateX = null
      gsapTimeline = null
      rendererRemote = null
      sceneRemote = null
      cameraRemote = null
      //Mask Scene
      shaderSepia = null
      shaderVignette = null
      effectSepia = null
      effectVignette = null
      composerScene = null
      composerRemote = null
      filmPass = null
      renderPass = null
      renderRemotePass = null
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

    .vt-logo {
      width: 5.677vw;
      height: 5.677vw;
      margin-top: 0.365vw;
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


}

</style>