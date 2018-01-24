const mongoose = require('mongoose')
const config = require('../../config/config')

var Student = mongoose.model('Student')

module.exports = {
	//add student
	add:(req,res,next)=>{
		var studentInfo = req.body
		console.log(studentInfo)
		var student = new Student({
			// Id:studentInfo.Id,
			name:studentInfo.name,
			password:studentInfo.password,
			remark:studentInfo.remark,
			
		})
		student.save((err)=>{
			if(err) {
				return next(err)
			}	
			res.json(student)
		})
	},
	findStudentName:(req,res,next)=>{
		Student.count({name:req.name},(err,total)=>{
			if(err) {
				return next(err)
			}
			if(total>0){
				res.json(true)
			}else{
				res.json(false)
			}
		})
	},
	login:(req,res,next)=>{
		var studentInfo = req.body
		Student.findOne({name:studentInfo.name,password:studentInfo.password},(err,doc)=>{
			if(err) {
				return next(err)
			}
			req.session.student=doc;
			res.json(doc)
		})
	},
	//find student by id
	get:(req,res,next)=>{
		Student.findOne({_id:req.Id},(err,doc)=>{
			if(err) {
				return next(err)
			}
			res.json(doc)
		})
	},
	getAll:(req,res,next)=>{
		Student.find({},(err,doc)=>{
			if(err) {
				return next(err)
			}
			res.json(doc)
		})
	},
	update:(req,res,next)=>{
		var studentInfo = req.body
		var condition = {
			_id:studentInfo._id
		}
		var update = {$set : {
			name:studentInfo.name,
			password:studentInfo.password,
			remark:studentInfo.remark,
		}};
		Student.update(condition,update,(err,doc)=>{
			if(err){
				return next(err)
			}
			console.log('update success')
			res.json('update success')
		})
	},
	remove:(req,res,next)=>{
		Student.remove({_id:req._id},(err,doc)=>{
			if(err) {
				return next(err)
			}
			res.json("success")
		})
	}
}

function getNextSequence(name) {
   var ret = Student.counters.findAndModify(
          {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
          }
   );
   return ret.seq;
}