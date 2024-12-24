import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import { useSelector } from "react-redux";
import AppNavbar from "../shared/AppNavbar";
import { Box } from "@mui/material";
import AppSidebar from "../shared/AppSidebar";
import Trackingbar from "../shared/Trackingbar";

function BackendLayout() {

  const reqeustFormBase = useSelector((state:any) => state.requestFormStateReducer.requestFormState);

  return (
    <>    
         
         {/* <div className='min-h-screen flex items-center justify-center mt-5'>
                <Outlet/> 
          </div> */}

    <div className="app">
            <AppSidebar />
            <main className="content">
              <AppNavbar />
              <div className="bg-white w-full h-[92.75%] p-6 overflow-auto ml-40">
              {/* <div className="content_body"> */}
              <div className="flex flex-row justify-center gap-10">
                <div>  <Trackingbar/></div>
                <div> <Outlet /></div>
              </div>
              
                 
              
              </div>
            </main>
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
