const classifyList = [
	{ value: 1, name: '家教排行' },
	{ value: 2, name: '需求排行' }
]

const filterList = [
	{
		name:'学校',
		value:1
	},
	{
		name: '位置',
		value: 2
	},
	{
		name: '时间',
		value: 3
	},
	{
		name: '费用',
		value: 4
	},
]

const cities = [{
	text: '所有城市',
	children: [
		{
			text: '北京市',
			id: 1000
		},
		{
			text: '深圳市',
			id: 1001
		}
	]
}]

Page({
	data: {
		classifyList,
		rankList: [],
		typeValue: 1,
		city:'定位中',
		filterList,
		cities,
	},

	onLoad: function (options) {
		this.getLocation();
		wx.showLoading({
			title: '正在加载',
		})
		this.getRankList()
		.then(() => {
			wx.hideLoading()
		}, err => {
			wx.hideLoading()
			wx.showModal({
				content: err,
			})
		})
	},

	getLocation:function(){
		const self = this;
		wx.getLocation({
			type: 'wgs84',
			success: function (res) {
				const latitude = res.latitude
				const longitude = res.longitude
				self.loadCity(latitude, longitude)
			}
		})
	},

	loadCity: function (latitude, longitude){
		const self = this;
		wx.request({
			url: 'https://api.map.baidu.com/geocoder/v2/?ak=6N8xmNwkMoK8EubKOK7Y9WpllWHwAxvx&location='
			+ latitude + ',' + longitude + '&output=json', 
			data:{},
			header: { 'Content-Type': 'application/json' },
			success:function(res){
				self.setData({
					city: res.data.result.addressComponent.city
				})
			}
		})
	},

	getRankList: function () {
		const self = this;
		const promise = new Promise(function (resolve, reject) {
			wx.cloud.callFunction({
				name: 'rankList',
				data: {
					type: self.data.typeValue
				},
				success: res => {
					console.log(res.result,'ranklist')
					self.setData({
						rankList: res.result
					})
					resolve()
				},
				fail: err => {
					reject('网络开小差了~')
				},
				complete: () => {
				}
			})
		})
		return promise
	},

	changeTab: function (e) {
		const typeValue = e.detail.activeValue;
		this.setData({
			typeValue
		}, () => {
			wx.showLoading({
				title: '正在加载',
			})
			this.getRankList().then(() => {
				wx.hideLoading()
			})
		})
	},

	toDetail: function () {

	},

	onPullDownRefresh: function () {
		this.getRankList().then(() => {
			wx.stopPullDownRefresh()
		}, err => {
			wx.stopPullDownRefresh();
			wx.showModal({
				content: '网络开小差了',
			})
		});
	}
})