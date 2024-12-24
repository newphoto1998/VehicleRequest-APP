//@ts-nocheck

import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Typography,
} from "antd";
import { getDistrict, getProvince, getTambon } from "../../../service/address";
import { District, Province, Tambon } from "../../../Model/Adress";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../../Model/UserLogin";
import { useDispatch, useSelector } from "react-redux";

const optionsWithDisabled = [
  { label: "ร้องขอแบบปกติ", value: "normal" },
  { label: "ร้องขอแบบฉุกเฉิน", value: "abnormal" },
];
function FormRequestPage1() {
  const dispatch = useDispatch();
  const [province, setprovince] = useState<Province[]>([]);
  const [district, setdistrict] = useState<District[]>([]);
  const [districtFilter, setdistrictFilter] = useState<District[]>([]);
  const [tambon, settambon] = useState<Tambon[]>([]);
  const [tambonFilter, settambonFilter] = useState<Tambon[]>([]);

  const [provinceSelected, setprovinceSelected] = useState<string>("default");
  const [districtSelected, setdistrictSelected] = useState<string>("default");
  const [tambonSelected, settambonSelected] = useState<string>("default");

  const [busRouteName, setbusRouteName] = useState<string>("true");
  const [busRouteEmployee, setbusRouteEmployee] = useState<string>("true");

  const [errors, setErrors] = useState({
    reason: "",
    busRoute_Address_Data:"",
    busRoute_Employee_Data:"",
    cusAddr:"",
    cusAddr_Province:"",
    cusAddr_District:"",
    cusAddr_Tambon:"",

  });

  const [clear,setclear] = useState<Boolean>(false)

  const users: any = localStorage.getItem("user_info");
  const reqeustFormBase = useSelector(
    (state: any) => state.requestFormStateReducer.requestFormState
  );

  const navigate = useNavigate();

  useEffect(() => {
    const localStorageItem: userInfo = JSON.parse(users);
    dispatch({
      type: "ADD_DATA_IN_FORM",
      payload: {
        ...reqeustFormBase,
        empCode: localStorageItem.user_info.empCode,
        empName: localStorageItem.user_info.fname,
        empSurn: localStorageItem.user_info.lname,
        empPosition: localStorageItem.user_info.position,
        empSect: localStorageItem.user_info.secT_Long,
        req_Type:'normal',
        req_Reason: "",
        busRoute_Address: "true",
        busRoute_Address_Data: "",
        busRoute_Employee: "true",
        busRoute_Employee_Data: "",
        cusAddr: "",
        cusAddr_Province: "",
        cusAddr_District: "",
        cusAddr_Tambon: "",
        cusAddr_Postcode: "",
        file_Tax: [],
        file_Tax_name: [],
        tax_ExpireDT: "",
        file_DriverLicense: [],
        file_DriverLicense_name: "",
        driverlicense_ExporeDT: "",
        driverLicenseNo: "",
        file_Pic_car: [],
        file_Pic_car_name: [],

        vehicleType: "car",
        vehicleNo: "",
        vehicleBrand: "",
        vehicleCategory: "",
        stickerNo: "",

        req_Status: "",
        req_By: "",
      },
    });

    getDataAddress();
  }, [clear]);

  const getDataAddress = async () => {
    let provinces: Province[] = await getProvince();
    provinces.unshift({ id: "default", name_th: "จังหวัด" });
    setprovince(provinces);

    let districts: District[] = await getDistrict();
    provinces.unshift({ id: "default", name_th: "อำเภอ" });
    setdistrict(districts);

    let tambons: Tambon[] = await getTambon();
    provinces.unshift({ id: "default", name_th: "ตำบล" });
    settambon(tambons);
  };

  const District = async (province_id: string) => {
    let raw_district: District[] = await district.filter(
      (x: District) => x.province_id == Number(province_id)
    );
    setdistrictFilter(raw_district);
    if (province_id == "default") {
      settambonFilter([]);
      defaultOnSelect("province");
    } else {
      await handleChange(
        "cusAddr_Province",
        province.filter((x: Province) => x.id == Number(province_id))[0].name_th
      );
      settambonFilter([]);
      setprovinceSelected(province_id);
      setdistrictSelected("default");
      settambonSelected("default");
    }
  };

  const Tambon = async (district_id: string) => {
    let raw_tambon: Tambon[] = await tambon.filter(
      (x: Tambon) => x.amphure_id == Number(district_id)
    );
    settambonFilter(raw_tambon);
    if (district_id == "default") {
      defaultOnSelect("district");
    } else {
      handleChange(
        "cusAddr_District",
        district.filter((x: Province) => x.id == Number(district_id))[0].name_th
      );
      setdistrictSelected(district_id);
      settambonSelected("default");
    }
  };

  const Zipcode = async (tambon_id: string) => {
    let zipcodes: Tambon[] = tambonFilter.filter(
      (x: Tambon) => x.id == Number(tambon_id)
    );

    if (tambon_id == "default") {
      defaultOnSelect("tambon");
    } else {
      handleChange(
        "cusAddr_Tambon",
        tambonFilter.filter((x: Tambon) => x.id == Number(tambon_id))[0]
          .name_th +
          " " +
          zipcodes[0].zip_code
      );
      settambonSelected(tambon_id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      // ทำอะไรเมื่อฟอร์มผ่านการตรวจสอบ
      navigate("/request-form-2");
    }
  };



  const validate = () => {
    const newErrors = {};
    if (!reqeustFormBase.req_Reason) {
      newErrors.reason = "กรุณากรอกเหตุผล";
    }

    if (reqeustFormBase.busRoute_Address == "true") {
      if (!reqeustFormBase.busRoute_Address_Data) {
        newErrors.busRoute_Address_Data = "กรุณากรอกชื่อสายรถ";
      }
    }

    if (reqeustFormBase.busRoute_Employee == "true") {
      if (!reqeustFormBase.busRoute_Employee_Data) {
        newErrors.busRoute_Employee_Data = "กรุณากรอกชื่อสายรถที่ผ่าน";
      }
    }

    if (!reqeustFormBase.cusAddr) {
      newErrors.cusAddr = "กรุณากรอกชื่อที่อยู่";
    }

    if (!reqeustFormBase.cusAddr_Province) {
      newErrors.cusAddr_Province = "กรุณาเลือกจังหวัด";
    }

    if (!reqeustFormBase.cusAddr_District) {
      newErrors.cusAddr_District = "กรุณาเลือกอำเภอ";
    }

    if (!reqeustFormBase.cusAddr_Tambon) {
      newErrors.cusAddr_Tambon = "กรุณาเลือกตำบล";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // ถ้าไม่มีข้อผิดพลาดจะคืนค่า true
  };

  async function handleChange(key: string, value: any) {
    if (key == "busRoute_Address") {
      setbusRouteName(value);

      dispatch({
        type: "ADD_DATA_IN_FORM",
        payload: {
          ...reqeustFormBase,
          busRoute_Address: value,
          busRoute_Address_Data: "",
        },
      });
    } else if (key == "busRoute_Employee") {
      setbusRouteEmployee(value);

      dispatch({
        type: "ADD_DATA_IN_FORM",
        payload: {
          ...reqeustFormBase,
          busRoute_Employee: value,
          busRoute_Employee_Data: "",
        },
      });
    } else if (key == "cusAddr_Province") {
      await dispatch({
        type: "ADD_DATA_IN_FORM",
        payload: {
          ...reqeustFormBase,
          cusAddr_Province: value,
          cusAddr_District: "",
          cusAddr_Tambon: "",
          cusAddr_Postcode: "",
        },
      });
    } else if (key == "cusAddr_District") {
      await dispatch({
        type: "ADD_DATA_IN_FORM",
        payload: {
          ...reqeustFormBase,
          cusAddr_District: value,
          cusAddr_Tambon: "",
          cusAddr_Postcode: "",
        },
      });
    } else if (key == "cusAddr_Tambon") {
      await dispatch({
        type: "ADD_DATA_IN_FORM",
        payload: {
          ...reqeustFormBase,
          cusAddr_Tambon: String(value).split(" ")[0],
          cusAddr_Postcode: String(value).split(" ")[1],
        },
      });
    } else {
      await dispatch({
        type: "ADD_DATA_IN_FORM",
        payload: { ...reqeustFormBase, [`${key}`]: value },
      });
    }
  }

  async function defaultOnSelect(key: string) {
    if (key == "province") {
      await dispatch({
        type: "ADD_DATA_IN_FORM",
        payload: {
          ...reqeustFormBase,
          cusAddr_Province: "",
          cusAddr_District: "",
          cusAddr_Tambon: "",
          cusAddr_Postcode: "",
        },
      });
    } else if (key == "district") {
      await dispatch({
        type: "ADD_DATA_IN_FORM",
        payload: {
          ...reqeustFormBase,
          cusAddr_District: "",
          cusAddr_Tambon: "",
          cusAddr_Postcode: "",
        },
      });
    } else if (key == "tambon") {
      await dispatch({
        type: "ADD_DATA_IN_FORM",
        payload: {
          ...reqeustFormBase,
          cusAddr_Tambon: "",
          cusAddr_Postcode: "",
        },
      });
    }
  }

  const clearData = () => {

    setdistrict([]);
    setprovince([]);
    settambon([]);
    setclear(!clear)
  };

  return (
    <div className="rounded-lg p-8 border border-gray-200 w-full md:w-[60%] bg-white">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div>
          <p className="text-2xl">รายละเอียดผู้ร้องขอ</p>
        </div>
        <div>
          <Radio.Group
            style={{ fontFamily: "Prompt" }}
            options={optionsWithDisabled}
            onChange={(e) => handleChange("req_Type", e.target.value)}
            value={reqeustFormBase.req_Type}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-8  text-sm">
          <div className="mb-4">
            <label
              htmlFor="username"
              className=" text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="email"
              className=" text-sm font-medium text-gray-700"
            >
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
          <div>
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
            <label
              htmlFor="email"
              className=" text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="email"
              className=" text-sm font-medium text-gray-700"
            >
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
          <label
            htmlFor="username"
            className=" text-sm font-medium text-gray-700"
          >
            เหตุผลในการนำรถมาทำงาน *
          </label>
          <textarea
            id="reason"
            name="reason"
            value={reqeustFormBase.req_Reason}
            onChange={(e) => handleChange("req_Reason", e.target.value)}
            rows={2} // Set the number of visible rows for the textarea
            className={`text-gray-700 bg-[#FAFFB3] mt-2 p-3 w-full border 
              border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none
               ${errors.reason ? "border-red-500 " : ""}`}
          />
          {errors.reason && (
            <p className="text-[12px] text-red-500">{errors.reason}</p>
          )}
        </div>

        <div className="mt-6">
          <label
            htmlFor="username"
            className=" text-sm font-medium text-gray-700"
          >
            ที่พักอยู่ในเส้นทางรถผ่านหรือไม่ผ่าน ?
          </label>
          <div className="flex justify-start gap-10">
            <div className="flex items-center mt-4">
              <input
                id="default-radio-1"
                type="radio"
                checked={busRouteName == "true"}
                onChange={(e) =>
                  handleChange("busRoute_Address", e.target.value)
                }
                value="true"
                name="default-radio"
                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                ผ่าน
              </label>
            </div>

            <div className="flex items-center mt-4">
              <input
                id="default-radio-1"
                type="radio"
                checked={busRouteName == "false"}
                onChange={(e) =>
                  handleChange("busRoute_Address", e.target.value)
                }
                value="false"
                name="default-radio"
                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                ไม่ผ่าน
              </label>
            </div>
            {busRouteName == "true" && (
              <div>
                <input
                  type="text"
                  id="busRoute_Address_Data"
                  name="busRoute_Address_Data"
                  placeholder="ผ่านสายไหน?"
                  value={reqeustFormBase.busRoute_Address_Data}
                  onChange={(e) =>
                    handleChange("busRoute_Address_Data", e.target.value)
                  }
                  className={`bg-[#FAFFB3] text-gray-700 text-sm p-2 
                    mt-3 w-full border border-gray-300 rounded-md shadow-sm  
                    focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none
                    ${errors.busRoute_Address_Data ? "border-red-500 " : ""}
                    `}
                />
                {errors.busRoute_Address_Data && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.busRoute_Address_Data}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <label
            htmlFor="username"
            className=" text-sm font-medium text-gray-700"
          >
            มีชื่อสายรถรับ-ส่ง หรือไม่ ?
          </label>
          <div className="flex justify-start gap-10">
            <div className="flex items-center mt-4">
              <input
                id="default-radio-2"
                type="radio"
                maxLength={10}
                checked={busRouteEmployee == "true"}
                onChange={(e) =>
                  handleChange("busRoute_Employee", e.target.value)
                }
                value="true"
                name="default-radio2"
                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                ผ่าน
              </label>
            </div>

            <div className="flex items-center mt-4">
              <input
                id="default-radio-2"
                type="radio"
                checked={busRouteEmployee == "false"}
                onChange={(e) =>
                  handleChange("busRoute_Employee", e.target.value)
                }
                value="false"
                name="default-radio2"
                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                ไม่ผ่าน
              </label>
            </div>

            {busRouteEmployee == "true" && (
              <div>
                <input
                  type="text"
                  id="busRoute_Employee_Data"
                  name="busRoute_Employee_Data"
                  placeholder="มีชื่อสายไหน?"
                  maxLength={10}
                  value={reqeustFormBase.busRoute_Employee_Data}
                  onChange={(e) =>
                    handleChange("busRoute_Employee_Data", e.target.value)
                  }
                  className={`bg-[#FAFFB3]  text-gray-700 
                    text-sm p-2 mt-3 w-full border border-gray-300 rounded-md shadow-sm  
                    focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none
                     ${errors.busRoute_Employee_Data ? "border-red-500 " : ""}
                    `}
                />
                {errors.busRoute_Employee_Data && (
                  <p className="mt-1 text-[12px] text-red-500">
                    {errors.busRoute_Employee_Data}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-3 mt-8 [&>*>*]:bg-[#FAFFB3] ">
          <div>
            <select
              value={provinceSelected}
              onChange={(e) => {
                District(e.target.value);
              }}
              id="countries"
              className={`border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                        ${errors.province ? "border-red-500 " : ""}`}
            >
              <option value={"default"} selected>
                จังหวัด
              </option>
              {province.map((item: Province, index: number) => {
                return (
                  <option value={item.id} key={index}>
                    {item.name_th}
                  </option>
                );
              })}
            </select>
          </div>
         
          <div>
            <select
              value={districtSelected}
              onChange={(e) => {
                Tambon(e.target.value);
              }}
              id="countries"
              className={`border border-gray-300 text-gray-900 text-sm rounded-lg 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    ${errors.cusAddr_District ? "border-red-500 " : ""}`}
            >
              <option value={"default"} selected>
                อำเภอ
              </option>

              {districtFilter.length > 0 && (
                <>
                  {districtFilter.map((item: District, index: number) => {
                    return (
                      // <option selected={item.id == districtFilter[0].id ? true : false} value={item.id} key={index}>
                      <option value={item.id} key={index}>
                        {item.name_th}
                      </option>
                    );
                  })}
                </>
              )}
            </select>
          </div>
          

          <div>
            <select
              value={tambonSelected}
              onChange={(e) => {
                Zipcode(e.target.value);
              }}
              id="countries"
              className={`border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                ${errors.cusAddr_Tambon ? "border-red-500 " : ""}`}
            >
              <option value={"default"} selected>
                ตำบล
              </option>

              {tambonFilter.length > 0 && (
                <>
                  {tambonFilter.map((item: Tambon, index: number) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name_th}
                      </option>
                    );
                  })}
                </>
              )}
            </select>
          </div>
        
          <div>
            <input
              type="text"
              id="username"
              name="username"
              disabled
              value={reqeustFormBase.cusAddr_Postcode}
              placeholder="รหัสไปรษณีย์"
              className={`p-3 w-full border border-gray-300 rounded-lg shadow-sm text-gray-900 text-sm !bg-[#C1FFFF] `}
            />
          </div>
        </div>
         
        <div className="grid md:grid-cols-4 gap-3">
          <div> {errors.cusAddr_Province && (<p className="mt-1 text-[12px] text-red-500">{errors.cusAddr_Province}</p>)}</div>
          <div> {errors.cusAddr_District && (<p className="mt-1 text-[12px] text-red-500">{errors.cusAddr_District}</p>)}</div>
          <div> {errors.cusAddr_Tambon && (<p className="mt-1 text-[12px] text-red-500">{errors.cusAddr_Tambon}</p>)}</div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="username"
            className=" text-sm font-medium text-gray-700"
          >
            ที่อยู่
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={reqeustFormBase.cusAddr}
            onChange={(e) => handleChange("cusAddr", e.target.value)}
            className={`bg-[#FAFFB3] p-2 w-full border border-gray-300 rounded-md shadow-sm 
                        ${errors.cusAddr ? "border-red-500 " : ""}`}
          />
          {errors.cusAddr && (
            <p className="mt-1 text-[12px] text-red-500">{errors.cusAddr}</p>
          )}
        </div>

        <div className="flex justify-end gap-5 mt-8">
          <div>
            <button
              type="button"
              onClick={() => clearData()}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              ล้างข้อมูล
            </button>
          </div>
          <div>
          {/* disabled={!reqeustFormBase.req_Reason || (reqeustFormBase.busRoute_Address == "true" && !reqeustFormBase.busRoute_Address_Data) || 
                        (reqeustFormBase.busRoute_Employee == "true" && !reqeustFormBase.busRoute_Employee_Data) || !reqeustFormBase.cusAddr ||
                        !reqeustFormBase.cusAddr_Province || !reqeustFormBase.cusAddr_District || !reqeustFormBase.cusAddr_Tambon
                        ? true : false} */}

            {/* ${!reqeustFormBase.req_Reason || (reqeustFormBase.busRoute_Address == "true" && !reqeustFormBase.busRoute_Address_Data) || 
                (reqeustFormBase.busRoute_Employee == "true" && !reqeustFormBase.busRoute_Employee_Data) || !reqeustFormBase.cusAddr ||
                !reqeustFormBase.cusAddr_Province || !reqeustFormBase.cusAddr_District || !reqeustFormBase.cusAddr_Tambon
                ? "bg-gray-500 hover:bg-gray-500" : ""} */}
            <button
              type="submit"
             
              className={`text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none 
              focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 
              text-center inline-flex items-center dark:bg-gray-600 
              dark:hover:bg-gray-700 dark:focus:ring-gray-800 
            `}
            >
              ต่อไป
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormRequestPage1;
