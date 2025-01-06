import StudentCourse from "../lib/database/models/StudentCourses.js"
import Course from "../lib/database/models/Course.js"
import CourseProgress from "../lib/database/models/CourseProgress.js"




export const  markProgress = async (req ,res) => { 
        try {
            const {userId,courseId,lectureId} = req.body
            let progress = await CourseProgress.findOne({
                userId , 
                courseId
            }) 

            const  course = await Course.findById(courseId)
            if(!course) {
                    return res.status(404).json({
                        message : 'course does not found', 
                        success : false
                    })
            }
            if(!progress) {
            progress = new CourseProgress({
                    userId , 
                    courseId , 
                    lecturesProgress : [
                        {
                            lectureId , 
                            viewed : true , 
                            dateViewed : new Date()
                        }
                    ]
            })
            }else{
                let lectureProgress = progress?.lecturesProgress?.find(item => item.id == lectureId)
                if(lectureProgress){
                    lectureProgress.viewed = true
                    lectureProgress.dateViewed = new Date()
                }else{
                     progress.lecturesProgress.push({
                        lectureId , 
                        viewed : true , 
                        dateViewed : new Date()

                     })
                }
                
            }
            const completed = progress?.lecturesProgress?.length  === course.curriculum.length && progress.lecturesProgress.every(item => item.viewed)
            if(completed) { 
                progress.completed = completed
                progress.completedDate = new Date()
            }
            await progress.save()
            return res.status(200).json({message : 'progress marked' , success : true ,progress })
        } catch (error) {
            console.log('erro happedn while marking the progress '+error);
            res.status(500).json({
                message : 'error occured in serverr ', 
                success : false
            })
        }
}

export const  getCurrentProgress = async (req ,res) => { 
    try {
        const {userId , courseId} = req.params
        const studentCourses = await StudentCourse.findOne({userId})
        if(!studentCourses) {
            return res.status(200).json({
                success : true , 
                isPurchased : false , 
                message : 'you dont have any courses yet'
            })
        }
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                success : false , 
                message : 'course not found'
            })
        }
        const isCurrentCoursePurchasedBycurrentUser = studentCourses?.courses?.findIndex(course => course.id === courseId) > -1
      
        if(!isCurrentCoursePurchasedBycurrentUser ){
            return res.status(200).json({
                success : true , 
                isPurchased : isCurrentCoursePurchasedBycurrentUser , 
                message : 'you have to buy the course in order to watch it'
            })
        }
        const currentProgress = await CourseProgress.findOne({ userId , courseId})
        if(!currentProgress || currentProgress?.lecturesProgress?.length === 0) {
           
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
                courseDetails : course,
                progress : currentProgress?.lecturesProgress , 
                completed : currentProgress?.completed , 
                completedDate  : currentProgress?.completedDate , 
                isPurchased : true
            }
        })

    } catch (error) {
        console.log('erro happedn while get current   progress '+error);
        res.status(500).json({
            message : 'error occured in serverr ', 
            success : false
        })
    }
}


export const  restProgress = async (req ,res) => { 
    try {
        const {userId , courseId} = req.body
        const progress = await CourseProgress.findOne({
            courseId , userId
        })
        if(!progress){
            res.status(404).json({
                message : 'progress does not found', 
                success : false
            })
        }
        progress.lecturesProgress = []
        progress.completed = false
        progress.completedDate = null
        await  progress.save()
        return res.status(200).json({
            message : "reset th course" , 
            succes : true 
        })
    } catch (error) {
        console.log('erro happedn while rest the progress '+error);
        res.status(500).json({
            message : 'error occured in serverr ', 
            success : false
        })
    }
}