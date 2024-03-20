import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {v2 as cloudinary} from "cloudinary"

const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

//when we want to use any external middleware or we want to do some configuration, we use by "app.use"
//middlewares

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})


app.use(express.json({limit: '50mb'})) //to accept json data
app.use(express.urlencoded({extended:true,limit: '50mb'})); //to accept form data(to handle special characters an all)
app.use(express.static("public"))
app.use(cookieParser()) //to parse cookies


//import routes
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"

//routes declaration
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)



export { app }