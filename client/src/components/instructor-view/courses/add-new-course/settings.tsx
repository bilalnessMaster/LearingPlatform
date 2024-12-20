import ProgressTrackingBar from "@/components/media-progress-tracking"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useInstructor } from "@/stores/useInstructor"


const Settings = () => {
  const {handleImageUpload,CourseformData ,mediaUploadProgress ,mediaUploadPercentage} = useInstructor()
  
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Course Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mediaUploadProgress
           ? 
           <ProgressTrackingBar isMediaUploading={mediaUploadProgress} progress={mediaUploadPercentage}/> : null
          }
        <div>
          {
            CourseformData?.image ? <img src={CourseformData?.image} alt={CourseformData?.public_id} />
            :  (
              
              <div className="flex flex-col gap-3">
          <label>Upload course Image</label>
          <Input
          type="file"
          accept="image/*"
          
          className="mb-4"
          onChange={handleImageUpload}
          />
          </div>
        )
        }
        </div>
      </CardContent>
    </Card>
  )
}

export default Settings