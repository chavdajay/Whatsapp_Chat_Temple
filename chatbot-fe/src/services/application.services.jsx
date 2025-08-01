// import axios from "axios"
// import { BASE_URL } from "../config/Api.jsx"
// const Api_Url = BASE_URL

// const getAllApp = async () => {
//   const response = await axios.get(Api_Url + "/chatbot/usermetadata/", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//     },
//   })
//   if (response.data) {
//     return { status: response.status, data: response.data }
//   }
// }

// export default {
//   getAllApp,
// }

// new code //

import axios from "axios"
import { BASE_URL } from "../config/Api.jsx"

const Api_Url = BASE_URL

const getAllApp = async () => {
  const response = await axios.get(Api_Url + "/chatbot/usermetadata/")
  if (response.data) {
    return { status: response.status, data: response.data }
  }
}

export default {
  getAllApp,
}
