import axios from 'axios'
import router from '../router.js'
import {tip, toLogin, to403Page} from './utils.js'

/** 
 * 請求失敗的統一處理
 * @param {Number} status 請求失敗的狀態馬
 */
const errorHandle = (status, msg) => {
  switch(status) {
    // 400: 登入失敗, 可能是帳號或密碼錯誤
    case 400:
      tip(msg);
      break;

    // 401: backend session過期 => 移到checklogin去判斷
    // case 401:
    //   if (router.currentRoute=='Login' || router.currentRoute=='Root') {
    //     // 不用tip, 會由Login去導向首頁
    //   } else {
    //     tip('登入過期，請重新登入');
    //     setTimeout(() => {
    //       toLogin();
    //     }, 1000);
    //   }
    //   console.log('登入過期，請重新登入');
    //   break;

    // 403: 權限不足
    case 403:
      to403Page();
      break;

    // 404: 請求失敗
    case 404:
      tip(msg);
      break;

    // 其他錯誤, 直接拋出提示錯誤
    default:
      console.log('resp沒有攔截到的錯誤：'+msg);
  }
}


// axios的實例
var instance = axios.create({
  baseURL: '/api/'
})

// request攔截器
instance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

// response攔截器
instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const { response } = error;

  if (response) {
    // 成功發出請求且收到resp, 但有error
    errorHandle(response.status, response.data.error);
    return Promise.reject(error);
  } else {
    // 成功發出請求但沒收到resp
    if (!window.navigator.onLine) {
      // 如果是網路斷線
      tip('網路出了點問題，請小伙伴重新連線後刷新網頁');
    } else {
      // 可能是跨域, 或是程式問題
      return Promise.reject(error);
    }
  }
});


export default function (method, url, data=null) {
  method = method.toLowerCase();
  if (method == 'post') {
    return instance.post(url, data)
  } else if (method == 'get') {
    return instance.get(url, {params: data})
  } else if (method == 'delete') {
    return instance.delete(url, {params: data})
  } else if (method == 'put') {
    return instance.put(url, data)
  } else {
    console.error('未知的method'+method);
    return false
  }
}