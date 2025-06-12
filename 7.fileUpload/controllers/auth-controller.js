const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//register controller 
const registerUser = async(req,res)=>{
    try {
        //extract user information from our req body
        const {username,email,password,role}=req.body

        //check if the user is already exists in our db
        const checkExistingUser = await User.findOne({$or:[{username,email}]})
        if (checkExistingUser){
            return res.status(400).json({
                success:false,
                message:'user alredy exist with same username or same email'
            })
        }

        //hash user passowrd 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //create a new user and save in your db
        const newlyCreatedUser=new User({
            username,
            email,
            password : hashedPassword,
            role : role || 'user'
        })

        await newlyCreatedUser.save();

        if (newlyCreatedUser){
            res.status(201).json({
                success:true,
                message:'user register successfully'
            })
        }else{
            res.status(400).json({
                success:false,
                message:'unable to reigister user pls try again'
            })
        }

        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success:false,
            message:'something is wrong'
        })
        
    }
}

//login controller
const loginUser = async(req,res)=>{
    try {
        const {username,password}=req.body
        
        //find fi the current user is exists in db or not
        const user = await User.findOne({username});

        if (!user){
            return res.status(400).json({
                success:false,
                message:'user doesnt exists'
            })
        }

        //if the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password,user.password)

        if (!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:'invialid credentials'
            })
        }

        //create user token
        const accessToken = jwt.sign({
            userId : user._id,
            username : user.username,
            role : user.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'15m'
        })

        res.status(200).json({
            success:true,
            message:"logging in successfull",
            accessToken
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success:false,
            message:'something is wrong'
        })
        
        
    }
}

//change password 
const changePassoword = async(req,res)=> {
    try {
        const userId=req.userInfo.userId

        //extract old and new password
        const {oldPassword,newPassword} = req.body;

        //find the current logged user
        const user = await User.findById(userId);

        if (!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        //check if old passoword is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword,user.password);

        if (!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"password is not correct"
            })
        }

        //hash the new password here
        const salt = await bcrypt.genSalt(10)
        const newHashedPassoword = await bcrypt.hash(newPassword,salt);

        //update user paassowrd
        user.password=newHashedPassoword;
        await user.save();

        res.status(200).json({
            success:true,
            message:"passowrd changed successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'some errror occured pls try again'
        })
    }
}

module.exports = {loginUser,registerUser,changePassoword}