import { all, call, put, takeLatest } from "redux-saga/effects"
import chatService from "../../services/chat.services.jsx"
import { FETCH_CHAT_LIST, CHAT_HISTORY_LIST, CHAT_USER_LIST } from "./ChatAction.jsx"

function* fetchChatListSaga(action) {
  try {
    const response = yield call(chatService.getChatList)

    const updatedResponse = yield Promise.all(
      response.map(async (ele) => ({
        ...ele,
        chatHistory: await chatService.getChatHistory(ele?.contactNo),
      }))
    )

    const sortedChatList = updatedResponse
      .map((user) => {
        const latestMessage = user.chatHistory?.length
          ? user.chatHistory.reduce((latest, current) => {
              return new Date(current.createdAt) > new Date(latest.createdAt)
                ? current
                : latest
            })
          : null

        return {
          ...user,
          lastMessageTime: latestMessage ? new Date(latestMessage.createdAt) : null,
          lastMessageText: latestMessage?.message || null,
        }
      })
      .sort((a, b) => {
        if (a.lastMessageTime && b.lastMessageTime) {
          return b.lastMessageTime - a.lastMessageTime // descending
        } else if (a.lastMessageTime) {
          return -1
        } else if (b.lastMessageTime) {
          return 1
        } else {
          return 0
        }
      })

    console.log("sortedChatList", sortedChatList)

    yield put({ type: CHAT_USER_LIST, payload: sortedChatList })

    const contactNo = String(
      action.payload?.contactNo || action.payload?.mobile_number || ""
    )

    if (contactNo) {
      const selectedChat = response.find(
        (chat) => String(chat.mobile_number) === contactNo
      )

      yield put({
        type: CHAT_HISTORY_LIST,
        payload: selectedChat?.chatHistory || [],
        mobile_number: contactNo,
      })
    }
  } catch (error) {
    console.error("Error in fetchChatListSaga:", error)
  }
}

export default function* chatSaga() {
  yield all([takeLatest(FETCH_CHAT_LIST, fetchChatListSaga)])
}
