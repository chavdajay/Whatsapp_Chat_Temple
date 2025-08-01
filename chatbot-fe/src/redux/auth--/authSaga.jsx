// import { toast } from "react-toastify"
// import { all, call, put, takeLatest } from "redux-saga/effects"
// import authServices from "../../services/auth.services--.jsx"
// import { LOGIN_REQUEST, LOGIN_LOADING, LOGOUT_REQUEST } from "./authAction.jsx"

// function* authLogin(action) {
//   try {
//     yield put({ type: LOGIN_LOADING, payload: true })
//     const { data } = yield call(authServices.authLogin, action.payload)
//     localStorage.setItem("access_token", data?.access_token)
//     window.location.href = "/dashboard"
//     toast.success("Login successfully done")
//   } catch (error) {
//     toast.error(error?.response?.data?.message)
//   } finally {
//     yield put({ type: LOGIN_LOADING, payload: false })
//   }
// }
// function* authLogout() {
//   try {
//     yield call(authServices.authLogout)
//     localStorage.clear()
//     sessionStorage.clear()
//     toast.success("Logout successfully done")
//     window.location.href = "/"
//   } catch (error) {
//     if (error.response.status === 401) {
//       localStorage.removeItem("access_token")
//       window.location.href = "/login"
//     }
//     toast.error(error?.response?.data?.message)
//   }
// }

// function* authSaga() {
//   yield all([
//     takeLatest(LOGIN_REQUEST, authLogin),
//     takeLatest(LOGOUT_REQUEST, authLogout),
//   ])
// }

// export default authSaga


/// new code //


import { toast } from "react-toastify"
import { all, call, put, takeLatest } from "redux-saga/effects"
import authServices from "../../services/auth.services--.jsx"
import { LOGIN_REQUEST, LOGIN_LOADING, LOGOUT_REQUEST } from "./authAction.jsx"

function* authLogin(action) {
  try {
    yield put({ type: LOGIN_LOADING, payload: true })
    // Skip actual API login call (remove call if not needed at all)
    // const { data } = yield call(authServices.authLogin, action.payload)

    toast.success("Login logic removed")
  } catch (error) {
    toast.error("Login failed")
  } finally {
    yield put({ type: LOGIN_LOADING, payload: false })
  }
}

function* authLogout() {
  try {
    // Remove actual logout logic and clear
    // yield call(authServices.authLogout)
    toast.success("Logout logic removed")
  } catch (error) {
    toast.error("Logout failed")
  }
}

function* authSaga() {
  yield all([
    takeLatest(LOGIN_REQUEST, authLogin),
    takeLatest(LOGOUT_REQUEST, authLogout),
  ])
}

export default authSaga
