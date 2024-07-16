import  { Schema,model,Types } from "mongoose"

const userSchema=new Schema(
{
    username:
    
    {
        type:String,
        required:true,
    },

    email:

    {
        type:String,
        required:true,
        unique:true,
    },

    password:

    {
        type:String,
        required:true, 
    },

    tasks:[
        {
            type:Types.ObjectId,
            ref:"task"
        }
    ]

    
},

{
    timeStamps:true
}

)

export const userModel=model("User",userSchema)