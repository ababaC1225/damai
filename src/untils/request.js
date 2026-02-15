import axios from "axios"//引入axios库

const service = axios.create({
  baseURL: "https://eager-states-say.loca.lt", // 暂用内网穿透地址
  timeout: 5000  //超过五秒没响应就报错
})

// 请求拦截器（自动带 token）  从 localStorage 中获取 token 并添加到请求头中
//以后访问的接口都自带登陆凭证，叫登录态保持
service.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default service
