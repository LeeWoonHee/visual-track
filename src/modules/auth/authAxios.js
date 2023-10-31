export default {
  init: (axios, accessToken, resolve, reject) => {
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${accessToken}`
      return config
    })
    axios.interceptors.response.use(function (config) {
      if (resolve) resolve(config)
      return config
    }, function (error) {
      const {config, response} = error
      if (reject) reject({config, response})
      return config
    })
  }
}
