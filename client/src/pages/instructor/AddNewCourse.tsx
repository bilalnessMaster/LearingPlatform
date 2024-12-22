import CourseLandingPage from "@/components/instructor-view/courses/add-new-course/courseLandingPage";
import Curriculum from "@/components/instructor-view/courses/add-new-course/curriculum";
import Settings from "@/components/instructor-view/courses/add-new-course/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthData } from "@/stores/useAuth";
import { useInstructor } from "@/stores/useInstructor";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const AddNewCoursePage = () => {
  const { CourseformData,updateCourseDetails, FetchCourseDetails ,uploadNewCourse , courseCurriculumInitialFormData } = useInstructor();
  const {user} = useAuthData()
  const {id} = useParams()
  const isEmpty = (value: any) :boolean => {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === "" || value === null || value === undefined;
  };
  useEffect(()=>{
    if(id){
      FetchCourseDetails(id)
    }
  },[id,FetchCourseDetails ])
  const validateFormData = () => {
    for (const key of Object.keys(CourseformData) as (keyof typeof CourseformData)[]) {
        
      
        if (isEmpty(CourseformData[key])) {
            return false;
        }
    
    }
    
    let hasFreePreview = false;

    for (const item of courseCurriculumInitialFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }
      if (item.freePreview) {
        hasFreePreview = true;
      }
    }
    return hasFreePreview;
  };
  const handleSubmit = async () =>{ 
    if(id) {
      updateCourseDetails(id , user?.userId , user?.username )
    }else{
      uploadNewCourse( user?.userId , user?.username)
    }
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-3">
        <h1>Create a new course</h1>
        <Button
          disabled={!validateFormData()}
          className="text-sm uppercase tracking-wider font-bold px-8"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course landing page
                </TabsTrigger>
                <TabsTrigger value="settings">settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <Curriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLandingPage />
              </TabsContent>
              <TabsContent value="settings">
                <Settings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewCoursePage;
