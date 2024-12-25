import { GraduationCap, TvMinimalPlay } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { useAuthData } from "@/stores/useAuth"


const Header = () => {
    const {Loggout} = useAuthData()
  return (
    <header className="flex items-center justify-between p-4 border-b relative ">
        <div className="flex items-center space-x-4 ">
            <Link to={"/home"} className="flex items-center justify-center gap-2">
                <GraduationCap className="h-8 w-8 gover:text-black" />
                <span className="font-extrabold md:text-xl text-[14px]">LMS LEARN</span>

            </Link>
            <div className="flex items-center space-x-1">
                <Button variant={'ghost'} className=" capitalize">
                    explore course
                </Button>

            </div>
        </div>
        <div className="flex items-center space-x-4 ">
            <div className="flex gap-4 items-center  ">
               <div className="flex items-center gap-2 cursor-pointer">
                <span>My Courses</span>
                <TvMinimalPlay  className="h-8 w-8  "/>
               </div>
               <Button onClick={Loggout}>log out</Button>
            </div>
        </div>
    </header>
  )
}

export default Header