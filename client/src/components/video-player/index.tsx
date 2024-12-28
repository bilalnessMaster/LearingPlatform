import { useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { twMerge } from 'tailwind-merge'
import { Slider } from '../ui/slider'
import { Button } from '../ui/button'
import { Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX } from 'lucide-react'

const VideoPlayer = ({
    width , height  , url , className
}:{
    width ?: string , height ?: string , url : string | undefined , className?: string
}) => {
    const [playing, setPlaying ] = useState(false)
    const [volume , setVolume] = useState(0.5)
    const [muted , setMuted] = useState(false)
    const [played , setPlayed]= useState(0)
    const [seeking , setSeeking] = useState(false)
    const [isFullScreen , setIsFullScreen] = useState(false)
    const [showControls , setShowControls] = useState(true)

    const playerRef = useRef(null)
    const playerContainerRef  = useRef(null)
    const controlsTimeoutRef = useRef(null)
    const handlePlayAndPause = () => { 
        setPlaying(!playing)
    }
    const handleProgess = (state : any) => { 

        if (!seeking) {
            setPlayed(state.played);
          }
        
    }
    const handleRewind = () => { 
       playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime()-5)
    }
    const handleForward = () => { 
       playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime()+5)
    }
    const handleToggelMute = () => { 
        setMuted(!muted)
    }
    const handleseekChange = (newValue : any) => { 
        setPlayed(newValue);
        setSeeking(true)
    }
    const handleseekMouseUp = () => { 
        setSeeking(false)
        playerRef?.current?.seekTo(played)

    }
    const handleVolumeChange = (value : any) => { 
            setVolume(value/100)
            
    }
    
    const formatTime  = (seconds : number)=>{
        const date = new Date(seconds*100)
        const hours= date.getUTCHours();
        const minute = date.getUTCMinutes();
        const second = date.getUTCSeconds()
        if(hours){
            return `${hours}:${minute}:${second}`

        }else{
            return `${minute}:${second}`
        }
     }
     const handleFullScreen = useCallback(()=>{ 
        if(!isFullScreen){
            if(playerRef?.current?.requestFullScreen){
                playerRef?.current?.requestFullScreen()
            }
        }else{
            if(document.exitFullscreen){
                document.exitFullscreen()
            }
        }
     },[isFullScreen])
    useEffect(()=> { 
        const handlefullscreenchange = () => {
            setIsFullScreen(document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange' , handleFullScreen)

        return () =>{
            document.removeEventListener('fullscreenchange' , handleFullScreen)
        }
    },[])
    useEffect(()=>{
       if(showControls){
        setTimeout(()=>{
            setShowControls(!showControls)
        },2000)
       }
    },[showControls])
  return (
    <div onMouseEnter={()=>setShowControls(true)} onMouseLeave={()=>setShowControls(false)} className={twMerge('relative bg-gray-900  overflow-hidden shadow-2xl transition-all duration-300 ease-in-out', className , isFullScreen && 'h-screen w-screen')} 
    style={{
        width , 
        height
    }}
    ref={playerContainerRef}>
       <ReactPlayer ref={playerRef} className="absolute  top-0 left-0" 
        width={'100%'}
        height={'100%'}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgess}
     
        url={url}

/>
{
    showControls && <div
    className={twMerge('absolute bottom-0 left-0 bg-gray-800  right-0 bg-opacity-75 p-4  transition-opacity duration-300' , showControls ? "opacity-100" : "opacity-0")}
    >
        <Slider value={[
            played*100
        ]} max={100} step={0.1} 
        onValueChange={(value)=>handleseekChange(value[0]/100)}
        onValueCommit={handleseekMouseUp}       
        />
        <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <Button variant='ghost' size={'icon'} onClick={handlePlayAndPause}
                    className='text-white hover:text-primary hover:bg-gray-700 '
                    >
                        {
                            playing ? <Pause/> : <Play />
                        }
                    </Button>
                    <Button variant='ghost' size={'icon'} onClick={handleRewind}
                    className='text-white hover:text-primary hover:bg-gray-700 '
                    >
                        <RotateCcw />
                    </Button>
                    <Button variant='ghost' size={'icon'} onClick={handleForward}
                    className='text-white hover:text-primary hover:bg-gray-700 '
                    >
                        <RotateCw />
                    </Button>  
                    <Button variant='ghost' size={'icon'} onClick={handleToggelMute}
                className='text-white hover:text-primary hover:bg-gray-700 '
                    >
                            {
                                muted ? 
                                <VolumeX /> :
                                <Volume2 />
                            }       
                                         </Button>  
                     <Slider max={100} step={1} onValueChange={(value)=>handleVolumeChange(value[0])} />                         
                </div>
                <div className='flex items-center space-x-2 '>
                                    <div className='text-white'>
                                        {
                                            formatTime(played*(playerRef?.current?.getDuration() || 0)) 
                                        }/ {formatTime(playerRef?.current?.getDuration() || 0)}
                                    </div>
                </div>
        </div>
    </div>
}
    </div>
  )
}

export default VideoPlayer