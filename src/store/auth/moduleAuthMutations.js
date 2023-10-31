import axios from '@/axios'

export default {
  SET_BEARER (state, accessToken) {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    } else {
      localStorage.removeItem('accessToken', accessToken)
    }
  },
  DELETE_BEARER (state) {
    localStorage.removeItem('accessToken')
  }
}
