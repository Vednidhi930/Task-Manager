const errorMiddleware=(err,req,res,next)=>{


    const status=err.status || 500
    const message=err.message || "internal error occured"
    res.status(status).json({message:message})
}

export default errorMiddleware