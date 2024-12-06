import {combineReducers} from 'redux'
import requestFormReducer from './requestFormReducer'

const rootReducer = combineReducers({
    requestFormStateReducer: requestFormReducer,
  

})

export default rootReducer