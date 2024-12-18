import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { useSelector } from "react-redux";

function BackendLayout() {

  const reqeustFormBase = useSelector((state:any) => state.requestFormStateReducer.requestFormState);

  return (
    <>    
         
         <div className='min-h-screen flex items-center justify-center mt-5'>
                <Outlet/> 
          </div>
    </>
  

    // <body className="bg-[#FFFF]">
    //   {/* // <body > */}

    //   <div className="container   w-screen relative flex">
    //         <Navbar/>
          
    //         <Sidebar/>
            
    //         <div className="h-full ml-80 fixed px-6 top-24">
    //             <Outlet/>
   
    //          </div>
           
     
      
    //   </div>
    // </body>
  );
}

export default BackendLayout;
