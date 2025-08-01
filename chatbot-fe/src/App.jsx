import "./App.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "react-datepicker/dist/react-datepicker.css"
import { Suspense } from "react"
import Loader from "./component/global/Loader.jsx"
import AppRouter from "./router/AppRouter.jsx"

function App() {
  return (
    <div className="bg-white-500 h-screen">
      <Suspense fallback={<Loader />}>
        <AppRouter />
      </Suspense>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
