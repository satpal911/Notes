const multer = require ("multer")
const path = require ("path")

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"uploads/")
    },
    fileName: (req,file,cb) => {
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req,file,cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();

    if(allowedTypes.test(ext)){
        cb(null,true)
    }
    else{
        cb(new Error("Only images are allowed"),false)
    }

}

const upload = multer({
    storage,
    limits: {fileSize: 10 * 1024 * 1024},   // 10 mb
    fileFilter
})

module.exports = upload