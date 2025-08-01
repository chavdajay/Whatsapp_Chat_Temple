// import { all, call, put, takeLatest } from "redux-saga/effects"
// import templateServices from "../../services/template.services.jsx"
// import {
//   FETCH_RECENTTEMPLATE_REQUEST,
//   FETCH_TEMPLATE_REQUEST,
//   RECENT_TEMPLATE_DELETE,
//   RECENTTEMPLATE_DATA,
//   TEMPLATE_DATA,
// } from "./templateAction.jsx"
// import { toast } from "react-toastify"

// function* getAlltemplates(action) {
//   try {
//     const { data } = yield call(templateServices.getAlltemplates, action.payload)
//     yield put({ type: TEMPLATE_DATA, payload: data })
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.error)
//   }
// }

// function* getRecentTemplate(action) {
//   try {
//     const { data } = yield call(templateServices.recentTemplates, action.payload)
//     yield put({ type: RECENTTEMPLATE_DATA, payload: data })
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.error)
//   }
// }

// function* deleteRecentTemplate(action) {
//   try {
//     yield call(templateServices.deleteTemplates, action.payload)
//     toast.success("Recent template delete successfully done")
//     yield put({ type: FETCH_RECENTTEMPLATE_REQUEST, payload: action.wabid })
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.error)
//   }
// }
// function* templateSaga() {
//   yield all([
//     takeLatest(FETCH_TEMPLATE_REQUEST, getAlltemplates),
//     takeLatest(FETCH_RECENTTEMPLATE_REQUEST, getRecentTemplate),
//     takeLatest(RECENT_TEMPLATE_DELETE, deleteRecentTemplate),
//   ])
// }

// export default templateSaga

/// new code ///

import { all, call, put, takeLatest } from "redux-saga/effects"
import templateServices from "../../services/template.services.jsx"
import {
  FETCH_RECENTTEMPLATE_REQUEST,
  FETCH_TEMPLATE_REQUEST,
  RECENT_TEMPLATE_DELETE,
  RECENTTEMPLATE_DATA,
  TEMPLATE_DATA,
} from "./templateAction.jsx"
import { toast } from "react-toastify"

function* getAlltemplates(action) {
  try {
    const { data } = yield call(templateServices.getAlltemplates, action.payload)
    yield put({ type: TEMPLATE_DATA, payload: data })
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch templates")
  }
}

function* getRecentTemplate(action) {
  try {
    const { data } = yield call(templateServices.recentTemplates, action.payload)
    yield put({ type: RECENTTEMPLATE_DATA, payload: data })
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch recent templates")
  }
}

function* deleteRecentTemplate(action) {
  try {
    yield call(templateServices.deleteTemplates, action.payload)
    toast.success("Recent template deleted successfully")
    yield put({ type: FETCH_RECENTTEMPLATE_REQUEST, payload: action.wabid })
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to delete template")
  }
}

function* templateSaga() {
  yield all([
    takeLatest(FETCH_TEMPLATE_REQUEST, getAlltemplates),
    takeLatest(FETCH_RECENTTEMPLATE_REQUEST, getRecentTemplate),
    takeLatest(RECENT_TEMPLATE_DELETE, deleteRecentTemplate),
  ])
}

export default templateSaga
