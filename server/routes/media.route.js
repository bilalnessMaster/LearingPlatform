import express from 'express'
import multer from 'multer';
import { deleteMediaFromCloudinary ,uploadMediaToCloudinary  } from '../helpers/cloudinary.js';

const router = express.Router()

const upload = multer({dest : 'uploads/'});



router.post('/upload',upload.single('file') , async (req , res )=>{
    try {
        const result  = await uploadMediaToCloudinary(req.file.path)
        res.status(200).json({message : "upload successfully" , success : true , data : result})
    } catch (error) {
        res.status(500).json({success : false, message : "error  upload"})
    }
} )
router.delete('/delete/:id', async (req , res )=>{
    try {
        const {id} = req.params
        if(!id) res.status(500).json({success : false, message : "does not exists or  false id"})
        const result  = await DeviceOrientationEvent(id)
        res.status(200).json({message : "deleted successfully" , success : true , data : result})
    } catch (error) {
        res.status(500).json({success : false, message : "error  upload"})
    }
} )

export default router