import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  ArrowUpDownIcon,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import { useEffect, useState } from "react";
import { filterOptions, sortOptions } from "@/config";
import { DropdownMenuRadioItem } from "@radix-ui/react-dropdown-menu";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useStudentStore } from "@/stores/useStudentStore";
import { useNavigate, useSearchParams } from "react-router-dom";
type filterType = {
  category?: string[];
  level?: string[];
  language?: string[];
};
const createSearchParamsHelper = (filter: any) => {
  const paramsArray: string[] = [];
  for (const [key, value] of Object.entries(filter)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramsValue = value.join(",");
      paramsArray.push(`${key}=${paramsValue}`);
    }
  }
  return paramsArray.join("&");
};
const StudentCoursesPage = () => {
  const Navigate = useNavigate()
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("price-hightolow");
  const [filters, setFilters] = useState<filterType>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const { studentCourseList, loading, fetchStudentCoures, totalPage } =
    useStudentStore();
  const handleFilterOnChange = (getItemKey: string, option: any) => {
    let cpyfilter: filterType = { ...filters };
    const currentIndexOfSection = Object.keys(cpyfilter).indexOf(getItemKey);
    if (currentIndexOfSection === -1) {
      cpyfilter = {
        ...cpyfilter,
        [getItemKey]: [option.id],
      };
    } else {
      const indexofoption = (
        cpyfilter[getItemKey as keyof filterType] || []
      ).indexOf(option.id);
      if (indexofoption === -1) {
        cpyfilter = {
          ...cpyfilter,
          [getItemKey]: [
            ...(cpyfilter[getItemKey as keyof filterType] || []),
            option.id,
          ],
        };
      } else {
        (cpyfilter[getItemKey as keyof filterType] || []).splice(
          indexofoption,
          1
        );
      }
    }
    sessionStorage.setItem("filters", JSON.stringify(cpyfilter));
    setFilters(cpyfilter);
  };
  useEffect(() => {
    const queryBuildStringforFilter = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(queryBuildStringforFilter));
  }, [filters]);
  useEffect(() => {
    if (filters !== null && sort !== null)
      fetchStudentCoures(filters, sort, page);
  }, [filters, sort, page]);

  useEffect(() => {
    const filtered = sessionStorage.getItem("filters");
    if (filtered) setFilters(JSON.parse(filtered));
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4 font-archivo">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div className="p-4 space-y-3">
            {Object.keys(filterOptions).map((keyItem) => (
              <div className="p-4 space-y-4 " key={keyItem}>
                <h3 className="font-bold mb-4 font-archivo">{keyItem}</h3>
                <div className="grid gap-2 mt-2 font-poppin">
                  {filterOptions[keyItem as keyof typeof filterOptions].map(
                    (option: any) => (
                      <Label
                        key={option.id}
                        className="flex font-medium items-center gap-3 "
                      >
                        <Checkbox
                          checked={
                            filters &&
                            filters[keyItem as keyof filterType] &&
                            (
                              filters[keyItem as keyof filterType] || []
                            ).indexOf(option.id) !== -1
                          }
                          onCheckedChange={() =>
                            handleFilterOnChange(keyItem, option)
                          }
                          className="checked:bg-neutral-200"
                        />
                        <span>{option.label}</span>
                      </Label>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className=" flex items-center gap-2 p-5"
                  variant={"outline"}
                  size={"sm"}
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[14px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-[200px] flex justify-center"
              >
                <DropdownMenuRadioGroup
                  defaultValue={sort}
                  value={sort}
                  onValueChange={(valuee) => setSort(valuee)}
                >
                  {sortOptions.map((item, index) => (
                    <DropdownMenuRadioItem
                      className="cursor-pointer"
                      key={index}
                      value={item.id}
                    >
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col font-poppin ">
            {loading ? (
              <div className="flex items-center justify-center relative top-32">
                <Loader className="anime" />
              </div>
            ) : studentCourseList && studentCourseList.length > 0 ? (
              studentCourseList.map((course, index) => (
                <div
                onClick={()=>Navigate(`/courses/details/${course._id}`)}
                  key={index}
                  className="flex mt-3 items-start  flex-col md:flex-row md:h-40 w-full  border-b pb-4"
                >
                  <div className="h-full w-64">
                    <img
                      src={course?.image}
                      alt={course.title}
                      className="h-full   object-cover"
                    />
                  </div>
                  <div className=" w-full px-2 text-sm mt-2 md:mt-0 font-apple  ">
                    <h3 className="font-dm font-bold w-full flex items-center justify-between text-lg ">
                      <span>{course?.title}</span>
                      <span>${course?.pricing}</span>
                    </h3>
                    <p className="truncate  w-64 text-neutral-600">
                      {course?.description}
                    </p>
                    <p className="text-neutral-500">
                      <span>Created by </span>
                      <span className="text-neutral-900">
                        @{course?.instructorName}
                      </span>
                    </p>
                    <p className="flex items-center gap-1 text-neutral-500 ">
                      <span>
                        {`${course?.curriculum.length} ${
                          course?.curriculum.length === 1
                            ? "Lecture"
                            : "Lectures"
                        } `}
                      </span>
                      <span className="size-[3px] rounded-full  bg-gray-400"></span>
                      <span>{course?.level}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="font-medium text-center">no course found</div>
            )}
          </div>
          {studentCourseList.length > 0 && (
            <div className="flex items-center justify-end gap-1 font-archivo mt-3">
              <p className="flex gap-2 text-neutral-300">
                <span>
                result
                </span>
                <span>{
                  studentCourseList.length
                }</span>
              </p>
              <Button
                variant={"ghost"}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="inline-flex items-center -gap-1"
              >
                <ChevronLeft /> <span>previous</span>
              </Button>
              <span className="bg-gray-100 size-6 inline-flex items-center justify-center rounded-md">
                {page}
              </span>
              <Button
                variant={"ghost"}
                disabled={Number(totalPage) === Number(page)}
                onClick={() => setPage(page + 1)}
                className="inline-flex items-center  -gap-1"
              >
                <span>next</span>
                <ChevronRight />
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentCoursesPage;
