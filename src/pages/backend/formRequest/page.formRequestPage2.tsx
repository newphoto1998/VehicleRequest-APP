//@ts-nocheck

import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useNavigate } from "react-router-dom";
import type { DatePickerProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { ADD_RequestForm_Service } from "../../../service/requestForm";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function FormRequestPage2() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [previewTaxOpen, setPreviewTaxOpen] = useState(false);
  const [previewTaxImage, setPreviewTaxImage] = useState("");
  const [previewDriverLicenseOpen, setPreviewDriverLicenseOpen] = useState(false);
  const [previewDriverLicenseImage, setPreviewDriverLicenseImage] = useState("");
  const [previewCarOpen, setPreviewCarOpen] = useState(false);
  const [previewCarImage, setPreviewCarImage] = useState("");
  const [fileListTax, setFileListTax] = useState<UploadFile[]>([]);
  const [fileListDriverLicense, setFileListDriverLicense] = useState<UploadFile[]>([]);
  const [fileListCar, setFileListCar] = useState<UploadFile[]>([]);

  const [errors, setErrors] = useState({
    file_Tax: [],
    file_Tax_name:"",
    tax_ExpireDT:"",
    file_DriverLicense:"",
    file_DriverLicense_name:"",
    driverlicense_ExporeDT:"",
    driverLicenseNo:"",
    file_Pic_car:[],
    file_Pic_car_name:[],
    vehicleNo:"",
    vehicleBrand:"",
    vehicleCategory:"",

  });

  const reqeustFormBase = useSelector((state: any) => state.requestFormStateReducer.requestFormState);


   useEffect(() => {
      dispatch({
        type: "ADD_DATA_IN_FORM",
        payload: {
          ...reqeustFormBase,
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
  
 
    }, []);

  const onChangeDriverDate: DatePickerProps["onChange"] = (date,dateString) => {
    handleChange("driverlicense_ExporeDT", dateString);
  };

  const onChangeTaxDate: DatePickerProps["onChange"] = (date, dateString) => {
    handleChange("tax_ExpireDT", dateString);
  };


  const beforeUpload = () => {
    return false;
  };
  const handlePreview = async (type: String, file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    if (type == "CAR") {
      setPreviewCarImage(file.url || (file.preview as string));
      setPreviewCarOpen(true);
    } else if (type == "LICENSE") {
      setPreviewDriverLicenseImage(file.url || (file.preview as string));
      setPreviewDriverLicenseOpen(true);
    } else if (type == "TAX") {
      setPreviewTaxImage(file.url || (file.preview as string));
      setPreviewTaxOpen(true);
    }
  };

  const handleChangeTax: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    reqeustFormBase.file_Tax = [];
    reqeustFormBase.file_Tax_name = "";

    setFileListTax(newFileList);

    reqeustFormBase.file_Tax = newFileList.map((x) => x.originFileObj);
    reqeustFormBase.file_Tax_name = newFileList.map((x) => x.name);

  };

  const handleChangeDriverLicense: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileListDriverLicense(newFileList);

    reqeustFormBase.file_DriverLicense = [];
    reqeustFormBase.file_DriverLicense_name = "";

    reqeustFormBase.file_DriverLicense = newFileList[0].originFileObj;
    reqeustFormBase.file_DriverLicense_name = String(
      newFileList.map((x) => x.name)
    );
  };

  const handleChangeCar: UploadProps["onChange"] = ({fileList: newFileList}) => {
    reqeustFormBase.file_Pic_car = [];
    reqeustFormBase.file_Pic_car_name = [];
    setFileListCar(newFileList);


    reqeustFormBase.file_Pic_car = newFileList.map((x) => x.originFileObj);

    reqeustFormBase.file_Pic_car_name = newFileList.map((x) => x.name);

  };


  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const BackPage = () => {
    navigate("/request-form-1");
  };

  async function handleChange(key: string, value: any) {
    await dispatch({
      type: "ADD_DATA_IN_FORM",
      payload: { ...reqeustFormBase, [`${key}`]: value },
    });
  }

  // const handleSubmit = async () => {



  //   const formData = new FormData();


  //   Object.entries(reqeustFormBase).forEach(([key, value]:any) => {

      
  //     if(key == "file_Tax"){
  //       reqeustFormBase.file_Tax.forEach((file: any) => {
  //         formData.append("file_Tax", file);
  //       });
  //     }
  //     else if(key == "file_Tax_name"){
  //       reqeustFormBase.file_Tax_name.forEach((name: any) => {
  //         formData.append("file_Tax_name", name);
  //       });
  //     }     
  //     else if(key == "file_Pic_car"){   
  //       reqeustFormBase.file_Pic_car.forEach((file: any) => {
  //         formData.append("file_Pic_car", file);
  //       });
  //     }else if(key == "file_Pic_car_name"){
  //       reqeustFormBase.file_Pic_car_name.forEach((name: any) => {
  //         formData.append("file_Pic_car_name", name);
  //       });
  //     }else{  
  //       formData.append(key, value);
  //     }

  //   })

  //   //const respone:any = await ADD_RequestForm_Service(formData)
  //   Swal.fire({
  //     position: "top-end",
  //     icon: "success",
  //     title: "บันทึกข้อมูลเรียบร้อย",
  //     showConfirmButton: false,
  //     timer: 1500
  //   });

  //   // try {
  //   //   const response = axios.post(
  //   //     "http://localhost:5207/api/FormRequest/upload",
  //   //     formData,
  //   //     {
  //   //       headers: {
  //   //         "Content-Type": "multipart/form-data",
  //   //       },
  //   //     }
  //   //   );
  //   // } catch (error) {}

  //   // เพิ่มไฟล์ทั้งหมดลงใน FormData
  // };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
   
    if (validate()) {
      // ทำอะไรเมื่อฟอร์มผ่านการตรวจสอบ
    
      const formData = new FormData();

      Object.entries(reqeustFormBase).forEach(([key, value]:any) => {
         
        if(key == "file_Tax"){
          reqeustFormBase.file_Tax.forEach((file: any) => {
            formData.append("file_Tax", file);
          });
        }
        else if(key == "file_Tax_name"){
          reqeustFormBase.file_Tax_name.forEach((name: any) => {
            formData.append("file_Tax_name", name);
          });
        }     
        else if(key == "file_Pic_car"){   
          reqeustFormBase.file_Pic_car.forEach((file: any) => {
            formData.append("file_Pic_car", file);
          });
        }else if(key == "file_Pic_car_name"){
          reqeustFormBase.file_Pic_car_name.forEach((name: any) => {
            formData.append("file_Pic_car_name", name);
          });
        }else{  
          formData.append(key, value);
        }
  
      })

        const respone:any = await ADD_RequestForm_Service(formData)
       
        if(respone.status == true){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "บันทึกข้อมูลเรียบร้อย",
            showConfirmButton: false,
            timer: 1500
          });
          
        }else{
          Swal.fire({
            icon: "error",
            title: "บึนทึกข้อมูลไม่สําเร็จ",
            html: 'กรุณาตรวจสอบข้อมูลอีกครั้ง <br>หรือ ติดต่อแผนก GA (103) / IT (250)',
      
            
          });
        }
       
    }
  };


  const validate = () => {
    const newErrors = {};
    if (fileListTax.length < 2) {
      newErrors.file_Tax = "กรุณาใส่รูปให้ครบ";
    }
    if (fileListDriverLicense.length < 1) {
      newErrors.file_DriverLicense = "กรุณาใส่รูปให้ครบ";
    }
   
    if (fileListCar.length < 4) {
      newErrors.file_Pic_car = "กรุณาใส่รูปให้ครบ";
    }
    
    if (!reqeustFormBase.driverLicenseNo) {
      newErrors.driverLicenseNo = "กรุณากรอกเลขที่ใบขับขี่";
    }

    if (!reqeustFormBase.driverlicense_ExporeDT) {
      newErrors.driverlicense_ExporeDT = "กรุณาใส่วันที่หมดอายุใบขับขี่";
    }

    if (!reqeustFormBase.tax_ExpireDT) {
      newErrors.tax_ExpireDT = "กรุณาใส่วันที่หมดอายุ Tax";
    }

    if (!reqeustFormBase.vehicleNo) {
      newErrors.vehicleNo = "กรุณากรอกเลขทะเบียน";
    }

    if (!reqeustFormBase.vehicleCategory) {
      newErrors.vehicleCategory = "กรุณากรอกชนิดรถ";
    }

    if (!reqeustFormBase.vehicleBrand) {
      newErrors.vehicleBrand = "กรุณากรอกยี่ห้อรถ";
    }

    setErrors(newErrors);
    console.log(newErrors);

    return Object.keys(newErrors).length === 0; // ถ้าไม่มีข้อผิดพลาดจะคืนค่า true
  };

  return (
    // <div className="h-full fixed px-2">
      <div className="rounded-lg p-8 border border-gray-200  bg-white">
      <form onSubmit={handleSubmit}> 
        <div className="flex flex-col gap-3 ">
          <p className="text-xl">หลักฐานการร้องขอ</p>
          <div className="text-sm font-medium text-gray-700 mt-2">
            <p>สำเนาทะเบียนรถ/รายการต่อภาษี(พรบ.)</p>

            <Upload
              name="file_Tax"
              action="http://localhost:5173/upload"
              listType="picture-card"
              beforeUpload={beforeUpload}
              maxCount={2}
              fileList={fileListTax}
              onPreview={() => handlePreview("TAX", fileListTax[0])}
              onChange={handleChangeTax}
              multiple
              accept=".png,.jpeg,.jpg" 
            >
              {fileListTax.length >= 2 ? null : uploadButton}
            </Upload>
            {previewTaxImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewTaxOpen,
                  onVisibleChange: (visible) => setPreviewTaxOpen(visible),
                  afterOpenChange: (visible) =>
                    !visible && setPreviewTaxImage(""),
                }}
                src={previewTaxImage}
              />
            )}
            {errors.file_Tax && (<p className="mt-1 text-[12px] text-red-500">{errors.file_Tax}</p>)}

          </div>

          <div className="text-sm font-medium text-gray-700 ">
            <p>สำเนาใบอนุญาติขับขี่</p>

            <Upload
              name="file_DriverLicense"
              action="http://localhost:5173/upload"
              listType="picture-card"
              beforeUpload={beforeUpload}
              maxCount={1}
              fileList={fileListDriverLicense}
              onPreview={() =>
                handlePreview("LICENSE", fileListDriverLicense[0])
              }
              onChange={handleChangeDriverLicense}
              accept=".png,.jpeg,.jpg" 
            >
              {fileListDriverLicense.length >= 1 ? null : uploadButton}
            </Upload>
            {previewDriverLicenseImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewDriverLicenseOpen,
                  onVisibleChange: (visible) =>
                    setPreviewDriverLicenseOpen(visible),
                  afterOpenChange: (visible) =>
                    !visible && setPreviewDriverLicenseImage(""),
                }}
                src={previewDriverLicenseImage}
              />
            )}
                        {errors.file_DriverLicense && (<p className="mt-1 text-[12px] text-red-500">{errors.file_DriverLicense}</p>)}

          </div>

          <div className="text-sm font-medium text-gray-700 ">
            <p>รูปถ่ายรถเต็มคัน (ด้านหน้า ด้านหลัง ด้านซ้าย ด้านขวา)</p>
            <Upload
              name="file_Pic_car"
              action="http://localhost:5173/upload"
              listType="picture-card"
              maxCount={4}
              beforeUpload={beforeUpload}
              fileList={fileListCar}
              onPreview={() => handlePreview("CAR", fileListCar[0])}
              onChange={handleChangeCar}
              multiple
              accept=".png,.jpeg,.jpg" 
            >
              {fileListCar.length >= 4 ? null : uploadButton}
            </Upload>
            {previewCarImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewCarOpen,
                  onVisibleChange: (visible) => setPreviewCarOpen(visible),
                  afterOpenChange: (visible) =>
                    !visible && setPreviewCarImage(""),
                }}
                src={previewCarImage}
              />
              
            )}
              {errors.file_Pic_car && (<p className="mt-1 text-[12px] text-red-500">{errors.file_Pic_car}</p>)}

          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="driverLicenseNo"
                className=" text-sm font-medium text-gray-700"
              >
                เลขที่ใบขับขี่*
              </label>
              <input
                type="text"
                id="driverLicenseNo"
                name="driverLicenseNo"
                onChange={(e) =>
                  handleChange("driverLicenseNo", e.target.value)
                }
                className={`bg-[#FAFFB3] text-gray-700 text-sm p-2 w-[100%] border border-gray-300 
                  rounded-md shadow-sm  focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none
                  ${errors.driverLicenseNo ? "border-red-500 " : ""}`}
              />
              {errors.driverLicenseNo && (<p className="mt-1 text-[12px] text-red-500">{errors.driverLicenseNo}</p>)}
            </div>

            <div>
              <label
                htmlFor="driverlicense_ExporeDT"
                className=" text-sm font-medium text-gray-700"
              >
                วันหมดอายุใบขับขี่*
              </label>

              <DatePicker
                className={`bg-[#FAFFB3] text-gray-700 text-sm p-2 w-[100%] border 
                  border-gray-300 rounded-md shadow-sm hover:bg-[#FAFFB3] 
                  focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none 
                   ${errors.driverlicense_ExporeDT ? "border-red-500 " : ""}`}
                name="driverlicense_ExporeDT"
                onChange={onChangeDriverDate}
                placeholder=""
              />
              {errors.driverlicense_ExporeDT && (<p className="mt-1 text-[12px] text-red-500">{errors.driverlicense_ExporeDT}</p>)}

            </div>

            <div>
              <label
                htmlFor="tax_ExpireDT"
                className=" text-sm font-medium text-gray-700"
              >
                วันหมดอายุ Tax*
              </label>
              <DatePicker
                className={`bg-[#FAFFB3] text-gray-700 text-sm p-2 
                w-[100%] border border-gray-300 
                rounded-md shadow-sm hover:bg-[#FAFFB3] 
                focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none
                 ${errors.tax_ExpireDT ? "border-red-500 " : ""}`}
                onChange={onChangeTaxDate}
                name="tax_ExpireDT"
                placeholder=""
              />
             {errors.tax_ExpireDT && (<p className="mt-1 text-[12px] text-red-500">{errors.tax_ExpireDT}</p>)}

            </div>
          </div>

          <div>
            <p className="text-xl mt-2">รายละเอียดชนิดของรถ</p>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
              <div className="flex flex-row md:gap-10  gap-5">
                <div>
                  <div className="flex items-center mt-4 ">
                    <input
                      id="default-radio-1"
                      type="radio"
                      checked={reqeustFormBase.vehicleType == "car"}
                      name="default-radio"
                      value="car"
                      onChange={(e) =>
                        handleChange("vehicleType", e.target.value)
                      }
                      className="cursor-pointerw-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      รถยนต์
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mt-4">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value="motorcycle"
                      checked={reqeustFormBase.vehicleType == "motorcycle"}
                      onChange={(e) =>
                        handleChange("vehicleType", e.target.value)
                      }
                      name="default-radio"
                      className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      รถจักรยานยนต์
                    </label>
                  </div>
                </div>
              </div>

              <div className="groid grid-cols-3 mt-2">
                <label
                  htmlFor="username"
                  className=" text-sm font-medium text-gray-700"
                >
                  เลขทะเบียน*
                </label>
                <input
                  type="text"
                  id="vehicleNo"
                  name="vehicleNo"
                  onChange={(e) => handleChange("vehicleNo", e.target.value)}
                  className={`bg-[#FAFFB3] text-gray-700 text-sm p-2 w-full border border-gray-300 
                    rounded-md shadow-sm  focus:outline-none focus:ring-1 
                    focus:ring-blue-500 resize-none
                     ${errors.vehicleNo ? "border-red-500 " : ""}`}
                />
                 {errors.vehicleNo && (<p className="mt-1 text-[12px] text-red-500">{errors.vehicleNo}</p>)}

              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label
                  htmlFor="username"
                  className=" text-sm font-medium text-gray-700"
                >
                  ชนิดของรถ
                </label>
                <input
                  type="text"
                  id="vehicleCategory"
                  name="vehicleCategory"
                  onChange={(e) =>
                    handleChange("vehicleCategory", e.target.value)
                  }
                  className={`p-2 bg-[#FAFFB3] w-full border border-gray-300 rounded-md shadow-sm  
                    ${errors.vehicleCategory ? "border-red-500 " : ""}`}
                />
                 {errors.vehicleCategory && (<p className="mt-1 text-[12px] text-red-500">{errors.vehicleCategory}</p>)}
                 </div>

              <div>
                <label
                  htmlFor="email"
                  className=" text-sm font-medium text-gray-700"
                >
                  ยี่ห้อ
                </label>
                <input
                  type="text"
                  id="vehicleBrand"
                  name="vehicleBrand"
                  onChange={(e) => handleChange("vehicleBrand", e.target.value)}
                  className={`p-2 bg-[#FAFFB3] w-full border border-gray-300 rounded-md shadow-sm  
                    ${errors.vehicleBrand ? "border-red-500 " : ""}`}
                />
                 {errors.vehicleBrand && (<p className="mt-1 text-[12px] text-red-500">{errors.vehicleBrand}</p>)}

              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-5 mt-8">
          <div>
            <button
              type="button"
              onClick={() => BackPage()}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              ย้อนกลับ
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              บันทึก
            </button>
          </div>
        </div>
        </form>
      </div>
    // </div>
  );
}

export default FormRequestPage2;
