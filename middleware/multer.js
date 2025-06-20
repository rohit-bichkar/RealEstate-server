const multer = require('multer');
const path = require('path'); 
const fs = require('fs')

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, uploadDir)
    },
    filename: (req,file,cb)=>{
        cb(null, `brand_${Date.now()}${path.extname(file.originalname)}`);
    }

})

const fileFilter = (req,file,cb)=>{
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']; 
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true); // Accept the file
    }else{
        cb(new Error('Invalid file type', false))
    }
}


const upload = multer({storage,fileFilter})

module.exports = upload