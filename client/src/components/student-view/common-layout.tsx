
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header';

const  StudentViewCommonLayout = () => {
  const location = useLocation()
  return (
    <div> 
        {
          !location.pathname.includes('courses-progress')?
          <Header />
          :
          null

        }
        <Outlet/>
    </div>
  )
}

export default StudentViewCommonLayout;