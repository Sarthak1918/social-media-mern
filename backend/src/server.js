import "dotenv/config.js"
import express from "express"

const app = express();

app.get("/",(req,res)=>{
    res.send("Home")
})


app.listen(process.env.PORT || 6000,()=>{
    console.log("Server  is running on port 5000");
})