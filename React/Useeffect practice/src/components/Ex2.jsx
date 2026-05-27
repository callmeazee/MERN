import React, {useEffect} from 'react'


const Ex2 = () => {
  useEffect(()=>{
    window.location.href = "https://google.com"
  }, [])

  return (
    <div>Ex2</div>
  )
}

export default Ex2