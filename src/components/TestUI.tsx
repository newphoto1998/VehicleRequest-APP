import { BellFilled, FormOutlined, InfoCircleFilled, SettingFilled } from "@ant-design/icons";
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
function TestUI() {
  return ( 
 
    <body className="bg-[#181a1e]">
        {/* // <body > */}


    
    <div className="container   w-screen relative flex">
        
            {/* navbar */}
        <div className="w-full top-0 left-0 px-10 h-20 text-white flex justify-between shadow-lg fixed">
          <div className="flex items-center gap-2">
            <img className="h-8 w-10 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1024px-Tailwind_CSS_Logo.svg.png?20230715030042" alt="" />
            <h2 className="text-2xl font-bold text-white">New<span className="text-cyan-300">Admin</span></h2>
            {/* <h2 className="text-3xl ml-16 text-amber-500">Vehicle Request Form</h2> */}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-xl"><p className="text-white">Hello <span className="text-cyan-300">phatcharaphon.f</span> </p></div>
            <div className="flex items-center text-xl gap-4">  <InfoCircleFilled /> <SettingFilled /> <BellFilled /></div>
      
            <div > <img className="h-12 w-12 rounded-full border-2 border-orange-500" src="../../../public/assets/image/me.jpg" alt="" /></div>
        
            
           
          </div>
          
        
        </div>
        
          {/* sidebar */}
          
          <div className="w-60 h-[850px] fixed text-white flex flex-col ml-10 top-24 bg-[#202528] rounded-3xl space-y-6 ">
            
              <div className="flex flex-col items-center justify-center w-full mt-4 gap-4">
               
                  <div className="w-full flex justify-center items-center"><img className="h-28 w-28 object-cover rounded-full" src="../../public/assets/image/me.jpg" alt=""  /></div>
                  
                  <div className="text-xl text-center w-full"><p className="text-gray-300">Role: <span className="text-cyan-300">Super Admin</span></p></div>
                  
                  <div className="text-sm text-center w-full"><p className="text-gray-400">Work For Balance</p></div>
                  
                  
                 
                  
              </div>
              
              <div className="flex flex-col items-center h-full w-full  pt-6 gap-2">
                  
                  <div className="flex items-center justify-around w-full px-14  hover:bg-[#181a1e]">
                    <div>  <DashboardIcon className="text-orange-500 text-2xl"/></div>
                       <div> <button type="button" className="p-4 w-full pr-10">Dashboard</button></div>
                  
                   </div>
                   
                   <div className="w-full flex flex-row items-center justify-stretch px-14 hover:bg-[#181a1e] ">
                    <div>  <DescriptionIcon style={{fontSize:30}} className="text-orange-500 text-2xl"/></div>
                    <div> <button type="button" className="p-4 w-full">Request</button></div>
                     
                   </div>
                   
                
                   
                   
                   
         
                   
                   
          
              
              </div>
          
          </div>
    
    </div>
      

    </body>
  );
}

export default TestUI;
