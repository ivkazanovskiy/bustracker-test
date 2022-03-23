import { authUser, unAuthUser } from "../actionCreators/userAC"
import axios from 'axios'

export const checkUser = () => {
  return async (dispatch) => {
    try {
      await axios('/api/checkUser')
      dispatch(authUser())
    } catch (error) {
      dispatch(unAuthUser())
    }
  }
}
