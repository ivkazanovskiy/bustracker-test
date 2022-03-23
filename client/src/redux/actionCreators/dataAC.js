import { INIT_IDENTS, DELETE_IDENTS } from '../actionTypes/dataAT'

export const initIdents = (idents) => {
  return {
    type: INIT_IDENTS,
    payload: idents
  }
}

export const deleteIdents = () => {
  return {
    type: DELETE_IDENTS
  }
} 
