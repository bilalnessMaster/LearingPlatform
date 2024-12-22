import { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
const ProgressTrackingBar = ({isMediaUploading , progress} : {
  isMediaUploading : boolean , progress : number
}) => {
    const [showProgress , setShowProgress] = useState<boolean>(false)
    const [animatedProgress , setAnimatedProgress] = useState<number>(0)

    useEffect(()=>{
      if(isMediaUploading){
        setAnimatedProgress(progress),
        setShowProgress(true)

      }else{
        const timer = setTimeout(()=>{
          setShowProgress(false)
        }, 1000)
        return () => clearTimeout(timer)
      }
    },[isMediaUploading , progress])
    if(!showProgress) return null
  return (
    <div className='w-full bg-gray-200 rounded-full h-3 mb-4 relative overflow-hidden '>
      <motion.div className='bg-black h-3 rounded-full '
      initial={{
        width : 0
      }}
      animate={{
        width : `${animatedProgress}%`,
        transition : {
          duration: 0.5, 
          ease: 'easeInOut'
        }
      }}
      
      >
          {
            progress >= 100 && isMediaUploading && (
              <motion.div className='absolute inset-0 bg-blue-400 opacity-50 '
              animate={{
                x : ['0%' , '100%' , '0%']
              }}
              />
            )
          }
      </motion.div>
    </div>
  )
}

export default ProgressTrackingBar