import Course from "../lib/database/models/Course.js"


export const getAllCoursesForStudent = async (req ,res) => { 
    try {

        
        const {category= [] , level , page=1  , Language = [] , sortBy = -1 , limit = 10} = req.query

        let skip = (page-1)*limit
        let filter = {}
        if(category && category.length >0){
            filter.category = {$in : category.split(',')}
        }
        if(level && level.length > 0){
            filter.level = {$in : level.split(',')}
        }
        if(Language && Language.length > 0){
            filter.language = {$in : Language.split(',')}
        }
        // example
        // filter = { 
        //     category : {$in :[ 'backend' , 'frontend']} , 
        //     level : {$in :[ 'beginner' , 'intermediate']} , 
        //     language : {$in :[ 'spaine' , 'arabic']} , 
        // }
        // export const sortOptions = [
        //     { id: "price-lowtohigh", label: "Price: Low to High" },
        //     { id: "price-hightolow", label: "Price: High to Low" },
        //     { id: "title-atoz", label: "Title: A to Z" },
        //     { id: "title-ztoa", label: "Title: Z to A" },
        //   ];
        
        let sort = {}
        switch (sortBy) {
            case 'price-lowtohigh':
                sort.pricing  = 1
                break;
            case 'price-hightolow': 
                sort.pricing  = -1
                break
            case 'title-ztoa': 
                sort.title = 1
                break
            case 'title-atoz': 
                sort.title = -1 
                break
            default:
                sort.pricing = 1
                break;
        }
        let totalPage = await Course.countDocuments()
        totalPage = Math.ceil(totalPage/limit)
 
        
        const courseList = await Course.find(filter).skip(skip).sort(sort).limit(limit)
        res.status(200).json({message: "course found" , success: true , data : courseList , totalPage})
    } catch (error) {
        console.log('error happend while getting all courses for student '+error);
        res.status(500).json({message: "server errror" , success: false})
    }
}
export const getCourseDetailsForStudent = async (req ,res) => { 
    try {
        const {id} = req.params
        const course = await Course.findById(id)

        if(!course) return  res.status(404).json({message: "no course found" , success: false})
        res.status(200).json({message: "course found" , success: true , data : course})

    } catch (error) {
        console.log('error happend while getting all courses for student '+error);
        res.status(500).json({message: "server errror" , success: false})
    }
}