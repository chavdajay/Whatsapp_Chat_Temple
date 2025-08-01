import React, { useState } from "react"
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import { RiDashboardLine } from "react-icons/ri"
import { ActionBtnOption } from "../../data/Mockdata.jsx"
import { IoMdClose } from "react-icons/io"

export const BtnComponent = ({ onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    actionType: false,
    urlType: false,
  })
  const [actionType, setActionType] = useState("Visit Website")
  const [urlType, setUrlType] = useState("Static")

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }))
  }

  const handleActionSelect = (option) => {
    setActionType(option)
    setIsDropdownOpen((prev) => ({ ...prev, actionType: false }))
  }

  const handleUrlSelect = (type) => {
    setUrlType(type)
    setIsDropdownOpen((prev) => ({ ...prev, urlType: false }))
  }

  return (
    <div className="flex gap-4 items-center w-full">
      <div className="flex justify-between items-center w-full mb-3">
        <div className="flex justify-between items-center gap-3">
          <div className="text-3xl text-grey_font-100">
            <RiDashboardLine />
          </div>
          <div className="relative flex flex-col">
            <div>Type Of Action</div>
            <button
              id="dropdownRadioButton"
              onClick={() => toggleDropdown("actionType")}
              onKeyDown={(e) => e.key === "Enter" && toggleDropdown("actionType")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex justify-between h-10 items-center px-2 w-[12rem]"
              type="button"
              aria-expanded={isDropdownOpen.actionType}
              aria-controls="dropdownActionType"
            >
              {actionType}
              {isDropdownOpen.actionType ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>

            {isDropdownOpen.actionType && (
              <div
                id="dropdownActionType"
                className="absolute bottom-full left-0 mb-2 z-20 w-48 bg-white-100 divide-y divide-gray-100 rounded-lg shadow-lg"
              >
                <ul className="p-3 space-y-3 text-sm text-gray-700">
                  {ActionBtnOption.map((item) => (
                    <li key={item.id}>
                      <div
                        className="flex flex-col cursor-pointer p-2 rounded hover:bg-gray-100"
                        onClick={() => handleActionSelect(item.option)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleActionSelect(item.option)
                        }
                        role="option"
                        tabIndex="0"
                        aria-selected={actionType === item.option}
                      >
                        <p className="font-medium">{item.option}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div>Button Text</div>
            <input
              type="text"
              id="btn-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-[12rem]"
              placeholder="Visit Website"
            />
          </div>

          <div className="relative flex flex-col">
            <div>Type Of URL</div>
            <button
              id="dropdownUrlType"
              onClick={() => toggleDropdown("urlType")}
              onKeyDown={(e) => e.key === "Enter" && toggleDropdown("urlType")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex justify-between h-10 items-center px-2 w-[12rem]"
              type="button"
              aria-expanded={isDropdownOpen.urlType}
              aria-controls="dropdownUrlType"
            >
              {urlType}
              {isDropdownOpen.urlType ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>

            {isDropdownOpen.urlType && (
              <div
                id="dropdownUrlType"
                className="absolute bottom-full left-0 mb-2 z-20 w-48 bg-white-100 divide-y divide-gray-100 rounded-lg shadow-lg"
              >
                <ul className="p-3 space-y-3 text-sm text-gray-700">
                  <li>
                    <div
                      className="flex flex-col cursor-pointer p-2 rounded hover:bg-gray-100"
                      onClick={() => handleUrlSelect("Static")}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleUrlSelect("Static")
                      }
                      role="option"
                      tabIndex="0"
                      aria-selected={urlType === "Static"}
                    >
                      <p className="font-medium">Static URL</p>
                    </div>
                  </li>
                  <li>
                    <div
                      className="flex flex-col cursor-pointer p-2 rounded hover:bg-gray-100"
                      onClick={() => handleUrlSelect("Dynamic")}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleUrlSelect("Dynamic")
                      }
                      role="option"
                      tabIndex="0"
                      aria-selected={urlType === "Dynamic"}
                    >
                      <p className="font-medium">Dynamic URL</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative flex flex-col">
            <div>URL</div>
            <input
              type="text"
              id="url"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-[12rem]"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          onKeyDown={(e) => e.key === "Enter" && onClose()}
          className="p-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <IoMdClose size={20} />
        </button>
      </div>
    </div>
  )
}

// export const CustomBtnComponent = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState({
//     addWebType: false,
//     actionType: false,
//   })
//   const [actionType, setActionType] = useState("Visit Website")

//   const toggleDropdown = (dropdown) => {
//     setIsDropdownOpen((prev) => ({
//       ...prev,
//       [dropdown]: !prev[dropdown],
//     }))
//   }

//   const handleActionSelect = (type) => {
//     setActionType(type)
//     setIsDropdownOpen((prev) => ({ ...prev, actionType: false }))
//   }

//   return (
//     <>
//       <div className="flex gap-4 items-center ">
//         <div className="text-3xl text-grey_font-100">
//           <RiDashboardLine />
//         </div>
//         <div className="relative flex flex-col w-[11rem]">
//           <div>Type Of Action</div>
//           <button
//             id="dropdownRadioButton"
//             onClick={() => toggleDropdown("actionType")}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex justify-between h-10 items-center px-2 w-full"
//             type="button"
//           >
//             {actionType}
//             {isDropdownOpen.actionType ? <IoIosArrowUp /> : <IoIosArrowDown />}
//           </button>

//           {isDropdownOpen.actionType && (
//             <div
//               id="dropdownDefaultRadio"
//               className="absolute bottom-full left-0 mb-2 z-20 w-48 bg-white-100 divide-y divide-gray-100 rounded-lg shadow-lg"
//             >
//               <ul
//                 className="p-3 space-y-3 text-sm text-gray-700"
//                 aria-labelledby="dropdownRadioButton"
//               >
//                 <li>
//                   <div
//                     className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-100"
//                     onClick={() => handleActionSelect("Visit Website")}
//                     onKeyDown={(e) =>
//                       e.key === "Enter" && handleActionSelect("Visit Website")
//                     }
//                     role="option"
//                     tabIndex="0"
//                     aria-selected={actionType === "Visit Website"}
//                   >
//                     <input
//                       type="radio"
//                       checked={actionType === "Visit Website"}
//                       readOnly
//                       className="mr-2"
//                     />
//                     <span>Visit Website</span>
//                   </div>
//                 </li>
//                 <li>
//                   <div
//                     className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-100"
//                     onClick={() => handleActionSelect("Default Action")}
//                     onKeyDown={(e) =>
//                       e.key === "Enter" && handleActionSelect("Default Action")
//                     }
//                     role="option"
//                     tabIndex="0"
//                     aria-selected={actionType === "Default Action"}
//                   >
//                     <input
//                       type="radio"
//                       checked={actionType === "Default Action"}
//                       readOnly
//                       className="mr-2"
//                     />
//                     <span>Default Action</span>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <div>Button Text</div>
//           <input
//             type="text"
//             id="btn-name"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//             placeholder="Visit Website"
//           />
//         </div>
//         <div className="flex flex-col">
//           <div>Offer Code</div>
//           <input
//             type="text"
//             id="btn-name"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//             placeholder="Visit Website"
//           />
//         </div>
//       </div>
//     </>
//   )
// }
