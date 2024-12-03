export interface Province {
  
    id?:number;
    name_th?:string;


  }


  export interface District {
  
    id?:number;
    name_th?:string;
    province_id?:number;


  }
  


  export interface Tambon {
  
    id?:number;
    name_th?:string;
    amphure_id?:number
    zip_code?:string


  }
  
  