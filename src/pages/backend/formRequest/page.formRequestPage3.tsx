import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

function FormRequestPage3() {


    const navigate = useNavigate();


  return (
    <div className='border border-gray-200  p-8 h-auto shadow-lg'>
        <div className='flex flex-col justify-center items-center gap-4'>
            <div className='bg-green-100 ring-2 ring-green-100 rounded-full'><CheckIcon sx={{fontSize: 100 , color:'green'}}/></div>
            <div> <h1 className='text-3xl font-bold'>คุณได้ส่งคําขอร้องสติกเกอร์รถสำเร็จ</h1></div>
            <div> <h1 className='text-xl'>เลขที่เอกสารของคุณคือ 123456</h1></div>
            <div> <h1 className='text-md font-thin'>คุณสามารถนำเลขที่เอกสารของคุณไปใช้ในการติดตามสถานะเอกสารได้</h1></div>
            <div className='flex flex-row justify-between gap-20 mt-4'> 
                    <div> <button onClick={()=>navigate("/request-form-1")} type="button" className="px-6 py-4  bg-gradient-to-r from-blue-500 to-pink-500 hover:to-pink-700 text-white rounded-xl border border-transparent shadow-lg transiton duration-300 hover:bg-gradient-to-l hover:scale-110 hover:-translate-y-2 transition duration-400 focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                    ทำรายการต่อ
                    </button></div>

                    <div> <button  type="button" className="px-6 py-4  bg-gradient-to-r from-blue-500 to-pink-500 hover:to-pink-700 text-white rounded-xl border border-transparent shadow-lg transiton duration-300 hover:bg-gradient-to-l hover:scale-110 hover:-translate-y-2 transition duration-400 focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                    ติดตามสถานะเอกสาร
                    </button></div>
            </div>

       
        

        </div>
    </div>
  )
}

export default FormRequestPage3