import React, { useEffect, useState, useRef } from "react"
import { useUIContext } from "../../context/BasicProvider.jsx"
import { useNavigate } from "react-router-dom"
import { BiSolidPhoneCall } from "react-icons/bi"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

const UserProfile = () => {
  const {
    setSelectWabaid,
    setBussinessid,
    setLoading,
    setWabaidlist,
    wabaidlist,
    selectWabaid,
  } = useUIContext()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const wabaList = JSON.parse(sessionStorage.getItem("wabalist"))
    setWabaidlist(wabaList)

    const savedWabaid = sessionStorage.getItem("wabaid")
    const saveBussinessid = sessionStorage.getItem("businessid")
    const defaultOption =
      wabaList?.data?.find((option) => option.waba_id === savedWabaid) ||
      wabaList?.data[0]

    if (!savedWabaid) {
      if (defaultOption) {
        setSelectWabaid(defaultOption.waba_id)
        setBussinessid(defaultOption.business_id)
        sessionStorage.setItem("wabaid", defaultOption.waba_id)
        sessionStorage.setItem("businessid", defaultOption.business_id)
      }
    } else {
      setSelectWabaid(savedWabaid)
      setBussinessid(saveBussinessid)
    }
  }, [setWabaidlist, setSelectWabaid, setBussinessid])

  const handleChange = (waba_id, business_id) => {
    setSelectWabaid(waba_id)
    setBussinessid(business_id)
    sessionStorage.setItem("wabaid", waba_id)
    sessionStorage.setItem("businessid", business_id)
    setIsOpen(false)
    setLoading(true)
    navigate("/template")
  }

  const selectOption = (item) => {
    const isSelected = item.waba_id == selectWabaid

    return (
      <li key={item.waba_id}>
        <button
          onClick={() => handleChange(item.waba_id, item.business_id)}
          className={`cursor-pointer w-full p-2 text-left rounded-lg 
                    ${
                      isSelected
                        ? "bg-primary-100 text-white-100"
                        : "bg-white-100 text-black-100"
                    } 
                    hover:bg-primary-50 transition duration-200`}
        >
          {item.waba_id}
        </button>
      </li>
    )
  }

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    } else {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen])

  return (
    <div className="flex flex-row items-center gap-4 2xl:px-5 xl:px-3 lg:px-2 px-4 py-2 text-black-100 bg-white-100 shadow-md rounded-lg">
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full p-1 bg-[#11057E0D] text-primary-100">
        <BiSolidPhoneCall size={30} />
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
          className="outline-none text-primary-100 text-base w-full p-2 rounded-lg border-none flex items-center gap-4"
        >
          {selectWabaid ? selectWabaid : "Select Wabaid"}{" "}
          <MdOutlineKeyboardArrowDown />
        </button>
        {isOpen && (
          <ul className="absolute w-[110%] bg-white-100 shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto z-40">
            {wabaidlist?.data?.map((item) => {
              return selectOption(item, selectWabaid)
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserProfile
