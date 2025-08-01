import React, { createContext, useContext, useState } from "react"

export const BasicContext = createContext({})
export const useUIContext = () => useContext(BasicContext)

const Basicprovider = ({ children }) => {
  const [selectWabaid, setSelectWabaid] = useState("")
  const [businessid, setBussinessid] = useState("")
  const [wabaidlist, setWabaidlist] = useState({})
  const [loading, setLoading] = useState(false)
  const [selectedNavbar, setSelectedNavbar] = useState("home")
  const [chatUser, setChatUser] = useState("")
  const [chatData, setChatData] = useState({})
  const [socket, setSocket] = useState(null)
  const [seenMessageIds, setSeenMessageIds] = useState([])

  return (
    <BasicContext.Provider
      value={{
        selectWabaid,
        setSelectWabaid,
        businessid,
        setBussinessid,
        wabaidlist,
        setWabaidlist,
        loading,
        setLoading,
        selectedNavbar,
        setSelectedNavbar,
        chatUser,
        setChatUser,
        chatData,
        setChatData,
        socket,
        setSocket,
        seenMessageIds,
        setSeenMessageIds,
      }}
    >
      {children}
    </BasicContext.Provider>
  )
}

export default Basicprovider
