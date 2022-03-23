import { UNAUTH_USER, AUTH_USER, SET_DELAY, STOP_DELAY } from '../actionTypes/userAT'

export const authUser = () => {
  return {
    type: AUTH_USER
  }
}

export const unAuthUser = () => {
  return {
    type: UNAUTH_USER
  }
} 

export const setDelay = () => {
  return {
    type: SET_DELAY
  }
} 

export const stopDelay = () => {
  return {
    type: STOP_DELAY
  }
} 
