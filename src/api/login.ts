
import httpRequest from './request'

const ApiEnum = {
  login: '/users/app/login',
  logout: '/users/app/logout',
  getUserInfo: '/users/app/getUserInfo',
}
// option是useFetch的选项参数
export async function login(params:any, option = {}) {
  return await httpRequest.post(ApiEnum.login, params, option)
}
export async function logout(option:any) {
  return await httpRequest.post(ApiEnum.logout, {}, option)
}

export async function getUserInfo(option:any) {
  return await httpRequest.get(ApiEnum.getUserInfo, {}, option)
}
