import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"


const Settings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Course Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <label>Upload course Image</label>
          <Input
          type="file"
          accept="image/*"
          className="mb-4"
          
          />

        </div>
      </CardContent>
    </Card>
  )
}

export default Settings