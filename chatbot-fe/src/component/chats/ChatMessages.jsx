import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { useChatMaster } from "../../redux/chat/ChatReducer.jsx"
import {
  ADD_OR_UPDATE_MESSAGE,
  MARK_MESSAGES_SEEN,
} from "../../redux/chat/ChatAction.jsx"
import socket from "../../utils/socket.js"
import { RiCheckFill } from "react-icons/ri"
import { IoCheckmarkDoneSharp } from "react-icons/io5"
// import { chatService } from "../../services/chat.services.jsx"
import chatService from "../../services/chat.services.jsx"

const ChatMessages = ({ selectedChatUser }) => {
  const dispatch = useDispatch()
  const { chatHistory } = useChatMaster()
  const bottomRef = useRef()

  useEffect(() => {
    if (!selectedChatUser) return

    const contactNo =
      selectedChatUser?.contactNo ||
      selectedChatUser?.mobile_number ||
      selectedChatUser?.id

    if (contactNo) {
      // ✅ Step 1: Load old messages before enabling socket
      chatService
        .getChatHistory(contactNo)
        .then((data) => {
          dispatch({
            type: "CHAT_HISTORY_LIST",
            payload: data,
            contactNo: contactNo,
          })

          // ✅ Step 2: Mark all as seen (backend)
          dispatch({ type: MARK_MESSAGES_SEEN, payload: contactNo })
          chatService
            .markMessagesAsSeen(contactNo)
            .catch((err) => console.error("Failed to mark messages seen:", err))

          // ✅ Step 3: Setup socket
          socket.connect()
          socket.off("new_message")
          socket.on("new_message", (payload) => {
            dispatch({ type: ADD_OR_UPDATE_MESSAGE, payload })
          })
        })
        .catch((err) => {
          console.error("Failed to load chat history:", err)
        })
    }

    return () => {
      socket.disconnect()
    }
  }, [dispatch, selectedChatUser])

  const key = String(
    selectedChatUser?.contactNo ||
      selectedChatUser?.mobile_number ||
      selectedChatUser?.id ||
      ""
  )
  const messages = chatHistory[key] || []
  const sorted = [...messages].sort(
    (a, b) =>
      new Date(a.created_at ?? a.createdAt ?? 0) -
      new Date(b.created_at ?? b.createdAt ?? 0)
  )

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [sorted])

  return (
    <div className="flex-grow p-3 overflow-y-auto">
      {sorted.map((msg, idx) => {
        const isMine = Boolean(msg.isSend)
        const ts = msg.created_at ?? msg.createdAt
        const timeText = ts
          ? new Date(ts).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""

        return (
          <div
            key={`${msg.message_id || idx}-${idx}`}
            className={`flex flex-col mb-4 ${isMine ? "items-end" : "items-start"}`}
          >
            <div
              className={`px-4 py-3 text-sm relative whitespace-pre-wrap break-words max-w-[85%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[50%] overflow-hidden ${
                isMine
                  ? "bg-grey-400 rounded-t-[1.2rem] rounded-bl-[1.2rem]"
                  : "bg-red-200 rounded-t-[1.2rem] rounded-br-[1.2rem]"
              }`}
            >
              {msg.message}
              {msg.isError ? (
                <span className="absolute bottom-1 right-2 text-red-500 text-sm">
                  ❌
                </span>
              ) : msg.isPending ? (
                <span className="absolute bottom-1 right-2 text-gray-400 text-xs animate-pulse">
                  ⏳
                </span>
              ) : msg.isSeen ? (
                <IoCheckmarkDoneSharp className="absolute bottom-1 right-2 text-blue-500 text-sm" />
              ) : msg.isDelivered ? (
                <IoCheckmarkDoneSharp className="absolute bottom-1 right-2 text-grey_font-500 text-sm" />
              ) : msg.isSend ? (
                <RiCheckFill className="absolute bottom-1 right-2 text-gray-500 text-sm" />
              ) : null}
            </div>

            <div className="text-gray-400 text-xs mt-1">{timeText}</div>
          </div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
//old code

export default ChatMessages
