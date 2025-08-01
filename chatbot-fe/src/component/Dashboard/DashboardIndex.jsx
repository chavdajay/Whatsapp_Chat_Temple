import React, { useState } from "react"
import logo from "../../images/logo.png"
import { SlQuestion } from "react-icons/sl"
import GoLiveApplication from "./GoLiveApplication.jsx"
import CreateAppModal from "./CreateAppModal.jsx"

const DashboardIndex = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-8 bg-white-500">
        <div className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-2 bg-white-100">
          <img src={logo} alt="logo" className="w-48 " />
        </div>

        <div className="flex flex-wrap justify-between lg:mx-5 items-center px-8 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-1">
            <p className="text-primary-100 font-bold 2xl:text-2xl md:text-xl sm:text-3xl text-2xl capitalize">
              dashboard
            </p>
            <p className="text-[#7466C0] text-base sm:text-lg">Main Page</p>
          </div>
          {/* <button
            className="flex items-center gap-3 text-white-100 bg-primary-100 2xl:text-2xl sm:text-xl md:text-xl capitalize rounded-md px-3 sm:px-4 py-2"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus />
            Create app
          </button> */}
        </div>

        <div className="bg-white-100 flex flex-col sm:flex-row justify-between items-center border mx-5 sm:mx-10 lg:mx-20 p-4 rounded-md">
          <p className="text-[#02264F] text-lg sm:text-xl font-bold">
            customer id:
            <span className="font-medium text-base sm:text-lg">1234565563</span>
          </p>
          <p className="flex gap-3 items-center mt-4 sm:mt-0">
            <div className="relative inline-flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 overflow-hidden bg-orange-100 rounded-full">
              <SlQuestion className="text-white-100 text-xl sm:text-2xl" />
            </div>
            <span className="text-[#02264F] text-base sm:text-lg">Help</span>
          </p>
        </div>

        <div className="mx-5 sm:mx-10 lg:mx-20 flex flex-col gap-5 max-h-[50vh] sm:max-h-[65vh] overflow-auto">
          <GoLiveApplication />
        </div>
      </div>

      <CreateAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default DashboardIndex
