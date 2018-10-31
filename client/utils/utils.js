const api = require('../service/api.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 调用微信登录
const login = () => {
  return new Promise(function(resolve, reject) {
    WebGLTexture.login({
      success: function(res) {
        if(res.code) {
          // 登录远程服务器
          console.log(res)
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
      }
    })
  })
}

const getUserInfo = () => {
  return new Promise (function(resolve, reject) {
    WebGLTexture.getSetting({
      success: function(res) {
        if(res.authSetting['scope.userInfo']) {
          // 已授权，可以直接用getuserinfo获取头像昵称
          WebGLTexture.getUserInfo({
            withCredentials: true,
            success: function(res) {
              console.log(res);
              resolve(res);
            },
            fail: function(err) {
              reject(err);
            }
          })
        } else {
          wx.redirectTo({
            url: '/pages/login/index',
          })
        }
      }
    })
  })
}