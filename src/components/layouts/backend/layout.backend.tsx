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
              <div className="bg-white w-full h-[92.75%] md:p-6 overflow-auto md:ml-32">
              {/* <div className="content_body"> */}
              <div className="flex flex-col md:flex-row gap-[50px]">
                <div className="w-[30%]">  <Trackingbar/></div>
                <div className="w-[50%]"> <Outlet /></div>
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
