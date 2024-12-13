import axios from '../api/axiosInstance.ts'

import {create} from 'zustand';
declare interface useInstructorType {
    mediaUploadProgress : boolean;
    CourseformData : {
        title: string,
        category: string,
        level:string,
        primaryLanguage: string,
        subtitle: string,
        description:string,
        pricing: number,
        objectives: string,
        welcomeMessage: string,
        image:string,
    },
    courseCurriculumInitialFormData :{
        title: string,
        videoUrl: string,
        freePreview: boolean,
        public_id:  string
    }[],
    setCourseForm : (form : any ) => void;
    addformCurriculum : () => void;
    setFormCurriculumTitle : (value: string ,currentIndex : number  ) => void; 
    handleSwitchChange : (currentIndex : number  ) => void; 
    handleFileChange : (e : React.ChangeEvent<HTMLInputElement> , index : number) => void;
    setMediaProgress : (value : boolean) => void
}



export const useInstructor = create<useInstructorType>((set ,get)=>({
    mediaUploadProgress : false,
    CourseformData  : {
        title: "",
        category: "",
        level: "",
        primaryLanguage: "",
        subtitle: "",
        description: "",
        pricing: 0,
        objectives: "",
        welcomeMessage: "",
        image: "",
    },
    setMediaProgress : (value) => set({mediaUploadProgress : value}),
    courseCurriculumInitialFormData : [
        {
            title: "",
            videoUrl: "",
            freePreview: false,
            public_id: "",
        },
    ],
    addformCurriculum : () => set((pre)=>({
        courseCurriculumInitialFormData : [
            ...pre.courseCurriculumInitialFormData ,
            {
                title: "",
                videoUrl: "",
                freePreview: false,
                public_id: "",
            }
        ]
    })),
    setCourseForm : (form : any ) => {
        set({CourseformData : form})
    },
    setFormCurriculumTitle : (value,currentIndex) => { 
        const {courseCurriculumInitialFormData} =get()
        try {
          const cpycourseCurriculumInitialFormData = [...courseCurriculumInitialFormData]
          cpycourseCurriculumInitialFormData[currentIndex] = {
            ...cpycourseCurriculumInitialFormData[currentIndex] , title  : value
          }
        set({courseCurriculumInitialFormData : cpycourseCurriculumInitialFormData})
      
        
        } catch (error) {
            console.log(error);
            
        }
    },
    handleSwitchChange : (currentIndex : number  ) => {
        try {
            const {courseCurriculumInitialFormData} =get()
            const cpycourseCurriculumInitialFormData = [...courseCurriculumInitialFormData]
            cpycourseCurriculumInitialFormData[currentIndex] = {
              ...cpycourseCurriculumInitialFormData[currentIndex] , freePreview  : !cpycourseCurriculumInitialFormData[currentIndex].freePreview
            }
          set({courseCurriculumInitialFormData : cpycourseCurriculumInitialFormData})

            
        } catch (error) {
            console.log(error);
            
        }
    },
    handleFileChange : async (e , index) => {
        try {

            const selectedFile : File  | null = e.target.files ? e.target.files[0] : null 
            if(selectedFile ){
                const videoForma = new FormData();
                videoForma.append('file' , selectedFile)
                console.log(videoForma);
                
                set({mediaUploadProgress : true})
                const {data} = await axios.post('/media/upload',videoForma)
                if(data.success){
                    const {courseCurriculumInitialFormData} =get()
                    const cpycourseCurriculumInitialFormData = [...courseCurriculumInitialFormData]
                    cpycourseCurriculumInitialFormData[index] = {
                      ...cpycourseCurriculumInitialFormData[index] , public_id :  data?.data?.public_id ,videoUrl  : data?.data?.secure_url
                    }
                  set({courseCurriculumInitialFormData : cpycourseCurriculumInitialFormData})
                }
                
            }

        } catch (error) {
            console.log(error);
            
        }
    },

}))
  