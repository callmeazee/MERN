import React, { useState } from 'react'
import { useEffect } from 'react'

const Ex9 = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString())

    useEffect(()=>{
        const interval = setInterval(()=>{
            setTime(new Date().toLocaleTimeString())
        }, 1000)

        return ()=>{
           clearInterval(interval) 
        }
    }, [])

    return (
        <div>
            <div className='flex justify-between items-center bg-rose-600 fixed bottom-0 left-0 w-full p-8'>
                <h1 className='text-4xl font-bold text-white'>Limited Seats ! Hurry up</h1>
                <h1 className='text-4xl font-bold text-white'>{time}</h1>
            </div>
        </div>
    )
}

export default Ex9