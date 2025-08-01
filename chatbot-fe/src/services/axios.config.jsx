// import axios from "axios"
// import { BASE_URL } from "../config/Api.jsx"
// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
// })

// // Add request interceptor to handle token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// // Add response interceptor to handle errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (
//       error.response?.status === 500 ||
//       error.response?.status === 401 ||
//       error.response?.status === 403
//     ) {
//       localStorage.removeItem("access_token")
//       localStorage.removeItem("user")
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   }
// )

// export default axiosInstance

// new code //

import axios from "axios"
import { BASE_URL } from "../config/Api.jsx"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
})

// No interceptors needed if token is unused
export default axiosInstance
