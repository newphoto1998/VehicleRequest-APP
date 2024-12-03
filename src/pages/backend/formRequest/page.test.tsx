import { useState } from "react";
import { FileOutlined, InboxOutlined } from "@ant-design/icons";
import {
  Image,
  message,
  Progress,
  Space,
  Spin,
  Typography,
  Upload,
} from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import axios from "axios";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function FormRequestPage2() {
  const { Dragger } = Upload;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    multiple: true,
    listType: "picture",
    accept: ".png,.jpeg,.doc",
    customRequest({ file }: any) {

      const getFileObject = (progress: any) => {
        return {
          name: file.name,
          uid: file.uid,
          progress: progress,
        };
      };

      axios.post("http://localhost:5173", file, {
        onUploadProgress: (event) => {
          console.log(event);
          setFileList((pre) => {
            return { ...pre, [file.uid]: getFileObject(event.progress) };
          });
        },
      });
    },
    showUploadList: false,

    iconRender(file, listType) {
      return <Spin></Spin>;
    },
    progress: {
      strokeWidth: 3,
      strokeColor: {
        "0%": "#f0f",
        "100%": "#ff0",
      },
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="rounded-lg p-10 border border-gray-200 w-full md:w-[40%]">
      <p className="text-xl">หลักฐานการร้องขอ</p>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-4 ">
        <div>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              เอกสารสำเนาทะเบียนรถ/รายการต่อภาษี(พรบ.)
            </p>
          </Dragger>
          {Object.values(fileList).map((file: any) => {
            console.log(file);
            return (
              <>
                <Space direction="vertical">
                  <Space
                    style={{
                      background: "rgba(0,0,0,0.05)",
                      width: 500,
                      padding: 8,
                    }}
                  >
                    <FileOutlined />
                    <Typography>{file.name}</Typography>
                    </Space>
                    <Progress  percent={file.progress * 100} />
               
                </Space>
              </>
            );
          })}
        </div>

        <div>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              เอกสารสำเนาทะเบียนรถ/รายการต่อภาษี(พรบ.)
            </p>
          </Dragger>
        </div>

        <div>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              รูปถ่ายรถเต็มคัน ด้านหน้า ด้านหลัง ด้านซ้าย ด้านขวา
            </p>
          </Dragger>
        </div>
      </div>

      <div className="flex justify-end gap-5 mt-8">
        <div>
          <button
            type="button"
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
