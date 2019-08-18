import axios from 'axios'

// axios的實例
var instance = axios.create({
  baseURL: '/api/'
})

// 忽略:request攔截器
instance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  // 對req錯誤做什麼
  return Promise.reject(error);
});

// 忽略:response攔截器
instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // 對res錯誤做什麼
  return Promise.reject(error);
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