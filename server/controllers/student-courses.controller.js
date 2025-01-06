import Course from "../lib/database/models/Course.js"
import StudentCourse from "../lib/database/models/StudentCourses.js";



export const getStudentCoursesbyuserId = async (req , res) => {
    try {
        const {id} = req.params ; 
        const studentCourse = await StudentCourse.find({userId :id})
        if(!studentCourse){
            res.status(404).json({
                success : false  , 
                message : "does not exist",
                data : []
            }) 
        }
        
        
        const courses = await Course.find({ _id: {$in :studentCourse[0]?.courses}})
      
        
        res.status(200).json({
            success : true , 
            message : "fetching student's courses",
            data : courses 
        })
    }catch(error){
        console.log('error happend while getting courses for each student '+error);
        res.status(500).json({message: "server errror" , success: false})
    }
}