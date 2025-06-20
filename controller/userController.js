const User = require('../models/userModel')

const jwt = require('jsonwebtoken')
require('dotenv').config()


const registerUser = async(req,res)=>{
    const {name , email, password,role} = req.body
    try {

        // const existingUser = findOne({email})
        // console.log(existingUser)

        // if(existingUser){
        //     res.status(200).send({message:"User already exists", success:false})
        // }
        const newUser = await User.create({name,email,password,role})
        res.status(200).send({message:"User registered successfully", success:true})
    } catch (error) {
        res.status(500).send({error:error})
        
    }
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body
    try {
        const loggedInUser = await User.findOne({where:{email:email, password:password},attributes:['id','name','IsAdmin']});
        console.log(loggedInUser, "login user")

        const user = loggedInUser.dataValues;  
        console.log(user, "User data *****")

        const token = jwt.sign(user,process.env.SECRET_KEY,{expiresIn:'24h'} )
        console.log(token,"Token")
        res.status(200).send({message:"User Loggin successfully", success:true, token:token})
    } catch (error) {
        res.status(500).send({error:error})
    }
}

const getUserInfo = async(req,res) =>{
    console.log("req.user",req.user)
    try {
        loggedInUser = await User.findOne({where:{id:req.user.id},attributes:['id','name','email','IsAdmin']})
        res.status(200).send({message:"Got user info ",loggedInUser:loggedInUser})
    } catch (error) {
        res.status(500).send({error:error})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserInfo
}