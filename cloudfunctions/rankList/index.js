const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
	console.log(event.type)
	let list = [];
	if(event.type==1){
		res = await db.collection('resume').get()
		list = res.data
		console.log(list)
	}else{
		list = []
	}
	return list
}