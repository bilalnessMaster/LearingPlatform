import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StudentCourseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  courses: [
    {
      _id  : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      dateOfPurchase: Date,
      
    },
  ],
});

const StudentCourse = mongoose.model('studentCourse', StudentCourseSchema)
export default StudentCourse;