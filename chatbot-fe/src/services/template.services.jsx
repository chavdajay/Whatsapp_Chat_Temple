// import axios from "axios"
// import { BASE_URL } from "../config/Api.jsx"
// const Api_Url = BASE_URL

// const getAlltemplates = async (wabaid) => {
//   const response = await axios.get(Api_Url + "/chatbot/templates/list/", {
//     headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
//     params: { waba_id: wabaid },
//   })
//   if (response.data) {
//     return { status: response?.status, data: response?.data }
//   }
// }

// const recentTemplates = async (template_id) => {
//   const response = await axios.get(
//     Api_Url + "/chatbot/templates/" + template_id + "/history/",
//     { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
//   )
//   if (response.data) {
//     return { status: response?.status, data: response?.data }
//   }
// }
// const deleteTemplates = async (id) => {
//   const response = await axios.delete(
//     Api_Url + "/chatbot/message/?template_history_id=" + id,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//     }
//   )
//   if (response.data) {
//     return { status: response?.status, data: response?.data }
//   }
// }
// export default {
//   getAlltemplates,
//   recentTemplates,
//   deleteTemplates,
// }

// / new code  //

import axios from "axios"
import { BASE_URL } from "../config/Api.jsx"

const Api_Url = BASE_URL

const getAlltemplates = async (wabaid) => {
  const response = await axios.get(Api_Url + "/chatbot/templates/list/", {
    params: { waba_id: wabaid },
  })
  if (response.data) {
    return { status: response?.status, data: response?.data }
  }
}

const recentTemplates = async (template_id) => {
  const response = await axios.get(
    Api_Url + "/chatbot/templates/" + template_id + "/history/"
  )
  if (response.data) {
    return { status: response?.status, data: response?.data }
  }
}

const deleteTemplates = async (id) => {
  const response = await axios.delete(
    Api_Url + "/chatbot/message/?template_history_id=" + id
  )
  if (response.data) {
    return { status: response?.status, data: response?.data }
  }
}

export default {
  getAlltemplates,
  recentTemplates,
  deleteTemplates,
}
