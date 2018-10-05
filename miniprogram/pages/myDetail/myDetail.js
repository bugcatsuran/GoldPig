Page({

	data: {
		userInfo:{
			_id: "1",
			name: '壮壮',
			freeTime: "周四晚7点",
			profile: '',
			school: "北大",
			add: '安定门',
			education: "硕士",
			fee: '600/小时',
			publishDate: '09月17日',
			subject: '物理',
			grade: '高中',
		},
		showModal:false,
		currentKey:'',
		inputValue:''
	},

	onLoad: function (options) {
		
	},

	modifyInfo:function(e){
		const key = e.currentTarget.dataset.key;
		const inputValue = this.data.userInfo[key];
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

	canclePwd:function(e){
		this.setData({
			showModal: false,
			inputValue: this.data.userInfo[this.data.currentKey]
		})
	},

	surePwd:function(e){
		let userInfo = Object.assign({}, this.data.userInfo)
		userInfo[this.data.currentKey] = this.data.inputValue;
		console.log(userInfo, 666)
		this.setData({
			showModal: false,
			userInfo
		})
	},

	updateDB:function(){

	},

	onPullDownRefresh: function () {
		
	},

	onShareAppMessage: function () {
		
	}
})