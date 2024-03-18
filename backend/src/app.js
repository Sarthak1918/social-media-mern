import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

//when we want to use any external middleware or we want to do some configuration, we use by "app.use"
//middlewares

app.use(express.json()) //to accept json data
app.use(express.urlencoded({extended:true})) //to accept form data(to handle special characters an all)
app.use(express.static("public"))
app.use(cookieParser()) //to parse cookies

//import routes


//routes declaration



export { app }