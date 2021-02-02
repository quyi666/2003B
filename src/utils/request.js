// 1. 先导入axios 对象
import axios from 'axios';

// 2. 创建axios实例
const Server = axios.create({
  baseURL: '',
//   timeout: 3000,
});

// 3. 请求拦截器
Server.interceptors.request.use((config) => {
  config.headers['token'] = sessionStorage.getItem('token')  
  console.log(config)

  return config
}, (error) => {
  return Promise.reject(error)
})


// 4. 响应拦截器
Server.interceptors.response.use((response) => {
  console.log(response)

  return response.data
}, (error) => {
  return Promise.reject(error)
})

// 抛出实例对象
export default Server
