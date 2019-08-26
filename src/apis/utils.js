import { Message } from 'element-ui';
import router from '../router.js'

/** 
 * 錯誤msg消息提示的函數
 */
export const tip = msg => {    
  Message.error(msg);
}

/** 
 * 跳轉回首頁
 * 攜帶當前的頁面路由, 登入完成後跳轉回原本頁面
 */
export const toLogin = () => {
  router.replace({
    name: 'Login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}

/** 
 * 跳轉到 403 error page
 * 攜帶當前的頁面路由, 點擊連結後跳轉回原本頁面
 */
export const to403Page = () => {
  router.replace({
    name: '403'
  });
}
