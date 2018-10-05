const db = wx.cloud.database();
const resume = db.collection('resume');

Page({
	data: {
		resumeInfo:{
			type:1
		},
		showModal:false,
		currentKey:'',
		inputValue:''
	},

	onLoad: function (options) {
		if(!wx.getStorageSync('openid')){
			this.login();
		}else{
			this.getInfo();
		}
	},

	getInfo:function(){
		const self = this;
		resume.where({
			_openid:wx.getStorageSync('openid')
		})
		.get({
			success: function (res) {
				self.setData({
					resumeInfo:res.data[0]
				})
			},
			fail:function(err){
				wx.showModal({
					content: err,
				})
			}
		})
	},

	login: function () {
		const promise = new Promise(function (resolve, reject) {
			wx.cloud.callFunction({
				name: 'login',
				data: {},
				success: res => {
					wx.setStorageSync('openid', res.result.openid)
					resolve(res.result.openid)
				},
				fail: err => {
					console.error(err)
				}
			})
		})
		return promise
	},

	modifyInfo:function(e){
		const key = e.currentTarget.dataset.key;
		const inputValue = this.data.resumeInfo[key]||'';
		this.setData({
			showModal:true,
			currentKey:key,
			inputValue
		})
	},

	input:function(e){
		const value = e.detail.value;
		this.setData({
			inputValue: value 
		})
	},

	cancleModal:function(e){
		this.setData({
			showModal: false,
			inputValue: this.data.resumeInfo[this.data.currentKey]
		})
	},

	sureModal:function(e){
		let resumeInfo = Object.assign({}, this.data.resumeInfo)
		resumeInfo[this.data.currentKey] = this.data.inputValue;
		this.setData({
			showModal: false,
			resumeInfo
		})
	},

	publish:function(){
		if (!this.data.resumeInfo._id){
			this.add();
		}else{
			this.update()
		}
	},

	add: function (){
		resume.add({
			data: this.data.resumeInfo,
			success:function(res){
				wx.showModal({
					content: '发布成功',
				})
			}
		})
	},

	update:function(){
		const info = JSON.parse(JSON.stringify(this.data.resumeInfo));
		delete info._id;
		delete info._openid;
		resume.doc(this.data.resumeInfo._id).update({
			data:info,
			success: function (res) {
				wx.showModal({
					content: '发布成功',
				})
			},
			fail:function(err){
				console.log(err)
			}
		})
	},

	out:function(){
		const info = JSON.parse(JSON.stringify(this.data.resumeInfo));
		delete info._id;
		delete info._openid;
		info.style = 'N';
		resume.doc(this.data.resumeInfo._id).update({
			data: info,
			success: function (res) {
				wx.showModal({
					content: '下架成功',
				})
			},
			fail: function (err) {
				console.log(err)
			}
		})
	},

	onPullDownRefresh: function () {
		
	},

	onShareAppMessage: function () {
		
	}
})