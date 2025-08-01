import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import store from "./redux/store.jsx"
import Basicprovider from "./context/BasicProvider.jsx"
import "react-toastify/dist/ReactToastify.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <Basicprovider>
      <App />
    </Basicprovider>
  </Provider>
)

reportWebVitals()
