import { useEffect, useState } from "react";
import { Alert, Divider, Form, Input, InputNumber, Radio, RadioChangeEvent, Typography } from "antd";
import { getDistrict, getProvince, getTambon } from "../../../service/address";
import { District, Province, Tambon } from "../../../Model/Adress";
import {useNavigate } from "react-router-dom";
import { userInfo } from "../../../Model/UserLogin";
import { useDispatch, useSelector } from "react-redux";

const optionsWithDisabled = [
    { label: 'ร้องขอแบบปกติ', value: 'normal' },
    { label: 'ร้องขอแบบฉุกเฉิน', value: 'abnormal' },
  ];
function FormRequestPage1() {

    const dispatch = useDispatch();
    const [province ,setprovince] = useState<Province[]>([])
    const [district ,setdistrict] = useState<District[]>([])
    const [districtFilter  ,setdistrictFilter ] = useState<District[]>([])
    const [tambon ,settambon] = useState<Tambon[]>([])
    const [tambonFilter  ,settambonFilter ] = useState<Tambon[]>([])
    const [zipcode ,setzipcode] = useState<string>("")


    const [busRouteName,setbusRouteName] = useState<string>("true")
    const [busRouteEmployee , setbusRouteEmployee] = useState<string>("true")

    const users :any  = localStorage.getItem("user_info");
    const reqeustFormBase = useSelector((state:any) => state.requestFormStateReducer.requestFormState);

    

    const navigate = useNavigate()

    useEffect(() => {
        const localStorageItem :userInfo = JSON.parse(users)
        console.log(localStorageItem)
        dispatch({   type: "ADD_DATA_IN_FORM",
                      payload:{...reqeustFormBase,
                                  empCode:localStorageItem.user_info.empCode,
                                  empName:localStorageItem.user_info.fname,
                                  empSurn:localStorageItem.user_info.lname,
                                  empPosition:localStorageItem.user_info.position,
                                  empSect:localStorageItem.user_info.secT_Long,
                        

                               } });

        getDataAddress()

     
    }, [])
    
    const getDataAddress = async () => {

        let provinces : Province[] = await getProvince();
        setprovince(provinces);

        let districts : District[] = await getDistrict();
        setdistrict(districts);

        let tambons : Tambon[] = await getTambon();
        settambon(tambons);

    
    }

    const District = async (province_id : string) =>{
        

        let raw_district : District[] = await district.filter((x : District) => x.province_id == Number(province_id));
        setdistrictFilter(raw_district);

        if(province_id == "default"){

            settambonFilter([]);
            setzipcode("");
        }

        handleChange("cusAddr_Province",province.filter((x : Province) => x.id == Number(province_id))[0].name_th);
        

      
    }


    const Tambon = async (district_id : string) =>{
 
        let raw_tambon : Tambon[] = await tambon.filter((x : Tambon) => x.amphure_id == Number(district_id))
        settambonFilter(raw_tambon);

        handleChange("cusAddr_District",district.filter((x : Province) => x.id == Number(district_id))[0].name_th);

       
    }


    const Zipcode = async (tambon_id : string) =>{
        console.log(tambonFilter)
        let zipcodes : Tambon[] = tambonFilter.filter((x : Tambon) => x.id == Number(tambon_id))
        //  setzipcode(zipcodes.length > 0 ?  zipcodes[0].zip_code ?? "" : "");

         handleChange("cusAddr_Tambon",tambonFilter.filter((x : Tambon) => x.id == Number(tambon_id))[0].name_th);
         handleChange("cusAddr_Postcode",zipcodes.length > 0 ?  zipcodes[0].zip_code ?? "" : "");

    }

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
      }


      const nextPage = () =>{
        
        navigate("/request-form-2")
      }

   

      function handleChange(key: string, value: any) {

       if(key == "busRoute_Address"){
            setbusRouteName(value);
        }else if(key == "busRoute_Employee"){
            setbusRouteEmployee(value);
        }

        dispatch({   type: "ADD_DATA_IN_FORM",
                    payload:{...reqeustFormBase,
                                    [`${key}`]:value,
                }});
      }
    

  return (
    <div className="rounded-lg p-8 border border-gray-200 w-full md:w-[30%]">
        {JSON.stringify(reqeustFormBase)}
        <div className="flex flex-col md:flex-row justify-between gap-10">
            <div>    
                <p className="text-2xl">รายละเอียดผู้ร้องขอ</p>
            </div>
        
                <div>
                <Radio.Group
                        style={{fontFamily:"Prompt"}}
                        options={optionsWithDisabled}
                        onChange={(e) => handleChange("req_Type",e.target.value)}
                        value={reqeustFormBase.req_Type}
                        optionType="button"
                        buttonStyle="solid"
                    />
                    </div>

                 


                    
           
        </div>
  
      <form  onSubmit={handleSubmit}>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-8  text-sm">
                <div className="mb-4">
                <label htmlFor="username" className=" text-sm font-medium text-gray-700">
                    ชื่อ
                </label>
                <input
                    type="text"
                    id="fanme"
                    name="fanme"
                    value={reqeustFormBase.empName}
                    disabled
                    className={`p-2 bg-[#C1FFFF] w-full border border-gray-300 rounded-md shadow-sm `}
                />
                {/* {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>} */}
                </div>

            
                <div className="mb-4">
                <label htmlFor="email" className=" text-sm font-medium text-gray-700">
                    นามสกุล
                </label>
                <input
                    type="text"
                    id="surn"
                    name="surn"
                    value={reqeustFormBase.empSurn}
                    disabled
                    className={`p-2 bg-[#C1FFFF] w-full border border-gray-300 rounded-md shadow-sm `}
                />
                </div>


        </div>


        <div className="grid md:grid-cols-4 grid-cols-1 gap-4   text-sm">
                <div >
                <label className=" text-sm font-medium text-gray-700">
                    รหัสพนักงาน
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={reqeustFormBase.empCode}
                    disabled
                    className={`bg-[#C1FFFF] p-2 w-full border border-gray-300 rounded-md shadow-sm `}
                />
                </div>

            
                <div className="md:col-span-2">
                <label htmlFor="email" className=" text-sm font-medium text-gray-700">
                    แผนก
                </label>
                <input
                    type="text"
                    id="surn"
                    name="surn"
                    value={reqeustFormBase.empSect}
                    disabled
                    className={`bg-[#C1FFFF] p-2 w-full border border-gray-300 rounded-md shadow-sm `}
                />
                </div>

                
                <div>
                <label htmlFor="email" className=" text-sm font-medium text-gray-700">
                    ตำแหน่ง
                </label>
                <input
                    type="text"
                    id="surn"
                    name="surn"
                    disabled
                    value={reqeustFormBase.empPosition}
                    className={`bg-[#C1FFFF] p-2 w-full border border-gray-300 rounded-md shadow-sm `}
                />
                </div>


        </div>

        <div className="mt-4">
            <label htmlFor="username" className=" text-sm font-medium text-gray-700">
                        เหตุผลในการนำรถมาทำงาน *
                    </label>    
            <textarea
                id="comment"
                name="comment"
                onChange={(e) => handleChange("req_Reason",e.target.value)}
                rows={2} // Set the number of visible rows for the textarea
                className="text-gray-700 bg-[#FAFFB3] mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
        </div>



        <div className="mt-6">
                <label htmlFor="username" className=" text-sm font-medium text-gray-700">
                    ที่พักอยู่ในเส้นทางรถผ่านหรือไม่ผ่าน ?
                </label>
                <div className="flex justify-start gap-10">
                    <div className="flex items-center mt-4">
                        <input id="default-radio-1" type="radio" checked={busRouteName == "true"} onChange={(e) => handleChange("busRoute_Address",e.target.value)} value="true" name="default-radio" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ผ่าน</label>
                    </div>

                    <div className="flex items-center mt-4">
                        <input id="default-radio-1" type="radio" checked={busRouteName == "false"} onChange={(e) => handleChange("busRoute_Address",e.target.value)} value="false" name="default-radio" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ไม่ผ่าน</label>
                    </div>
                    {busRouteName == "true" &&

                        <div>
                            <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="ผ่านสายไหน?"
                            onChange={(e) => handleChange("busRoute_Address_Data",e.target.value)}
                            className={`bg-[#FAFFB3] text-gray-700 text-sm p-2 mt-3 w-full border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none`}
                            />
                        </div>
                    
                    }
                   

                    
                </div>

        </div>



        <div className="mt-8">
                <label htmlFor="username" className=" text-sm font-medium text-gray-700">
                    มีชื่อสายรถรับ-ส่ง หรือไม่ ?
                </label>
                <div className="flex justify-start gap-10">
                    <div className="flex items-center mt-4">
                        <input id="default-radio-2" type="radio" checked={busRouteEmployee == "true"} onChange={(e) => handleChange("busRoute_Employee",e.target.value)} value="true" name="default-radio2" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ผ่าน</label>
                    </div>

                    <div className="flex items-center mt-4">
                        <input id="default-radio-2" type="radio" checked={busRouteEmployee == "false"}  onChange={(e) => handleChange("busRoute_Employee",e.target.value)} value="false" name="default-radio2" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ไม่ผ่าน</label>
                    </div>
                  
                  {busRouteEmployee == "true" &&

                        <div>
                                <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="มีชื่อสายไหน?"
                                onChange={(e) => handleChange("busRoute_Employee_Data",e.target.value)}
                                className={`bg-[#FAFFB3]  text-gray-700 text-sm p-2 mt-3 w-full border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none`}
                                />
                        </div>
                  
                  }
                
                </div>

        </div>


            <div className="grid md:grid-cols-4 gap-3 mt-8 [&>*>*]:bg-[#FAFFB3] ">
                
                <div>       
                    <select onChange={(e) => {District(e.target.value)}} id="countries" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={"default"} selected>จังหวัด</option>
                        {province.map((item : Province ,index:number) => {
                            return (
                                <option value={item.id} key={index}>{item.name_th}</option>
                            )
                        })}
                     
                   
                    </select>
                </div>

                <div>       
                    <select onChange={(e) => {Tambon(e.target.value)}} id="countries" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>อำเภอ</option>

                        {districtFilter.length > 0 && 
                        <>
                            {districtFilter.map((item : District,index:number) => {
                            return (
                                <option value={item.id} key={index}>{item.name_th}</option>
                            )
                        })}
                        </>}

                    
                    </select>
                </div>
                

                <div>       
                    <select onChange={(e) => {Zipcode(e.target.value)}} id="countries" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>ตำบล</option>

                        {tambonFilter.length > 0 && 
                        <>
                            {tambonFilter.map((item : Tambon,index:number) => {
                            return (
                                <option value={item.id} key={index}>{item.name_th}</option>
                            )
                        })}
                        </>}

                      
                    </select>
                </div>
                <div >
                 
                    <input
                    type="text"
                    id="username"
                    name="username"
                    disabled
                    value={zipcode}
                    placeholder="รหัสไปรษณี"
                    className={`p-3 w-full border border-gray-300 rounded-lg shadow-sm text-gray-900 text-sm !bg-[#C1FFFF] `}
                />
        </div>

         
                </div>

                <div className="mt-4">
                    <label htmlFor="username" className=" text-sm font-medium text-gray-700">
                        ที่อยู่
                    </label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    className={`bg-[#FAFFB3] p-2 w-full border border-gray-300 rounded-md shadow-sm `}
                />
        </div>


        <div className="flex justify-end gap-5 mt-8">
            <div><button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        ล้างข้อมูล
            
                    </button>
                </div>
            <div><button onClick={() => nextPage()} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    ต่อไป
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                </button>
            </div>

        </div>

      
      </form>
    </div>
  );
}

export default FormRequestPage1;
