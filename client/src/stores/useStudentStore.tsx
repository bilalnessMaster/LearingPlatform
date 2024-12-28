import axios from '@/api/axiosInstance';

import {create} from 'zustand';
interface useStudentStoreProps {
    studentCourseList :any[]
    course : any , 
    totalPage : number | null , 
    loading : boolean , 
    fetchStudentCoures : (filter?: any ,sort?:string , page?:number) => void;
    fetchCourseDetails : (id: string ) => void
}

export const useStudentStore = create<useStudentStoreProps>((set , get ) =>({
    loading : false , 
    studentCourseList : [] , 
    totalPage : null ,
    course  : {},
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
    fetchCourseDetails : async (id)=>  {
        try {
            set({loading : true})
            const {data}  = await axios.get(`student/course/getDetails/${id}`)
            if(data.success) set({course : data.course})
            set({loading : false})
        } catch (error) {
            console.log('cousre not found');
            set({loading : false})
        }
    }
}))