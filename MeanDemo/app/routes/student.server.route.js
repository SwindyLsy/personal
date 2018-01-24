var StudentController = require('../controllers/student.server.controller')

module.exports=(Router)=>{
	Router.param('studentId',(req,res,next,studentId)=>{
		req.studentId = studentId;
		next()
	}).param('name',(req,res,next,name)=>{
		req.name = name;
		next()
	})

	Router.route('/student/:studentId')
	.get(StudentController.get)
	.delete(StudentController.remove)

	Router.route('/student')
	.get(StudentController.getAll)
	.post(StudentController.add)
	.put(StudentController.update)

	Router.route('/studentName/:name')
	.get(StudentController.findStudentName)

	Router.route('/studentInfo')
	.post(StudentController.login)
}