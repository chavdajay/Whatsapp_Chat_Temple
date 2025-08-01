import React, { useState } from "react"
import { IoClose } from "react-icons/io5"
import Uploadfile from "../../images/upload.png"
import { useDispatch } from "react-redux"
import { UPLOAD_FILE } from "../../redux/report/reportAction.jsx"
import { toast } from "react-toastify"
import { useReportMaster } from "../../redux/report/reportReducer.jsx"

const UploadFileModal = ({ handleClose }) => {
  const dispatch = useDispatch()
  const { fileUploadModal } = useReportMaster()
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
    } else {
      setFile(null)
      setFileName("")
      setUploadProgress(0)
      toast.error("Invalid file format. Please select a PDF or Excel file.")
    }
  }

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file before uploading.")
      return
    }
    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUploadProgress(progress)
    }
    try {
      dispatch({ type: UPLOAD_FILE, payload: file })
      setUploadProgress(100)
    } catch (error) {
      toast.error("Failed to upload file. Please try again.")
      setUploadProgress(0)
    }
    setFile(null)
    setFileName("")
    setUploadProgress(0)
  }

  return (
    <button
      className={`popup-modal flex  ${fileUploadModal ? " modal-in" : "modal-out hidden"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div className="bg-white-100 max-h-full w-3/12 flex flex-col gap-5 p-4 modal-background modal rounded-lg">
        <div className="flex justify-between items-center text-primary-100 text-2xl font-medium">
          <div>Upload File</div>
          <IoClose onClick={handleClose} className="cursor-pointer" />
        </div>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-[12rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <img src={Uploadfile} className="w-20 h-20" alt="upload" />
              <p className="mb-2 text-sm">
                Drop your file here, or
                <span className="font-semibold text-primary-100"> browse</span>
              </p>
              <p className="text-xs text-gray-500">Supports PDF & EXCEL</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="file"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {fileName && (
          <p className="text-sm text-gray-500 truncate" title={fileName}>
            {fileName}
          </p>
        )}
        {uploadProgress > 0 ? (
          <div className="w-full h-2 bg-primary-500 rounded-full mt-2">
            <div
              className="h-full bg-primary-100 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        ) : null}
        <div className="flex justify-end gap-3">
          <button className="border py-1 px-2 rounded-md" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="border bg-primary-100 text-white-100 py-1 px-3 rounded-md"
            onClick={handleFileUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </button>
  )
}

export default UploadFileModal
