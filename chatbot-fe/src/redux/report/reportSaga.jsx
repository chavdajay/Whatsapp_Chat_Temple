// import { all, call, put, takeLatest } from "redux-saga/effects"
// import reportsServices from "../../services/reports.services.jsx"
// import {
//   DELETE_FILE_REQUEST,
//   DOWNLOAD_SUMMARY_PDF,
//   FETCH_ALL_FILES,
//   FETCH_IDTEMPLATE,
//   FETCH_REPORT_REQUEST,
//   FETCH_SUMMARY_DATA,
//   FILES_DATA,
//   ID_TEMPLATE_DATA,
//   REPORT_DATA,
//   SEND_BULK_MESSAGE,
//   SEND_BULK_MESSAGE_MODAL,
//   SUMMARY_DATA,
//   SUMMARY_DATA_ERROR,
//   UPLOAD_FILE,
//   UPLOAD_FILE_MODAL,
// } from "./reportAction.jsx"
// import { toast } from "react-toastify"

// function* getReportTemplate(action) {
//   try {
//     const { data } = yield call(reportsServices.getTemplateReport, action.payload)
//     yield put({ type: REPORT_DATA, payload: data })
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.error)
//   }
// }

// function* getAllFile() {
//   try {
//     const { data } = yield call(reportsServices.getAllFiles)
//     yield put({ type: FILES_DATA, payload: data })
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.error)
//   }
// }

// function* createFileUpload(action) {
//   try {
//     yield call(reportsServices.createUploadFile, action.payload)
//     toast.success("File successfully uploaded")
//     yield put({ type: FETCH_ALL_FILES })
//     yield put({ type: UPLOAD_FILE_MODAL, payload: false })
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.error)
//   }
// }

// function* sendBulkMessage(action) {
//   try {
//     const { data } = yield call(reportsServices.sendBulkMessage, action.payload)
//     yield put({ type: FETCH_REPORT_REQUEST, payload: action?.payload?.template_id })
//     yield put({ type: SEND_BULK_MESSAGE_MODAL, payload: false })
//     toast.success(data?.message)
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.error)
//   }
// }

// function* deleteFile(action) {
//   try {
//     const { data } = yield call(reportsServices.deleteFile, action.payload)
//     toast.success(data?.message)
//     yield put({ type: FETCH_ALL_FILES })
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.error)
//   }
// }

// function* getIdbyTemplate(action) {
//   try {
//     const { data } = yield call(reportsServices.getIdtemplate, action.payload)
//     yield put({ type: ID_TEMPLATE_DATA, payload: data })
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.error)
//   }
// }

// function* getSummary(action) {
//   try {
//     const { data } = yield call(
//       reportsServices.getSummaryData,
//       action.payload,
//       action.params
//     )
//     yield put({ type: SUMMARY_DATA, payload: data })
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     yield put({ type: SUMMARY_DATA_ERROR, payload: {} })
//     toast.error(error?.response?.data?.error)
//   }
// }

// function* downLoadSummary(action) {
//   try {
//     const { data } = yield call(
//       reportsServices.downloadSummary,
//       action.payload,
//       action.params
//     )
//     const link = document.createElement("a")
//     link.href = data?.data
//     if (action.params === "pdf") {
//       link.setAttribute("download", "summary.pdf")
//     } else {
//       link.setAttribute("download", "summary.excel")
//     }
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//     toast.success("Summary data download successfully done")
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.error)
//   }
// }

// function* reportSaga() {
//   yield all([
//     takeLatest(FETCH_REPORT_REQUEST, getReportTemplate),
//     takeLatest(UPLOAD_FILE, createFileUpload),
//     takeLatest(FETCH_ALL_FILES, getAllFile),
//     takeLatest(SEND_BULK_MESSAGE, sendBulkMessage),
//     takeLatest(FETCH_IDTEMPLATE, getIdbyTemplate),
//     takeLatest(DELETE_FILE_REQUEST, deleteFile),
//     takeLatest(FETCH_SUMMARY_DATA, getSummary),
//     takeLatest(DOWNLOAD_SUMMARY_PDF, downLoadSummary),
//   ])
// }

