import axios from 'axios' // 引入axios
const service = axios.create({
  baseURL: '/',
  timeout: 20000
})
// http request 拦截器
service.interceptors.request.use(
  config => config,
  error => error
)

// http response 拦截器
service.interceptors.response.use(
  response => response,
  error => error
)

export default service
