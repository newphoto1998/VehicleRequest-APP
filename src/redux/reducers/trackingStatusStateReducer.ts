const initialData = {

    trackingState:{
     
        trackingCount:1,
            
    },
    
   
  }
  
  
  const trackingReducer = (state = initialData  ,action:any) => {
    switch(action.type){


        case 'FIRST_TRACKING_STEP': 
        return{
         
          ...state,
          trackingState:{
        
           
            trackingCount : 1,
            
           
  
          }
        }





      case 'NEXT_TRACKING_STEP': 
        return{
         
          ...state,
          trackingState:{
                
            trackingCount : state.trackingState.trackingCount +1,
                  
  
          }
        }

  
  
 
                
   
      default:
        return state
  
  
    }
  }
  
  export default trackingReducer