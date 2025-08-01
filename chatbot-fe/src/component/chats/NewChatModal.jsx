// import React, { useState, useEffect, useRef } from "react"
// import { IoClose } from "react-icons/io5"
// import { Formik, Form, Field, ErrorMessage } from "formik"
// import * as Yup from "yup"
// import * as XLSX from "xlsx"
// import { handleSuccess, handleError } from "../../utils/toastUtils.js"
// import chatService from "../../services/chat.services.jsx"

// const validationSchema = Yup.object().shape({
//   fullName: Yup.string()
//     .min(2, "Full name must be at least 2 characters")
//     .max(100, "Full name must be less than 100 characters")
//     .matches(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces")
//     .required("Full name is required"),
//   phone: Yup.string()
//     .matches(
//       /^[0-9+\-\s()]+$/,
//       "Phone number can only contain numbers, +, -, spaces, and parentheses"
//     )
//     .min(10, "Phone number must be at least 10 digits")
//     .max(15, "Phone number must be less than 15 digits")
//     .required("Phone number is required"),
//   message: Yup.string().required("Message is required"),
// })

// const NewChatModal = ({ isOpen, handleClose, sendMessage }) => {
//   const [bulkMessages, setBulkMessages] = useState([])
//   const [bulkMessage, setBulkMessage] = useState("")
//   const modalRef = useRef()

//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         handleClose()
//       }
//     }
//     if (isOpen) {
//       document.addEventListener("mousedown", handleOutsideClick)
//     }
//     return () => document.removeEventListener("mousedown", handleOutsideClick)
//   }, [isOpen, handleClose])

//   if (!isOpen) return null

//   const initialValues = {
//     fullName: "",
//     phone: "",
//     message: "",
//   }

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       const { fullName, phone, message } = values

//       await chatService.createUser({
//         fullName,
//         email: "",
//         contactNo: phone,
//         isApprove: "approved",
//         isActive: true,
//         isTempName: !fullName || fullName === "System",
//       })

//       sendMessage(message, phone, fullName)
//       resetForm()
//       handleClose()
//     } catch (error) {
//       console.error("Error submitting form:", error)
//     }
//   }

//   const handleSheetUpload = (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     const reader = new FileReader()
//     reader.onload = (evt) => {
//       const data = evt.target.result
//       const workbook = XLSX.read(data, { type: "binary" })
//       const sheet = workbook.Sheets[workbook.SheetNames[0]]
//       const jsonData = XLSX.utils.sheet_to_json(sheet)
//       setBulkMessages(jsonData)
//     }
//     reader.readAsBinaryString(file)
//   }

//   const handleBulkSend = async () => {
//     if (!bulkMessage) {
//       handleError("Please enter a message to send to all users.")
//       return
//     }

//     try {
//       const res = await chatService.sendBulkMessages({
//         message: bulkMessage,
//         messages: bulkMessages,
//       })
//       handleSuccess("Bulk messages sent successfully")
//       console.log(res.results)
//       setBulkMessages([])
//       setBulkMessage("")
//       handleClose()
//     } catch (err) {
//       console.error("Bulk send failed:", err)
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
//       <div
//         ref={modalRef}
//         className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-y-auto max-h-[90vh] transition-all duration-300"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center bg-blue-700 text-white-100 px-6 py-4 rounded-t-xl">
//           <h2 className="text-xl font-semibold">New Message</h2>
//           <IoClose
//             className="cursor-pointer text-2xl hover:text-red-200"
//             onClick={handleClose}
//           />
//         </div>

