
const roleDefine = {
	0:'未选择',
	1:'家教',
	2:'家长'
}

Page({

	data: {
		userInfo:{},
		showModal: false,
		role:0,
		roleDefine,
	},

	onLoad: function (options) {
		
	},


	bindGetUserInfo: function (e) {
		console.log(e.detail.userInfo)
		this.setData({
			userInfo: e.detail.userInfo
		})
	},

	chooseRole:function(){
		this.setData({
			showModal:true,
		})
	},

	ImTeacher: function () {
		this.setData({
			role: 1,
			showModal:false
		})
	},

	ImParent:function(){
		this.setData({
			showModal: false,
			role:2
		})
	},

	goDetail:function(){
		wx.navigateTo({
			url: '../myDetail/myDetail',
		})
	},

	goDemand:function(){
		wx.navigateTo({
			url: '../myDetail2/myDetail2',
		})
	},

	onPullDownRefresh: function () {
		
	},

	onShareAppMessage: function () {
		
	}
})