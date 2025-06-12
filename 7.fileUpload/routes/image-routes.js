const express =require('express');
const authMiddleware = require('../middleware/auth-middleware');
const router = express.Router();
const adminMiddleware =require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/uplaod-middleware')
const {uplaodImageController,fetchImageController} = require('../controllers/image-controller')

//upload the image
router.post('/upload' ,authMiddleware,adminMiddleware,uploadMiddleware.single('image'),uplaodImageController)

//get all the images
router.get("/get",authMiddleware,fetchImageController);

module.exports = router