import { Schema,model } from "mongoose"

const taskSchema=Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    color:{
        type:String,
        default:"red",
        required:true
    },
    important:{
        type:Boolean,
        default:false,
    },
    completed:{
        type:Boolean,
        default:false,
    }
},{timeStamps:true})

export const taskModel=model("task",taskSchema)