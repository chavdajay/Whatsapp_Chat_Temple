import { all, fork } from "redux-saga/effects"
import templateSaga from "./template/templateSaga.jsx"
import reportSaga from "./report/reportSaga.jsx"
// import authSaga from "./auth/authSaga.jsx"
import applicationSaga from "./application/applicationSaga.jsx"
import chatSaga from "./chat/ChatSaga.jsx"

export default function* rootSaga() {
  yield all([
    fork(templateSaga),
    fork(reportSaga),
    // fork(authSaga),
    fork(applicationSaga),
    fork(chatSaga),
  ])
}
