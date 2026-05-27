import React, {useEffect}  from 'react'

const Ex6 = () => {
    useEffect(()=>{
        const isDownloaded = sessionStorage.getItem("resume")
        if(isDownloaded === null)
        {
            const a = document.createElement("a")
            a.href = "/demo.jpg"
            a.download = "demo.jpg"
            a.click()
            a.remove()
            sessionStorage.setItem("resume", true)
        }
    }, [])

  return (
    <div>Ex5</div>
  )
}

export default Ex6