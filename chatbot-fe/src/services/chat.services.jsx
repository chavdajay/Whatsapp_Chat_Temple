import axiosInstance from "./axios.config.jsx"

const chatService = {
  getChatList: async () => {
    const response = await axiosInstance.get("/users")
    return response.data
  },

  getChatHistory: async (contactNo) => {
    const response = await axiosInstance.get(`/messages/send/number/${contactNo}`)
    return response.data?.messages.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  },

  sendMessageByNumber: async (data) => {
    const response = await axiosInstance.post("/messages/send/number", data)
    return response.data
  },

  // ✅ Mark messages as seen for given contact
  markMessagesAsSeen: async (contactNo) => {
    return await axiosInstance.post("/messages/mark-seen", { contactNo })
  },

  // ✅ Create new user
  createUser: async (userData) => {
    const response = await axiosInstance.post("/users", userData)
    return response.data
  },

  // ✅ Bulk message sending using sheet
  sendBulkMessages: async (bulkData) => {
    const response = await axiosInstance.post("/messages/send/bulk", bulkData)
    return response.data
  },
}

export default chatService
