import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema
const LectureSchema = new Schema({
    title : String, 
    videoUrl : String,
    public_id : String,
    freePreview : Boolean
})
const CourseSchema = new Schema({
    instructorId : String, 
    instructorName : String , 
    date : Date , 
    title : String , 
    category : String,
    level : String, 
    language : String ,
    subtitle : String,
    description : String , 
    image : String, 
    welcomeMessage : String ,
    pricing : Number,
    Objectives : String, 
    students : [
        {
            studentId : String, 
            studentName : String,
            studentEmail: String
        }
    ],
    curriculum : [
        LectureSchema
    ],
    isPublised : Boolean
})

const Course  = mongoose.model('Course' , CourseSchema)

export default Course;