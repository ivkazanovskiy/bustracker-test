import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { dataReducer } from './dataReducer'

export const rootReducer = combineReducers({
  userReducer,
  dataReducer
})


