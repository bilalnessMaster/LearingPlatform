import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useInstructor } from "@/stores/useInstructor";


const Curriculum = () => {
  const {addformCurriculum, setFormCurriculumTitle ,handleSwitchChange,  courseCurriculumInitialFormData , handleFileChange} =useInstructor()
  function handleNewLecture(){
    addformCurriculum()
  }
  console.log(courseCurriculumInitialFormData);

  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add Lecture</Button>
        <div className="mt-4 space-y-4">
          {courseCurriculumInitialFormData.map((_, index) => (
            <div key={index} className="border p-5 rounded-md space-y-2 ">
              <div className="flex gap-5">
                <h1 className="font-semibold">Lecture {index + 1}</h1>
                <Input
                  type="text"
                  name={`title-${index+1}`}
                  placeholder="Enter lecture tilte "
                  className="max-w-96"
                  onChange={(e)=>setFormCurriculumTitle(e.target.value , index ,)}  
                  value={courseCurriculumInitialFormData[index].title}              
                />
                <div className="flex items-center space-x-2">
                  <Switch onCheckedChange={()=> handleSwitchChange(index)} checked={courseCurriculumInitialFormData[index].freePreview} id={`freePreview-${index+1}`}/>
                  <Label htmlFor={`freePreview-${index+1}`}>Free Preview</Label>
                </div>
              </div>
              <div className="">
                <Input name="videoUrl" type="file" onChange={(e) => handleFileChange(e, index) } accept="video/*" placeholder="" className="mb-4" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Curriculum;
