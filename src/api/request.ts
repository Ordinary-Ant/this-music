import axios, { AxiosInstance, Method } from 'axios'
const instance: AxiosInstance = axios.create({
  baseURL: 'http://47.243.23.88:3000/',
  timeout: 5000
})
instance.interceptors.request.use(config => {
  return config
})
instance.interceptors.response.use(response => {
  return response.data || response
})
export default (url: string, data = {}, method: Method = 'GET') => {
  return new Promise((resolve, reject) => {
    try {
      const params = method === 'GET' ? data : null
      const result = instance({
        url,
        method,
        params,
        data
      })
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}
