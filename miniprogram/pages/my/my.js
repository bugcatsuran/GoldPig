const roleDefine = {
	0:'未选择',
	1:'家教',
	2:'家长'
}

Page({
	data: {
		authUserInfo:true,
		userInfo:{},
		showModal: false,
		role:null,
		roleDefine,
	},

	onLoad: function (options) {
		const role = wx.getStorageSync('role') || 0;
		this.setData({
			role
		})
		const self = this;
		wx.getSetting({
			success(res){
				console.log(res)
				if (!res.authSetting['scope.userInfo']){
					wx.setStorageSync('authUserInfo', false)
					self.setData({
						authUserInfo:false
					})
				}else{
					self.setData({
						userInfo: wx.getStorageSync('userInfo')
					})
				}
			}
		})
	},

	bindGetUserInfo: function (e) {
		console.log(e.detail.userInfo)
		wx.setStorageSync('authUserInfo', true)
		wx.setStorageSync('userInfo', e.detail.userInfo)
		this.setData({
			authUserInfo: true,
			userInfo: e.detail.userInfo
		})
	},

	chooseRole:function(){
		if (!this.data.authUserInfo){
			wx.showToast({
				image: '../../assets/icons/bang.png',
				title: '请登录',
				duration: 1000,
			})
			return
		}
		this.setData({
			showModal:true,
		})
	},

	ImTeacher: function () {
		wx.setStorageSync('role', 1)
		this.setData({
			role: 1,
			showModal:false
		})
	},

	ImParent:function(){
		wx.setStorageSync('role', 2)
		this.setData({
			showModal: false,
			role:2
		})
	},

	goResume:function(){
		wx.navigateTo({
			url: '../resume/resume',
		})
	},

	goDemand:function(){
		wx.navigateTo({
			url: '../demand/demand',
		})
	},

	exit() {
		this.setData({
			showExit: true
		})
	},

	cancleExit() {
		this.setData({
			showExit: false
		})
	},

	sureExit() {
		this.setData({
			showExit: false,
			userInfo:{},
			role:0,
			authUserInfo:false
		})
	},

	onPullDownRefresh: function () {
		
	},

	onShareAppMessage: function () {
		
	}
})