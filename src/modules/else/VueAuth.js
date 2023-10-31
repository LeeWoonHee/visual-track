import store from '@/store/store'
import axios from '@/axios'
import router from '@/router'

export default {
  install: (Vue, options = {}) => {
    if (!options.hasOwnProperty('router')) {
      options.router = router
    }

    if (!options.hasOwnProperty('axios')) {
      options.axios = axios
    }
    if (!options.hasOwnProperty('store')) {
      options.store = store
    }

    // 처음 시작할 때 localStorage에 accessToken이 있으면 로그인 세팅을 미리한다.
    // rotuer가 동작할 때 login또는 권한이 필요한 페이지들을 검사한다.
    // 만약 로그인이 필요한 경우 로그인이 되어있지 않다면 login페이지로 redirect한다.
    // 데이터 호출 시 401이라는 권한 불일치 코드를 받을 경우 logout한다.
    // vuesax/vuexy를 이용할 경우 $vs.loading 중 이라면 로딩을 close한다.

    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      // 로그인 세팅
      // -- setting store
      options.store.commit('auth/SET_BEARER', localStorage.getItem('accessToken'))
      options.axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
      })


      // -- setting axios
      options.axios.interceptors.response.use(function (config) {
        return config
      }, function (error) {
        const {config, response} = error
        if (response.status === 401) {
          options.store.dispatch('auth/logout').finally(() => {
            options.router.push('/login').catch(() => {}).finally(() => {
              return Promise.reject(error)
            })
          })
        } else {
          return Promise.reject(error)
        }
      })

      // -- controlling router
      options.router.push('/').catch(() => {})
    } else {
      // 로그아웃 그리고 login페이지로 redirect
      options.store.dispatch('auth/logout').then(() => {
        options.router.push('/login').catch(() => {})
      })
    }

    options.router.beforeEach((to, from, next) => {
      if (to.meta.rule !== 'guest') {
        if (options.store.state.auth.isUserLoggedIn()
          && options.store.state.AppActiveUser
          && options.store.state.AppActiveUser.roles
          && options.store.state.AppActiveUser.roles.findIndex(role => role.name === to.meta.rule) > -1) next()
        else next('/login')
      } else {
        next()
      }
    })

    Vue.prototype.$vueAuth = {
      login: (email, password) => {
        return new Promise((resolve, reject) => {
          options.store.dispatch('auth/loginJWT', {
            email, password
          }).then((res) => {
            options.axios.interceptors.request.use(function (config) {
              config.headers.Authorization = `Bearer ${res.data.accessToken}`
              return config
            })
            options.router.push('/').catch(() => {})
            resolve(res)
          }).catch((err) => {
            reject(err)
          })
        })
      },
      logout: () => {
        options.store.dispatch('auth/logout').then(() => {
          options.router.push('/login').catch(() => {})
        })
      }
    }
  }
}
