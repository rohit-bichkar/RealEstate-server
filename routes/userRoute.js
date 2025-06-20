const express = require('express')

const router = express.Router()

const userController = require('../controller/userController')
const { auth } = require('../middleware/auth')


router.post('/register',userController.registerUser)

router.post('/login',userController.loginUser)

router.get('/getUserInfo',auth,userController.getUserInfo)



module.exports= router