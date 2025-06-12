const express = require('express')
const {registerUser,loginUser,changePassoword}=require('../controllers/auth-controller')
const router = express.Router()
const authMiddleware = require("../middleware/auth-middleware")

//all routers are releated to authentication and authorization
router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/change-password',authMiddleware,changePassoword)




module.exports = router;