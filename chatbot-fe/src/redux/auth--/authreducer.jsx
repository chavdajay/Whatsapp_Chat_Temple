import { useSelector } from "react-redux"
import { LOGIN_LOADING } from "./authAction.jsx"

const initialState = { loading: false }

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

export default authReducer

export function useAuthMaster() {
  return useSelector((state) => state.auth)
}
