import React from "react"
import { MdOutlineClose } from "react-icons/md"

const Createapp = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0">
            <div className="flex justify-center items-center h-full">
              <div
                className="bg-white rounded p-8  mx-auto"
                style={{ backgroundColor: "#fff" }}
              >
                <div>
                  <div className="flex justify-between">
                    <h1 className="text-3xl font-bold mb-4">
                      App Type : Access Api{" "}
                    </h1>
                    <MdOutlineClose
                      onClick={onClose}
                      className="text-3xl"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <p className="text-gray-400">
                    Enter the unique app name associated with your whatsapp account
                  </p>
                  <label
                    htmlFor="Enter App Name "
                    className="block text-gray-700 text-lg font-bold mb-2 mt-3"
                  >
                    Enter App Name
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-lg text-gray-700 leading-tight focus:outline-none"
                    placeholder="app name required "
                  />
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full text-white-100"
                    style={{ backgroundColor: "#6236F5" }}
                    onClick={onClose}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Createapp
