
import App from "@/App";
import AuthPage from "@/pages/auth";
import InstructorDashboardPage from "@/pages/instructor";
import RouteGuard from "@/routes-guard";

import { createBrowserRouter } from "react-router-dom";


const route = createBrowserRouter([
    {
        path : '/auth',
        element: (<RouteGuard element={<AuthPage/>}  />)
    },
    {
        path : '/instructor',
        element : (<RouteGuard  element={<InstructorDashboardPage/>}  />)
    },
    {
        path  : '/',
        element :(<RouteGuard element={<App />}/>),
        children : [
            {
                path : '',
                element : <div>home</div>
            }
        ]
    }
])

export default route