import axios from '@/api/axiosInstance';
import { progress } from 'framer-motion';

import {create} from 'zustand';
interface useStudentStoreProps {
    studentCourseList :any[];
    purchased : boolean ;
    lecture :  {
        title?: string;
        videoUrl?: string;
        freePreview?: boolean;
        public_id?: string;
        _id? : string;
    } ;
    progress : any[];
    myCourses :any[],
    approval_url: string | null,
    course : any , 
    totalPage : number | null , 
    loading : boolean , 
    completedCourse : boolean ;
    fetchStudentCoures : (filter?: any ,sort?:string , page?:number) => void;
    fetchCourseDetails : (id: string , userId : string | undefined ) => void;
    handleCreatePayment :  (payload : any) => void;
    checkpayment : (paymentId: string , payer  : string) => void;
    boughtCourse : (id : string) => void;
    getCurrentCourseProgress  :  (userId:  string | undefined , courseId: string | undefined) => void;
    markProgress  :  (userId:  string | undefined  , courseId: string | undefined , lectureId: string | undefined) => void;
    resetProgress  :  (userId: string | undefined , courseId: string | undefined )=> void;

}

export const useStudentStore = create<useStudentStoreProps>((set , get ) =>({
    loading : false , 
    lecture : {},
    studentCourseList : [] , 
    myCourses : [],
    totalPage : null ,
    course  : {},
    purchased : false , 
    approval_url : null,
    progress  : [],
    completedCourse : false ,
    fetchStudentCoures : async (filter=[] ,sort='n' , page=1) => {

        try {
            set({loading : true})
            const query = new URLSearchParams({
                ...filter , 
                sortBy : sort , 
                page 
            })
        
            const {data} = await axios.get(`/student/course/get?${query}`)
            if(data.success){
                set({studentCourseList  :data.data ,totalPage : data.totalPage})
            }
            set({loading : false})
        } catch (error) {
            console.log('courses not found');
            set({loading : false})
        }
    },
    fetchCourseDetails : async (id ,userId)=>  {
        try {
            set({loading : true ,purchased : false})
            const {data}  = await axios.get(`/student/course/getDetails/${id}/${userId}`)
            console.log(data);
            
            if(data.success) set({course : data.course , purchased  : data.alreadyPurchased})
            set({loading : false})
        } catch (error) {
            console.log('cousre not found '+error);
            set({loading : false})
        }
    },
    handleCreatePayment : async (payload : any) => {
        try {

            const {data} = await axios.post('order/create' , payload)
            if(data.success){
                sessionStorage.setItem('currentOrder', data.orderId)
                window.location.href = data.approvalUrl.href
            }
            
        } catch (error) {
            console.log('cousre not found');
            
        }
    },
    checkpayment : async (paymentId , payerId) =>{
        try {
            const orderId  = sessionStorage.getItem('currentOrder')
            const {data} = await axios.post('order/check-payment' ,{
                paymentId , payerId , orderId
            })
            if(data.success){
                sessionStorage.removeItem('currentOrder')
                window.location.href = '/student-courses'
            }
            
        } catch (error) {
            console.log('cousre not found');
        }
    }, 
    boughtCourse : async (id) => { 
        try {
            set({
                purchased : false
             })
            const {data} = await  axios.get(`/boughtCourses/get-student-courses/${id}`)
            if(data.success){
                set({
                    myCourses : data?.data
                })
            }
        } catch (error) {
            console.log('cousre not found');
        }
    } , 
    getCurrentCourseProgress  : async (userId , courseId) => {
        try {
            set({
               purchased : false, 
               completedCourse : false
            })
            const {data} = await axios.get(`/progressCourse/get/${userId}/${courseId}`)

            if(data.success){
               
                
                if(!data?.data?.isPurchased){
                    set({
                        purchased : true
                    })
                }else{
                    
                    set({
                        course : data?.data?.courseDetails , 
                        progress :  data?.data?.progress
                    })
                    
                  
                   if(data?.data?.completed){
               
                    
                        set({
                            lecture : data?.data?.courseDetails?.curriculum[0] ,
                            completedCourse : true, 
                            progress :  data?.data?.progress
                        })
                   }
                   if(data?.data?.progress?.length  === 0 || data?.data?.progress?.every((item : any )=> !item.viewed)  ){
                        set({
                            lecture :  data?.data?.courseDetails?.curriculum[0] ,
                            progress :  data?.data?.progress
                        })
                   }else{
                    let indexOfLastViewed = data?.data?.progress?.reduceRight(
                        (acc  : number, obj : any  , index : number) => {
                            return obj.viewed && acc === -1 ? index : acc;
                        },
                        -1
                    );
                    
               
                    set({
                        lecture: data?.data?.courseDetails?.curriculum[indexOfLastViewed + 1],
                        progress :  data?.data?.progress
                    });
                    
                   }
                }
            }
            
        } catch (error) {
            console.log('cousre not found');
        }
    }, 
    markProgress : async (userId, courseId, lectureId) => { 
        try {
            const {getCurrentCourseProgress} = get()
            const {data} = await axios.post('/progressCourse/mark-lecture-viewed' , {
                userId , courseId, lectureId
            })
            if(data?.success){
                getCurrentCourseProgress(userId , courseId)
            }
        } catch (error) {
            console.log('cousre not found '+error);
        }
    },
    resetProgress : async (userId, courseId ) => { 
        try {
            const {getCurrentCourseProgress} = get()
            const {data} = await axios.post('/progressCourse/reset-progress' , {
                userId , courseId
            })
            if(data?.success){
                getCurrentCourseProgress(userId , courseId)
            }
        } catch (error) {
            console.log('cousre not found '+error);
        }
    }
}))