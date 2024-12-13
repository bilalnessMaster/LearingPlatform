import { Button } from "@/components/ui/button"
import { useAuthData } from "@/stores/useAuth"


const StudentHomePage = () => {
  const {Loggout} = useAuthData()
  return (
    <div>home page
      <Button onClick={Loggout}>log out</Button>
    </div>
  )
}

export default StudentHomePage