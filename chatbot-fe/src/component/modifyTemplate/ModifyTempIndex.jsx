import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import PreviewTemplate from "./PreviewTemplate.jsx"
import CreateTemplate from "./CreateTemplate.jsx"
import ManageTemplate from "./ManageTemplate.jsx"
import { TitleHeader } from "../global/TitleHeader.jsx"

const ModifyTempIndex = () => {
  const [footerText, setFooterText] = useState("")
  const [editorContent, setEditorContent] = useState("hello")
  const [headerText, setHeaderText] = useState("")
  const [selectedFormat, setSelectedFormat] = useState({
    title: "None",
    icon: "",
    placeholderImage: "",
  })
  const [file, setFile] = useState("")
  const [quickReplyFields, setQuickReplyFields] = useState([])
  const [callToActionFields, setCallToActionFields] = useState([])

  return (
    <>
      <div className="px-4 sm:px-8 pt-4 sm:pt-5 flex flex-col gap-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <TitleHeader title="Manage Templates" />
        </div>
        <div className="flex gap-6">
          <div className="sm:col-span-4 overflow-hidden hover:overflow-auto 2xl:h-[87vh] xl:h-[85vh] lg:h-[82vh] w-[75vw]">
            <Routes>
              <Route
                path="create"
                element={
                  <CreateTemplate
                    setFooterText={setFooterText}
                    setEditorContent={setEditorContent}
                    setHeaderText={setHeaderText}
                    setSelectedFormat={setSelectedFormat}
                    setFile={setFile}
                    setQuickReplyFields={setQuickReplyFields}
                    setCallToActionFields={setCallToActionFields}
                    footerText={footerText}
                    editorContent={editorContent}
                    headerText={headerText}
                    selectedFormat={selectedFormat}
                    file={file}
                    quickReplyFields={quickReplyFields}
                    callToActionFields={callToActionFields}
                  />
                }
              />
              <Route
                path="manage"
                element={
                  <ManageTemplate
                    setFooterText={setFooterText}
                    setEditorContent={setEditorContent}
                    setHeaderText={setHeaderText}
                    setSelectedFormat={setSelectedFormat}
                    setFile={setFile}
                    setQuickReplyFields={setQuickReplyFields}
                    setCallToActionFields={setCallToActionFields}
                    footerText={footerText}
                    editorContent={editorContent}
                    headerText={headerText}
                    selectedFormat={selectedFormat}
                    file={file}
                    quickReplyFields={quickReplyFields}
                    callToActionFields={callToActionFields}
                  />
                }
              />
              <Route
                path="*"
                element={
                  <ManageTemplate
                    setFooterText={setFooterText}
                    setEditorContent={setEditorContent}
                    setHeaderText={setHeaderText}
                    setSelectedFormat={setSelectedFormat}
                    setQuickReplyFields={setQuickReplyFields}
                    setCallToActionFields={setCallToActionFields}
                    footerText={footerText}
                    editorContent={editorContent}
                    headerText={headerText}
                    selectedFormat={selectedFormat}
                    file={file}
                    quickReplyFields={quickReplyFields}
                    callToActionFields={callToActionFields}
                  />
                }
              />
            </Routes>
          </div>
          <div className="overflow-hidden hover:overflow-auto bg-white flex flex-col border gap-5 border-gray-200 rounded-lg w-[20vw] 2xl:h-[87vh] xl:h-[85vh] lg:h-[82vh]">
            <PreviewTemplate
              footerText={footerText}
              editorContent={editorContent}
              headerText={headerText}
              selectedFormat={selectedFormat}
              file={file}
              quickReplyFields={quickReplyFields}
              callToActionFields={callToActionFields}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ModifyTempIndex
