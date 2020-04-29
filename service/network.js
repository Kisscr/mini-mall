// 封装网络请求
import {
  baseUrl
}from './config'

export default function (option) {
  return new Promise((reslove, reject) => {
    wx.request({
      url: baseUrl + option.url,
      method: option.method || "get",
      data: option.data || {},
      success: reslove,
      fail: reject
    })
  })
}