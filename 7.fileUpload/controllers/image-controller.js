const Image = require('../models/image')
const uploadToCloudinary = require('../helpers/cloudinaryHelper')
const fs = require('fs')
const { log } = require('console')
const uplaodImageController = async (req,res)=>{
    try {
        //check if file is missing in req object 
        if (!req.file){
            return res.status(400).json({
                success:false,
                message:'file is required pls uplaod an image'
            })
        }

        //upload to cloudinary
        const {url,publicId} = await uploadToCloudinary(req.file.path)

        //store the image url and publlic id along with upladed userid

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy : req.userInfo.userId
        })

        await newlyUploadedImage.save();

        //delete the file from local storage
        fs.unlinkSync(req.file.path)


        res.status(201).json({
            success:true,
            message:'image uploaded successfully',
            image:newlyUploadedImage,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success:false,
            message:'soemthing wrong pls try again'
        })
        
        
    }
}

const fetchImageController = async(req,res)=>{
    try {
        const images = await Image.find({})

        if (images){
            res.status(200).json({
                success:true,
                data:images,
            })
        }
    } catch (error) {
        console.log(error);
        req.status(500).json({
            success:false,
            message:"something went wrong! pls try again"
        })
        
    }
}

module.exports={
    uplaodImageController,
    fetchImageController
}