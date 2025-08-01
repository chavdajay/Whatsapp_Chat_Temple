import React, { useEffect } from "react"
import TypingField from "./TypingField.jsx"
import ChatMessages from "./ChatMessages.jsx"
import { useDispatch } from "react-redux"
import {
  ADD_OR_UPDATE_MESSAGE,
  FETCH_CHAT_LIST,
  CHAT_HISTORY_LIST,
} from "../../redux/chat/ChatAction.jsx"
import NewChatModal from "./NewChatModal.jsx"
import chatService from "../../services/chat.services.jsx"
import { useChatMaster } from "../../redux/chat/ChatReducer.jsx"

// Import socket instance
import socket from "../../utils/socket.js"

const Chat = ({ selectedChatUser, newChatModal, setNewChatModal }) => {
  const dispatch = useDispatch()
  const { chatHistory } = useChatMaster()

  // Fetch chat list initially
  useEffect(() => {
    dispatch({ type: FETCH_CHAT_LIST })
  }, [dispatch])

  // Load chat history for selected user
  useEffect(() => {
    const fetchMessages = async () => {
      const contactNo =
        selectedChatUser?.contactNo || selectedChatUser?.mobile_number
      if (!contactNo) return

      try {
        const existingMessages = chatHistory[contactNo] || []

        const data = await chatService.getChatHistory(contactNo)
        const incomingMessages = data?.messages || []

        // Prevent re-adding same messages
        const newMessages = incomingMessages.filter(
          (msg) => !existingMessages.some((m) => m.message_id === msg.message_id)
        )

        if (newMessages.length > 0) {
          dispatch({
            type: CHAT_HISTORY_LIST,
            payload: newMessages,
            mobile_number: contactNo,
            contactNo,
          })
        }
      } catch (error) {
        console.error("❌ Failed to fetch chat history", error)
      }
    }

    fetchMessages()
  }, [selectedChatUser, chatHistory, dispatch])

  // Connect socket & listen for real-time incoming messages
  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }

    const messageHandler = (message) => {
      console.log("🔁 Real-time message received:", message)

      // Enrich message with user info if available (e.g. fullName, isTempName)
      const enrichedMessage = {
        ...message,
        senderName: message?.senderName || message?.user?.fullName || "",
        isTempName: message?.isTempName ?? message?.user?.isTempName ?? false,
      }

      dispatch({
        type: ADD_OR_UPDATE_MESSAGE,
        payload: enrichedMessage,
      })
    }

    socket.on("new_message", messageHandler)

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id)
    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected")
    })

    return () => {
      socket.off("new_message", messageHandler)
    }
  }, [dispatch])

  // Send a message
  const sendMessage = async (text, phone, fullName) => {
    if (!text.trim()) return

    const contact =
      phone || selectedChatUser?.contactNo || selectedChatUser?.mobile_number

    const newMessage = {
      mobileNumber: contact,
      message: text,
      to: "",
      from: "",
      name: fullName || selectedChatUser?.fullName || "Unknown",
    }
    console.log("newMessage", newMessage)

    try {
      const response = await chatService.sendMessageByNumber({
        contactNo: contact,
        message: text,
      })

      console.log("response", response)

      dispatch({
        type: ADD_OR_UPDATE_MESSAGE,
        payload: response,
      })
    } catch (err) {
      console.error("❌ Send message failed", err)
    }
  }

  console.log("Chat history", chatHistory)

  return (
    <>
      {selectedChatUser ? (
        <div className="w-[75%] h-[100vh] flex flex-col">
          <div className="sticky top-0 flex border-b h-[4.5rem] p-3 gap-2 items-center z-10 bg-white">
            <img
              src={
                selectedChatUser?.img ||
                "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              }
              alt="profile"
              className="w-[3rem] h-[3rem] rounded-full"
            />
            <div className="font-bold">
              {selectedChatUser?.contactNo ||
                selectedChatUser?.mobile_number ||
                "No name"}
            </div>
          </div>
          <ChatMessages selectedChatUser={selectedChatUser} />
          <TypingField sendMessage={sendMessage} />
        </div>
      ) : (
        <div className="w-[75%] h-[100vh] flex justify-center items-center">
          <div className="font-bold text-gray-500">
            Select a user to start chatting
          </div>
        </div>
      )}
      <NewChatModal
        isOpen={newChatModal}
        handleClose={() => setNewChatModal(false)}
        sendMessage={sendMessage}
      />
    </>
  )
}
//old code

export default Chat
