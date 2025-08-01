// import axios from "axios"
// import { BASE_URL } from "../config/Api.jsx"
// const Api_Url = BASE_URL

// const getTemplateReport = async (template_id) => {
//   const response = await axios.get(Api_Url + "/chatbot/message/", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//     },
//     params: { template_id: template_id },
//   })
//   if (response.data) {
//     return { status: response.status, data: response.data }
//   }
// }
// const createUploadFile = async (file) => {
//   const formData = new FormData()
//   formData.append("file", file)
//   const response = await axios.post(Api_Url + "/chatbot/sheets/", formData, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//     },
//   })
//   if (response.data) {
//     return { status: response?.status, data: response?.data }
//   }
// }

// const getAllFiles = async () => {
//   const response = await axios.get(Api_Url + "/chatbot/sheets/", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//     },
//   })
//   if (response.data) {
//     return { status: response?.status, data: response?.data }
//   }
// }

// const deleteFile = async (id) => {
//   const response = await axios.delete(Api_Url + "/chatbot/sheets/" + id + "/", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//     },
//   })
//   if (response.data) {
//     return { status: response?.status, data: response?.data }
//   }
// }
// const sendBulkMessage = async (data) => {
//   const response = await axios.post(Api_Url + "/chatbot/message/", data, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//     },
//   })
//   if (response.data) {
//     return { status: response?.status, data: response?.data }
//   }
// }

// const getIdtemplate = async (id) => {
//   const response = await axios.get(Api_Url + "/chatbot/templates/" + id + "/", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//     },
//   })
//   if (response.data) {
//     return { status: response?.status, data: response?.data }
//   }
// }

// const getSummaryData = async (id, params) => {
//   let queryParams = {}
//   if (params === "template_history_id") {
//     queryParams = { template_history_id: id }
//   } else {
//     queryParams = { record_id: id }
//   }
//   const response = await axios.get(Api_Url + "/chatbot/summary/", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//     },
//     params: queryParams,
//   })

//   if (response.data) {
//     return { status: response.status, data: response.data }
//   }
// }

// const downloadSummary = async (id, params) => {
//   const response = await axios.get(
//     Api_Url + "/chatbot/summary/" + id + "/download/" + params + "/",
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
//   getTemplateReport,
//   createUploadFile,
//   getAllFiles,
//   deleteFile,
//   sendBulkMessage,
//   getIdtemplate,
//   getSummaryData,
//   downloadSummary,
// }

// new code //

import axios from "axios"
import { BASE_URL } from "../config/Api.jsx"
const Api_Url = BASE_URL

const getTemplateReport = async (template_id) => {
  const response = await axios.get(Api_Url + "/chatbot/message/", {
    params: { template_id: template_id },
  })
  if (response.data) {
    return { status: response.status, data: response.data }
  }
}

const createUploadFile = async (file) => {
  const formData = new FormData()
  formData.append("file", file)
  const response = await axios.post(Api_Url + "/chatbot/sheets/", formData)
  if (response.data) {
    return { status: response?.status, data: response?.data }
  }
}

const getAllFiles = async () => {
  const response = await axios.get(Api_Url + "/chatbot/sheets/")
  if (response.data) {
    return { status: response?.status, data: response?.data }
  }
}

const deleteFile = async (id) => {
  const response = await axios.delete(Api_Url + "/chatbot/sheets/" + id + "/")
  if (response.data) {
    return { status: response?.status, data: response?.data }
  }
}

const sendBulkMessage = async (data) => {
  const response = await axios.post(Api_Url + "/chatbot/message/", data)
  if (response.data) {
    return { status: response?.status, data: response?.data }
  }
}

const getIdtemplate = async (id) => {
  const response = await axios.get(Api_Url + "/chatbot/templates/" + id + "/")
  if (response.data) {
    return { status: response?.status, data: response?.data }
  }
}

const getSummaryData = async (id, params) => {
  let queryParams = {}
  if (params === "template_history_id") {
    queryParams = { template_history_id: id }
  } else {
    queryParams = { record_id: id }
  }
  const response = await axios.get(Api_Url + "/chatbot/summary/", {
    params: queryParams,
  })

  if (response.data) {
    return { status: response.status, data: response.data }
  }
}

const downloadSummary = async (id, params) => {
  const response = await axios.get(
    Api_Url + "/chatbot/summary/" + id + "/download/" + params + "/"
  )
  if (response.data) {
    return { status: response?.status, data: response?.data }
  }
}

export default {
  getTemplateReport,
  createUploadFile,
  getAllFiles,
  deleteFile,
  sendBulkMessage,
  getIdtemplate,
  getSummaryData,
  downloadSummary,
}
