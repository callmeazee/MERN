import React, {useEffect}  from 'react'

const Ex5 = () => {
    useEffect(()=>{
        const a = document.createElement("a")
        a.href = "/demo.jpg"
        a.download = "demo.jpg"
        a.click()
        a.remove()
    }, [])

  return (
    <div>Ex5</div>
  )
}

export default Ex5