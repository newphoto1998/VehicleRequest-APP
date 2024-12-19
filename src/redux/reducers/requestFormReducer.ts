const initialData = {

    requestFormState:{
     
      req_Type:'normal',
      empCode:'',
      empName:'',
      empSurn:'',
      empPosition:'',
      empSect:'',
      req_Reason:'',
      busRoute_Address:'true',
      busRoute_Address_Data:'',
      busRoute_Employee:'true',
      busRoute_Employee_Data:'',
      cusAddr:'',
      cusAddr_Province:'',  
      cusAddr_District:'',
      cusAddr_Tambon:'',
      cusAddr_Postcode:'',

      file_Tax:[],
      file_Tax_name:[],
      tax_ExpireDT:'',

     
      file_DriverLicense:[],
      file_DriverLicense_name:'',
      driverlicense_ExporeDT:'',
      driverLicenseNo:'',

    
      file_Pic_car:[],
      file_Pic_car_name:[],


      vehicleType:'car',
      vehicleNo:'',
      vehicleBrand:'',
      vehicleCategory:'',
      stickerNo:'',

      req_Status:'',
      req_By:'',
      


     
      
      
  
    },
    
   
   
  }
  
  
  const reqeustFormReducer = (state = initialData  ,action:any) => {
    switch(action.type){
      case 'ADD_DATA_IN_FORM': 
        return{
         
          ...state,
          requestFormState:{
        
           
            req_Type:action.payload.req_Type,
            empCode:action.payload.empCode,
            empName:action.payload.empName,
            empSurn:action.payload.empSurn,
            empPosition:action.payload.empPosition,
            empSect:action.payload.empSect,
            req_Reason:action.payload.req_Reason,
            busRoute_Address:action.payload.busRoute_Address,
            busRoute_Address_Data:action.payload.busRoute_Address_Data,
            busRoute_Employee:action.payload.busRoute_Employee,
            busRoute_Employee_Data:action.payload.busRoute_Employee_Data,
            cusAddr:action.payload.cusAddr,
            cusAddr_Province:action.payload.cusAddr_Province,  
            cusAddr_District:action.payload.cusAddr_District,
            cusAddr_Tambon:action.payload.cusAddr_Tambon,
            cusAddr_Postcode:action.payload.cusAddr_Postcode,
      
            file_Tax:action.payload.file_Tax,
            file_Tax_name:action.payload.file_Tax_name,
            tax_ExpireDT:action.payload.tax_ExpireDT,
      
           
            file_DriverLicense:action.payload.file_DriverLicense,
            file_DriverLicense_name:action.payload.file_DriverLicense_name,
            driverlicense_ExporeDT:action.payload.driverlicense_ExporeDT,
            driverLicenseNo:action.payload.driverLicenseNo,
      
          
            file_Pic_car:action.payload.file_Pic_car,
            file_Pic_car_name:action.payload.file_Pic_car_name,
            
      
            vehicleType:action.payload.vehicleType,
            vehicleNo:action.payload.vehicleNo,
            vehicleBrand:action.payload.vehicleBrand,
            vehicleCategory:action.payload.vehicleCategory,
            stickerNo:action.payload.stickerNo,
      
            req_Status:action.payload.req_Status,
            req_By:action.payload.req_By,
            
           
  
          }
        }

      case 'CLEAR_PROVICE':
      return {
            ...state,
            requestFormState:{
          
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
            }
      }

      case 'CLEAR_DISTRICT':
        return {
              requestFormState:{
                cusAddr_District:"",
                cusAddr_Tambon:"",
                cusAddr_Postcode:"",
              }
        }

        case 'CLEAR_TAMBON':
          return {
                requestFormState:{
                  cusAddr_Tambon:"",
                  cusAddr_Postcode:"",
                }
          }
    
  
 
                
   
      default:
        return state
  
  
    }
  }
  
  export default reqeustFormReducer