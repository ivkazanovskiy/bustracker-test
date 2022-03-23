import { INIT_IDENTS, DELETE_IDENTS } from '../actionTypes/dataAT'

export const dataReducer = (state = { idents: [] }, action) => {
  switch (action.type) {
    case INIT_IDENTS:
      return { ...state, idents: action.payload }
    case DELETE_IDENTS:
      return { ...state, idents: [] }
    default:
      return state
  }
}
