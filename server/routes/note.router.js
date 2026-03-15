const express = require ("express")
const { createNote, readNote, updateNote, deleteNote } = require("../controllers/note.controller")
const userAuthentication = require("../middleware/auth.user")

const noteRouter = express.Router()

noteRouter.post("/createNote",userAuthentication,createNote)
noteRouter.get("/readNote",userAuthentication,readNote)
noteRouter.put("/updateNote/:id",userAuthentication,updateNote)
noteRouter.delete("/deleteNote/:id",userAuthentication,deleteNote)

module.exports = noteRouter