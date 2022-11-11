import axios from 'axios'

const request = axios.create({
  // 指定请求的根路径
  baseURL: 'https://www.escook.cn'
})

export default request
