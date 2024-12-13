
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthData } from "@/stores/useAuth"

import { Navigate, useLocation } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"

type routeGuardProps = {
   
    element : React.ReactNode
}

const RouteGuard =({ element} :routeGuardProps)=> {
           
            const {user ,IsLoading} = useAuthData()

        try {
            const loaction = useLocation()
          
            if (!user?.authenticate && !loaction.pathname.includes('/auth')){
                return <Navigate to='/auth' />
            }
      
            
            if(user?.authenticate && user?.role !== 'instructor' && (location.pathname.includes('instructor')) || user && location.pathname.includes('auth')){
                return <Navigate to='/home' />
            }
            if(user?.authenticate && user?.role === 'instructor' && !location.pathname.includes('instructor')){
                return <Navigate to='/instructor' />
            }

            return <Fragment>
                
                {IsLoading ? <Skeleton /> : element}
                
                </Fragment>
        
            } catch (error) {
            
        }
}
export default RouteGuard;