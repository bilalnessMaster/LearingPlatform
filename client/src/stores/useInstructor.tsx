import axios from "../api/axiosInstance.ts";

import { create } from "zustand";

declare interface useInstructorType {
  CoursesList: {
    title: string;
    category: string;
    level: string;
    language: string;
    subtitle: string;
    description: string;
    pricing: number;
    objectives: string;
    welcomeMessage: string;
    image: string;
    public_id: string;
    _id: string;
    instructorId: string;
    instructorName: string;
    date: string;
    curriculum: [
      {
        title: string;
        videoUrl: string;
        public_id: string;
        freePreview: boolean;
        _id: string;
      }
    ];
    isPublised: true;
    students: {
      studentId?: string;
      studentName?: string;
      studentEmail?: string;
    }[];
  }[];
  mediaUploadPercentage: number;
  mediaUploadProgress: boolean;
  CourseformData: {
    title?: string;
    category?: string;
    level?: string;
    language?: string;
    subtitle?: string;
    description?: string;
    pricing?: number;
    objectives?: string;
    welcomeMessage?: string;
    image?: string;
    public_id?: string;
  };
  courseCurriculumInitialFormData: {
    title: string;
    videoUrl: string;
    freePreview: boolean;
    public_id: string;
  }[];
  setCourseForm: (form: any) => void;
  addformCurriculum: () => void;
  setFormCurriculumTitle: (value: string, currentIndex: number) => void;
  handleSwitchChange: (currentIndex: number) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  setMediaProgress: (value: boolean) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  replaceFile: (index: number, public_id: string) => void;
  DeleteFile: (index: number, public_id: string) => void;
  uploadNewCourse: (
    userId: string | undefined,
    username: string | undefined
  ) => void;
  FetchCourseList : () => void;
  updateCourseDetails : (id : string ,  userId: string | undefined,
    username: string | undefined ) => void;
  FetchCourseDetails : (id : string  ) => void;
  resetforms : ( ) => void;
  MediaBulkUpload :(e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useInstructor = create<useInstructorType>((set, get) => ({
  CoursesList: [],
  mediaUploadPercentage: 0,
  mediaUploadProgress: false,
  CourseformData: {
    title: "",
    category: "",
    level: "",
    language: "",
    subtitle: "",
    description: "",
    pricing: 0,
    objectives: "",
    welcomeMessage: "",
    image: "",
    public_id: "",
  },
  courseCurriculumInitialFormData: [
    {
      title: "",
      videoUrl: "",
      freePreview: false,
      public_id: "",
    },
  ],
  setMediaProgress: (value) => set({ mediaUploadProgress: value }),
  addformCurriculum: () =>
    set((pre) => ({
      courseCurriculumInitialFormData: [
        ...pre.courseCurriculumInitialFormData,
        {
          title: "",
          videoUrl: "",
          freePreview: false,
          public_id: "",
        },
      ],
    })),
  setCourseForm: (form: any) => {
    set({ CourseformData: form });
  },
  setFormCurriculumTitle: (value, currentIndex) => {
    const { courseCurriculumInitialFormData } = get();
    try {
      const cpycourseCurriculumInitialFormData = [
        ...courseCurriculumInitialFormData,
      ];
      cpycourseCurriculumInitialFormData[currentIndex] = {
        ...cpycourseCurriculumInitialFormData[currentIndex],
        title: value,
      };
      set({
        courseCurriculumInitialFormData: cpycourseCurriculumInitialFormData,
      });
    } catch (error) {
      console.log(error);
    }
  },
  handleSwitchChange: (currentIndex: number) => {
    try {
      const { courseCurriculumInitialFormData } = get();
      const cpycourseCurriculumInitialFormData = [
        ...courseCurriculumInitialFormData,
      ];
      cpycourseCurriculumInitialFormData[currentIndex] = {
        ...cpycourseCurriculumInitialFormData[currentIndex],
        freePreview:
          !cpycourseCurriculumInitialFormData[currentIndex].freePreview,
      };
      set({
        courseCurriculumInitialFormData: cpycourseCurriculumInitialFormData,
      });
    } catch (error) {
      console.log(error);
    }
  },
  handleFileChange: async (e, index) => {
    try {
      const selectedFile: File | null = e.target.files
        ? e.target.files[0]
        : null;
      if (selectedFile) {
        const videoForma = new FormData();
        videoForma.append("file", selectedFile);

        set({ mediaUploadProgress: true });
        const { data } = await axios.post("/media/upload", videoForma, {
          onUploadProgress: (ProgressEvent) => {
            const percentCompleted = Math.round(
              (ProgressEvent.loaded * 100) / ProgressEvent.total
            );
            set({
              mediaUploadPercentage: percentCompleted,
            });
          },
        });
        if (data.success) {
          const { courseCurriculumInitialFormData } = get();
          const cpycourseCurriculumInitialFormData = [
            ...courseCurriculumInitialFormData,
          ];
          cpycourseCurriculumInitialFormData[index] = {
            ...cpycourseCurriculumInitialFormData[index],
            public_id: data?.data?.public_id,
            videoUrl: data?.data?.secure_url,
          };
          set({
            courseCurriculumInitialFormData: cpycourseCurriculumInitialFormData,
          });
        }
        set({ mediaUploadProgress: false });
      }
    } catch (error) {
      console.log(error);
    }
  },
  handleImageUpload: async (e) => {
    const selected: File | null = e.target.files ? e.target.files[0] : null;
    const formData = new FormData();
    if (selected) {
      formData.append("file", selected);
      set({ mediaUploadProgress: true });
      const { data } = await axios.post("media/upload", formData, {
        onUploadProgress: (ProgressEvent) => {
          const total: number | undefined = ProgressEvent.total;
          const percentCompleted = Math.round(
            (ProgressEvent.loaded * 100) / total
          );
          set({
            mediaUploadPercentage: percentCompleted,
          });
        },
      });
      if (data.success) {
        const { CourseformData } = get();
        set({
          CourseformData: {
            ...CourseformData,
            image: data?.data?.secure_url,
            public_id: data?.data?.public_id,
          },
        });
      }
    }
    set({ mediaUploadProgress: false });
  },
  replaceFile: async (index, pulbic_id) => {
    try {
      const { courseCurriculumInitialFormData } = get();
      const { data } = await axios.delete(`/media/delete/${pulbic_id}`);
      if (data.success) {
        const cpycourseCurriculumInitialFormData = [
          ...courseCurriculumInitialFormData,
        ];
        cpycourseCurriculumInitialFormData[index] = {
          ...cpycourseCurriculumInitialFormData[index],
          videoUrl: "",
          public_id: "",
        };
        set({
          courseCurriculumInitialFormData: cpycourseCurriculumInitialFormData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  DeleteFile :  async (index, pulbic_id) => {
    try {
      const { courseCurriculumInitialFormData } = get();
      const { data } = await axios.delete(`/media/delete/${pulbic_id}`);
      if (data.success) {
        let cpycourseCurriculumInitialFormData = [
          ...courseCurriculumInitialFormData,
        ];
        cpycourseCurriculumInitialFormData = cpycourseCurriculumInitialFormData.filter((_ , inex)=> inex !== index)
        console.log(cpycourseCurriculumInitialFormData);
        
        set({
          courseCurriculumInitialFormData: cpycourseCurriculumInitialFormData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  uploadNewCourse: async (userId, username) => {
    try {
      const { courseCurriculumInitialFormData, CourseformData } = get();
  

      let finalCourseForm = {
        instructorId: userId,
        instructorName: username,
        date: new Date(),
        ...CourseformData,
        curriculum: courseCurriculumInitialFormData,
        isPublised: true,
      };
      console.log(finalCourseForm);
      
      const { data } = await axios.post("courses/add", finalCourseForm);
      if (data.success) {
        set({
          courseCurriculumInitialFormData: [
            {
              title: "",
              videoUrl: "",
              freePreview: false,
              public_id: "",
            },
          ],
          CourseformData: {
            title: "",
            category: "",
            level: "",
            language: "",
            subtitle: "",
            description: "",
            pricing: 0,
            objectives: "",
            welcomeMessage: "",
            image: "",
            public_id: "",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  FetchCourseList: async () => {
    try {
      const { data } = await axios.get("courses/allCourse");
      set({ CoursesList: data?.data });
    } catch (error) {
      console.log(error);
    }
  },
  FetchCourseDetails: async (id) => {
    try {
      const {CourseformData} =get()
      const { data } = await axios.get(`courses/course-details/${id}`);
      if(data?.success){
        const setCourseData = Object.keys(CourseformData).reduce((prev: typeof CourseformData , key) =>{
            prev[key] = data?.data[key] || CourseformData[key]
         
            
            return prev
        },{})
        set({CourseformData : setCourseData ,courseCurriculumInitialFormData: data?.data.curriculum })
        
      }
      
    } catch (error) {
      console.log(error);
    }
  },
  updateCourseDetails: async (id , userId, username) => {
    try {
      const { courseCurriculumInitialFormData, CourseformData } = get();
  

      let finalCourseForm = {
        instructorId: userId,
        instructorName: username,
        date: new Date(),
        ...CourseformData,
        curriculum: courseCurriculumInitialFormData,
        isPublised: true,
      };
      
      
      
      const { data } = await axios.put(`courses/update/${id}` ,finalCourseForm);
      
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  },
  resetforms  : () => {
    set({
      CourseformData : {
        title: "",
        category: "",
        level: "",
        language: "",
        subtitle: "",
        description: "",
        pricing: 0,
        objectives: "",
        welcomeMessage: "",
        image: "",
        public_id: "",
      } ,
      courseCurriculumInitialFormData :[
        {
          title: "",
          videoUrl: "",
          freePreview: false,
          public_id: "",
        },
      ],
    })
  },
  MediaBulkUpload : async (e) => { 
    try {
      const {courseCurriculumInitialFormData} = get()
      const seletecdFiles: File[] | null = Array.from(e.target.files)
      const checkEmpty = (arr : any) => { 
        try {
          return arr.every((item: any )=> { 
            return Object.entries(item).every(([key , value] )=> {
            if( typeof value  === 'boolean'){
              return true
            }else{
              return value === ''
            }
            })
          })
        } catch (error) {
          console.log(error);
          
        }
      }
      const bulkForm = new FormData();
      seletecdFiles.forEach((element : File) => bulkForm.append('files' , element));
      set({mediaUploadProgress: true})
      const {data} = await axios.post('media/bulk-upload' , bulkForm ,{
        onUploadProgress: (ProgressEvent) => {
          const total: number | undefined = ProgressEvent.total;
          const percentCompleted = Math.round(
            (ProgressEvent.loaded * 100) / total
          );
          set({
            mediaUploadPercentage: percentCompleted,
          });
        },
      })
      if(data?.success){
      let copycourseCurriculumInitialFormData = checkEmpty(courseCurriculumInitialFormData) ? [] : [...courseCurriculumInitialFormData] 
      copycourseCurriculumInitialFormData =[
        ...copycourseCurriculumInitialFormData
        , ...data.data.map((item : any , index : number)=>(
          {
            title: `lecture ${copycourseCurriculumInitialFormData.length + index+1}`,
            videoUrl: item.secure_url,
            freePreview: false,
            public_id: item.public_id,
          }
        ))
      ]
      set({
        courseCurriculumInitialFormData: copycourseCurriculumInitialFormData
      })
        
      }
      set({ mediaUploadProgress: false });
    } catch (error) {
      console.log(error);
      
    }
  } 
}));
