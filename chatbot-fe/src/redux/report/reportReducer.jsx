import { useSelector } from "react-redux"
import {
  FILES_DATA,
  ID_TEMPLATE_DATA,
  REPORT_DATA,
  SEND_BULK_MESSAGE_MODAL,
  SUMMARY_DATA,
  SUMMARY_DATA_ERROR,
  UPLOAD_FILE_MODAL,
} from "./reportAction.jsx"

const initialState = {
  reportData: [],
  fileData: [],
  templateObjectData: {},
  summaryData: {},
  fileUploadModal: false,
  sendMessageModal: false,
}
const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_DATA:
      return {
        ...state,
        reportData: action.payload,
      }
    case FILES_DATA:
      return {
        ...state,
        fileData: action.payload,
      }
    case ID_TEMPLATE_DATA:
      return {
        ...state,
        templateObjectData: action.payload,
      }
    case SUMMARY_DATA:
      return {
        ...state,
        summaryData: action.payload,
      }
    case SUMMARY_DATA_ERROR:
      return {
        ...state,
        summaryData: action.payload,
      }
    case UPLOAD_FILE_MODAL:
      return {
        ...state,
        fileUploadModal: action.payload,
      }
    case SEND_BULK_MESSAGE_MODAL:
      return {
        ...state,
        sendMessageModal: action.payload,
      }
    default:
      return state
  }
}

export default reportReducer

export function useReportMaster() {
  return useSelector((state) => state.report)
}
