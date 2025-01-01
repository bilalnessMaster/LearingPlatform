import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const lectureProgressSchema = new Schema({
    lecturedId : String , 
    viewed : Boolean , 
    dateViewed  : Date

})

const courseProgressSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User"
    }, 
    courseId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "Course"
    },
    completed : {
        type : Boolean , 
        default : false
    }, 
    completedDate : Date , 
    lecturesProgress : [
        lectureProgressSchema
    ]

})

const CourseProgress = mongoose.model('CourseProgress',courseProgressSchema)