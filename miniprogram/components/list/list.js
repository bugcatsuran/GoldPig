// miniprogram/components/list/list.js
Component({

	externalClasses: ['goods_shell'],

	properties: {
		list: {
			type: Array,
			value: [],
		}
	},

	data: {

	},

	pageLifetimes: {
		show: function () {
			console.log('com', 666)
		},
	},

	methods: {
		tabGo(options) {
			const currentFood = options.currentTarget.dataset.currentfood;
			this.triggerEvent('tabGo', { currentFood });
		}
	}
})