const loginValidationMiddleware=(Schema)=>async(req,res,next)=>{
    try{
        const validatedata=await Schema.parseAsync(req.body)
        req.body=validatedata
        next()
    }catch(err){
        const status=422
        const errMsg=err.errors[0].message
        res.status(status).json({message:errMsg})
    }
}

export {loginValidationMiddleware}