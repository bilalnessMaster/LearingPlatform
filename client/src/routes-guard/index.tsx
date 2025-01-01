import { Skeleton } from "@/components/ui/skeleton"
import { useAuthData } from "@/stores/useAuth"

import { Navigate, useLocation } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"

type routeGuardProps = {
   
    element : React.ReactNode
}

const RouteGuard =({ element} :routeGuardProps)=> {
           
            const {user ,IsLoading} = useAuthData()
            const location = useLocation()

        if(IsLoading) return <Skeleton /> 

        try {
          
            if(!user && !location.pathname.includes('/auth')){
                console.log('auth works 1');
                return <Navigate to='/auth' />
            }
            if(
                user?.authenticate && 
                user?.role !== 'instructor' && 
                (location.pathname.includes('instructor')) || 
                user && location.pathname.includes('auth')
            )
                {
                    console.log('home works 2');
                    
                return <Navigate to='/home' />
            }
      
            
            if(user?.authenticate && user?.role === 'instructor' && !location.pathname.includes('instructor')){
                console.log('instructor works');
                return <Navigate to='/instructor' />
            }

            return <Fragment>
                
                { element}
                
                </Fragment>
        
            } catch (error) {
            
        }
}
export default RouteGuard;