App({
  onLaunch: function() {
    wx.login({
      success: function(res) {
        console.log(res)
      }
    })
  },
})