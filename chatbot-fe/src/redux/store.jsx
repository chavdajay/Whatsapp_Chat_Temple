import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./rootSaga.jsx"
import templateReducer from "./template/templateReducer.jsx"
import reportReducer from "./report/reportReducer.jsx"
// import authReducer from "./auth/authreducer.jsx"
import applicationdReducer from "./application/applicationReducer.jsx"
import chatReducer from "./chat/ChatReducer.jsx"

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: {
    template: templateReducer,
    report: reportReducer,
    // auth: authReducer,
    application: applicationdReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
export default store
