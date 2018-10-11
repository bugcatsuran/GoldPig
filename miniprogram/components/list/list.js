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
		},
	},

	methods: {
		goDetail(e) {
			const current = e.currentTarget.dataset.current;
			this.triggerEvent('goDetail', { current });
		}
	}
})