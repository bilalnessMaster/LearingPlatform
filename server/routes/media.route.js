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
router.post('/bulk-upload', upload.array('files', 10) , async (req,res) => { 
    try {
        const PromiseFiles = req.files.map(file => uploadMediaToCloudinary(file.path));
        const results = await Promise.all(PromiseFiles)
        res.status(200).json({message : "upload successfully" , success : true , data : results})
    } catch (error) {
        console.log(" while bulk uploading" ,error);
        
        res.status(500).json({success : false, message : "error in bulk upload"})
    }
} )
router.delete('/delete/:id', async (req , res )=>{
    try {
        const {id} = req.params
        console.log(id);
        
        if(!id) res.status(500).json({success : false, message : "does not exists or  false id"})
        const result  = await deleteMediaFromCloudinary(id)
        res.status(200).json({message : "deleted successfully" , success : true , data : result})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({success : false, message : "error  delete"})
    }
} )

export default router