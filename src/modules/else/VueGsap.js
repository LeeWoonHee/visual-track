import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
import ScrollToPlugin from "gsap/ScrollToPlugin";

let ref = null
export default {
    install(Vue, options) {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)
        Vue.prototype.$gsap = gsap
        Vue.prototype.$gsapScrollSmoother = ScrollSmoother
        Vue.prototype.$gsapScrollTrigger = ScrollTrigger
        Vue.prototype.$gsapSmoothCreate = (target, ...options) => {
            this.scrollTriggerCreate(Vue, target, ...options)
        }
        Vue.prototype.$gsapGetTop = () => {
            return ScrollTrigger.maxScroll(ref)
        }
        ScrollTrigger.refresh()
        ScrollTrigger.addEventListener('refresh', this.scrollTriggerRefreshed)
    },
    scrollTriggerCreate(Vue, refElement, ...options) {
        ref = refElement
        Vue.prototype.$gsapSmooth = ScrollSmoother.create({
            content: ref,
            ...options
        })
    },
    scrollTriggerRefreshed() {
        ScrollTrigger.sort()
    },
}