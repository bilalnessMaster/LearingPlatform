import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommonForm from "@/components/commonform";
import { SignInformControls, SignUpformControls } from "@/config";
import { useAuthData } from "@/stores/useAuth";

const AuthPage = () => {
  const {
    SignUpformData,
    SignInformData,
    setSignUpFormData,
    setSignInFormData,
    hanldeSignUp,
    hanldeSignIn,
    
  } = useAuthData();
  const checkSignInValidation: ()=> boolean = () => {
    return SignInformData && SignInformData.email !== '' && SignInformData.password !== ''
  }
  const checkSignUpValidation: ()=> boolean = () => {
    return SignUpformData && SignUpformData.email !== '' && SignUpformData.password !== '' && SignUpformData.username !== ''
  }
  return (
    <section>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to="/" className="flex items-center justify-center ">
          <GraduationCap className="h-8 w-8 mr-4 " />
          <span className="font-bold text-x;">LMS LEARN</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen mt-2 bg-background ">
        <Tabs defaultValue="sign-in" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Sign in</TabsTrigger>
            <TabsTrigger value="sign-up">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign to your account</CardTitle>
                <CardDescription>
                  Enter your email and password t acces your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  handleSubmit={hanldeSignIn}
                  formData={SignInformData}
                  setFormData={setSignInFormData}
                  textButton="Sign in"
                  formControls={SignInformControls}
                  disabled={!checkSignInValidation()}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sign-up">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create new account</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  handleSubmit={hanldeSignUp}
                  formData={SignUpformData}
                  setFormData={setSignUpFormData}
                  textButton="Sign up"
                  formControls={SignUpformControls}
                  disabled={!checkSignUpValidation()}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default AuthPage;
