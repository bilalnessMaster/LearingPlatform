import Course from "../lib/database/models/Course.js"


export const getAllCoursesForStudent = async (req ,res) => { 
    try {
        const courseList = await Course.find()

        if(courseList.length === 0) return  res.status(500).json({message: "no course found" , success: false})

            res.status(200).json({message: "course found" , success: true , data : courseList})
    } catch (error) {
        console.log('error happend while getting all courses for student '+error);
        res.status(500).json({message: "server errror" , success: false})
    }
}
export const getCourseDetailsForStudent = async (req ,res) => { 
    try {
        const {id} = req.params
        const course = await Course.findById(id)

        if(!course) return  res.status(500).json({message: "no course found" , success: false})
        res.status(200).json({message: "course found" , success: true , data : course})

    } catch (error) {
        console.log('error happend while getting all courses for student '+error);
        res.status(500).json({message: "server errror" , success: false})
    }
}