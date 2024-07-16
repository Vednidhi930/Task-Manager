import zod from "zod";

const loginSchema=zod.object(
    {
    
       email:zod
       .string({required_error:"email is required"})
       .trim()
       .email({message:"invalid Email"})
       .min(3,{message:"Email must be of more than 3 character"})
       .max(100,{message:"Email must be of less than 100 character"}),

       password:zod
       .string({required_error:"password is required"})
       .trim()
       .min(3,{message:"password must be of More than 3 Alphabat"})
       .max(100,{message:"password must be of less than 100 character"})
    }  
)

export {loginSchema}