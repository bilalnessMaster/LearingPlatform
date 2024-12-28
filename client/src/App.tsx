
import { Route, Routes } from "react-router-dom"
import RouteGuard from "./routes-guard";
import InstructorDashboardPage from "./pages/instructor";
import AuthPage from "./pages/auth";
import { useAuthData } from "./stores/useAuth";
import { useEffect } from "react";
import StudentHomePage from "./pages/student/home";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import NotFoundPage from "./pages/not-found-page";
import AddNewCoursePage from "./pages/instructor/AddNewCourse";
import StudentCoursesPage from "./pages/student/courses";
import StudentLandingCoursePage from "./pages/student/student-course-details";

function App() {
  const {checkAuth } = useAuthData()

  useEffect(() => {
      checkAuth()
  }, [checkAuth])
 
  
  return (
    <Routes>
    <Route
      path="/auth"
      element={
        <RouteGuard
          element={<AuthPage />}
         
        />
      }
    />
    <Route
      path="/instructor"
      element={
        <RouteGuard
          element={<InstructorDashboardPage />}
       
        />
      }
    />
  <Route
      path="/instructor/create-new-course"
      element={
        <RouteGuard
          element={<AddNewCoursePage />}
       
        />
      }
    />
    <Route
      path="/instructor/edit-course/:id"
      element={
        <RouteGuard
          element={<AddNewCoursePage />}
       
        />
      }
    />
    <Route
      path="/"
      element={
        <RouteGuard
          element={<StudentViewCommonLayout />}
          
        />
      }
    >
      <Route path="/" element={<StudentHomePage />} />
      <Route path="/home" element={<StudentHomePage />} />
      <Route path="/courses" element={<StudentCoursesPage />} />
      <Route path="/courses/details/:id" element={<StudentLandingCoursePage />} />
    </Route>
    <Route path="*" element={<NotFoundPage/>} />  
  </Routes>
  )
}
export default App;