//         {/* Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//           {/* Single Message */}
//           <div className="flex flex-col justify-between">
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-800">
//                 Single Message
//               </h3>
//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//               >
//                 {({ errors, touched }) => (
//                   <Form className="space-y-5">
//                     <div>
//                       <label
//                         htmlFor="fullName"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         Full Name
//                       </label>
//                       <Field
//                         type="text"
//                         name="fullName"
//                         placeholder="Enter Full Name"
//                         className={`w-full p-2 mt-1 rounded border text-sm ${
//                           errors.fullName && touched.fullName
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="fullName"
//                         component="div"
//                         className="text-red-500 text-xs mt-1"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="phone"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         Phone Number
//                       </label>
//                       <Field
//                         type="tel"
//                         name="phone"
//                         placeholder="Number..."
//                         className={`w-full p-2 mt-1 rounded border text-sm ${
//                           errors.phone && touched.phone
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="phone"
//                         component="div"
//                         className="text-red-500 text-xs mt-1"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="message"
//                         className="block text-sm font-medium text-gray-700"
//                       >
//                         Enter Message
//                       </label>
//                       <Field
//                         as="textarea"
//                         name="message"
//                         rows="3"
//                         placeholder="Message..."
//                         className={`w-full p-2 mt-1 rounded border text-sm ${
//                           errors.message && touched.message
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         }`}
//                       />
//                       <ErrorMessage
//                         name="message"
//                         component="div"
//                         className="text-red-500 text-xs mt-1"
//                       />
//                     </div>

//                     {/* Centered Send button using ternary */}
//                     <div className="flex justify-center">
//                       {bulkMessages.length === 0 ? (
//                         <button
//                           type="submit"
//                           className="bg-blue-600 text-white-100 px-4 py-2 rounded-md text-sm hover:bg-blue-700"
//                         >
//                           Send
//                         </button>
//                       ) : null}
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>

//           {/* Bulk Message */}
//           <div className="flex flex-col justify-between">
//             <div>
//               <h3 className="text-lg font-semibold mb-4 text-gray-800">
//                 Bulk Message (via Sheet)
//               </h3>
//               <div className="space-y-4">
//                 <input
//                   type="file"
//                   accept=".csv, .xlsx"
//                   onChange={handleSheetUpload}
//                   className="text-sm w-full"
//                 />

//                 <textarea
//                   rows={3}
//                   placeholder="Enter bulk message..."
//                   value={bulkMessage}
//                   onChange={(e) => setBulkMessage(e.target.value)}
//                   className="w-full border rounded p-2 text-sm"
//                 />
//               </div>
//             </div>

//             {/* Centered Bulk Send button using ternary */}
//             <div className="flex justify-center mt-6">
//               {bulkMessages.length > 0 ? (
//                 <button
//                   type="button"
//                   onClick={handleBulkSend}
//                   className="bg-green-600 text-white-100 px-4 py-2 rounded-md text-sm hover:bg-green-700"
//                 >
//                   Send to {bulkMessages.length} users
//                 </button>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NewChatModal

import React, { useState, useEffect, useRef } from "react"
import { IoClose } from "react-icons/io5"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import * as XLSX from "xlsx"
import { handleSuccess, handleError } from "../../utils/toastUtils.js"
import chatService from "../../services/chat.services.jsx"

const templates = [
  { id: 1, name: "Welcome", content: "Hello {{name}}, welcome to our service!" },
  {
    id: 2,
    name: "Follow Up",
    content: "Hi {{name}}, just checking in on your request.",
  },
  {
    id: 3,
    name: "Thank You",
    content: "Thank you {{name}} for connecting with us.",
  },
]

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .matches(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces")
    .required("Full name is required"),
  phone: Yup.string()
    .matches(
      /^[0-9+\-\s()]+$/,
      "Phone number can only contain numbers, +, -, spaces, and parentheses"
    )
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .required("Phone number is required"),
  message: Yup.string().required("Message is required"),
})

const NewChatModal = ({ isOpen, handleClose, sendMessage }) => {
  const [bulkMessages, setBulkMessages] = useState([])
  const [bulkMessage, setBulkMessage] = useState("")
  const [bulkMode, setBulkMode] = useState("manual")
  const [bulkTemplateId, setBulkTemplateId] = useState("")
  const modalRef = useRef()

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [isOpen, handleClose])

  if (!isOpen) return null

  const initialValues = {
    fullName: "",
    phone: "",
    message: "",
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { fullName, phone, message } = values

      await chatService.createUser({
        fullName,
        email: "",
        contactNo: phone,
        isApprove: "approved",
        isActive: true,
        isTempName: !fullName || fullName === "System",
      })

      sendMessage(message, phone, fullName)
      resetForm()
      handleClose()
    } catch (error) {
      console.error("Error submitting form:", error)
      handleError("Failed to send single message.")
    }
  }

  const handleSheetUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (evt) => {
      const data = evt.target.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(sheet)
      setBulkMessages(jsonData)
    }
    reader.readAsBinaryString(file)
  }

  const handleBulkSend = async () => {
    try {
      let preparedMessages = []

      if (bulkMode === "template") {
        const selected = templates.find((tpl) => tpl.id == bulkTemplateId)
        if (!selected) {
          handleError("Please select a template.")
          return
        }

        preparedMessages = bulkMessages.map((user) => ({
          ...user,
          message: selected.content.replace("{{name}}", user.fullName || ""),
        }))
      } else {
        if (!bulkMessage) {
          handleError("Please enter a message.")
          return
        }

        preparedMessages = bulkMessages.map((user) => ({
          ...user,
          message: bulkMessage,
        }))
      }

      // await chatService.sendBulkMessages({ messages: preparedMessages })
      await chatService.sendBulkMessages({
        message: "", // <-- empty because each message is customized
        messages: preparedMessages,
      })

      handleSuccess("Bulk messages sent successfully")
      setBulkMessages([])
      setBulkMessage("")
      setBulkTemplateId("")
      handleClose()
    } catch (err) {
      console.error("Bulk send failed:", err)
      handleError("Failed to send bulk messages.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-y-auto max-h-[90vh] transition-all duration-300"
      >
        <div className="flex justify-between items-center bg-blue-700 text-white-100 px-6 py-4 rounded-t-xl">
          <h2 className="text-xl font-semibold">New Message</h2>
          <IoClose
            className="cursor-pointer text-2xl hover:text-red-200"
            onClick={handleClose}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Single Message */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Single Message
              </h3>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <Field
                        id="fullName"
                        type="text"
                        name="fullName"
                        placeholder="Enter Full Name"
                        className={`w-full p-2 mt-1 rounded border text-sm ${
                          errors.fullName && touched.fullName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <Field
                        type="tel"
                        name="phone"
                        placeholder="Number..."
                        className={`w-full p-2 mt-1 rounded border text-sm ${
                          errors.phone && touched.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enter Message
                      </label>
                      <Field
                        as="textarea"
                        name="message"
                        rows="3"
                        placeholder="Message..."
                        className={`w-full p-2 mt-1 rounded border text-sm ${
                          errors.message && touched.message
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="flex justify-center">
                      {bulkMessages.length === 0 && (
                        <button
                          type="submit"
                          className="bg-blue-600 text-white-100 px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                        >
                          Send
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Bulk Message */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Bulk Message (via Sheet)
              </h3>

              <div className="mb-3">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mode:
                </label>
                <div className="flex gap-4 mt-1">
                  <label htmlFor="bulk-manual">
                    <input
                      type="radio"
                      id="bulk-manual"
                      name="bulk-mode"
                      value="manual"
                      checked={bulkMode === "manual"}
                      onChange={() => setBulkMode("manual")}
                    />
                    <span className="ml-1 text-sm">Manual</span>
                  </label>
                  <label htmlFor="bulk-template">
                    <input
                      type="radio"
                      id="bulk-template"
                      name="bulk-mode"
                      value="template"
                      checked={bulkMode === "template"}
                      onChange={() => setBulkMode("template")}
                    />
                    <span className="ml-1 text-sm">Template</span>
                  </label>
                </div>
              </div>

              <input
                type="file"
                accept=".csv, .xlsx"
                onChange={handleSheetUpload}
                className="text-sm w-full mb-3"
              />

              {bulkMode === "manual" ? (
                <textarea
                  rows={3}
                  placeholder="Enter bulk message..."
                  value={bulkMessage}
                  onChange={(e) => setBulkMessage(e.target.value)}
                  className="w-full border rounded p-2 text-sm"
                />
              ) : (
                <select
                  className="w-full border rounded p-2 text-sm"
                  value={bulkTemplateId}
                  onChange={(e) => setBulkTemplateId(e.target.value)}
                >
                  <option value="">Select template</option>
                  {templates.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex justify-center mt-6">
              {bulkMessages.length > 0 && (
                <button
                  type="button"
                  onClick={handleBulkSend}
                  disabled={bulkMode === "template" && !bulkTemplateId}
                  className="bg-green-600 text-white-100 px-4 py-2 rounded-md text-sm hover:bg-green-700 disabled:opacity-50"
                >
                  Send to {bulkMessages.length} users
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewChatModal
