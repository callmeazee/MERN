import React, {useState} from 'react'
import { useEffect } from 'react'

const Ex7 = () => {
    const [session, setSession] = useState(false)
    
    useEffect(()=>{
        if(session)
        {
            setTimeout(()=>{
                console.log("Welcome")
            }, 5000)
        }
    }, [session])

    return (
        <div className='p-16 space-y-8'>
            <h1 className='text-4xl font-semibold'>Try to login</h1>
            <button className='bg-green-500 px-6 py-2 rounded text-white' onClick={()=>setSession(!session)}>
                {
                    session ? "Logout" : "Login"
                }
            </button>
        </div>
    ) 
}

export default Ex7