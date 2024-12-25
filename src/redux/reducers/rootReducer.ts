import {combineReducers} from 'redux'
import requestFormReducer from './requestFormReducer'
import trackingReducer from './trackingStatusStateReducer'

const rootReducer = combineReducers({
    requestFormStateReducer: requestFormReducer,
    trackingStateReducer: trackingReducer
  

})

export default rootReducer