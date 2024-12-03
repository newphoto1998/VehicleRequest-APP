import { Outlet } from "react-router-dom"

function LoginLayout() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">

          <Outlet/>

    </div>
  )
}

export default LoginLayout