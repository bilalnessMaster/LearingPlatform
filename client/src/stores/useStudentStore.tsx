import axios from '@/api/axiosInstance';

import {create} from 'zustand';
interface useStudentStoreProps {
    studentCourseList :any[];
    alreadyPurchased:boolean;
    myCourses :any[],
    approval_url: string | null,
    course : any , 
    totalPage : number | null , 
    loading : boolean , 
    fetchStudentCoures : (filter?: any ,sort?:string , page?:number) => void;
    fetchCourseDetails : (id: string , userId : string | undefined ) => void;
    handleCreatePayment :  (payload : any) => void;
    checkpayment : (paymentId: string , payer  : string) => void;
    boughtCourse : (id : string) => void;
}

export const useStudentStore = create<useStudentStoreProps>((set , get ) =>({
    loading : false , 
    alreadyPurchased: false,
    studentCourseList : [] , 
    myCourses : [],
    totalPage : null ,
    course  : {},
    approval_url : null,
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
            set({loading : true})
            const {data}  = await axios.get(`/student/course/getDetails/${id}/${userId}`)
            if(data.success) set({course : data.course , alreadyPurchased  : data.alreadyPurchased})
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
            const {data} = await  axios.get(`/boughtCourses/get-student-courses/${id}`)
            if(data.success){
                set({
                    myCourses : data?.data
                })
            }
        } catch (error) {
            console.log('cousre not found');
        }
    }
}))