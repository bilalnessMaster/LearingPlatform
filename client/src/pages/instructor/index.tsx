import IntructorCourses from "@/components/instructor-view/courses"
import InstructorDashboard from "@/components/instructor-view/dashboard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useAuthData } from "@/stores/useAuth"
import { BarChart, Book, LogOut } from "lucide-react"
import { useState } from "react"




const InstructorDashboardPage= () => {
  const [active , setActive] = useState('dashboard')
  const {Loggout} = useAuthData()
  const menuItems = [
    {
      icon : BarChart , 
      label : 'Dashboard',
      value : 'dashboard',
      Component : <InstructorDashboard/>
    },
    {
      icon : Book , 
      label : 'Courses',
      value : 'courses',
      Component : <IntructorCourses/>
    },
    {
      icon : LogOut , 
      label : 'Logout',
      value : 'logout',
      Component : null
    },
  ] 
  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Intructor View </h2>
          <nav>
            {
              menuItems.map((item )=>(
                <Button variant={active === item.value ? 'default' : 'ghost'} key={item.value} onClick={item.value === 'logout' ? Loggout : ()=>setActive(item.value)} className="w-full transistion duration-200 justify-start mb-2">
                     <item.icon className="mr-2 h-4 w-4" />
                     {item.label} 
                </Button>
              ) )
            }
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold mb-8">
                Dashboard
              </h1>
            </div>
            <Tabs value={active} onValueChange={setActive}>
                  {
                    menuItems.map(item =>(
                      <TabsContent key={item.label} value={item.value}>
                            {item.Component }
                      </TabsContent>
                    ))
                  }
            </Tabs>
      </main>
    </div>
  )
}

export default InstructorDashboardPage