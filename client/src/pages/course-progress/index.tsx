import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"


const CourseProgressPage = () => {

  return (
    <div className="flex  flex-col h-screen bg-neutral-900 text-neutral-200">
      <div className="w-full flex items-center  p-4 border-b-[1px]  border-neutral-400 ">
          <div className="flex items-center justify-start space-x-4">
            <Button className="text-black bg-white" variant={'ghost'} size={'sm'}>
              <ChevronLeft className="h-4 w-4"/>
              <span>
                Go back pages courses
              </span>
            </Button>
           
          </div>
      </div>
    </div>
  )
}

export default CourseProgressPage