const Note = require("../models/note.model")

const createNote = async(req,res) =>{
    try {
        const{name, description} = req.body
        const userId = req.user._id
        if(!name || !description){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existNote = await Note.findOne({name, user:userId})

        if(existNote){
            return res.status(400).json({
                message: "Already exist note with this name"
            })
        }
        const note = new Note({
            name,
            description,
            user: userId
        })
        const savedNote = await note.save()
        res.status(201).json({
            status: 1,
            message: "New note created successfully",
            data: savedNote
            })
    } catch (error) {
        console.log(`server error ${error}`)
        res.status(500).json({
            status: 0,
            message: "Internal server error"
        })
    }

}

const readNote = async(req,res) =>{
    try {
        const notes = await Note.find({user: req.user._id}).sort({createdAt: -1})
        res.status(200).json({
            status: 1,
            message: "All notes fetched successfully",
            count: notes.length,
            data: notes
        })
    } catch (error) {
        console.log(`server error ${error}`)
        res.status(500).json({
            status: 0,
            message: "Internal server error"
        })
    }

}

const updateNote = async(req,res) =>{
    try {
        const {name,description} = req.body
        const {id} = req.params
        const userId = req.user._id
        const note = await Note.findOneAndUpdate({_id: id, user: userId},
            {name,description},
            {returnDocument: 'after', runValidators:true}
        )
        if(!note){
            return res.status(400).json({
                message: "data not found"
            })
        }
        res.status(200).json({
            status: 1,
            message: "Note updated successfully",
            data: note
        })
    } catch (error) {
        console.log(`server error ${error}`)
        res.status(500).json({
            status: 0,
            message: "Internal server error"
        })
    }

}

const deleteNote = async(req,res) =>{
    try {
        const {id} = req.params
        const userId = req.user._id
        const note = await Note.findOneAndDelete({_id: id, user: userId })
        if(!note){
           return res.status(400).json({
                message: "data not found"
            })
        }
        res.status(200).json({
            status: 1,
            message: "Note deleted successfully"
        })
    } catch (error) {
        console.log(`server error ${error}`)
        res.status(500).json({
            status: 0,
            message: "Internal server error"
        })
    }

}

module.exports = {
    createNote,
    readNote,
    updateNote,
    deleteNote
}