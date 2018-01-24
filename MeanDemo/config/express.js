const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')

module.exports=()=>{
	var app = express()
	app.use(session({
		secret:'supercellM',
	    resave: false,
	    saveUninitialized: true,
	    cookie: {
	        maxAge: 30000000
	    }
	}))

	app.use(express.static(path.join(__dirname,'../public')))

	app.use(bodyParser.urlencoded())
	app.use(bodyParser.json())

	var Router = express.Router()
	require('../app/routes/student.server.route')(Router)
	app.use('/MeanDemo',Router)

	//统一处理未知路由
	app.use((req,res,next)=>{
		res.status(404)
		res.end('404 Not found')
	})

	//统一处理错误
	app.use((err,req,res,next)=>{
		if(err){
			throw err
			res.status(500)
			res.end('Error')
		}
	})

	return app
}