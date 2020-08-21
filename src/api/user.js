import request from '../utils/request'

// 用户登录
export function Login(data) {
  return request({
    url: 'user/login',
    method: "post",
    data
  })
}