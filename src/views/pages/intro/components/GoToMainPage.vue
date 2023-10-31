<template>
  <div ref="go-to-main-container" class="go-to-main-page-container">
    <div ref="fade-in-animation" class="fade-in-animation"></div>
  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EventBus } from '../../../../EventBus'

let container,
    scene,
    renderer,
    camera,
    controls,
    clock,
    thumbnailImages = [],
    thumbnail = [],
    planes = [],
    loader,
    gsapTimeline
export default{
  name: 'GoToMainPage',
  methods:{
    init() {
      //미리 이미지 로드
      thumbnail = []
      for(let i = 0; i < 8 ; i++){
        thumbnail[i] = require(`@/assets/images/thumbnail/${i+1}.png`)
      }

      container = this.$refs['go-to-main-container']

      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)

      if (window.innerWidth < 1024) scene.scale.set(0.5, 0.5, 0.5)

      renderer = new THREE.WebGLRenderer(
          {
            antialias: false,
            alpha: false
          }
      )
      camera = new THREE.PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          0.1,
          100000
      )
      camera.position.set(0,0,100)
      camera.lookAt(0,0,0)

      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableZoom = false
      controls.enabled = false

      scene.fog = new THREE.Fog(0xffffff,110,180)
      renderer.setSize(window.innerWidth, window.innerHeight)


      //=====================Left Right Video Panel=====================


      thumbnailImages = []

      planes = []

      const geometry = new THREE.PlaneGeometry(32,22,32)

      loader = new THREE.TextureLoader()
      for(let i = 0 ; i< 8; i++){

        thumbnailImages[i] = new THREE.MeshBasicMaterial({
          color: 0xaaaaaa
        })

        planes[i] = new THREE.Mesh(geometry, thumbnailImages[i])
        if(i < 4){
          planes[i].rotation.set(0,1.6,0)
        }else {
          planes[i].rotation.set(0,-1.6,0)
        }
        scene.add(planes[i])
      }
      const material = new THREE.MeshBasicMaterial({
        color : 0xaaaaaa
      })
      for(let i = 8 ; i< 16; i++){

        thumbnailImages[i] = new THREE.MeshBasicMaterial({
          map: loader.load(thumbnail[i])
        })
        planes[i] = new THREE.Mesh(geometry, thumbnailImages[i])
        if(i < 11){
          planes[i].rotation.set(0,-1.6,0)
        }else {
          planes[i].rotation.set(0,1.6,0)
        }
        scene.add(planes[i])
      }
      for(let i = 16; i< 500; i++){

        planes[i] = new THREE.Mesh(geometry, material)
        if(i < 234){
          planes[i].rotation.set(0,1.6,0)
          planes[i].position.set(-25,-3,-220 -(i-15)*40)
        }else {
          planes[i].rotation.set(0,-1.6,0)
          planes[i].position.set(25,-3,-220 -(i-234)*40)
        }
        scene.add(planes[i])
      }

      //Left Pannel
      planes[0].position.set(-25,-3,50)
      planes[1].position.set(-25,-3,15)
      planes[2].position.set(-25,-3,-22)
      planes[3].position.set(-25,-3,-60)
      planes[12].position.set(-25,-3,-100)
      planes[13].position.set(-25,-3,-140)
      planes[14].position.set(-25,-3,-180)
      planes[15].position.set(-25,-3,-220)
      //Right Panel
      planes[4].position.set(25,-3,50)
      planes[5].position.set(25,-3,15)
      planes[6].position.set(25,-3,-22)
      planes[7].position.set(25,-3,-60)
      planes[8].position.set(25,-3,-100)
      planes[9].position.set(25,-3,-140)
      planes[10].position.set(25,-3,-180)
      planes[11].position.set(25,-3,-220)

      if(container){
        container.appendChild(renderer.domElement)
        clock = new THREE.Clock()
        this.animate()
      }

    },
    onWindowResize () {
      camera.aspect = window.innerWidth / window.innerHeight
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    },
    animate () {
      if(container){
        renderer.render(scene, camera)
        requestAnimationFrame(this.animate)
      }
    },
    cameraGsapMovingToCenter() {
      gsapTimeline = this.$gsap.timeline()
        if (camera.position.z > -2000) {
          gsapTimeline.fromTo(this.$refs['fade-in-animation'], {
            opacity: 1
          },{
            opacity : 0,
            duration : 3,
            ease : 'power1.inOut'
          }, 'start')
              .to(camera.position, {
                z       : -2500,
                duration: 7
              }, '-=4')
              .to(scene.fog, {
                near    : -3200,
                duration: 7
              }, '-=4')
        }
    }
  },
  beforeCreate () {
    EventBus.$emit('loaded' )
  },
  mounted(){
    this.init()
    this.cameraGsapMovingToCenter()
    if(container){
      if(window.innerWidth > 1024){
        setTimeout(()=>{
          this.$router.push('/main')
        }, 3200)
      }  else {
        setTimeout(()=>{
          this.$router.push('/main')
        }, 2800)
      }
    }


    window.addEventListener('resize', this.onWindowResize)
  },
  beforeDestroy () {
    if(gsapTimeline){
      gsapTimeline.kill()
    }
    if(container){
      container = null
      scene = null
      renderer = null
      camera = null
      controls = null
      clock = null
      thumbnailImages = []
      thumbnail = []
      planes = []
      loader = null
      gsapTimeline = null
      window.removeEventListener('resize', this.onWindowResize)
    }
    window.cancelAnimationFrame(this.animate)
  }
}
</script>
<style scoped lang="scss">
.go-to-main-page-container::v-deep{

  .fade-in-animation{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:#fff;
    z-index : 2;
  }
}
</style>