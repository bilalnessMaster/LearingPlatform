import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username : {
        type : String  , 
        required : true 
    },
    email : {
        type : String  , 
        required : true 
    },
    password : {
        type : String , 
        requied : true,
        minLength: 5
    },
    role:{
        type :  String, 
        default : 'user'
    }
})

UserSchema.pre('save' , async function(next){
    try {
        if(!this.isModified('password')) next()
            let salt = await bcrypt.genSalt(16)
            this.password = await bcrypt.hash(this.password , salt)
            next()
    } catch (error) {
        next(error);
        console.log('error happend while hashing the password of user ');
    }
})

UserSchema.methods.ComparePassword = async function(pwd){
    return bcrypt.compare(pwd , this.password)
}

const User = mongoose.model('User', UserSchema)

export default User;