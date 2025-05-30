import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credential:true
}))
//common middlewar
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import userRouter from "./routes/user.route.js"


//user routes
app.use("/api/v1/users", userRouter)



export {app}
