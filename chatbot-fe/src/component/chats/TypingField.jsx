import React, { useRef, useState } from "react"
import { FiPaperclip } from "react-icons/fi"
import { CiFaceSmile } from "react-icons/ci"
import EmojiPicker from "emoji-picker-react"
import { IoSendSharp } from "react-icons/io5"

const TypingField = ({ sendMessage, selectedChatUser }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [message, setMessage] = useState("")
  const fileInputRef = useRef(null)

  const contactNo =
    selectedChatUser?.contactNo || selectedChatUser?.mobile_number || ""
  const fullName = selectedChatUser?.fullName || selectedChatUser?.name || "System"

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && message.trim()) {
      sendMessage(message, contactNo, fullName)
      setMessage("")
    }
  }

  const handleSendMsg = () => {
    if (message.trim()) {
      sendMessage(message, contactNo, fullName)
      setMessage("")
    }
  }

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.emoji)
    setShowEmojiPicker(false)
  }

  return (
    <div className="sticky bottom-0 p-4 flex items-center justify-center z-10 bg-white">
      <div className="relative w-[100%]">
        <button
          className="absolute inset-y-0 left-3 flex items-center text-gray-500 cursor-pointer"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <CiFaceSmile className="w-6 h-6" />
        </button>

        {showEmojiPicker && (
          <div className="absolute bottom-12 bg-white p-2 border border-gray-300 rounded z-10">
            <EmojiPicker disableSkinTonePicker onEmojiClick={handleEmojiSelect} />
          </div>
        )}

        <div className="flex gap-3 absolute inset-y-0 right-3 items-center text-gray-500 cursor-pointer">
          <button onClick={() => fileInputRef.current.click()}>
            <FiPaperclip className="w-5 h-5" />
          </button>
          <button onClick={handleSendMsg}>
            <IoSendSharp className="w-5 h-5" />
          </button>
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message"
          className="w-full h-[2.6rem] bg-white pl-10 pr-10 py-2 shadow-lg rounded-full focus:outline-none"
        />
      </div>
    </div>
  )
}

export default TypingField
