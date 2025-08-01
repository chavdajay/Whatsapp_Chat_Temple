// import axios from "axios"
// import { BASE_URL } from "../config/Api.jsx"
// const Api_Url = BASE_URL

// const getWabaid = async (user_id) => {
//   const response = await axios.get(Api_Url + "/chatbot/usermetadata/list/", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//     },
//     params: { user_id: user_id },
//   })
//   if (response.data) {
//     return { status: response.status, data: response.data }
//   }
// }

// const authLogin = async (data) => {
//   const response = await axios.post(Api_Url + "/chatbot/auth/login/", data)
//   if (response.data) {
//     return { status: response.status, data: response.data }
//   }
// }

// const authLogout = async () => {
//   const response = await axios.post(Api_Url + "/chatbot/auth/logout/")
//   if (response.data) {
//     return { status: response.status, data: response.data }
//   }
// }
// export default { getWabaid, authLogin, authLogout }


// new code //

import axios from "axios"
import { BASE_URL } from "../config/Api.jsx"
const Api_Url = BASE_URL

const getWabaid = async (user_id) => {
  const response = await axios.get(Api_Url + "/chatbot/usermetadata/list/", {
    params: { user_id: user_id },
  })
  if (response.data) {
    return { status: response.status, data: response.data }
  }
}

const authLogin = async (data) => {
  // No need to call login endpoint if login is removed
  return { status: 200, data: { message: "Login not required" } }
}

const authLogout = async () => {
  // No need to call logout endpoint if token is unused
  return { status: 200, data: { message: "Logout not required" } }
}

export default { getWabaid, authLogin, authLogout }
