import { UNAUTH_USER, AUTH_USER, SET_DELAY, STOP_DELAY } from '../actionTypes/userAT'

export const userReducer = (state = { auth: undefined, delay: false }, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, auth: true }
    case UNAUTH_USER:
      return { ...state, auth: false }
    case SET_DELAY:
      return { ...state, delay: true }
    case STOP_DELAY:
      return { ...state, delay: false }
    default:
      return state
  }
}
