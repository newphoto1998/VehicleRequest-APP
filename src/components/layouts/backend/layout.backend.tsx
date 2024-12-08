import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";

function BackendLayout() {
  return (
    // <div className='min-h-screen flex items-start justify-center mt-10'><Outlet/></div>

    <body className="bg-[#FFFF]">
      {/* // <body > */}

      <div className="container   w-screen relative flex">
            <Navbar/>
          
            <Sidebar/>
            
            <div className="h-full ml-80 fixed px-6 top-24">
                <Outlet/>
   
             </div>
           
     
      
      </div>
    </body>
  );
}

export default BackendLayout;
