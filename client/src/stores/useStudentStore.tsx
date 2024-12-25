import axios from '@/api/axiosInstance';
import {create} from 'zustand';
interface useStudentStoreProps {
    studentCourseList :any[]
    fetchStudentCoures : () => void
}

export const useStudentStore = create<useStudentStoreProps>((set , get ) =>({
    studentCourseList : [] , 
    fetchStudentCoures : async () => {
        try {
        
            
            const {data} = await axios.get('/student/course/get')
            if(data.success){
                set({studentCourseList  :data.data})
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
}))