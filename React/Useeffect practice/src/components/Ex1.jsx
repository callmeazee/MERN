import React, {useEffect} from 'react'

const Ex1 = () => {
    // login
    useEffect(()=>{
        alert("Hello from react app")
    }, [])

    // show advertise
    useEffect(()=>{
        console.log("Hello")
    }, [])

    // downloading
    useEffect(()=>{
        console.log("Second")
    }, [])

    return (
        <div>Ex1</div>
    )
}

export default Ex1