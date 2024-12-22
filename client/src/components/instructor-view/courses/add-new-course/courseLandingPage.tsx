import FormControls from "@/components/commonform/formControls"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { courseLandingPageFormControls } from "@/config"
import { useInstructor } from "@/stores/useInstructor"



const CourseLandingPage = () => {
const {setCourseForm , CourseformData} = useInstructor()

console.log(CourseformData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Course landing page
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormControls formControls={courseLandingPageFormControls} formData={CourseformData} setFormData={setCourseForm} />
      </CardContent>
    </Card>
  )
}

export default CourseLandingPage