import ProgressTrackingBar from "@/components/media-progress-tracking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { useInstructor } from "@/stores/useInstructor";
import { Upload } from "lucide-react";
import { useRef } from "react";

const Curriculum = () => {
  const bulkUplaodRef = useRef<any | null>(null);
  const {
    addformCurriculum,
    mediaUploadProgress,
    mediaUploadPercentage,
    setFormCurriculumTitle,
    handleSwitchChange,
    replaceFile,
    courseCurriculumInitialFormData,
    handleFileChange,
    MediaBulkUpload,
  } = useInstructor();
  function handleNewLecture() {
    addformCurriculum();
  }
  const isCurriculumIsValid: () => boolean | undefined = () => {
    return courseCurriculumInitialFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  };
  const handleMediaChange = () => { 
    bulkUplaodRef?.current?.click()
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between ">
        <CardTitle className="text-xl flex ">
          Create Course Curriculum
        </CardTitle>
        <Label
          htmlFor="bulk-media-upload"
          className="flex flex-row justify-center items-center"
        >
          <span className="flex gap-2 items-center text-white bg-black/85 px-3 rounded-md py-2"><Upload className="size-5"/>
            Bulk upload
       </span>
          <Input onChange={MediaBulkUpload}
            multiple
            type="file"
            ref={bulkUplaodRef}
            accept="video/*"
            className="hidden"
            id="bulk-media-upload"
          />
          
            
        </Label>
        
      </CardHeader>
      <CardContent>
        <Button disabled={!isCurriculumIsValid()} onClick={handleNewLecture}>
          Add Lecture
        </Button>
        <div className="p-3">
          {mediaUploadProgress ? (
            <ProgressTrackingBar
              isMediaUploading={mediaUploadProgress}
              progress={mediaUploadPercentage}
            />
          ) : null}
        </div>
        <div className="mt-4 space-y-4">
          {courseCurriculumInitialFormData.map((_, index) => (
            <div key={index} className="border p-5 rounded-md space-y-4 ">
              <div className="flex gap-5">
                <h1 className="font-semibold">Lecture {index + 1}</h1>

                <Input
                  type="text"
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture tilte "
                  className="max-w-96"
                  onChange={(e) =>
                    setFormCurriculumTitle(e.target.value, index)
                  }
                  value={courseCurriculumInitialFormData[index].title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={() => handleSwitchChange(index)}
                    checked={courseCurriculumInitialFormData[index].freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="">
                {courseCurriculumInitialFormData[index]?.videoUrl ? (
                  <div className="space-y-3 ">
                    <VideoPlayer
                      width="500px"
                      height="300px"
                      url={courseCurriculumInitialFormData[index]?.videoUrl}
                    />
                    <div className="space-x-2">
                      <Button
                        onClick={() =>
                          replaceFile(
                            index,
                            courseCurriculumInitialFormData[index]?.public_id
                          )
                        }
                      >
                        Replace video
                      </Button>
                      <Button
                        onClick={() =>
                          replaceFile(
                            index,
                            courseCurriculumInitialFormData[index]?.public_id
                          )
                        }
                        className="bg-red-900"
                      >
                        Delete lecture
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Input
                    name="videoUrl"
                    type="file"
                    onChange={(e) => handleFileChange(e, index)}
                    accept="video/*"
                    placeholder=""
                    className="mb-4"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Curriculum;
