//router uses here
const express=require('express')
const {authenticate} =require('../mildware/index')
const router=express.Router()
const controller=require('../controller/index')
const employeecontroller=require('../controller/employeecontroller')
router.post('/register',controller.register)
router.post('/login',controller.login)
router.get('/',authenticate,employeecontroller.index)

module.exports=router
