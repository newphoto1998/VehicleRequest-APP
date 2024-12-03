import http from "../config/axios";
import { Province , District , Tambon } from "../Model/Adress";


export function getProvince() {
    return new Promise<Province[]>(resolve => {
       http.VITE_ADDRESS_API.get(`/api_province.json`).then((res) => {
         resolve(res.data);
       }).catch((e) => {
         console.log(e);
       });
    })
};

export function getDistrict() {
    return new Promise<District[]>(resolve => {
       http.VITE_ADDRESS_API.get(`/api_amphure.json`).then((res) => {
         resolve(res.data);
       }).catch((e) => {
         console.log(e);
       });
    })
};



export function getTambon() {
    return new Promise<Tambon[]>(resolve => {
       http.VITE_ADDRESS_API.get(`/api_tambon.json`).then((res) => {
         resolve(res.data);
       }).catch((e) => {
         console.log(e);
       });
    })
};

