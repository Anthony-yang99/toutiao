// 封装axios的请求函数，并暴露出去
import newAxios from 'axios'
import router from '@/router/index.js'
import { Notify } from 'vant'
import { getToken, removeToken, setToken } from '@/utils/token.js'
import { refrshTokenAPI } from '@/api/index.js'
const axios = newAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000 // 超时20秒后就不请求了
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config)
  // ?. 可选链操作符，如果前面的表达式没有length则在原地返回undefined，如果前面表达式有值，才能调用length长度
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // console.log(error)
  // Notify({ type: 'warning', message: '身份已过期' })
  if (error.response.status === 401) {
    removeToken()
    // router.replace('/login')
    const res = await refrshTokenAPI()
    setToken(res.data.data.token)
    error.config.headers.Authorization = `Bearer ${res.data.data.token}`
    return axios(error.config)
  } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
    Notify({ type: 'warning', message: '身份已过期' })
    localStorage.clear()
    router.replace('/login')
  }
  return Promise.reject(error)
})

// 到处自定义函数，参数解构赋值
export default ({ url, method, params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
