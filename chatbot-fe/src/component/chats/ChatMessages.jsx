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
      chatService
        .getChatHistory(contactNo)
        .then((data) => {
          dispatch({
            type: "CHAT_HISTORY_LIST",
            payload: data,
            contactNo: contactNo,
          })

          dispatch({ type: MARK_MESSAGES_SEEN, payload: contactNo })
          chatService
            .markMessagesAsSeen(contactNo)
            .catch((err) => console.error("Failed to mark messages seen:", err))

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
    <div className="flex-grow p-2 overflow-y-auto">
      {sorted.map((msg, idx) => {
        const isMine = Boolean(msg.isSend)
        const ts = msg.created_at ?? msg.createdAt
        const timeText = ts
          ? (() => {
              const date = new Date(ts)
              const day = date.getDate().toString().padStart(2, "0")
              const month = (date.getMonth() + 1).toString().padStart(2, "0")
              const year = date.getFullYear().toString().slice(-2)
              const hours = date.getHours()
              const minutes = date.getMinutes().toString().padStart(2, "0")
              const ampm = hours >= 12 ? "PM" : "AM"
              const displayHours = (hours % 12 || 12).toString().padStart(2, "0")
              return `${day}-${month}-${year}, ${displayHours}:${minutes} ${ampm}`
            })()
          : ""

        const renderReceipt = () => {
          if (msg.isError) {
            return (
              <span className="absolute bottom-1 right-2 text-red-500 text-sm">
                ❌
              </span>
            )
          }
          if (msg.isPending) {
            return (
              <span className="absolute bottom-1 right-2 text-gray-400 text-xs animate-pulse">
                ⏳
              </span>
            )
          }
          if (msg.isSeen) {
            return (
              <IoCheckmarkDoneSharp className="absolute bottom-1 right-2 text-blue-500 text-sm" />
            )
          }
          if (msg.isDelivered) {
            return (
              <IoCheckmarkDoneSharp className="absolute bottom-1 right-2 text-gray-500 text-sm" />
            )
          }
          if (msg.isSend) {
            return (
              <RiCheckFill className="absolute bottom-1 right-2 text-gray-500 text-sm" />
            )
          }
          // ✅ Fallback if no receipt status
          return (
            <span className="absolute bottom-1 right-2 text-gray-400 text-xs">
              ✓?
            </span>
          )
        }

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
              {renderReceipt()}
            </div>

            {/* ✅ Show Date + Time */}
            <div className="text-gray-400 text-xs mt-1">{timeText}</div>
          </div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatMessages
