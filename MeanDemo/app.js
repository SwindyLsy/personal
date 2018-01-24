const express = require('./config/express')
const mongodb = require('./config/mongoose')


var db = mongodb(express)