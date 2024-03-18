import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import jwt from "jsonwebtoken"

export const verifyUserJWT = AsyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.jwt || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            throw new ApiError(404,"Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decodedToken?.userId).select("-password")
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Access Token")
    }
})