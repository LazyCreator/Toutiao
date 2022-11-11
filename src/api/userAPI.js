import request from '@/utils/request.js'

// 注意：下面的接口调用，纯粹是演示，因为服务器没有提供 /user 这个接口
export const getUserInfoAPI = function () {
  return request.get('/user')
}
