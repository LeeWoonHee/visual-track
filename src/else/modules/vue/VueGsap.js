import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import { Draggable } from 'gsap/Draggable'

export default {
  install(vue, options) {
    // install gsap
    if (!vue.prototype.$gsap) {
      vue.prototype.$gsap = gsap
      vue.prototype.$scrollTrigger = ScrollTrigger
      vue.prototype.$motionPlugin = MotionPathPlugin
      vue.prototype.$cSSRulePlugin = CSSRulePlugin
      vue.prototype.$draggable = Draggable

      // default is "resize,visibilitychange,DOMContentLoaded,load" so we can remove "resize" from the list:
      vue.prototype.$scrollTrigger.config({
                                            ignoreMobileResize: true
                                          })

      vue.prototype.$gsap.registerPlugin(vue.prototype.$scrollTrigger, vue.prototype.$motionPlugin, vue.prototype.$cSSRulePlugin)
      vue.prototype.$gsap.core.globals('ScrollTrigger', vue.prototype.$scrollTrigger)
      vue.prototype.$gsap.core.globals('MotionPathPlugin', vue.prototype.$motionPlugin)
      vue.prototype.$gsap.core.globals('CSSRulePlugin', vue.prototype.$cSSRulePlugin)
      vue.prototype.$gsap.core.globals('Draggable', vue.prototype.$draggable)
      console.log(`----installed gsap----`)
    }
    // directive
    vue.directive('gsap', {
      bind  : (el, binding, vnode) => {
        // console.log(el, binding, vnode)
        this.combineDirectives(vue, el, binding, vnode)
      },
      unbind: (el, binding, vnode) => {
        if (vnode.context.tween) {
          vnode.context.tween.kill()
        }
        vnode.context.tween = null
      }
    })
    // mixin
    vue.mixin({
                mounted() {
                  if (vue.prototype.$scrollTrigger) {
                    vue.prototype.$scrollTrigger.refresh()
                  }
                }
              })
  },
  combineDirectives: (vue, el, binding, vnode) => {
    if (vnode.context.tween) {
      return
    }
    const group = {
      to  : false,
      from: false
    }

    const attributes = {
      to  : false,
      from: false
    }
    vnode.data.directives.forEach(directive => {
      if (directive.modifiers.group) {
        group.to = directive.modifiers.to
        group.from = directive.modifiers.from
      }
      else {
        attributes.to = directive.modifiers.to
        attributes.from = directive.modifiers.from
      }
    })

    if (attributes.to && attributes.from) {
      vnode.context.tween = vue.prototype.$gsap.fromTo(el, attributes.from, attributes.to)
    }
    else if (attributes.to) {
      vnode.context.tween = vue.prototype.$gsap.to(el, attributes.to)
    }
    else if (attributes.from) {
      vnode.context.tween = vue.prototype.$gsap.from(el, attributes.from)
    }

  }
}
