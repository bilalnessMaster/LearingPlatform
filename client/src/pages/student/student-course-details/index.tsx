import { Skeleton } from "@/components/ui/skeleton";
import { useStudentStore } from "@/stores/useStudentStore";
import { Check, ChevronRight, CirclePlay, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import VideoPlayer from "@/components/video-player";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthData } from "@/stores/useAuth";
declare type freePreviewtype = {
  freePreview?: true;
  public_id?: string;
  title?: string;
  videoUrl?: string;
  _id?: string;
}[];
const StudentLandingCoursePage = () => {
  const [show, setShow] = useState(0);
  const {user} =useAuthData()
  const [open, setOpen] = useState(false);
  const [CoursePreview, setCoursePreview] = useState<freePreviewtype>([]);
  const { id } = useParams();
  const { course,alreadyPurchased , fetchCourseDetails, loading , handleCreatePayment , approval_url} = useStudentStore();
  const [payload , setPayload] = useState({})
  useEffect(()=>{
    if(user && course){
      setPayload({
        userId: user?.userId,
        userName: user?.username,
        userEmail: user?.email,
        orderDate: new Date(),
        instructorId: course?.instructorId,
        instructorName:  course?.instructorName,
        courseImage: course?.image,
        courseTitle: course?.title,
        courseId: course?._id,
        coursePricing: course?.pricing,
    })
    }
  } , [course])
  
  
  useEffect(() => {
    if (id) {
      const userId : string | undefined = user?.userId
      fetchCourseDetails(id , userId);
    }
  }, [fetchCourseDetails]);

  useEffect(() => {
    if (course?.curriculum) {
      let courses = course?.curriculum?.filter((item: any) => item.freePreview);
      setCoursePreview(courses);
    }
  }, [course]);
  if (loading) return <Skeleton />;
  if(approval_url){
    window.location.href = approval_url
  }
  if(alreadyPurchased) return <Navigate to={`/courses-progress/${course._id}`} />
  return (
    <section className=" ">
      <div className="bg-neutral-900 text-white font-archivo">
        <div className="container ">
          <div className="max-w-6xl h-[400px]  mx-auto px-2 py-3 grid grid-cols-5 gap-4 ">
            <div className="space-y-3 col-span-3  ">
              <div className="text-blue-300/55 font-medium flex items-center">
                <span className="">
                  <Link to="/courses">courses</Link>
                </span>
                <span>
                  <ChevronRight className="w-5 h-5" />
                </span>
                <span className="">
                  <Link to="/courses">details</Link>
                </span>
                <span>
                  <ChevronRight className="w-5 h-5" />
                </span>
                <span className=" truncate max-w-44">
                  <Link to={`/courses/details/${course?._id}`}>
                    {course?.title}
                  </Link>
                </span>
              </div>
              <h2 className="text-2xl font-medium font-apple">
                {course?.title}
              </h2>
              <p className="max-w-2xl text-white/95 font-apple">
                {course?.description}
              </p>
              <div className="font-apple inline-flex items-center gap-1">
                <p className=" inline-flex items-center gap-1">
                  <span className="inline-flex items-center text-x">4.5</span>
                  <span>
                    {" "}
                    {Array.from({ length: 5 }, (_, index) => (
                      <i
                        key={index}
                        className="ri-star-line text-yellow-300"
                      ></i>
                    ))}
                  </span>
                </p>
                <span className="underline text-blue-200">
                  (42,324 ratings)
                </span>
                <span className="text-sm">
                  {course?.students?.length} students
                </span>
              </div>
              <div className="font-apple flex text-sm items-center gap-1">
                <span>Created by</span>
                <span className="underline text-blue-200">
                  @{course?.instructorName}
                </span>
              </div>
              <div>
                <p className="text-sm">
                  <span>Created at </span>
                  <span className="">
                    {moment(course.date).format("yyy-mm-DD")}
                  </span>
                </p>
              </div>
              <div>{course?.language}</div>
            </div>
            <div className="col-span-2 h-screen ">
              <div className="sticky top-4 w-full bg-white shadow-sm p-[1px]">
                <div>
                  <VideoPlayer
                    url={CoursePreview[0]?.videoUrl}
                    width="100%"
                    height="200px"
                  />
                </div>
                <div className="p-2 text-black font-serif">
                  <h1>Subscribe to LMS LEARN’s top courses</h1>
                </div>
                <p className="text-black border-b relative my-5">
                  <span className="absolute left-1/2 bg-white px-2 rounded-full font-medium -translate-x-1/2 -bottom-3">
                    ${course?.pricing}
                  </span>
                </p>
                <Button className="rounded-none w-full py-2" onClick={()=>{
                  handleCreatePayment(payload)
                }}>buy now using paypal</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container">
        <main className=" mx-auto px-2 py-3 max-w-6xl grid grid-cols-5 gap-4 mt-4">
          <div className="col-span-3 border-gray-300/75 border-[1px] px-4 py-5">
            <h1 className="font-medium mb-2 text-xl">What you'll learn</h1>
            <div className="grid md:grid-cols-2 gap-2  ">
              {course?.objectives?.split(",").map((item: string) => (
                <div key={item} className="flex  items-start gap-2 ">
                  <span className="inline-flex items-center justify-center w-5 h-5">
                    <Check size={15} />
                  </span>
                  <span className="text-xs first-letter:capitalize">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3 ">
            <div className="w-full border-gray-300/75 border-[1px] px-4 py-5">
              <h1 className="font-medium mb-2 text-xl">Course content</h1>
              <ul className="flex flex-col gap-4">
                {course?.curriculum?.map((items: any , index : number) => (
                  <li
                    key={items?.public_id}
                    className={twMerge(
                      "flex  items-center gap-2 text-xs",
                      items.freePreview
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    )}
                  >
                    <span className="inline-flex items-start">
                      {items.freePreview ? (
                        <CirclePlay
                          onClick={() => {
                            setOpen(true);
                            setShow(index)
                          }}
                          className="w-4 text-gray-400"
                        />
                      ) : (
                        <Lock   className="w-4 text-gray-400" />
                      )}
                    </span>
                    <span className="first-letter:capitalize">
                      {items?.title}{" "}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </section>
      <Dialog  open={open} onOpenChange={(Value) => setOpen(Value)}>
        <DialogContent className="text-neutral-200 border-none rounded-none p-0 bg-neutral-900 py-3 px-2 ">
          <DialogHeader className="max-w-none ">
            <DialogTitle className="mb-2">Course Preview</DialogTitle>
            <div className="w-full">
              {CoursePreview?.map(
                (video, index) =>
                  index === show && (
                    <VideoPlayer
                      key={video.public_id}
                      url={video.videoUrl}
                      width="100%"
                      height="200px"
                    />
                  )
              )}
            </div>
            <div>
              <h1 className="font-medium  text-lg mb-2">Free Sample Videos:</h1>
              <ul>
                {CoursePreview?.map((items,index) => (
                  <li onClick={() => {
                    setOpen(true)
                    setShow(index)
                }}
                    key={items?.public_id}
                    className={twMerge(
                      "flex  items-center py-2 px-1 gap-2 text-xs",
                      items.freePreview
                        ? "cursor-pointer"
                        : "cursor-not-allowed" , index === show && 'bg-gray-100 bg-opacity-5 '
                    )}
                    
                  >
                    <span>
                      {items.freePreview ? (
                        <CirclePlay
                          
                          className="w-4 text-gray-400"
                        />
                      ) : (
                        <Lock />
                      )}
                    </span>
                    <span className="first-letter:capitalize">
                      {items?.title}{" "}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default StudentLandingCoursePage;
