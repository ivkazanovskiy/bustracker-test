import axios from 'axios'
import { initIdents, deleteIdents } from "../actionCreators/dataAC"

export const loadIdents = () => {
  return async (dispatch) => {
  
    try {
      const response = await axios('/api/idents')
      const data = await response.data
      dispatch(initIdents(data))
    } catch (error) {
      dispatch(deleteIdents())
    }
  }
}
