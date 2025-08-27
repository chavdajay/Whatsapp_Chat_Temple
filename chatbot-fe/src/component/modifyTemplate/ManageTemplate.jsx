import React, { useState } from "react"
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import { BtnComponent } from "./BtnComponent.jsx"
import { AiOutlinePlus } from "react-icons/ai"
import { ButtonType, InputFormat } from "../../data/Mockdata.jsx"
import FileUpload from "../../images/fileupload.png"
import CustomEditor from "../global/CustomEditor.jsx"

const ManageTemplate = ({
  setFooterText,
  setEditorContent,
  setHeaderText,
  setSelectedFormat,
  setFile,
  setQuickReplyFields,
  setCallToActionFields,
  footerText,
  editorContent,
  headerText,
  selectedFormat,
  quickReplyFields,
  callToActionFields,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    visitWeb: false,
    addWebType: false,
  })
  const [addWebType, setAddWebType] = useState("Button")

  const handleFooterChange = (event) => {
    setFooterText(event.target.value)
  }

  const handleHeaderChange = (event) => {
    setHeaderText(event.target.value)
  }

  const handleEditorChange = (newValue) => {
    setEditorContent(newValue)
  }

  const handleOptionSelect = (option) => {
    setFile(null)
    const selectedItem = InputFormat.find((item) => item.option === option)

    if (selectedItem) {
      const { option: title, icon, placeholderImage } = selectedItem
      setSelectedFormat({ title, icon, placeholderImage })
      console.log(`Selected option: ${title}`)
    }
    setIsDropdownOpen((prev) => ({ ...prev, visitWeb: false }))
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    const fileType = selectedFile.type
    const fileName = selectedFile.name

    if (selectedFormat.title === "Image") {
      if (fileType === "image/jpeg" || fileType === "image/png") {
        setFile(URL.createObjectURL(selectedFile))
      } else {
        alert("Invalid image format. Please select a JPEG or PNG image.")
      }
    } else if (selectedFormat.title === "Video") {
      if (fileName.endsWith(".mp4")) {
        setFile(URL.createObjectURL(selectedFile))
      } else {
        alert("Invalid video format. Please select an MP4 video.")
      }
    } else if (selectedFormat.title === "Document") {
      if (fileName.endsWith(".docx")) {
        console.log("DOCX file selected:", selectedFile)
      } else {
        alert("Invalid document format. Please select a DOCX file.")
      }
    } else if (selectedFormat.title === "Location") {
      console.log("Selected Location format")
    } else {
      alert("Invalid file format. Please select a valid file.")
    }
    e.target.value = null
  }

  const handleFileClick = () => {
    document.getElementById("dropzone-file").click()
  }

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }))
  }

  const handleAddWebSelect = (type) => {
    if (type === "quick") {
      setQuickReplyFields((prev) => [...prev, {}])
    } else if (type === "action") {
      setCallToActionFields((prev) => [...prev, {}])
    }
    setAddWebType(type)
    setIsDropdownOpen((prev) => ({ ...prev, addWebType: false }))
  }

  const handleCloseClick = (type) => {
    if (type === "quick") {
      setQuickReplyFields((prev) => prev.slice(0, -1))
    } else if (type === "action") {
      setCallToActionFields((prev) => prev.slice(0, -1))
    }
  }
  // const scrollToLastAddedField = () => {
  //   setTimeout(() => {
  //     if (dropdownRef.current) {
  //       dropdownRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
  //     }
  //   }, 100)
  // }

  return (
    <div className="flex flex-col gap-5">
      <div className="text-grey_font-200">
        <p>It will take a couple of minutes.</p>
        <p>Change Profile settings and confirm with SMS code</p>
      </div>

      <div className="bg-white-100 flex flex-col gap-3 p-5 rounded">
        <h6 className="font-medium text-lg">Template Name And Language</h6>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="Template Name"
            className="block text-sm font-medium text-gray-900"
          >
            Template Name
          </label>
          <input
            type="text"
            id="template-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
            placeholder="Template Name"
            required
          />
        </div>
      </div>

      <div className="bg-white-100 flex flex-col gap-3 p-5 rounded">
        <h6 className="font-medium text-lg">Content</h6>
        <div className="text-grey_font-200">
          It will take a couple of minutes. Change profile settings and confirm with
          SMS code
        </div>

        <div className="relative flex flex-col gap-1">
          <label
            htmlFor="dropdown"
            className="block text-sm font-medium text-gray-900"
          >
            Header.<span className="text-grey_font-300">Optional</span>
          </label>
          <div
            id="dropdown"
            className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 cursor-pointer"
            onClick={() => toggleDropdown("visitWeb")}
            onKeyDown={(e) => e.key === "Enter" && toggleDropdown("visitWeb")}
            role="button"
            tabIndex="0"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen.visitWeb}
          >
            <span className="text-grey_font-200 mr-1">
              {selectedFormat.icon && (
                <span className="w-5 h-5">{selectedFormat.icon}</span>
              )}
            </span>
            <span className="flex-grow">{selectedFormat.title}</span>
            {isDropdownOpen.visitWeb ? (
              <IoIosArrowUp className="text-grey_font-100" />
            ) : (
              <IoIosArrowDown className="text-grey_font-100" />
            )}
          </div>

          {isDropdownOpen.visitWeb && (
            <div
              className="absolute top-full left-0 mt-1 bg-white-100 border border-gray-300 shadow-lg rounded-lg w-full z-20"
              role="listbox"
            >
              {InputFormat.map((item) => (
                <div
                  key={item.id}
                  className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                  onClick={() => handleOptionSelect(item.option)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleOptionSelect(item.option)
                  }
                  role="option"
                  tabIndex="0"
                  aria-selected={selectedFormat.title === item.option}
                >
                  <input
                    type="radio"
                    checked={selectedFormat.title === item.option}
                    readOnly
                    className="mr-2"
                  />
                  <div className="flex gap-2 items-center">
                    <span className="text-grey_font-200">{item.icon}</span>
                    {item.option}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedFormat.title === "Text" || selectedFormat.title === "Location" ? (
          <div className="flex flex-col gap-1">
            <label
              htmlFor="text-field"
              className="block text-sm font-medium text-gray-900"
            >
              Text Field
            </label>
            <input
              type="text"
              id="text-field"
              value={headerText}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
              placeholder="Enter text"
              onChange={handleHeaderChange}
            />
          </div>
        ) : null}

        {selectedFormat.title && (
          <div className="flex flex-col gap-4">
            {(selectedFormat.title === "Image" ||
              selectedFormat.title === "Video" ||
              selectedFormat.title === "Document" ||
              selectedFormat.title === "Location") && (
              <div className="flex items-center justify-center w-full">
                <div
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                  onClick={handleFileClick}
                  onKeyDown={(e) => e.key === "Enter" && handleFileClick()}
                  role="button"
                  tabIndex="0"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <img src={FileUpload} alt="Upload" className="w-10 h-10" />
                    <p className="text-gray-500 text-sm mt-2">
                      Upload {selectedFormat.title.toLowerCase()}
                    </p>
                    <input
                      type="file"
                      id="dropzone-file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <CustomEditor value={editorContent} onChange={handleEditorChange} />

        <div className="flex flex-col gap-1">
          <label
            htmlFor="footer"
            className="block text-sm font-medium text-gray-900"
          >
            Footer.<span className="text-grey_font-300"> Optional</span>
          </label>
          <input
            type="text"
            id="footer"
            value={footerText}
            onChange={handleFooterChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            placeholder="Enter footer text"
          />
        </div>
      </div>

      <div className="bg-white-100 flex flex-col gap-5 p-5">
        <div className="text-grey_font-200">
          <div
            htmlFor="button-type"
            className="block text-sm font-medium text-gray-900"
          >
            Button.<span className="text-grey_font-300"> Optional</span>
          </div>
          <p>
            It will take a couple of minutes. Change Profile settings and confirm
            with SMS code
          </p>
        </div>
        <div className="relative flex flex-col w-40">
          <button
            id="dropdownRadioButton"
            onClick={() => toggleDropdown("addWebType")}
            onKeyDown={(e) => e.key === "Enter" && toggleDropdown("addWebType")}
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full flex justify-between h-10 items-center px-2"
            type="button"
            aria-expanded={isDropdownOpen.addWebType}
            aria-controls="dropdownDefaultRadio"
          >
            <div className="flex gap-2">
              <AiOutlinePlus size={20} />
              Button
            </div>
            {isDropdownOpen.addWebType ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>

          {isDropdownOpen.addWebType && (
            <div
              id="dropdownDefaultRadio"
              className="absolute bottom-full left-0 mb-2 z-20 w-48 bg-white-100 divide-y divide-gray-100 rounded-lg shadow-lg"
            >
              <ul className="p-2 space-y-3 text-sm text-gray-700">
                {ButtonType.map((btn) => (
                  <div key={btn.type}>
                    <div className="font-bold">
                      {btn.type === "quick"
                        ? "Quick Reply Button"
                        : "Call To Action Button"}
                    </div>
                    {btn.fields.map((field) => (
                      <li key={field.id}>
                        <div
                          className="flex flex-col cursor-pointer p-2 rounded hover:bg-gray-100"
                          onClick={() => handleAddWebSelect(btn.type)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAddWebSelect(btn.type)
                          }
                          role="option"
                          tabIndex="0"
                          aria-selected={addWebType === btn.type}
                        >
                          <p className="font-medium">{field.line1}</p>
                          <p className="text-xs">{field.line2}</p>
                        </div>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>

        {callToActionFields.length > 0 && (
          <div className="flex flex-col gap-3">
            <div>
              Call To Action
              {callToActionFields.length > 0 && (
                <span className="text-grey_font-300"> Optional</span>
              )}
            </div>
            <div className="w-full">
              {callToActionFields.map((field, index) => (
                <div key={index} className="relative">
                  <BtnComponent
                    btnIcon={field.btnIcon}
                    btnTitle={field.btnTitle}
                    onClose={() => handleCloseClick("action")}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {quickReplyFields.length > 0 && (
          <div className="flex flex-col gap-3">
            <div>
              Quick Reply Button
              {quickReplyFields.length > 0 && (
                <span className="text-grey_font-300"> Optional</span>
              )}
            </div>
            <div className="w-full">
              {quickReplyFields.map((field, index) => (
                <div key={index} className="relative">
                  <BtnComponent
                    btnIcon={field.btnIcon}
                    btnTitle={field.btnTitle}
                    onClose={() => handleCloseClick("quick")}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageTemplate
