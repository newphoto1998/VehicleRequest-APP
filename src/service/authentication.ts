import http from "../config/axios";
import { userLogin } from "../Model/UserLogin";




export function AuthenticationService(userlogin: userLogin) {
    return new Promise<any>(resolve => {
       http.VITE_BASE_API.post(`/Authentication/login`,userlogin).then((res) => {
         resolve(res.data);
       }).catch((e) => {
         console.log(e);
       });
    })
};



export function getDataService() {
    return new Promise<any>(resolve => {
       http.VITE_BASE_API.get(`/FormRequest/getFormRequestAll`).then((res) => {
         resolve(res.data);
       }).catch((e) => {
         console.log(e);
       });
    })
};

