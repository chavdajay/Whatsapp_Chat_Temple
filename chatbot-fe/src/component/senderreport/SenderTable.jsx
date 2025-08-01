import React, { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { BsSend } from "react-icons/bs"
import UploadFileModal from "./UploadFileModal.jsx"
import { useDispatch } from "react-redux"
import {
  DELETE_FILE_REQUEST,
  FETCH_ALL_FILES,
  SEND_BULK_MESSAGE_MODAL,
  UPLOAD_FILE_MODAL,
} from "../../redux/report/reportAction.jsx"
import { useReportMaster } from "../../redux/report/reportReducer.jsx"
import SendMessage from "./SendMessage.jsx"
import { toast } from "react-toastify"
import { TiDocumentDelete } from "react-icons/ti"
import { TruncateChar } from "../../utils/Truncate.jsx"

const SenderTable = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const dispatch = useDispatch()
  const { fileData } = useReportMaster()

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = fileData?.data?.map((value) => value.id)
      setSelectedItems(allIds)
    } else {
      setSelectedItems([])
    }
  }

  const handleCheckboxChange = (id) => {
    const currentIndex = selectedItems.indexOf(id)
    const newSelectedItems = [...selectedItems]
    if (currentIndex === -1) {
      newSelectedItems.push(id)
    } else {
      newSelectedItems.splice(currentIndex, 1)
    }
    setSelectedItems(newSelectedItems)
  }

  const handleDeletefile = (id) => {
    dispatch({ type: DELETE_FILE_REQUEST, payload: id })
  }

  useEffect(() => {
    dispatch({ type: FETCH_ALL_FILES })
  }, [dispatch])

  const hasItems = fileData?.data?.length > 0

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center p-5">
          <p className="text-black-100 text-xl font-medium">User File List</p>
          <button
            className="bg-primary-100 text-white-100 flex items-center gap-2 rounded px-4 py-2"
            onClick={() => dispatch({ type: UPLOAD_FILE_MODAL, payload: true })}
          >
            <FaPlus />
            Add
          </button>
        </div>
        <div className="relative overflow-x-auto 2xl:max-h-[65vh] xl:max-h-[60vh] lg:max-h-[45vh] p-4">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[#FCFCFD] border-b">
              <tr className="text-center">
                {hasItems && (
                  <th className="py-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-100 bg-gray-100 border-gray-300 rounded"
                      onChange={handleSelectAll}
                    />
                  </th>
                )}
                <th className="py-3">Name</th>
                {/* <th className="py-3">Created By</th> */}
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hasItems ? (
                fileData.data.map((value, index) => (
                  <tr
                    className="text-center cursor-pointer"
                    key={index}
                    onClick={() => handleCheckboxChange(value?.id)}
                  >
                    {hasItems && (
                      <td className="py-4">
                        <input
                          id={`purple-checkbox-${index}`}
                          type="checkbox"
                          checked={selectedItems.includes(value.id)}
                          onChange={() => handleCheckboxChange(value.id)}
                          className="w-4 h-4 accent-orange-100 bg-gray-100 border-gray-300 rounded"
                        />
                      </td>
                    )}
                    <td className="py-4 truncate" style={{ maxWidth: "2rem" }}>
                      {TruncateChar(value?.name, 15)}
                    </td>
                    {/* <td className="py-4">Create by</td> */}
                    <td className="py-4">
                      <p className="flex justify-center">
                        <TiDocumentDelete
                          size="1.5rem"
                          className="cursor-pointer text-red-100"
                          onClick={() => handleDeletefile(value.id)}
                        />
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={4} className="py-4">
                    No Customer Records Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end p-5">
        <button
          className="flex bg-primary-100 text-white-100 items-center gap-2 rounded px-4 py-2"
          onClick={() => {
            if (selectedItems?.length === 0) {
              toast.warning("please select rows", {
                className: "custom-toast-container",
              })
            } else {
              dispatch({ type: SEND_BULK_MESSAGE_MODAL, payload: true })
            }
          }}
        >
          <BsSend />
          Send
        </button>
      </div>
      <UploadFileModal
        handleClose={() => dispatch({ type: UPLOAD_FILE_MODAL, payload: false })}
      />
      <SendMessage
        handleClose={() =>
          dispatch({ type: SEND_BULK_MESSAGE_MODAL, payload: false })
        }
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </>
  )
}

export default SenderTable
