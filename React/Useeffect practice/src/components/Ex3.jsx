import React, { useEffect, useState } from 'react'

const Ex3 = () => {
    const [show, setShow] = useState(false)

    useEffect(()=>{
        setShow(true)
    }, [])

    return (
        <div>
            {
                show &&
                <div className='bg-violet-600 w-6/12 rounded py-3 px-6 flex gap-2 text-white mx-auto mt-12 animate__animated animate__pulse'>
                    <strong>Success !</strong>
                    <p>User invited successfully</p>
                </div>
            }
            <button className='bg-rose-600 px-8 py-2 text-white' onClick={()=>setShow(!show)}>Toggle</button>
        </div>
    )
}

export default Ex3