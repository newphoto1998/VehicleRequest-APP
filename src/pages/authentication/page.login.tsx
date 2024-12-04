import { useState } from "react"
import { AuthenticationService, getDataService } from "../../service/authentication"
import { userLogin } from "../../Model/UserLogin"

function LoginPage() {

    const [username , setusername] = useState<string>("")
    const [password , setpassword] = useState<string>("")



    const Login = async(e: React.MouseEvent<HTMLButtonElement>) =>{

        e.preventDefault();

        const payload : userLogin = {username: username,password: password};

        const respone:any = await AuthenticationService(payload)

        

        localStorage.setItem('user_info', JSON.stringify(respone));


        console.log(respone)

    }

  return (
    <>

        <div className="bg-white flex flex-row rounded-lg ">
            
            <div className="flex flex-col justify-center items-center p-10 space-y-2 ">
                <img className="w-24 h-24 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1024px-Tailwind_CSS_Logo.svg.png?20230715030042" alt=""/>
                <span className="font-semibold text-4xl">DCI Vehicle Request Form</span>
                <span className="font-light text-gray-400">Please enter your Details</span>
                
                <div className="flex flex-col items-start w-full  space-y-2">
                    <span>Username</span>
                    <input onChange={(e)=>{setusername(e.target.value)}} className="placeholder:font-light w-full border border-gray-300 p-3 rounded-md" type="text" placeholder="Enter your username"/>
                </div>
                
                <div className="flex flex-col items-start w-full  space-y-2">
                    <span>Password</span>
                    <input onChange={(e)=>{setpassword(e.target.value)}}  className="placeholder:font-light w-full border border-gray-300 p-3 rounded-md" type="password" placeholder="Enter your password"/>
                </div>
                
           <br />
                
                <div className="flex flex-col w-full">
                    <div><button className="bg-black text-white p-3 rounded-lg w-full" onClick={(e)=>{Login(e)}} >Login</button></div>

                </div>
                
                <div className="py-4 space-x-2 text-red-800"><span> ใช้ username และ password อันเดียวกับที่เข้าเครื่องคอม </span></div>
            </div>
            
            <div className="relative">
                <img 
                className="w-[400px] h-full hidden md:block rounded-r-xl object-cover"
                src="../../../public/assets/image/dci3.jpg" />
            
                {/* <div className="absolute hidden md:block bottom-10 right-6 p-6 backdrop-blur-sm bg-opacity-0 rounded-lg shadow-xl">
                    <span className="text-xl text-white">Login to management your Project</span>
                 
                    <span className="text-cyan-400 text-md"> Enjoy your Coding with kobdemy</span>
                </div> */}
            
            </div>
      
        </div>
 
    
    </>
  )
}

export default LoginPage