export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body

      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            nickname: '测试用户',
            avatar: 'https://dummyimage.com/80x80/ff1268/fff'
          }
        }
      }

      return {
        code: 401,
        message: '账号或密码错误'
      }
    }
  }
]

// api/user.js
import axios from 'axios'

export const loginApi = (data) => {
  return axios.post('/api/login', data)
}
