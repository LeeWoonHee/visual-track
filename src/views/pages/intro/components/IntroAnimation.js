import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'

let camera,
    cameraRemote,
    scene,
    sceneRemote,
    renderer,
    rendererRemote,
    composer,
    composerRemote,
    container,
    controls,
    mouse,
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
    screenIndex = null,
    centerTvLight,
    mouseX,
    remoteRotationY,
    windowHalf,
    target,
    rotateX,
    introScrollTrigger,
    isBack = false

export default {
    load(containerElement, {
        renderRatio = 1,
        testMode = false
    }) {
        container = containerElement
        this.loadRender(renderRatio, testMode)
        this.loadFloor()
        this.loadLight()
        this.loadCamera()
        this.loadControls()
        this.loadMouse()
        this.loadModels(testMode)
    },
    // for intialize
    loadRender(renderRatio, testMode) {
        // set origin scene
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0x000000)
        if (testMode) scene.add(new THREE.AxesHelper(5))
        renderer = new THREE.WebGLRenderer(
            {
                antialias: true,
                alpha: true
            }
        )
        renderer.setSize(window.innerWidth / renderRatio, window.innerHeight / renderRatio)
        renderer.gammaOutput = false
        renderer.shadowMap.enabled = true
        renderer.outputEncoding = THREE.LinearEncoding

        // set remote scene
        sceneRemote = new THREE.Scene()
        rendererRemote = new THREE.WebGLRenderer({antialias: false, alpha: false})
        rendererRemote.setSize(window.innerWidth / renderRatio, window.innerHeight / renderRatio)
        rendererRemote.gammaOutput = false
        rendererRemote.shadowMap.enabled = false

        if (testMode) {
            // stats
            stats = new Stats()
            container.appendChild(stats.dom)
        }
    },
    loadFloor() {
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x444444,
            roughness: 0.2,
            metalness: 0.2
        })
        const floorGeometry = new THREE.PlaneGeometry(100, 100)
        const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
        floorMesh.position.set(0, 2.55, 0)
        floorMesh.rotation.x = -Math.PI / 2
        scene.add(floorMesh)
    },
    loadLight() {
        //Left TV Light
        const firstLight = new THREE.DirectionalLight(0xfffffff, 1)
        firstLight.position.set(0, 15, 40)
        firstLight.target.position.set(-50, -10, 0)
        scene.add(firstLight)

        //Center TV && Right TV Light
        const secondLight = new THREE.SpotLight(0xffffff, 7, 59)
        secondLight.position.set(-5, 40, 35)
        // secondLight.target.position.set(44.5, 0, 0)
        secondLight.target.position.set(91, -5, 10)
        scene.add(secondLight)

        centerTvLight = new THREE.PointLight(0xffffff, 1000, 2)
        centerTvLight.position.set(0, 8, 23)
        scene.add(centerTvLight)
    },
    loadCamera() {
        camera = new THREE.PerspectiveCamera(
            40,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        )
        camera.position.set(0, 14, 45)
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
        windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
        raycaster = new THREE.Raycaster()
        intersects = raycaster.intersectObjects(scene.children)
    },
    loadModels(testMode) {
        //========================================
        //=============Loader Setting=============
        //========================================
        const manager = new THREE.LoadingManager()
        const gltfLoader = new GLTFLoader(manager)
        gltfLoader.load('/glb/v2/tvSet2.glb', (object) => {
            object.scene.translateX(-5)
            object.scene.translateY(0)
            object.scene.translateZ(30)
            object.scene.rotation.set(0, -1.1, 0)
            object.scene.scale.set(3, 3, 3)
            object.scene.recieveShadow = true
            scene.add(object.scene)
        }, ({
                loaded,
                total
            }) => this.progress('tvScene', loaded, total), (error) => {
            if (testMode) console.log(error)
        })

        gltfLoader.load('/glb/v2/tvCenterTestFront.glb', (object) => {
            // Center TV Screen
            this.getScene(object.scene, [-6.4, 4, 6.5], [0, 0.465, 0], [2.8, 3, 2.5], '/videos/03_intro.mp4', 'center')
            // Left TV Screen
            this.getScene(object.scene, [-13, 3, 14.2], [0, 0.15, 0], [2.6, 3.2, 3], '/videos/04_intro.mp4', 'left')
            // Right Bottom TV
            this.getScene(object.scene, [23.4, 2.3, 9.9], [0, -1.02, 0], [3.6, 3.9, 3], '/videos/08_intro.mp4', 'rightBottom')
            // Right Top TV
            this.getScene(object.scene, [23.3, 10.7, 9.9], [0, -1.03, 0], [3.6, 3.9, 3], '/videos/02_intro.mp4', 'rightTop')
        }, ({
                loaded,
                total
            }) => this.progress('centerTv', loaded, total), (error) => {
            if (testMode) console.log(error)
        })

        //================================================
        //===================TV Remote====================
        //================================================


        gltfLoader.load('/glb/v2/remoteController.glb', (object) => this.objectOnLoad('remote', object, (object) => {
            // object.scene.position.set(0, 5, 32.5)
            // object.scene.rotation.set(0.7, 1.6, 0)
            object.scene.name = 'remote'
            // remote = object.scene
            // remoteY = object.scene.rotation.y
            sceneRemote.add(object)
            //  =======Remote Visible ========
            // remote.visible = false
            // remote.visible = true
        }), ({
                 loaded,
                 total
             }) => this.progress('remote', loaded, total), (error) => {
            if (testMode) console.log(error)
        })
    },
    // mouse event
    onDocumentMouseMove(event) {
        event.preventDefault()
        gapX = event.clientX - event.offsetX
        gapY = event.clientY - event.offsetY

        if (gapY < 10 && gapX < 10) return

        rotateX = (event.clientX - windowHalf.x)
        mouse.x = ((event.clientX - gapX) / (container.clientWidth)) * 2 - 1
        mouse.y = -((event.clientY - gapY) / (container.clientHeight)) * 2 + 1
        raycaster.setFromCamera(mouse, cameraRemote)
        intersects = raycaster.intersectObjects(sceneRemote.children)

        if (intersects.length > 0
            && (intersects[0].object.name === 'number_1'
                || intersects[0].object.name === 'number_2'
                || intersects[0].object.name === 'number_3'
                || intersects[0].object.name === 'number_4'
                || intersects[0].object.name === 'pre'
                || intersects[0].object.name === 'next'
                || intersects[0].object.name === 'stop'
                || intersects[0].object.name === 'enter')) {
            rotateX = 0
            container.style.cursor = 'pointer'

        } else {
            container.style.cursor = 'auto'
        }
    },
    onDocumentMouseDown(event) {
        event.preventDefault()
        if (intersects.length === 0) return
        if (intersects[0].object.parent.name === 'remote') {
            if (introScrollTrigger) {
                introScrollTrigger.kill()
                introScrollTrigger = null
            }
            introScrollTrigger = gsap.timeline()
            introScrollTrigger.autoRemoveChildren = true
            for (let i = 0; i < videos.length; i++) {
                videos[i].paused()
            }
        }
        if (intersects[0].object.name.indexOf('number') > -1) this.clickRemoteNumber()
        else if (intersects[0].object.name === 'pre') this.clickRemotePrev()
        else if (intersects[0].object.name === 'next') this.clickRemoteNext()
        else if (intersects[0].object.name === 'stop') this.clickRemoteStop()
        else if (intersects[0].object.name === 'enter') this.clickRemoteEnter()
    },
    clickRemoteNumber() {
        const index = intersects[0].object.name.split('_')[1]
        screenIndex = index
        this.toTvBridge(index)
    },
    clickRemotePrev() {
        if (screenIndex === null) {
            screenIndex = 2
        } else if (screenIndex === 1) {
            screenIndex = 5
        }
        screenIndex--
        this.toTvBridge(screenIndex)
    },
    clickRemoteNext() {
        if (screenIndex === null) {
            screenIndex = 0
        } else if (screenIndex === 4) {
            screenIndex = 0
        }
        screenIndex++
        this.toTvBridge(screenIndex)
    },
    clickRemoteStop() {
        switch (screenIndex) {
            case 1:
                videos.left.pause ? videos.left.play() : videos.left.pause()
                break
            case 2:
                videos.center.pause ? videos.center.play() : videos.center.pause()
                break
            case 3:
                videos.rightBottom.pause ? videos.rightBottom.play() : videos.rightBottom.pause()
                break
            case 4:
                videos.rightTop.pause ? videos.rightTop.play() : videos.rightTop.pause()
                break
        }
    },
    clickRemoteEnter() {
        if (screenIndex !== 2) {
            introScrollTrigger.to(camera.position, {
                x: 5,
                y: 7,
                z: 35,
                duration: 3,
                onUpdate: () => {
                    camera.lookAt(-7, 7, 0)
                }
            }, 'start')
        }

        introScrollTrigger.to(this.$refs['entrance-light'], {
            scale: 100,
            opacity: 0.9,
            duration: 2
        }).to(camera.position, {
            x: -0.5,
            y: 7.5,
            z: 18,
            duration: 2
        }, '-=2')
        if (screenIndex !== 2) {
            introScrollTrigger.to(camera.position, {
                x: 5,
                y: 7,
                z: 35,
                duration: 3,
                onUpdate: () => {
                    camera.lookAt(-7, 7, 0)
                }
            }, 'start')
        }

        introScrollTrigger.to(camera.position, {
            x: 5,
            y: 7,
            z: 35,
            duration: 3,
            onUpdate: () => {
                camera.lookAt(-7, 7, 0)
            }
        }, 'start')
        let timeOutInterval = screenIndex === 2 || screenIndex === null ? 2400 : 3000
        setTimeout(() => {
            this.$emit('enterToIndex', true)
        }, timeOutInterval)
    },
    // camera event
    toTvBridge(index) {
        const fixedIndex = index.toString()

        switch (fixedIndex) {
            case '1':
                this.toTv(1, {x: -10, y: 10, z: 45}, {x: -14, y: 0, z: 0})
                break
            case '2':
                this.toTv(2, {x: 5, y: 7, z: 35}, {x: -7, y: 7, z: 0})
                break
            case '3':
                this.toTv(3, {x: -5, y: 7, z: 26}, {x: 52, y: 7, z: 0})
                break
            case '4':
                this.toTv(4, {x: -6, y: 16, z: 30}, {x: 52, y: 18, z: 0})
        }
    },
    toTv(index, position, cameraPosition) {
        screenIndex = index
        isBack = true

        introScrollTrigger.to(camera.position, {
            duration: 1,
            x: position.x,
            y: position.y,
            z: position.z,
            onUpdate: () => {
                camera.lookAt(cameraPosition.x, cameraPosition.y, cameraPosition.z)
            }
        })
    },
    cameraReset() {
        this.isBack = false

        this.introScrollTrigger.to(camera.position, {
            x: 2,
            y: 15,
            z: 45,
            duration: 1,
            onUpdate: () => {
                camera.lookAt(0, 0, 0)
            }
        }, 'start')
            .to(remote.position, {
                x: 2,
                y: 5.5,
                z: 32.5,
                duration: 1
            }, '-=1')
            .to(remote.rotation, {
                x: 0.7,
                y: 1.6,
                z: 0,
                duration: 1
            }, '-=1')
    },
    // window event
    onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.updateProjectionMatrix()
        renderer.render(scene, camera)
    },
    animate() {
        if (stats) {
            stats.update()
        }
        if (container) {
            //Immediate Remote Rotation
            target.x = (1 - rotateX) * 0.01
            const remoteRotation = remote.rotation.y + 0.05 * (target.x)
            if (0.6 < remoteRotation && remoteRotation < 2.4) {
                remote.rotation.y += 0.05 * (target.x)
            }
            renderer.render(scene, camera)
            requestAnimationFrame(this.animate)
        }
    },
    // make object
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
                        videos[eventName] = video
                        this.objectOnLoad('video', eventName, null)
                    } else {
                        const timer = setTimeout(() => {
                            clearTimeout(timer)
                            localVideoTexture.needsUpdate = true
                            videos[eventName] = video
                            this.objectOnLoad('video', eventName, null)
                        }, 500)
                    }
                })
                localVideoTexture = new THREE.VideoTexture(video)
                localVideoTexture.minFilter = THREE.LinearFilter
                localVideoTexture.magFilter = THREE.LinearFilter
                // 잊지말자 The Else여... Video texture는 LinearSRGBColorSpace를 사용해야한다.
                localVideoTexture.colorSpace = THREE.LinearSRGBColorSpace
                // localVideoTexture.colorSpace = THREE.SRGBColorSpace
                localVideoTexture.crossOrigin = 'anonymous'
                localVideoTexture.wrapS = THREE.RepeatWrapping
                localVideoTexture.repeat.x = -1
                child.material = new THREE.MeshBasicMaterial({
                    map: localVideoTexture,
                    side: THREE.FrontSide
                })
            }
        })
        this.progress(`${eventName}Tv`, 100, 100)
    },
    getVideoElement(path, eventName, loadeddata) {
        tempVideo = document.createElement('video')
        tempVideo.addEventListener('loadeddata', loadeddata, false)
        tempVideo.type = 'video/mp4'
        tempVideo.src = path
        tempVideo.preload = 'auto'
        tempVideo.crossOrigin = 'anonymous'
        tempVideo.style.display = 'none'
        tempVideo.loop = true
        tempVideo.muted = true
        tempVideo.autoplay = true
        tempVideo.setAttribute('webkit-playsinline', 'webkit-playsinline')
        tempVideo.setAttribute('playsinline', '')
        tempVideo.style.display = 'none'
        tempVideo.load()
        return tempVideo
    },
    // dispose
    dispose() {
        if (container) {
            introScrollTrigger.kill()
            introScrollTrigger = null
            window.removeEventListener('resize', this.onWindowResize)
            container.removeEventListener('mousemove', this.onDocumentMouseMove, false)
            container.removeEventListener('click', this.onDocumentMouseDown, false)
            camera = null
            scene = null
            renderer = null
            container = null
            controls = null
            mouse = null
            raycaster = null
            intersects = null
            SELECTED = null
            gapX = null
            gapY = null
            remoteItem = []
            remote = null
            remoteY = null
            canvas = null
            mouseX = null
            remoteRotationY = null
            windowHalf = null
            target = null
            rotateX = null
            stats = null
            floor = null
            localVideoTexture = null
            tempVideo = null
            video = null
            videos = []
            screenIndex = null
            centerTvLight = null
            mouseX = null
            remoteRotationY = null
        }
        window.cancelAnimationFrame(this.animate)
    }
}