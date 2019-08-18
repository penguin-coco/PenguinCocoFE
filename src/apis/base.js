import req from './https.js'

export const apiLogin = params => req('post', '/login', params)
export const apiLogout = () => req('post', '/logout')
export const apiCheckLogin = () => req('get', '/checkLogin')