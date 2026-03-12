const express = require("express")
const connectDb = require("./database/db")
const port = 3000
const app = express()

app.use(express.json())

connectDb()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port ${port}`)
    })
})
.catch((error)=>{
    console.log(`database connecting error ${error}`)
})
