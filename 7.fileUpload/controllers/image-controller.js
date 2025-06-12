const Image = require('../models/image')
const uploadToCloudinary = require('../helpers/cloudinaryHelper')
const fs = require('fs')
const { log } = require('console')
const cloudinary = require('../config/cloudinary')
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
        //sorting and pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page-1) * limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc'?1:-1;
        const totalImages=await Image.countDocuments();
        const totalPages = Math.ceil(totalImages/limit);

        const sortObj = {};
        sortObj[sortBy]=sortOrder;
        

        const images = await Image.find({}).sort(sortObj).skip(skip).limit();

        if (images){
            res.status(200).json({
                success:true,
                currentPage:page,
                totalPages:totalPages,
                totalImages:totalImages,
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

//image delete
const imageDeleteController = async(req,res)=>{
    try {
        const getImageIdToDelete = req.params.id
        const userId = req.userInfo.userId;

        const image = await Image.findById(getImageIdToDelete);

        if (!image){
            return res.status(404).json({
                success:false,
                message:"Image not found"
            })
        }

        //check if this image uplaoded by the current user who try to delte this image
        if (image.uploadedBy.toString() !== userId){
            return res.status(403).json({
                success:false,
                message:"you are not authorized to delete this image"
            })
        }

        //delte this first from cloundinary storeage
        await cloudinary.uploader.destroy(image.publicId)

        //delete this image from mongoDb db
        await Image.findByIdAndDelete(getImageIdToDelete);

        res.status(200).json({
            success:true,
            message:"Image deleted successfully"
        })
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
    fetchImageController,
    imageDeleteController
}