import jwt from '../../http/requests/auth/jwt/index.js'
import router from '@/router'
import axios from '@/axios'

export default {
  updateUsername ({commit}, payload) {
    payload.user.updateProfile({
      displayName: payload.displayName
    }).then(() => {

      // If username update is success
      // update in localstorage
      const newUserData = Object.assign({}, payload.user.providerData[0])
      newUserData.displayName = payload.displayName
      commit('UPDATE_USER_INFO', newUserData, {root: true})

      // If reload is required to get fresh data after update
      // Reload current page
      if (payload.isReloadRequired) {
        router.push(router.currentRoute.query.to || '/')
      }
    }).catch((err) => {
      payload.notify({
        time: 8800,
        title: 'Error',
        text: err.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })
    })
  },
  logout ({commit}) {
    // Set accessToken
    localStorage.removeItem('accessToken')

    // Update user details
    commit('DELETE_USER_INFO', null, {root: true})

    // // Set bearer token in axios
    // commit('DELETE_BEARER', null)
  },
  // JWT
  loginJWT ({commit}, payload) {
    return new Promise((resolve, reject) => {
      // log in request
      axios.post('/auth/login', payload)
        .then((res) => {
          // if (res.data.userData) {
          // commit
          commit('UPDATE_USER_INFO', res.data.userData, {root: true})
          commit('SET_BEARER', res.data.accessToken)
          resolve(res)
          // } else.scss {
          //   commit('DELETE_BEARER')
          //   reject(res)
          // }
        })
        .catch((err) => {
          commit('DELETE_BEARER')
          reject(err)
        })
    })
  },
  fetchAccessToken ({commit}) {
    return new Promise((resolve, reject) => {
      jwt.refreshToken()
        .then(response => {
          if (response.data.userData) {
            // Set accessToken
            localStorage.setItem('accessToken', response.data.accessToken)

            // Update user details
            commit('UPDATE_USER_INFO', response.data.userData, {root: true})

            // Set bearer token in axios
            commit('SET_BEARER', response.data.accessToken)

            // Navigate User to homepage
            router.push(router.currentRoute.query.to || '/')

            resolve(response.data.accessToken)
          } else {
            reject(response)
          }
        }).catch((err) => {
        reject(err)
      }).finally(() => {
      })
    })
  }
}
