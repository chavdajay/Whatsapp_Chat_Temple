import { useSelector } from "react-redux"
import {
  ADD_OR_UPDATE_MESSAGE,
  CHAT_HISTORY_LIST,
  CHAT_USER_LIST,
  CLEAR_CHAT_MESSAGES,
  RESET_UNSEEN_COUNT,
  MARK_MESSAGES_SEEN,
} from "./ChatAction.jsx"

const initialState = {
  chatList: [],
  chatHistory: {},
  unreadIds: [],
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_USER_LIST: {
      const updatedChatList = action.payload.map((chat) => {
        const allMessages = [
          ...(chat.chatHistory || []),
          ...(chat.latest_message ? [chat.latest_message] : []),
        ]

        const sortedMessages = allMessages
          .filter((msg) => msg?.created_at || msg?.createdAt)
          .sort(
            (a, b) =>
              new Date(b.created_at || b.createdAt) -
              new Date(a.created_at || a.createdAt)
          )

        const lastMessage = sortedMessages[0] || null

        return {
          ...chat,
          latest_message: lastMessage
            ? {
                message: lastMessage.message,
                created_at: lastMessage.created_at || lastMessage.createdAt,
              }
            : null,
          fullName: chat.fullName || lastMessage?.senderName || "",
          isTempName: chat.isTempName ?? lastMessage?.isTempName ?? false,
        }
      })

      return { ...state, chatList: updatedChatList }
    }

    case CHAT_HISTORY_LIST: {
      const contactNo = String(action.mobile_number || action.contactNo || "")
      const newMessages = (action.payload || []).map((msg) => ({
        ...msg,
        message_id: msg.message_id || msg.messageId,
      }))
      const existingMessages = (state.chatHistory[contactNo] || []).map((msg) => ({
        ...msg,
        message_id: msg.message_id || msg.messageId,
      }))

      const mergedMap = new Map()
      for (const msg of [...existingMessages, ...newMessages]) {
        if (msg.message_id) {
          mergedMap.set(msg.message_id, msg)
        }
      }

      const mergedMessages = Array.from(mergedMap.values()).sort(
        (a, b) =>
          new Date(a.created_at || a.createdAt) -
          new Date(b.created_at || b.createdAt)
      )

      const unreadIds = mergedMessages
        .filter((msg) => msg.isReceived && !msg.isSeen)
        .map((msg) => msg.message_id)

      const lastMessage = mergedMessages[mergedMessages.length - 1] || null
      const created_at =
        lastMessage?.created_at || lastMessage?.createdAt || new Date().toISOString()

      const latestMessageData = lastMessage
        ? {
            message: lastMessage.message,
            created_at,
          }
        : null

      const updatedChatList = [...state.chatList]
      const chatIndex = updatedChatList.findIndex(
        (chat) => String(chat.contactNo) === contactNo
      )

      if (chatIndex !== -1) {
        updatedChatList[chatIndex] = {
          ...updatedChatList[chatIndex],
          unseen_message_count: unreadIds.length,
          latest_message: latestMessageData,
          chatHistory: mergedMessages,
          fullName:
            updatedChatList[chatIndex].fullName === "System"
              ? lastMessage?.senderName || ""
              : updatedChatList[chatIndex].fullName || lastMessage?.senderName || "",
          isTempName:
            updatedChatList[chatIndex].isTempName ??
            lastMessage?.isTempName ??
            false,
        }
      } else {
        updatedChatList.push({
          id: contactNo,
          contactNo,
          mobile_number: contactNo,
          unseen_message_count: unreadIds.length,
          latest_message: latestMessageData,
          chatHistory: mergedMessages,
          fullName: lastMessage?.senderName || "",
          isTempName: lastMessage?.isTempName ?? false,
        })
      }

      return {
        ...state,
        chatHistory: {
          ...state.chatHistory,
          [contactNo]: mergedMessages,
        },
        chatList: updatedChatList,
        unreadIds,
      }
    }

    case ADD_OR_UPDATE_MESSAGE: {
      const payload = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]

      let newState = { ...state }
      let newUnreadIds = [...state.unreadIds]

      payload.forEach((newMessage) => {
        const message_id = newMessage.message_id || newMessage.messageId || null
        if (!message_id) return

        const contactNo =
          newMessage.mobileNumber ||
          newMessage.mobile_number ||
          newMessage.to_user ||
          newMessage.from_user

        const existingMessages = newState.chatHistory[contactNo] || []

        const alreadyExists = existingMessages.some(
          (msg) => msg.message_id === message_id
        )

        let updatedMessages = alreadyExists
          ? existingMessages.map((msg) =>
              msg.message_id === message_id ? { ...msg, ...newMessage } : msg
            )
          : [...existingMessages, { ...newMessage, message_id }]

        updatedMessages.sort(
          (a, b) =>
            new Date(a.created_at || a.createdAt) -
            new Date(b.created_at || b.createdAt)
        )

        const unseenCount = updatedMessages.filter(
          (msg) => msg.isReceived && !msg.isSeen
        ).length

        const latestMessage = updatedMessages[updatedMessages.length - 1] || {}
        const created_at =
          latestMessage?.created_at ||
          latestMessage?.createdAt ||
          new Date().toISOString()

        const latestMessageData = {
          message: latestMessage.message,
          created_at,
        }

        const updatedChatList = [...newState.chatList]
        const chatIndex = updatedChatList.findIndex(
          (chat) => String(chat.contactNo) === String(contactNo)
        )

        if (chatIndex !== -1) {
          updatedChatList[chatIndex] = {
            ...updatedChatList[chatIndex],
            unseen_message_count: unseenCount,
            latest_message: latestMessageData,
            chatHistory: updatedMessages,
            fullName:
              updatedChatList[chatIndex].fullName === "System"
                ? latestMessage?.senderName || ""
                : updatedChatList[chatIndex].fullName ||
                  latestMessage?.senderName ||
                  "",
            isTempName:
              updatedChatList[chatIndex].isTempName ??
              latestMessage?.isTempName ??
              false,
          }
        } else {
          updatedChatList.push({
            id: contactNo,
            contactNo,
            mobile_number: contactNo,
            unseen_message_count: unseenCount,
            latest_message: latestMessageData,
            chatHistory: updatedMessages,
            fullName: latestMessage?.senderName || "",
            isTempName: latestMessage?.isTempName ?? false,
          })
        }

        newState = {
          ...newState,
          chatList: updatedChatList,
          chatHistory: {
            ...newState.chatHistory,
            [contactNo]: updatedMessages,
          },
        }

        if (newMessage.isReceived && !newMessage.isSeen) {
          newUnreadIds.push(message_id)
        }
      })

      return {
        ...newState,
        unreadIds: [...new Set(newUnreadIds)],
      }
    }

    case MARK_MESSAGES_SEEN: {
      const contactNo = String(action.payload)
      const existingMessages = state.chatHistory[contactNo] || []

      const updatedMessages = existingMessages.map((msg) =>
        msg.isReceived && !msg.isSeen ? { ...msg, isSeen: true } : msg
      )

      const updatedChatList = state.chatList.map((chat) =>
        String(chat.contactNo) === contactNo
          ? {
              ...chat,
              unseen_message_count: 0,
              chatHistory: updatedMessages,
            }
          : chat
      )

      return {
        ...state,
        chatList: updatedChatList,
        chatHistory: {
          ...state.chatHistory,
          [contactNo]: updatedMessages,
        },
      }
    }

    case CLEAR_CHAT_MESSAGES:
      return { ...state, chatHistory: {} }

    case RESET_UNSEEN_COUNT: {
      const selectedMobileNumber = action.payload
      const updatedChatList = state.chatList.map((chat) =>
        chat.contactNo === selectedMobileNumber
          ? { ...chat, unseen_message_count: 0 }
          : chat
      )
      return {
        ...state,
        chatList: updatedChatList,
      }
    }

    default:
      return state
  }
}

export default chatReducer

export function useChatMaster() {
  return useSelector((state) => state.chat)
}

// old code
