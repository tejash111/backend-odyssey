const multer = require('multer')
const path = require('path')

//set on multer storage
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"uploads/")
    },
    filename : function(req,file,cb){
        cb(null,
            file.fieldname+"-" + Date.now() + path.extname(file.originalname)
        )
    }
});

//file filter function
const checkFileFilter = (req,file,cb)=>{
    if (file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new Error('Not an image! pls upload only images'))
    }
}

module.exports = multer({
    storage,
    checkFileFilter,
    limits : {
        fileSize : 5*1024*1024 //5mb file size limit
    },
})