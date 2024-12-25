import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors'
import {db} from './lib/database/db.js'
import authRoutes from './routes/auth.route.js'
import MediaRoutes from './routes/media.route.js'
import CourseRoutes from './routes/course.route.js'
import CourseStudentRoutes from './routes/studentCourse.route.js'
dotenv.config();
const app = express()
const port = process.env.PORT || 5000;
const client_url= process.env.CLIENT_URL
app.use(express.json())
app.use(cors({
    origin : client_url,
    credentials : true,
    methods : ['POST' , 'GET','PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))



app.use("/auth" , authRoutes)
app.use("/media" , MediaRoutes)
app.use('/courses', CourseRoutes)
app.use('/student/course', CourseStudentRoutes)





app.use((err , req,res,next)=>{
    console.log(err.stack);
    res.json({
        success : false , 
        message : 'something went wrong '
    });
})
app.listen(port , ()=> {
    console.log('server runinng at port : '+port);
    db();
})