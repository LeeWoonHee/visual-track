<template>
  <div id="container" ref="container"></div>
</template>

<script>
import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {BloomPass} from 'three/examples/jsm/postprocessing/BloomPass.js';
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass.js';
import {MaskPass, ClearMaskPass} from 'three/examples/jsm/postprocessing/MaskPass.js';
import {TexturePass} from 'three/examples/jsm/postprocessing/TexturePass.js';

import {SepiaShader} from 'three/examples/jsm/shaders/SepiaShader.js';
import {VignetteShader} from 'three/examples/jsm/shaders/VignetteShader.js';
import {GammaCorrectionShader} from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {EventBus} from "@/EventBus";

let container, stats;

let composerScene, composer4;

let cameraOrtho, cameraPerspective, sceneModel, sceneBG, renderer, mesh, directionalLight;

const width = window.innerWidth || 2;
const height = window.innerHeight || 2;

let halfWidth = width / 2;
let halfHeight = height / 2;

let quadBG, quadMask, renderScene;

const delta = 0.01;

function init(setContainer) {

  // container = document.getElementById('container');
  container = setContainer;
  //

  // cameraOrtho = new THREE.OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, -10000, 10000);
  cameraOrtho = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
  cameraOrtho.position.z = 100;

  cameraPerspective = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
  cameraPerspective.position.z = 900;

  //

  sceneModel = new THREE.Scene();
  sceneBG = new THREE.Scene();

  //

  directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(0, -0.1, 1).normalize();
  sceneModel.add(directionalLight);

  const loader = new GLTFLoader();
  loader.load('/glb/v2/LeePerrySmith.glb', function (gltf) {

    createMesh(gltf.scene.children[0].geometry, sceneModel, 100);

  });

  //

  const diffuseMap = new THREE.TextureLoader().load('/glb/v2/pz.jpg');
  diffuseMap.colorSpace = THREE.SRGBColorSpace;

  const materialColor = new THREE.MeshBasicMaterial({
    map: diffuseMap, // 사진
    depthTest: false
  });

  quadBG = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
  quadBG.position.z = -500;
  quadBG.scale.set(width, height, 1); // 위치 잡기
  sceneBG.add(quadBG);

  //

  const sceneMask = new THREE.Scene();

  quadMask = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({color: 0xffaa00}));
  quadMask.position.z = -300;
  quadMask.scale.set(width, height, 1);
  sceneMask.add(quadMask);

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.autoClear = false;

  //

  container.appendChild(renderer.domElement);

  //

  stats = new Stats();
  container.appendChild(stats.dom);

  //

  const shaderSepia = SepiaShader;
  const shaderVignette = VignetteShader;

  const effectSepia = new ShaderPass(shaderSepia);
  const effectVignette = new ShaderPass(shaderVignette);
  const gammaCorrection = new ShaderPass(GammaCorrectionShader);

  // effectSepia.uniforms['amount'].value = 0.9;

  // effectVignette.uniforms['offset'].value = 0.95;
  // effectVignette.uniforms['darkness'].value = 1.6;

  const effectBloom = new BloomPass(0.5);
  const effectFilm = new FilmPass(0.35, 0.025, 648, false);

  const clearMask = new ClearMaskPass();
  const renderMaskInverse = new MaskPass(sceneModel, cameraPerspective);

  renderMaskInverse.inverse = true;

  //

  const rtParameters = {
    stencilBuffer: true
  };

  const rtWidth = width / 2;
  const rtHeight = height / 2;

  //

  const renderBackground = new RenderPass(sceneBG, cameraOrtho);
  const renderModel = new RenderPass(sceneModel, cameraPerspective);

  renderModel.clear = false;

  composerScene = new EffectComposer(renderer, new THREE.WebGLRenderTarget(rtWidth * 2, rtHeight * 2, rtParameters));

  composerScene.addPass(renderBackground);
  composerScene.addPass(renderModel);
  composerScene.addPass(renderMaskInverse);
  composerScene.addPass(clearMask);

  //

  renderScene = new TexturePass(composerScene.renderTarget2.texture);

  composer4 = new EffectComposer(renderer, new THREE.WebGLRenderTarget(rtWidth * 2, rtHeight * 2, rtParameters));

  composer4.addPass(renderScene);
  composer4.addPass(gammaCorrection);
  composer4.addPass(effectBloom);
  composer4.addPass(effectFilm);
  // composer4.addPass(effectBleach);
  composer4.addPass(effectVignette);

  renderScene.uniforms['tDiffuse'].value = composerScene.renderTarget2.texture;

  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  halfWidth = window.innerWidth / 2;
  halfHeight = window.innerHeight / 2;

  cameraPerspective.aspect = window.innerWidth / window.innerHeight;
  cameraPerspective.updateProjectionMatrix();

  cameraOrtho.left = -halfWidth;
  cameraOrtho.right = halfWidth;
  cameraOrtho.top = halfHeight;
  cameraOrtho.bottom = -halfHeight;

  cameraOrtho.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  composerScene.setSize(width, height);

  composer4.setSize(width, height);

  renderScene.uniforms['tDiffuse'].value = composerScene.renderTarget2.texture;

  quadBG.scale.set(window.innerWidth, window.innerHeight, 1);
  quadMask.scale.set(window.innerWidth, window.innerHeight, 1);

}

function createMesh(geometry, scene, scale) {

  const diffuseMap = new THREE.TextureLoader().load('/glb/v2/LeePerrySmith/Map-COL.jpg');
  diffuseMap.colorSpace = THREE.SRGBColorSpace;

  const mat2 = new THREE.MeshPhongMaterial({

    color: 0xcbcbcb,
    specular: 0x080808,
    shininess: 20,
    map: diffuseMap,
    normalMap: new THREE.TextureLoader().load('/glb/v2/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg'),
    normalScale: new THREE.Vector2(0.75, 0.75)

  });

  mesh = new THREE.Mesh(geometry, mat2);
  mesh.position.set(0, -50, 0);
  mesh.scale.set(scale, scale, scale);

  scene.add(mesh);

}

//

function animate() {

  requestAnimationFrame(animate);

  stats.begin();
  render();
  stats.end();

}

function render() {

  const time = Date.now() * 0.0004;

  if (mesh) mesh.rotation.y = -time;

  renderer.setViewport(0, 0, width, height);
  composerScene.render(delta);

  // renderer.setViewport(halfWidth, halfHeight, halfWidth, halfHeight);
  composer4.render(delta);

}

export default {
  name: 'PassTest',
  mounted() {
    EventBus.$emit('loaded')
    this.$nextTick(() => {
      init(this.$refs.container);
      animate();
    })
  }
}
</script>


<style scoped lang="scss">

</style>