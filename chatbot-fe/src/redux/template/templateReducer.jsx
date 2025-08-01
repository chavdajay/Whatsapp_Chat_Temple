import { useSelector } from "react-redux"
import { RECENTTEMPLATE_DATA, TEMPLATE_DATA } from "./templateAction.jsx"

const initialState = {
  templateData: [],
  recentTemplateData: [],
}

const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEMPLATE_DATA:
      return {
        ...state,
        templateData: action.payload,
      }
    case RECENTTEMPLATE_DATA:
      return {
        ...state,
        recentTemplateData: action.payload,
      }
    default:
      return state
  }
}

export default templateReducer

export function useTemplateMaster() {
  return useSelector((state) => state.template)
}
