import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

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
    action: "http://localhost:5173/",
    beforeUpload(file, fileList) {
      console.log(file);
      return false;
    },

    // defaultFileList: [
    //   {
    //     uid: "-1",
    //     name: "xxx.png",
    //     status: "uploading",
    //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //     thumbUrl:
    //       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   },
    // ],
    onChange(info) {
    console.log(info)
     
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
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
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
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
