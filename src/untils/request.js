import axios from 'axios'

const service = axios.create({
  baseURL: 'http://193.112.68.157:8080',
  timeout: 5000,
  // 启用跨域请求时发送 Cookie（Sa-Token 存储在 Cookie 中）
  withCredentials: true,
})

// 请求拦截器：仅在调用后端 API 时添加 Authorization
service.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  const token = localStorage.getItem('token')
  // 仅在请求路径包含 /api 时，并且存在 token，才添加 Authorization
  const url = config.url || ''
  const base = config.baseURL || ''
  let path = url
  if (base && url.startsWith(base)) {
    path = url.slice(base.length)
  }
  const isApiRequest = path.startsWith('/api') || path.includes('/api/')
  if (isApiRequest && token) {
    // 后端期望直接使用 token 字符串（非 Bearer 前缀）
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err),
)

export default service
