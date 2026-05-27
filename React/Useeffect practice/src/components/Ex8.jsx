import React, {useState} from 'react'
import { useEffect } from 'react'

const Ex8 = () => {
    const [students, setStudents] = useState(["ram", "rahul", "priya"])
    const [newUpdate, setNewUpdate] = useState(0)

    useEffect(()=>{
        if(newUpdate > 0)
        {
            console.log("New data added !")
        }
    }, [newUpdate])

    const addStudent = (name)=>{
        setStudents([
            ...students,
            name
        ])
        setNewUpdate(newUpdate+1)
    }

    return (
        <div className='p-12'>
            <h1 className='text-4xl font-bold'>Student`s List - {newUpdate}</h1>
            <ul>
                {
                    students.map((item, index)=>(
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>
            <button onClick={()=>addStudent("rohit")}>Add student</button>
        </div>
    )
}

export default Ex8