const mongoose = require('mongoose')

var StudentSchema = new mongoose.Schema({
	Id:Number,
	name:String,
	password:String,
	remark:String
})
mongoose.model('Student',StudentSchema)