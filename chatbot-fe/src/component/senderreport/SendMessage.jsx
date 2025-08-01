// import React from "react"
// import { IoClose } from "react-icons/io5"
// import { useDispatch } from "react-redux"
// import { SEND_BULK_MESSAGE } from "../../redux/report/reportAction.jsx"
// import { useParams } from "react-router-dom"
// import { useUIContext } from "../../context/BasicProvider.jsx"
// import { useReportMaster } from "../../redux/report/reportReducer.jsx"
// import * as Yup from "yup"
// import { jwtDecode } from "jwt-decode"

// import { ErrorMessage, Field, Form, Formik } from "formik"
// const SendMessage = ({ handleClose, selectedItems, setSelectedItems }) => {
//   const { id } = useParams()
//   const { selectWabaid, businessid } = useUIContext()
//   const { sendMessageModal } = useReportMaster()
//   const dispatch = useDispatch()
//   const sendBulkMessage = (values, { resetForm }) => {
//     const token = localStorage.getItem("access_token")
//     if (!token) return

//     const decoded = jwtDecode(token)
//     dispatch({
//       type: SEND_BULK_MESSAGE,
//       payload: {
//         template_id: id,
//         business_id: businessid,
//         waba_id: selectWabaid,
//         name: values.name,
//         description: values.description,
//         sheet_id: selectedItems,
//         payload: {
//           message: values.description,
//         },
//         from_user: decoded.id,
//       },
//     })
//     resetForm()
//     // setSendData({})
//     setSelectedItems([])
//   }
//   return (
//     <>
//       <div
//         className={`popup-modal flex ${sendMessageModal ? "modal-in" : "modal-out hidden"}`}
//       >
//         <div className="bg-white-100 max-h-full w-3/12 flex flex-col gap-5 p-4 modal-background modal  rounded-lg">
//           <div className="flex justify-between items-center text-primary-100 text-2xl font-medium">
//             <div>Share</div>
//             <IoClose onClick={handleClose} className="cursor-pointer" />
//           </div>
//           <Formik
//             initialValues={{ name: "", description: "" }}
//             validationSchema={validationSchema}
//             onSubmit={sendBulkMessage}
//           >
//             {({ touched, errors, setFieldTouched }) => (
//               <Form className="flex flex-col gap-5">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block mb-2 text-sm font-medium text-gray-900"
//                   >
//                     Name
//                   </label>
//                   <Field
//                     type="text"
//                     name="name"
//                     className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
//                       touched.name && errors.name
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     }`}
//                     placeholder="Name"
//                     onBlur={() => setFieldTouched("name")}
//                   />
//                   <ErrorMessage
//                     name="name"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="description"
//                     className="block mb-2 text-sm font-medium text-gray-900"
//                   >
//                     Description
//                   </label>
//                   <Field
//                     rows="4"
//                     id="description"
//                     name="description"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
//                     placeholder="Description"
//                   />
//                 </div>
//                 <div className="flex justify-end ">
//                   <button
//                     className="bg-primary-100 text-white-100 rounded px-4 py-2"
//                     // onClick={sendBulkMessage}
//                   >
//                     Send
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </>
//   )
// }

// export default SendMessage
// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
// })


// new code //
import React from "react"
import { IoClose } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { SEND_BULK_MESSAGE } from "../../redux/report/reportAction.jsx"
import { useParams } from "react-router-dom"
import { useUIContext } from "../../context/BasicProvider.jsx"
import { useReportMaster } from "../../redux/report/reportReducer.jsx"
import * as Yup from "yup"
import { ErrorMessage, Field, Form, Formik } from "formik"

const SendMessage = ({ handleClose, selectedItems, setSelectedItems }) => {
  const { id } = useParams()
  const { selectWabaid, businessid } = useUIContext()
  const { sendMessageModal } = useReportMaster()
  const dispatch = useDispatch()

  const sendBulkMessage = (values, { resetForm }) => {
    dispatch({
      type: SEND_BULK_MESSAGE,
      payload: {
        template_id: id,
        business_id: businessid,
        waba_id: selectWabaid,
        name: values.name,
        description: values.description,
        sheet_id: selectedItems,
        payload: {
          message: values.description,
        },
        from_user: "admin", // or any static fallback
      },
    })
    resetForm()
    setSelectedItems([])
  }

  return (
    <div className={`popup-modal flex ${sendMessageModal ? "modal-in" : "modal-out hidden"}`}>
      <div className="bg-white-100 max-h-full w-3/12 flex flex-col gap-5 p-4 modal-background modal rounded-lg">
        <div className="flex justify-between items-center text-primary-100 text-2xl font-medium">
          <div>Share</div>
          <IoClose onClick={handleClose} className="cursor-pointer" />
        </div>
        <Formik
          initialValues={{ name: "", description: "" }}
          validationSchema={validationSchema}
          onSubmit={sendBulkMessage}
        >
          {({ touched, errors, setFieldTouched }) => (
            <Form className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                    touched.name && errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Name"
                  onBlur={() => setFieldTouched("name")}
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Description"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-primary-100 text-white-100 rounded px-4 py-2">
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SendMessage

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
})
