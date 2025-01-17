import { Button } from "@/components/ui/button";
import { useAuthData } from "@/stores/useAuth";
import { useStudentStore } from "@/stores/useStudentStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentCoursesPages = () => {
  const { user } = useAuthData();
  const navigate = useNavigate();
  const { boughtCourse, myCourses } = useStudentStore();

  useEffect(() => {
    if (user?.userId) {
      boughtCourse(user?.userId);
    }
  }, [boughtCourse]);
  return (
    <section className="mt-4">
      <div className="container grid md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
        {myCourses && myCourses.length > 0 ? (
          myCourses.map((course, index) => (
            <div
              onClick={() => navigate(`/courses/details/${course._id}`)}
              key={index}
              className="border rounded-lg max-w-[450px] max-h-[340px]"
            >
              <div className="h-[230px]">
                <img
                  src={course?.image}
                  alt={course.title}
                  className="w-full h-full rounded-t-lg object-cover"
                />
              </div>
              <div className="p-2">
                <h3 className="font-archivo font-bold w-72 truncate ...  mb-3 ">
                  {course?.title}
                </h3>
                <Button
                  onClick={() => navigate(`/courses-progress/${course._id}`)}
                  className="capitalize w-full  bottom-0"
                >
                  watch now
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div>no course found</div>
        )}
      </div>
    </section>
  );
};

export default StudentCoursesPages;
