import { Outlet } from 'react-router-dom'

function BackendLayout() {
  return (
    <div className='min-h-screen flex items-start justify-center mt-10'><Outlet/></div>
  )
}

export default BackendLayout