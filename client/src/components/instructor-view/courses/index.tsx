import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInstructor } from "@/stores/useInstructor";
import {  Edit, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IntructorCourses = () => {
  const {FetchCourseList ,CoursesList , resetforms} = useInstructor()
  const Navigate= useNavigate()
  useEffect(()=>{
    FetchCourseList()
  },[FetchCourseList])
  return (
    <Card>
      <CardHeader className="flex justify-between  flex-row items-center">
        <CardTitle>All Courses</CardTitle>
        <Button onClick={()=>{
          Navigate('/instructor/create-new-course') ; 
          resetforms()
        }} className="p-6">Create New course</Button>
      </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Course</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {
                    CoursesList.map((course) =>(

                     <TableRow key={course.title}>
                     <TableCell className="font-medium  truncate w-20  ">{course?.title}</TableCell>
                     <TableCell>{course?.students.length}</TableCell>
                     <TableCell>{course?.pricing *course?.students.length}</TableCell>
                     <TableCell className="text-right">
                       <Button onClick={()=> 
                          Navigate(`/instructor/edit-course/${course?._id}`)
                         }variant={'ghost'} size={'sm'}>
                         <Edit  className="w-6 h-6" />
                       </Button>
                       <Button variant={'ghost'} size={'sm'}>
                         <Trash className="w-6 h-6" />
                       </Button>
                     </TableCell>
                   </TableRow>
                    ))
                  }
              </TableBody>
            </Table>
          </div>
        </CardContent>
    </Card>
  );
};

export default IntructorCourses;