// export default reportSaga

import { all, call, put, takeLatest } from "redux-saga/effects"
import reportsServices from "../../services/reports.services.jsx"
import {
  DELETE_FILE_REQUEST,
  DOWNLOAD_SUMMARY_PDF,
  FETCH_ALL_FILES,
  FETCH_IDTEMPLATE,
  FETCH_REPORT_REQUEST,
  FETCH_SUMMARY_DATA,
  FILES_DATA,
  ID_TEMPLATE_DATA,
  REPORT_DATA,
  SEND_BULK_MESSAGE,
  SEND_BULK_MESSAGE_MODAL,
  SUMMARY_DATA,
  SUMMARY_DATA_ERROR,
  UPLOAD_FILE,
  UPLOAD_FILE_MODAL,
} from "./reportAction.jsx"
import { toast } from "react-toastify"

function* getReportTemplate(action) {
  try {
    const { data } = yield call(reportsServices.getTemplateReport, action.payload)
    yield put({ type: REPORT_DATA, payload: data })
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch template report")
  }
}

function* getAllFile() {
  try {
    const { data } = yield call(reportsServices.getAllFiles)
    yield put({ type: FILES_DATA, payload: data })
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch files")
  }
}

function* createFileUpload(action) {
  try {
    yield call(reportsServices.createUploadFile, action.payload)
    toast.success("File successfully uploaded")
    yield put({ type: FETCH_ALL_FILES })
    yield put({ type: UPLOAD_FILE_MODAL, payload: false })
  } catch (error) {
    toast.error(error?.response?.data?.error || "File upload failed")
  }
}

function* sendBulkMessage(action) {
  try {
    const { data } = yield call(reportsServices.sendBulkMessage, action.payload)
    yield put({ type: FETCH_REPORT_REQUEST, payload: action?.payload?.template_id })
    yield put({ type: SEND_BULK_MESSAGE_MODAL, payload: false })
    toast.success(data?.message)
  } catch (error) {
    toast.error(error?.response?.data?.error || "Message send failed")
  }
}

function* deleteFile(action) {
  try {
    const { data } = yield call(reportsServices.deleteFile, action.payload)
    toast.success(data?.message)
    yield put({ type: FETCH_ALL_FILES })
  } catch (error) {
    toast.error(error?.response?.data?.error || "File delete failed")
  }
}

function* getIdbyTemplate(action) {
  try {
    const { data } = yield call(reportsServices.getIdtemplate, action.payload)
    yield put({ type: ID_TEMPLATE_DATA, payload: data })
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch template by ID")
  }
}

function* getSummary(action) {
  try {
    const { data } = yield call(
      reportsServices.getSummaryData,
      action.payload,
      action.params
    )
    yield put({ type: SUMMARY_DATA, payload: data })
  } catch (error) {
    yield put({ type: SUMMARY_DATA_ERROR, payload: {} })
    toast.error(error?.response?.data?.error || "Failed to fetch summary")
  }
}

function* downLoadSummary(action) {
  try {
    const { data } = yield call(
      reportsServices.downloadSummary,
      action.payload,
      action.params
    )
    const link = document.createElement("a")
    link.href = data?.data
    link.setAttribute(
      "download",
      action.params === "pdf" ? "summary.pdf" : "summary.excel"
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Summary data downloaded successfully")
  } catch (error) {
    toast.error(error?.response?.data?.error || "Download failed")
  }
}

function* reportSaga() {
  yield all([
    takeLatest(FETCH_REPORT_REQUEST, getReportTemplate),
    takeLatest(UPLOAD_FILE, createFileUpload),
    takeLatest(FETCH_ALL_FILES, getAllFile),
    takeLatest(SEND_BULK_MESSAGE, sendBulkMessage),
    takeLatest(FETCH_IDTEMPLATE, getIdbyTemplate),
    takeLatest(DELETE_FILE_REQUEST, deleteFile),
    takeLatest(FETCH_SUMMARY_DATA, getSummary),
    takeLatest(DOWNLOAD_SUMMARY_PDF, downLoadSummary),
  ])
}

export default reportSaga
