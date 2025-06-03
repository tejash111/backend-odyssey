const express = require('express')
const {registerUser,loginUser}=require('../controllers/auth-controller')
const router = express.Router()

//all routers are releated to authentication and authorization
router.post('/register',registerUser)
router.post('/login',loginUser)



module.exports = router;