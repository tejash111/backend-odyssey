
const jwt = require('jsonwebtoken')
const authMiddleware = (req,res,next)=>{
   
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]

    if (!token){
        res.status(401).json({
            success:false,
            message:'access denied pls login to continue'
        })
    }
    
    //decode this token
    try {
        const decodedTokenInfo = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log((decodedTokenInfo));

        req.userInfo = decodedTokenInfo
        next();
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:"access denied no token provided pls login to continue"
        })
    }

}

module.exports  = authMiddleware