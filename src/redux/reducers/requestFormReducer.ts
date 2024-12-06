
const initialData = {

    requestFormState:{
     
      req_Type:'',
      empCode:'',
      empName:'',
      empSurn:'',
      empPosition:'',
      empSect:'',
      req_Reason:'',
      busRoute_Address:'',
      busRoute_Address_Data:'',
      busRoute_Employee:'',
      busRoute_Employee_Data:'',
      cusAddr:'',
      cusAddr_Province:'',  
      cusAddr_District:'',
      cusAddr_Tambon:'',
      cusAddr_Postcode:'',

      file_Tax:File,
      file_Tax_name:'',
      tax_ExpireDT:Date,

     
      file_DriverLicense:File,
      driverlicense_ExporeDT:Date,
      driverLicenseNo:'',

    
      file_Pic_Front:File,
      file_Pic_Front_name:'',
      file_Pic_Back:File,
      file_Pic_Back_name:'',
      file_Pic_Left:File,
      file_Pic_Left_name:'',
      file_Pic_Right:File,
      file_Pic_Right_name:'',

      vehicleType:'',
      vehicleNo:'',
      vehicleBrand:'',
      vehicleCategory:'',
      stickerNo:'',

      req_Status:'',
      req_By:'',
      


     
      
      
  
    }
  
   
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
      
            file_Tax:action.payload.cusAddr_Postcode,
            file_Tax_name:action.payload.file_Tax_name,
            tax_ExpireDT:action.payload.cusAddr_Postcode,
      
           
            file_DriverLicense:action.payload.file_DriverLicense,
            driverlicense_ExporeDT:action.payload.driverlicense_ExporeDT,
            driverLicenseNo:action.payload.driverLicenseNo,
      
          
            file_Pic_Front:action.payload.file_Pic_Front,
            file_Pic_Front_name:action.payload.file_Pic_Front_name,
            file_Pic_Back:action.payload.file_Pic_Back,
            file_Pic_Back_name:action.payload.file_Pic_Back_name,
            file_Pic_Left:action.payload.file_Pic_Left,
            file_Pic_Left_name:action.payload.file_Pic_Left_name,
            file_Pic_Right:action.payload.file_Pic_Right,
            file_Pic_Right_name:action.payload.file_Pic_Right_name,
      
            vehicleType:action.payload.vehicleType,
            vehicleNo:action.payload.vehicleNo,
            vehicleBrand:action.payload.vehicleBrand,
            vehicleCategory:action.payload.vehicleCategory,
            stickerNo:action.payload.stickerNo,
      
            req_Status:action.payload.req_Status,
            req_By:action.payload.req_By,
            
           
  
          }
        }
  
 
                
   
      default:
        return state
  
  
    }
  }
  
  export default reqeustFormReducer