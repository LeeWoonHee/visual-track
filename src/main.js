import Vue from 'vue'
import App from './App.vue'

import Vuesax from 'vuesax'
// Vuesax Component Framework
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax

Vue.use(Vuesax)
//v scroll stop

import VueScrollStop from 'vue-scroll-stop'

Vue.use(VueScrollStop)
// Vuex Store

import store from './store/store'
// axios
//vue gsap


// Vue Router

import router from './router'
// import VueAuth from '@/modules/else/VueAuth'
//
// Vue.use(VueAuth)

import axios from './axios'

Vue.prototype.$http = axios

// Theme Configurations
import '../themeConfig.js'

// Vue Lodash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

// number animation
// import VueNumber from 'vue-number-animation'
//
// Vue.use(VueNumber)

Vue.config.productionTip = false


// kinesis
import VueKinesis from 'vue-kinesis'

Vue.use(VueKinesis)

Vue.use(VueLodash, {lodash})

// Globally Registered Components
import './globalComponents.js'
// Animation style
import '@/assets/scss/animation.scss'
// Styles: SCSS
import './assets/scss/main.scss'

// Tailwind
import '@/assets/css/main.css'
//vue select style
import vSelect from 'vue-select'

import 'vue-select/dist/vue-select.css'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

// mdicon
import mdiVue from 'mdi-vue'
import * as mdijs from '@mdi/js'
import * as mdijsAdd from '@/plugins/mdi/additionalIcons'

Vue.use(mdiVue, {
    icons: Object.assign(Object.assign({}, mdijs), mdijsAdd)
})

import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed, { global: true, componentId: "youtube-media" })

// vue typer
import VueTyperPlugin from 'vue-typer'

Vue.use(VueTyperPlugin)

Vue.use(VueVirtualScroller)
Vue.prototype.$window = window

// v-touch
import VueTouch from 'vue-touch'

Vue.use(VueTouch, {name: 'v-touch'})

// moment js
import vueMoment from 'vue-moment'

Vue.use(vueMoment)

import LoadScript from './modules/VueLoadScript'

Vue.use(LoadScript)

import VueGsap from '@/modules/else/VueGsap'

Vue.use(VueGsap)


import VeeValidate from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko'

Vue.use(VeeValidate, {
    dictionary: {
        ko
    }
})


// import { UniformPlugin } from '@shader-art/plugin-uniform'
// import { ShaderArt } from "shader-art"
// ShaderArt.register([() => new UniformPlugin()]);

// gsap

// import VueGsap from './else/modules/vue/VueGsap'
// Vue.use(VueGsap)


// Vuexy Admin Filters
import './filters/filters'

// Vuejs - Vue wrapper for hammerjs
// import {VueHammer} from 'vue2-hammer'
//
// Vue.use(VueHammer)

// Vue.config.errorHandler = (err) => alert(err)
// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Feather fonts icon
// require('./assets/css/iconfont.css')

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
