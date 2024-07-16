import  Jwt  from "jsonwebtoken";
const JWT_SECRET_KEY="vednidhi123"

const loginMiddleware=(req,res,next)=>{

    const checkToken=req.cookies.userToken

    if(!checkToken) res.status(422).json({message:"user not found"})

    const checkUser=Jwt.verify(checkToken,JWT_SECRET_KEY)
    
    if(!checkUser){
        res
        .status(422)
        .json({message:"invalid token"})
    }else{
        res
        .status(200)
        .json({message:"Token Verified",user:checkUser})
    }
    next()
}   

export default loginMiddleware;