// miniprogram/components/listItem/listItem.js
Component({
  
  properties: {
		photoId:{
			type:String,
			value:''
		}
  },

  
  data: {
		photoUrl:''
  },

	ready:function(){
		if (this.data.photoId){
			this.getPhotoUrl()
		}
	},

	pageLifetimes: {
		show: function () { 
			console.log('listItem',999)
			if (this.data.photoId) {
				this.getPhotoUrl()
			}
		},
	},

  methods: {
		getPhotoUrl:function(){
			let fileList = [];
			fileList.push(this.data.photoId)
			const self = this;
			wx.cloud.getTempFileURL({
				fileList,
				success: res => {
					console.log(res.fileList[0].tempFileURL)
					self.setData({
						photoUrl: res.fileList[0].tempFileURL
					})
				},
				fail: console.error
			})
		}
  }
})
