import { courseCategories } from "@/config";
import publicbanner from "../../../../public/banner-img.png";
import { Button } from "@/components/ui/button";
import { useStudentStore } from "@/stores/useStudentStore";
import { HTMLAttributes, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function NextArrow(props: {
  className?: string;
  style?: string[];
  onClick?: () => void;
} & HTMLAttributes<HTMLDivElement>) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "", color: "black" }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "", color: "black" }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
}
const StudentHomePage = () => {
  const navigate = useNavigate();
  const { fetchStudentCoures, studentCourseList } = useStudentStore();
  const handeCategory = (label: string) => {
    let filters = {
      category: [label],
    };
    sessionStorage.setItem("filters", JSON.stringify(filters));
    navigate("/courses");
  };
  useEffect(() => {
    fetchStudentCoures();
  }, []);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow className="bg-black" />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="min-h-screen  bg-white font-poppin">
      <section className="flex flex-col lg:flex-row items-center justify-start">
        <div className="lg:w-1/2 lg:pr-12 space-y-2 px-5">
          <h1 className="text-5xl  font-bold font-archivo max-w-md">
            Learning that gets you hire
          </h1>
          <p className="text-xl max-w-lg font-poppin text-black/45">
            Empower your present and shape your future with the skills that
            matter. Whether you're starting fresh or building on your expertise,
            we’re here to help you grow
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src={publicbanner}
            width={600}
            height={400}
            className="w-full object-cover"
            alt=""
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h1 className="text-2xl font-bold font-archivo mb-6 text-center">
          Course Catgeories
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {courseCategories.map(({ id, label }) => (
            <Button
              onClick={() => handeCategory(id)}
              className=""
              variant={"outline"}
              key={id}
            >
              {label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-12 px-4 lg:px-8">
        <h1 className="text-2xl font-bold font-archivo mb-6 text-center">
          Feature Courses
        </h1>
        <div className="w-[90%] mx-auto">
          <Slider {...settings}>
            {studentCourseList && studentCourseList.length > 0 ? (
              studentCourseList.map((course, index) => (
                <div
                  onClick={() => navigate(`/courses/details/${course._id}`)}
                  key={index}
                  className="border rounded-lg max-w-[450px] min-h-[340px]"
                >
                  <div className="h-[230px]">
                    <img
                      src={course?.image}
                      alt={course.title}
                      className="w-full h-full rounded-t-lg object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="font-archivo font-bold w-72 truncate ...    ">
                      {course?.title}
                    </h3>
                    <p>{course?.category}</p>
                    <p className="text-gray-400">@{course?.instructorName}</p>
                    <p className="font-bold font-archivo ">
                      ${course?.pricing}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div>no course found</div>
            )}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default StudentHomePage;
