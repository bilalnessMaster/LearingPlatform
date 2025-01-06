import { courseCategories } from '@/config'
import publicbanner from '../../../../public/banner-img.png'
import { Button } from '@/components/ui/button'
import { useStudentStore } from '@/stores/useStudentStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const StudentHomePage = () => {
  const  navigate = useNavigate()
  const {fetchStudentCoures , studentCourseList} = useStudentStore()
  const handeCategory = (label : string ) => { 
      let filters = { 
        category : [ label]
      }
      sessionStorage.setItem('filters' , JSON.stringify(filters))
      navigate('/courses')
  }
  useEffect(()=>{ 
    fetchStudentCoures()
  },[])
  return (
    <div className="min-h-screen  bg-white font-poppin">
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
              <Button onClick={()=>handeCategory(id)} className='' variant={'outline'} key={id}>
                {label}
              </Button>
            ))
          }
        </div>
      </section>
      <section className='py-12 px-4 lg:px-8'>
          <h1 className='text-2xl font-bold font-archivo mb-6 text-center'>Feature Courses</h1>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                  studentCourseList && studentCourseList.length > 0 ? studentCourseList.map((course ,index)=>(
                      <div onClick={()=>navigate(`/courses/details/${course._id}`)} key={index} className='border rounded-lg'>
                          <img src={course?.image} alt={course.title} className='w-full h-55 rounded-t-lg object-cover'/>
                          <div className='p-2'>
                            <h3 className='font-archivo font-bold  '>
                              {course?.title}
                            </h3>
                              <p>
                                {
                                  course?.category
                                }
                              </p>
                            <p className='text-gray-400'>
                                @{course?.instructorName}
                              </p>
                              <p className='font-bold font-archivo '>
                                ${course?.pricing}
                              </p>
                          </div>
                      </div>
                  )) : <div>no course found</div>
                }
          </div>
      </section>

    </div>
  )
}

export default StudentHomePage