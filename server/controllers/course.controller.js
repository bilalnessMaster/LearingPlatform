import Course from "../lib/database/models/Course.js"



export const addNewCourse = async (req ,res) => {
    try {
        const courseData = req.body
        const NewCourse = new Course({
            ...courseData
        })
        const saveCourse = await NewCourse.save()
        res.status(200).json({
            success : true,
            message : "course succesfully created",
            data : saveCourse
                
            
        })
    } catch (error) {
        console.log('creating course ' + error);
        res.status(500).json({
            success : false,
            message : "error occured in  the server"
        })
    }
}
export const GetAllCourse = async (req ,res) => {
    try {
        const coursesList = await Course.find();
        res.status(200).json({
            success : true,
            message : "course succesfully created",
            data : coursesList
               
            
        })

    } catch (error) {
        console.log('creating course ' + error);
        res.status(500).json({
            success : false,
            message : "error occured in  the server"
        })
    }
}
export const GetCourseById = async (req ,res) => {
    try {
        const {id} = req.params
        const course = await Course.findById(id)
        if(!course)res.status(404).json({
            success : false,
            message : "course not found"
        })
        res.status(200).json({
            success : true,
            message : "course found",
            data : course
        })

    } catch (error) {
        console.log('creating course ' + error);
        res.status(500).json({
            success : false,
            message : "error occured in  the server"
        })
    }
}
export const updateCourseById = async (req ,res) => {
    try {
        const {id} = req.params
        const updateCourseData = req.body
        const course = await Course.findByIdAndUpdate(id , updateCourseData , {new : true})
        if(!course)res.status(404).json({
            success : false,
            message : "course not found"
        })
        res.status(200).json({
            success : true,
            message : "course updated succesfully",
            data : course
        })

    } catch (error) {
        console.log('creating course ' + error);
        res.status(500).json({
            success : false,
            message : "error occured in  the server"
        })
    }
}