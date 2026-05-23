import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
const Dynamic = ()=>{
  const {filename} = useParams()
  try {
    const Component = lazy(() => import(/* @vite-ignore */`./components/${filename[0].toUpperCase()}${filename.slice(1).toLowerCase()}`))
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <Component />
      </Suspense>
    )
  } 
  catch (error) {
    return <p>Component not found, {error.message}
    </p>
  }
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:filename" element={<Dynamic />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App