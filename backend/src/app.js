import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {v2 as cloudinary} from "cloudinary"
import path from "path";
import job from "./cron/cron.js";


const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

const __dirname = path.resolve()
//when we want to use any external middleware or we want to do some configuration, we use by "app.use"
//middlewares

job.start()


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
import job from "./cron/cron.js";

//routes declaration
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}



export { app }