import axios from '@/api/axiosInstance';

import {create} from 'zustand';
interface useStudentStoreProps {
    studentCourseList :any[]
    totalPage : number | null , 
    loading : boolean , 
    fetchStudentCoures : (filter?: any ,sort?:string , page?:number) => void
}

export const useStudentStore = create<useStudentStoreProps>((set , get ) =>({
    loading : false , 
    studentCourseList : [] , 
    totalPage : null ,
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
            console.log('product not found');
            set({loading : false})
        }
    }
}))