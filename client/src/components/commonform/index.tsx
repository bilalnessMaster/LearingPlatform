import { Button } from "../ui/button";
import FormControls from "./formControls";

type handleSubmitType = (event: React.FormEvent<HTMLFormElement>) => void;
type FormControl = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  componentType: string;
};
const CommonForm = ({
  handleSubmit,
  textButton,
  formData,
  setFormData,
  formControls = [],
  disabled = false
}: {
  formControls: FormControl[];
  handleSubmit: handleSubmitType;
  textButton?: string;
  formData: Record<string, any>;
  setFormData: (data: any) => void;
  disabled : boolean 
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={disabled} className="w-full ">{textButton || "sign up"}</Button>
    </form>
  );
};

export default CommonForm;
