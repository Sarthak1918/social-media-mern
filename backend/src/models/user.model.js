import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim:true,
        index:true
    },
    username : {
        type : String,
        required : true,
        unique:true,
        lowercase:true,
        trim:true
    },
    email : {
        type : String,
        required : true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        minLength:6,
        required:true,
        trim:true
    },
    profilePic:{
        type : String,
        default:""
    },
    followers:{
        type :[String],
        default : []
    },
    following:{
        type :[String],
        default : []
    },
    bio:{
        type :String,
        default : ""
    },
    
},{
    timeStamps:true
})


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,8)
    next()
})


export const User = mongoose.model("User",userSchema)

