import React from "react"
import { IoClose } from "react-icons/io5"

const CreateAppModal = ({ isOpen, onClose }) => {
  return (
    <div className={`${isOpen ? "flex" : "hidden"}`}>
      <div
        className={`popup-modal inset-0 flex ${isOpen ? "modal-in" : "modal-out"}  `}
      >
        <div className="bg-white-100 w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 max-h-[90vh] overflow-y-auto flex flex-col gap-5 p-5 rounded-lg shadow-lg modal-background modal">
          <div className="flex justify-between items-center text-primary-100 text-lg sm:text-2xl font-medium ">
            <p>App Type: Access API</p>
            <IoClose
              onClick={onClose}
              className="cursor-pointer text-xl sm:text-2xl"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-xs sm:text-sm text-gray-400">
              Enter the unique app name associated with your WhatsApp account
            </div>
            <div className="w-full">
              <form>
                <label
                  htmlFor="app-name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Enter App Name:
                </label>
                <input
                  id="app-name"
                  type="text"
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="App Name Required"
                />
              </form>
            </div>

            <button className="bg-primary-100 text-white-100 py-2 rounded-md text-sm sm:text-base">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAppModal
