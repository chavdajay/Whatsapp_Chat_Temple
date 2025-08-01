import React, { useState } from "react"
import ChatList from "./ChatList.jsx"
import Chat from "./Chat.jsx"

const ChatIndex = () => {
  const [selectedChatUser, setSelectedChatUser] = useState(null)
  const [newChatModal, setNewChatModal] = useState(false)
  return (
    <>
      <div className="flex">
        <ChatList
          setSelectedChatUser={setSelectedChatUser}
          selectedChatUser={selectedChatUser}
          setNewChatModal={setNewChatModal}
        />
        <Chat
          selectedChatUser={selectedChatUser}
          newChatModal={newChatModal}
          setNewChatModal={setNewChatModal}
        />
      </div>
    </>
  )
}

export default ChatIndex
