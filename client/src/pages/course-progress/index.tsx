import { Button } from "@/components/ui/button";

import { useAuthData } from "@/stores/useAuth";
import { useStudentStore } from "@/stores/useStudentStore";
import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { twMerge } from "tailwind-merge";
import VideoPlayer from "@/components/video-player";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";


const CourseProgressPage = () => {
  const [isSideBar, setIsSideBar] = useState(true);
  const [progressState, setprogressState] = useState(false);
  const {
    getCurrentCourseProgress,
    purchased,
    course,
    progress,
    completedCourse,
    markProgress ,
    lecture,
    resetProgress
  } = useStudentStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthData();
  useEffect(() => {
    if (user && id) {
      getCurrentCourseProgress(user?.userId, id);
    }
  }, [getCurrentCourseProgress]);
  useEffect(()=>{
    if(progressState){
      markProgress(user?.userId , course?._id , lecture?._id)
      setprogressState(false)
    }
        
  },[progressState])
  console.log(progress);
  
  return (
    <div className="flex  flex-col h-screen bg-neutral-900 text-neutral-200">
      <div className="w-full flex items-center  justify-between p-4 border-b-[1px]  border-neutral-400 ">
        <div className="flex items-center justify-between space-x-4">
          <Button
            className="text-black bg-white"
            onClick={() => navigate("/")}
            variant={"ghost"}
            size={"sm"}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Go back pages courses</span>
          </Button>
          <h1 className="text-lg font-medium hidden md:block">
            {course?.title}
          </h1>
        </div>
        <Button onClick={() => setIsSideBar(!isSideBar)} variant={"secondary"}>
          {isSideBar ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden ">
        <div
          className={twMerge(
            "flex-1 transition-all duration-300",
            isSideBar ? "mr-[400px]" : ""
          )}
        >
          <VideoPlayer setProgress={setprogressState} progressPage={true} height="700px" url={lecture?.videoUrl} />
          <div className="mt-2 px-3 text-lg font-archivo first-letter:capitalize">
            <h1>{lecture?.title}</h1>
          </div>
        </div>
        <div
          className={twMerge(
            "bg-neutral-800 fixed px-2 py-2 right-0 h-screen w-[400px] transition-all duration-300",
            isSideBar ? "translate-x-0" : "translate-x-full"
          )}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className=" text-black rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className=" text-black rounded-none h-full"
              >
                Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                 {
                  course?.curriculum?.map((video : any, index : number)=> (
                    <div className="flex items-start space-x-2 font-apple text-sm text-white font-bold cursor-pointer  " key={index}>
                        <span>
                         {
                          progress?.find(
                            (ide) => 
                              ide._id === video._id)?.viewed
                            ? <Check className="w-4 h-4 " /> : <Play className="w-4 h-4 " />
                         }
                        </span>
                        <span>
                          {
                            video?.title
                          }
                        </span>
                    </div>
                  ))
                 }
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">About this course</h2>
                  <p className="text-gray-400">
                      {
                        course?.description
                      }
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={purchased}>
        <DialogContent className="rounded-none p-0 px-2 pt-4 pb-1  space- bg-neutral-800 text-neutral-300 border-none">
          <DialogHeader>
            <DialogTitle className="font-archivo">
              You dont have acces to this page
            </DialogTitle>
            <DialogDescription className="max-w-sm font-medium font-poppin text-gray-400 pb-3">
              It seems that you don't have this course please make purchased and
              then come
            </DialogDescription>
            <Button
              onClick={() => navigate(`/courses/details/${id}`)}
              className="capitalize font-medium  "
            >
              buy this course
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={completedCourse}>
        <DialogContent className="rounded-none p-0 px-2 pt-4 pb-1  space- bg-neutral-800 text-neutral-300 border-none">
          <DialogHeader>
            <DialogTitle className="font-archivo">congratulation </DialogTitle>
            <DialogDescription className="max-w-sm font-medium font-poppin text-gray-400 pb-3">
              you have finish the course finally
            </DialogDescription>
            <div className="flex gap-2">
              <Button
                onClick={() =>resetProgress(user?.userId , course?._id )}
                className="flex-1 capitalize font-medium  "
              >
                Rewatch the Course
              </Button>
              <Button
                onClick={() => navigate(`/`)}
                className="flex-1 capitalize font-medium  "
              >
                My courses
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseProgressPage;
