// axios
import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? 'https://web.else.blue/api'
  : 'http://192.168.35.11:8000/service'
// const baseURL = 'http://172.30.1.22:8000/service'
// production
// const baseURL = 'https://api.quantumdataengine.com/service'
// local
// const baseURL = 'http://172.30.1.22:8000/service'
export default axios.create({
                              baseURL
                              // You can add your headers here
                            })
