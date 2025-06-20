const jwt = require('jsonwebtoken')
require('dotenv').config()
const auth = (req,res,next)=>{
    // console.log(req.headers, "This is header")
tokenBearer = req.headers.authorization
    // console.log(tokenBearer,"Token in bearer ****")

    if(!tokenBearer?.startsWith('Bearer ')){
        res.send({message:"Invalid authorization header"})
    }
        let token = tokenBearer.split(' ')
        token = token[1]
       
        console.log(token)

        let decoded = jwt.verify(token,process.env.SECRET_KEY)
        console.log(decoded)

        req.user = decoded;
    

    next()
}

module.exports = {auth}