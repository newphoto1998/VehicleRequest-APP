import { BellFilled,  InfoCircleFilled, SettingFilled } from "@ant-design/icons";


function Navbar() {
  return (
  <>
  <div className="w-full top-0 left-0 px-4 h-16 text-white hidden md:flex space-x-4 justify-between shadow-lg fixed ">
        <div className="flex items-center gap-2">
          <img className="h-8 w-10 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1024px-Tailwind_CSS_Logo.svg.png?20230715030042" alt="" />
          <h2 className="text-2xl font-bold text-black">Vehicle <span className="text-cyan-300">Control</span></h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-xl"><p className="text-black">Hello <span className="text-cyan-300">phatcharaphon.f</span> </p></div>
          <div className="flex items-center text-xl gap-4 text-black">  <InfoCircleFilled /> <SettingFilled /> <BellFilled /></div>
    
          <div > <img className="h-12 w-12 rounded-full border-1 border-black" src="../../../public/assets/image/me.jpg" alt="" /></div>
      
          
         
        </div>
    </div>
    
    </>
    
  )
}

export default Navbar