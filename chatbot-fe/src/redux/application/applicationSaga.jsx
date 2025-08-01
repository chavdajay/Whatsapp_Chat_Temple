// import { toast } from "react-toastify"
// import { all, call, put, takeLatest } from "redux-saga/effects"
// import { APPLICATION_LIST, FETCH_ALL_APP } from "./applicationAction.jsx"
// import applicationServices from "../../services/application.services.jsx"

// function* getAllApplication() {
//   try {
//     const { data } = yield call(applicationServices.getAllApp)
//     yield put({ type: APPLICATION_LIST, payload: data })
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.error)
//   }
// }

// function* applicationSaga() {
//   yield all([takeLatest(FETCH_ALL_APP, getAllApplication)])
// }

// export default applicationSaga

// new code //

import { toast } from "react-toastify"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { APPLICATION_LIST, FETCH_ALL_APP } from "./applicationAction.jsx"
import applicationServices from "../../services/application.services.jsx"

function* getAllApplication() {
  try {
    const { data } = yield call(applicationServices.getAllApp)
    yield put({ type: APPLICATION_LIST, payload: data })
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch applications")
    // 🔥 Removed token check & redirect
  }
}

function* applicationSaga() {
  yield all([takeLatest(FETCH_ALL_APP, getAllApplication)])
}

export default applicationSaga
