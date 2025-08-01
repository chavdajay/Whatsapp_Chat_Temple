import { useSelector } from "react-redux"
import { APPLICATION_LIST } from "./applicationAction.jsx"

const initialstate = { applicationData: [] }
const applicationdReducer = (state = initialstate, action) => {
  switch (action.type) {
    case APPLICATION_LIST:
      return {
        ...state,
        applicationData: action.payload,
      }
    default:
      return state
  }
}

export default applicationdReducer

export function useApplicationMaster() {
  return useSelector((state) => state.application)
}
