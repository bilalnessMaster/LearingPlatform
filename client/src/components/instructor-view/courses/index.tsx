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
import {  Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IntructorCourses = () => {
  const Navigate= useNavigate()
  return (
    <Card>
      <CardHeader className="flex justify-between  flex-row items-center">
        <CardTitle>All Courses</CardTitle>
        <Button onClick={()=>Navigate('/instructor/create-new-course')} className="p-6">Create New course</Button>
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
                <TableRow>
                  <TableCell className="font-medium">React js</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>$250.00</TableCell>
                  <TableCell className="text-right">
                    <Button variant={'ghost'} size={'sm'}>
                      <Edit className="w-6 h-6" />
                    </Button>
                    <Button variant={'ghost'} size={'sm'}>
                      <Trash className="w-6 h-6" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
    </Card>
  );
};

export default IntructorCourses;
