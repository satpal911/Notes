const express = require("express")
const connectDb = require("./database/db")
const userRouter = require("./routes/user.router")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const noteRouter = require("./routes/note.router")
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/user",userRouter)
app.use("/api/v1/note",noteRouter)

connectDb()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port ${port}`)
    })
})
.catch((error)=>{
    console.log(`database connecting error ${error}`)
})
