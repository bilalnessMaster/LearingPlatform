import { SelectItem } from "@radix-ui/react-select";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
export type FormControl = {
  name: string; 
  label: string; 
  placeholder: string | undefined; 
  type?: string; 
  componentType: string;
  options?: { label: string; id: string }[]
};
const FormControls = ({ formControls = [], formData, setFormData }:{
  formControls: FormControl[] , 
  formData : Record<string, any> ,
  setFormData : (data: any) => void,
}) => {  
  function renderComponentByType(getControlItem: FormControl) {
    let element = null;
    const currentControlItemValue = formData[getControlItem.name] || "";
 
    
    
    
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={currentControlItemValue}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
            <SelectValue className="w-full">{currentControlItemValue || getControlItem.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem: any) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }
  return (
    <div className="flex flex-col gap-3">
      {formControls.map((componentItem, index) => (
        <div key={index} className="">
          <Label htmlFor={componentItem.name}>{componentItem.label} 
          </Label>
          {renderComponentByType(componentItem)}
        </div>
      ))}
    </div>
  );
};

export default FormControls;
