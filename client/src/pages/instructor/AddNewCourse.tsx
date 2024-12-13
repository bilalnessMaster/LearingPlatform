import CourseLandingPage from "@/components/instructor-view/courses/add-new-course/courseLandingPage"
import Curriculum from "@/components/instructor-view/courses/add-new-course/curriculum"
import Settings from "@/components/instructor-view/courses/add-new-course/settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"


const AddNewCoursePage = () => {
  return (
    <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-3">
            <h1>Create a new course</h1>
            <Button className="text-sm uppercase tracking-wider font-bold px-8">
                Submit
            </Button>
        </div>
            <Card>
                <CardContent>
                    <div className="container mx-auto p-4">
                        <Tabs defaultValue="curriculum" className="space-y-4">
                                <TabsList>
                                    <TabsTrigger value="curriculum" >curriculum</TabsTrigger>
                                    <TabsTrigger value="course-landing-page" >Course landing page</TabsTrigger>
                                    <TabsTrigger value="settings" >settings</TabsTrigger>
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
  )
}

export default AddNewCoursePage