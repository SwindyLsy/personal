const mongoose = require('mongoose')
const config = require('./config')

module.exports=(express)=>{
	var db = mongoose.connect(config.mongodb,()=>{
		console.log('db connected....')
		var app = express()
		app.listen(config.PORT,()=>{
			console.log('server start...')
		})
	})
	require('../app/models/student.server.model')
}