import User from "../lib/database/models/User.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()



export const register = async (req, res) => {
    try {
        const {username , email , password} = req.body
        const user = await User.findOne({$or : [{email} , {username}]})
    if(user) return res.status(400).json({
        message: 'user name or email already exists',
        success : false ,
    })
    const newUser = await User.create({
        username , 
        email, 
        password
    })
    return res.status(201).json({
        message: 'user register successfully',
        success : true ,
    })
    } catch (error) {
        console.log('error happend while resgister '+error);
        
    }
}

export const login = async (req ,res) => { 
    try {

        
        const { email , password} = req.body
        const user = await User.findOne({ email})
        if(!user || !user.ComparePassword(password) ) return res.status(400).json({
            message: 'password or the email is incorrect',
            success : false ,
        })
        const accessToken = jwt.sign({
            userId : user._id,
            username  : user.username ,
            email : user.email , 
            role : user.role 

        } , process.env.SECRET_KEY,{expiresIn : '120m'})

        return res.status(200).json({
            message: 'logged in successfully',
            success : true ,
            data : {
                accessToken , 
                user : {
                    userId : user._id,
                    username  : user.username ,
                    email : user.email , 
                    role : user.role 
                }
            }
        })
    } catch (error) {
        console.log('error happend while login '+error);
           
    }
}

export const checkAuth =  async (req ,  res) => { 
    try {
        const user = req.user

        return res.status(200).json({
            message : 'retrive user went successfully',
            success : true , 
            data : {
                    user
            }
        })

    } catch (error) {
        
    }
}