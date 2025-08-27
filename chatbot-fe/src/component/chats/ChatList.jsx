import { useState } from "react"
import { PiChatsLight } from "react-icons/pi"
import { FiSearch } from "react-icons/fi"
import { TitleHeader } from "../global/TitleHeader.jsx"
import { CHAT_HISTORY_LIST } from "../../redux/chat/ChatAction.jsx"
import { useDispatch } from "react-redux"
import { useChatMaster } from "../../redux/chat/ChatReducer.jsx"
import { MdOutlineAddComment } from "react-icons/md"

const ChatList = ({ setSelectedChatUser, selectedChatUser, setNewChatModal }) => {
  const dispatch = useDispatch()
  const { chatList } = useChatMaster()
  const [searchTerm, setSearchTerm] = useState("")
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)

  const handleChatClick = (chat) => {
    dispatch({
      type: CHAT_HISTORY_LIST,
      payload: chat.chatHistory,
      contactNo: chat.contactNo,
    })
    setSelectedChatUser(chat)
  }

  const handleNotificationClick = () => {
    setShowOnlyUnread(!showOnlyUnread)
  }

  const unReadMessages = (chatHistory = []) =>
    chatHistory.filter((msg) => msg.isReceived && !msg.isSeen).length

  // Filter chat list based on search input and unread filter
  const filteredChatList = chatList?.filter((chat) => {
    const name = chat.fullName?.toLowerCase() || ""
    const contact = chat.contactNo?.toString().toLowerCase() || ""

    // Search filter
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      contact.includes(searchTerm.toLowerCase())

    // Unread filter
    const hasUnreadMessages = unReadMessages(chat.chatHistory) > 0
    const matchesUnreadFilter = showOnlyUnread ? hasUnreadMessages : true

    return matchesSearch && matchesUnreadFilter
  })

  // Sort chat list based on latest_message.created_at
  const sortedChatList = [...filteredChatList].sort((a, b) => {
    const timeA = new Date(a?.latest_message?.created_at || 0)
    const timeB = new Date(b?.latest_message?.created_at || 0)
    return timeB - timeA
  })

  const getTime = (createdAt) => {
    if (!createdAt) return ""
    const date = new Date(createdAt)
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="w-[25%] h-[100vh] border-r flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10">
        <div className="px-4 py-3 flex justify-between items-center border-b">
          <TitleHeader title="Chats" />
          <div className="flex gap-3 items-center">
            <button
              onClick={handleNotificationClick}
              className={`relative p-2 transition-colors ${
                showOnlyUnread ? "text-blue-600 bg-blue-50" : "text-primary-100"
              }`}
            >
              <PiChatsLight size={30} />
              <span className="sr-only">
                {showOnlyUnread ? "Show all chats" : "Show unread chats"}
              </span>

              {Array.isArray(chatList) &&
                chatList.some((chat) => unReadMessages(chat.chatHistory) > 0) && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-500 border-2 border-white rounded-full top-0 end-0 dark:border-gray-900">
                    {chatList.reduce(
                      (total, chat) => total + unReadMessages(chat.chatHistory),
                      0
                    )}
                  </div>
                )}
            </button>
            <button
              onClick={() => setNewChatModal(true)}
              className="text-primary-100"
            >
              <MdOutlineAddComment size={25} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="py-4 px-3 bg-white">
          <div className="relative border rounded-full bg-gray-100">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search by name or number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent pl-10 pr-4 py-2 rounded-full focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-grow overflow-y-auto">
        {Array.isArray(sortedChatList) && sortedChatList.length > 0 ? (
          sortedChatList.map((chat, idx) => (
            <button
              key={idx}
              onClick={() => handleChatClick(chat)}
              className={`flex justify-between p-2 border-b hover:bg-bg_color-200 cursor-pointer w-full ${
                selectedChatUser?.contactNo === chat.contactNo
                  ? "bg-bg_color-200"
                  : "bg-transparent"
              }`}
            >
              {/* Left Side */}
              <div className="flex gap-2">
                <img
                  src={
                    chat.img ||
                    "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                  }
                  alt="Profile"
                  className="w-[3rem] h-[3rem] rounded-full"
                />
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 max-w-[15rem]">
                    <span className="text-xm font-bold flex-shrink-0">
                      {chat.contactNo}
                    </span>
                    <span
                      className="text-xs text-gray-700 font-light truncate"
                      title={chat.fullName}
                    >
                      {chat.fullName}
                    </span>
                  </div>
                  <div className="font-light text-black text-sm truncate w-[10rem] text-left mt-1">
                    {chat?.latest_message?.message || "No message"}
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex flex-col justify-center items-end gap-1">
                <div className="text-xs text-black">
                  {getTime(chat?.latest_message?.created_at)}
                </div>
                {unReadMessages(chat.chatHistory) > 0 && (
                  <div className="bg-primary-100 text-white-100 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {unReadMessages(chat.chatHistory)}
                  </div>
                )}
              </div>
            </button>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="text-gray-500">No chats found</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatList
