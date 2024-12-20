import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();
const {
    CLOUDINARY_CLOUD_NAME : name , 
    CLOUDINARY_API_KEY : key , 
    CLOUDINARY_API_SECRET : api
}= process.env

const cloudinaryInstance = cloudinary.config({
    cloud_name : name , 
    api_key : key , 
    api_secret : api
})

const uploadMediaToCloudinary = async (filePath) => { 
    try {
       
        const result = await cloudinary.uploader.upload(filePath , {
            resource_type : "auto"
        })
        return result
    } catch (error) {
        console.log('error while uploading the video to cloudinary '+error)
    }
}


const deleteMediaFromCloudinary = async (publicId) => { 
    try {
        console.log(publicId);
        
        const result = await cloudinary.uploader.destroy(publicId ,{ resource_type: "video" }) 
        return result

    } catch (error) {
        console.log('error while deleting the video to cloudinary '+error)
    }
}


export {deleteMediaFromCloudinary , uploadMediaToCloudinary};