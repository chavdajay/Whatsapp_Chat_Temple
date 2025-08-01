import React from "react"
import logo from "../images/final.png"
import { Link, useLocation } from "react-router-dom"
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2"
import { LuLogOut } from "react-icons/lu"
import { HiOutlineCalendar } from "react-icons/hi2"
import { useChatMaster } from "../redux/chat/ChatReducer.jsx"
import { handleError } from "../utils/toastUtils.js"

const Sidebar = () => {
  const location = useLocation()
  const { chatList } = useChatMaster()

  const handleLogout = () => {
    try {
      localStorage.removeItem("token")
      handleError("Logged out successfully")

      setTimeout(() => {
        window.location.href = "/login"
      }, 1000) // short delay to show toast
    } catch (error) {
      console.error("Logout Error:", error)
      handleError("Failed to log out. Please try again.")
    }
  }

  const unReadMessages = (chatHistory) =>
    chatHistory.filter((msg) => msg.isReceived && !msg.isSeen)?.length

  return (
    <div className="bg-white-100 text-black-100 h-screen w-16 sm:w-auto flex flex-col justify-between items-center px-3">
      <div className="flex flex-col items-center w-full">
        <img src={logo} alt="logo" className="py-6 sm:py-12 px-1 w-20" />
        <div className="text-xl sm:text-2xl text-grey_font-100 flex flex-col items-center md:gap-6 gap-5 sm:gap-10">
          <Link
            to="/chats"
            title="Chats"
            className="flex flex-col gap-1 items-center"
          >
            <button
              className={`relative w-10 h-10 flex items-center justify-center rounded-md transition-colors duration-200 ${
                location.pathname === "/chats"
                  ? "bg-black-400 text-primary-100"
                  : "bg-transparent text-grey_font-100"
              }`}
              aria-label="Chats"
              type="button"
            >
              <HiOutlineChatBubbleLeftRight className="w-5 h-5" />
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[0.5rem] font-semibold bg-orange-500 text-white-100 rounded-full -top-2 -end-2">
                {Array.isArray(chatList) &&
                  chatList.filter((chat) => unReadMessages(chat.chatHistory) > 0)
                    .length}
              </div>
            </button>

            <div
              className={`${
                location.pathname === "/chats"
                  ? "text-primary-100"
                  : "bg-transparent"
              } 2xl:text-sm md:text-xs sm:text-sm lg:block hidden`}
            >
              Chats
            </div>
          </Link>

          <Link
            to="/weekly-report"
            title="Weekly Reports"
            className="flex flex-col gap-1 items-center"
          >
            <button
              className={`relative w-10 h-10 flex items-center justify-center rounded-md transition-colors duration-200 ${
                location.pathname.includes("/weekly-report")
                  ? "bg-black-400 text-primary-100"
                  : "bg-transparent text-grey_font-100"
              }`}
              aria-label="Calendar"
              type="button"
            >
              <HiOutlineCalendar className="w-5 h-5" />
            </button>

            <div
              className={`${
                location.pathname.includes("/weekly-report")
                  ? "text-primary-100"
                  : "bg-transparent"
              } 2xl:text-sm md:text-xs sm:text-sm lg:block hidden`}
            >
              Reports
            </div>
          </Link>
        </div>
      </div>

      <div className="pb-10 flex flex-col items-center gap-5 text-grey_font-100">
        <button
          className="border p-3 rounded-lg text-primary-100 shadow-sm"
          onClick={handleLogout}
        >
          <LuLogOut size={20} />
        </button>
      </div>
    </div>
  )
}

export default Sidebar
