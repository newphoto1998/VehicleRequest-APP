import http from "../config/axios";




export function ADD_RequestForm_Service(payload: any) {

    const config = {
         headers: {
          'Content-Type': 'multipart/form-data',
        }
        
      }

    return new Promise<any>(resolve => {
       http.VITE_BASE_API.post(`/FormRequest/SaveRequestForm`,payload,config).then((res) => {
         resolve(res.data);
       }).catch((e) => {
         console.log(e);
       });
    })
};




