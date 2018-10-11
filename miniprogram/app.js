//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
				traceUser:true,
				env:{		
					database: 'de-d55f1f',
					storage:'de-d55f1f',
					functions:'de-d55f1f'
				},
				// env: {
				// 	database: 'produ-68bf7d',
				// 	storage: 'produ-68bf7d',
				// 	functions: 'produ-68bf7d'
				// },
			})
    }

    this.globalData = {}
  }
})
