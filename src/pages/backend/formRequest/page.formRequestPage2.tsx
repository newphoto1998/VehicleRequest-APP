import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import {useNavigate } from "react-router-dom";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function FormRequestPage2() {

  const navigate = useNavigate()
  const [previewTaxOpen, setPreviewTaxOpen] = useState(false);
  const [previewTaxImage, setPreviewTaxImage] = useState("");
  const [previewDriverLicenseOpen, setPreviewDriverLicenseOpen] = useState(false);
  const [previewDriverLicenseImage, setPreviewDriverLicenseImage] = useState("");
  const [previewCarOpen, setPreviewCarOpen] = useState(false);
  const [previewCarImage, setPreviewCarImage] = useState("");
  const [fileListTax, setFileListTax] = useState<UploadFile[]>([]);
  const [fileListDriverLicense, setFileListDriverLicense] = useState<UploadFile[]>([]);
  const [fileListCar, setFileListCar] = useState<UploadFile[]>([]);

  const [vehicleType , setvehicleType] = useState<string>("car")

  // const props: UploadProps = {
  //   multiple: true,
  //   maxCount: 1,
  //   listType: "picture-card",
  //   accept: ".png,.jpeg,.doc",
  //   action: "http://localhost:8000/uploadFile/",
  //   beforeUpload(file, fileList) {
  //     console.log(file);
  //     return false;
  //   },

  //   // defaultFileList: [
  //   //   {
  //   //     uid: "-1",
  //   //     name: "xxx.png",
  //   //     status: "uploading",
  //   //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   //     thumbUrl:
  //   //       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   //   },
  //   // ],
  //   onChange(info) {
  //     console.log(info);
  //   },

  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
  // };


  const beforeUpload = () => {
    return false;
  }
  const handlePreview = async (type:String,file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    if(type == "CAR"){
      setPreviewCarImage(file.url || (file.preview as string));
      setPreviewCarOpen(true);
    }else if(type == "LICENSE"){
      setPreviewDriverLicenseImage(file.url || (file.preview as string));
      setPreviewDriverLicenseOpen(true);
    }else if(type == "TAX"){
      setPreviewTaxImage(file.url || (file.preview as string));
      setPreviewTaxOpen(true);
    }
   
  };

  


  const handleChangeTax: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileListTax(newFileList);

  const handleChangeDriverLicense: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileListDriverLicense(newFileList);


  const handleChangeCar: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileListCar(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const BackPage = () => {
    
    navigate("/request-form-1")
  }


  const selectVehicleType = (event:any) =>{
    setvehicleType(event.target.value)
  }


  return (
    
    <div className="rounded-lg  border border-gray-200 w-full md:w-[30%] p-8">
      
      
      <div className="flex flex-col gap-3 ">
     
    
      <p className="text-xl">หลักฐานการร้องขอ</p>
  
          <div className="text-sm font-medium text-gray-700 mt-2">
            <p>สำเนาทะเบียนรถ/รายการต่อภาษี(พรบ.)</p>
           
          <Upload
              action="http://localhost:5173/upload"
              listType="picture-card"
              beforeUpload={beforeUpload}
              maxCount={2}
              fileList={fileListTax}
              onPreview={() =>handlePreview("test",fileListTax[0])}
              onChange={handleChangeTax}
            >
              {fileListTax.length >= 2 ? null : uploadButton}
            </Upload>
            {previewTaxImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewTaxOpen,
                  onVisibleChange: (visible) => setPreviewTaxOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewTaxImage(""),
                }}
                src={previewTaxImage}
              />
            )}
       
           
          
          </div>

          <div className="text-sm font-medium text-gray-700 ">
            <p>สำเนาใบอนุญาติขับขี่</p>
           
          <Upload
           
              action="http://localhost:5173/upload"
              listType="picture-card"
              beforeUpload={beforeUpload}
              maxCount={2}
              fileList={fileListDriverLicense}
              onPreview={()=> handlePreview("LICENSE",fileListDriverLicense[0])}
              onChange={handleChangeDriverLicense}
            >
              {fileListDriverLicense.length >= 2 ? null : uploadButton}
            </Upload>
            {previewDriverLicenseImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewDriverLicenseOpen,
                  onVisibleChange: (visible) => setPreviewDriverLicenseOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewDriverLicenseImage(""),
                }}
                src={previewDriverLicenseImage}
              />
            )}
       
           
          
          </div>

          <div className="text-sm font-medium text-gray-700 ">
            <p >รูปถ่ายรถเต็มคัน (ด้านหน้า ด้านหลัง ด้านซ้าย ด้านขวา)</p>
          <Upload
              action="http://localhost:5173/upload"
              listType="picture-card"
              maxCount={4}
              beforeUpload={beforeUpload}
              fileList={fileListCar}
              onPreview={() => handlePreview("CAR",fileListCar[0])}
              onChange={handleChangeCar}
            >
              {fileListCar.length >= 4 ? null : uploadButton}
            </Upload>
            {previewCarImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewCarOpen,
                  onVisibleChange: (visible) => setPreviewCarOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewCarImage(""),
                }}
                src={previewCarImage}
              />
            )}
       
           
          
          </div>

          <div>
            <label
              htmlFor="username"
              className=" text-sm font-medium text-gray-700"
            >
              เลขที่ใบขับขี่*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`bg-[#FAFFB3] text-gray-700 text-sm p-2 w-[100%] border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none`}
            />
          </div>
        <div>
          <p className="text-xl mt-2">รายละเอียดชนิดของรถ</p>
   
          <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
            <div className="flex flex-row md:gap-10  gap-5">
              <div>   <div className="flex items-center mt-4 ">
              <input
                id="default-radio-1"
                type="radio"
                value="car"
                name="default-radio"
                checked={vehicleType == "car"}
                onChange={selectVehicleType}
                className="cursor-pointerw-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                รถยนต์
              </label>
            </div></div>
         
              <div> 
                <div className="flex items-center mt-4">
              <input
                id="default-radio-1"
                type="radio"
                value="motorcycle"
                checked={vehicleType == "motorcycle"}
                onChange={selectVehicleType}
                name="default-radio"
                className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                รถจักรยานยนต์
              </label>
            </div></div>
           
            </div>

          

            <div className="mt-2">
            <label
              htmlFor="username"
              className=" text-sm font-medium text-gray-700"
            >
              เลขทะเบียน*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`bg-[#FAFFB3] text-gray-700 text-sm p-2 w-full border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none`}
            />
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
                id="username"
                name="username"
                disabled
                className={`p-2 bg-[#FAFFB3] w-full border border-gray-300 rounded-md shadow-sm `}
              />
              {/* {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>} */}
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
                id="surn"
                name="surn"
                disabled
                className={`p-2 bg-[#FAFFB3] w-full border border-gray-300 rounded-md shadow-sm `}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-5 mt-8">
        <div>
          <button
            type="button"
            onClick={() =>BackPage()}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            ย้อนกลับ
          </button>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormRequestPage2;
