export default {
  isUserLoggedIn: () => {
    return localStorage.getItem('userInfo') && localStorage.getItem('accessToken')
  },
  accessToken: () => {
    return localStorage.getItem('accessToken')
  }
}
