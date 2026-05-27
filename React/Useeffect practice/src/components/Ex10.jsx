import React, {useRef} from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Ex10 = () => {
    const videoRef = useRef(null)
    const [active, setActive] = useState(false)
    
    useEffect(()=>{
        if(videoRef.current && active === true)
        {
            const player = videoRef.current
            player.src = "https://www.w3schools.com/html/mov_bbb.mp4"
            player.play()
        }
    }, [active])

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            setActive(true)
        })
    }, [])

    return (
        <div className='h-[5000px]'>
            <video ref={videoRef} controls width="720" />
        </div>
    )
}

export default Ex10