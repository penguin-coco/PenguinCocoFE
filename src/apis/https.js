import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router.js'


/** 
 * 錯誤msg消息提示的函數
 */
const tip = msg => {    
  Message.error(msg);
}

/** 
 * 跳轉回首頁
 * 攜帶當前的頁面路由, 登入完成後跳轉回原本頁面
 */
const toLogin = () => {
  router.replace({
    name: 'Login',        
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}

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

    // TODO: 401: backend session過期
    case 403:
      tip('登入過期，請重新登入');
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;

    // 403: 權限不足
    case 403:
      tip(msg);
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