import { courseCategories } from '@/config'
import publicbanner from '../../../../public/banner-img.png'
import { Button } from '@/components/ui/button'
import { useStudentStore } from '@/stores/useStudentStore'
import { useEffect } from 'react'


const StudentHomePage = () => {
  const {fetchStudentCoures , studentCourseList} = useStudentStore()
  useEffect(()=>{ 
    fetchStudentCoures()
  },[])
  return (
    <div className="min-h-screen  bg-white ">
      <section className="flex flex-col lg:flex-row items-center justify-start">
          <div className="lg:w-1/2 lg:pr-12 space-y-2 px-2">
            <h1 className="text-5xl  font-bold font-archivo ">
              Learning that gets you hire
            </h1>
            <p className="text-xl max-w-lg font-sans ">
              Skills for present and your future. Get start with us
            </p>
          </div>
          <div className="lg:w-full mb-8 lg:mb-0">
            <img src={publicbanner} width={600} height={400} className='w-full object-cover' alt="" />
          </div>
      </section>
      <section className='py-8 px-4 lg:px-8 bg-gray-100'>
        <h1 className='text-2xl font-bold font-archivo mb-6 text-center'>Course Catgeories</h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
          {
            courseCategories.map(({id , label})=>(
              <Button className='' variant={'outline'} key={id}>
                {label}
              </Button>
            ))
          }
        </div>
      </section>

    </div>
  )
}

export default StudentHomePage