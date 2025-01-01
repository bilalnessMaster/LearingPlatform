import StudentCourse from "../lib/database/models/StudentCourses.js"
import Course from "../lib/database/models/Course.js"



export const  markProgress = async (req ,res) => { 
        try {
            


        } catch (error) {
            console.log('erro happedn while marking the progress '+error);
            
        }
}

export const  getCurrentProgress = async (req ,res) => { 
    try {
        const {userId , courseId} = req.params
        const studentCourses = await StudentCourse.find() 
        const isCurrentCoursePurchasedBycurrentUser = studentCourses?.courses.findIndex(course => course.id === courseId) > -1
        if(!isCurrentCoursePurchasedBycurrentUser) {
            return res.status(200).json({
                success : false , 
                isPurchased : isCurrentCoursePurchasedBycurrentUser , 
                message : 'you have to buy the course in order to watch it'
            })
        }
        const currentProgress = await CourseProgres.findOne({ userId , courseId}).populate ('courseId')
        
        if(currentProgress.lecturesProgress.length === 0) {
            const course = await Course.findById(courseId)
            if(!course){
                return res.status(404).json({
                    success : false , 
                    message : 'course not found'
                })
            }
            return res.status(200).json({
                success : true , 
                message : 'no progress found',
                data : { 
                    courseDetails : course , 
                    progress : [],
                    isPurchased : true
                }
            })
        }

        res.json({
            message : "progress" , 
            success : true , 
            data  : {
                courseDetails : currentProgress.courseId,
                progress : currentProgress.lecturesProgress , 
                completed : currentProgress.competed , 
                completedDate  : currentProgress.completedDate , 
                isPurchased : true
            }
        })

    } catch (error) {
        console.log('erro happedn while get current   progress '+error);
        
    }
}


export const  restProgress = async (req ,res) => { 
    try {

    } catch (error) {
        console.log('erro happedn while rest the progress '+error);
        
    }
}