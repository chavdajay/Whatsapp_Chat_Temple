import React, { useEffect, useRef, useState } from "react"
import { TitleHeader } from "../global/TitleHeader.jsx"
import UserProfile from "../global/UserProfile.jsx"
import { FiDownload } from "react-icons/fi"
import { Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  DOWNLOAD_SUMMARY_PDF,
  FETCH_SUMMARY_DATA,
} from "../../redux/report/reportAction.jsx"
import { useReportMaster } from "../../redux/report/reportReducer.jsx"
import { MdDone, MdDoneAll, MdClose } from "react-icons/md"
import { GoDotFill } from "react-icons/go"
import CircleProgress from "../global/CircleProgress.jsx"
import moment from "moment"
import { FaFilePdf } from "react-icons/fa6"
import { ImFileExcel } from "react-icons/im"
import { TruncateChar } from "../../utils/Truncate.jsx"
import { MdOutlineKeyboardArrowRight } from "react-icons/md"

const SummaryReport = ({ summaryData }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
        <div className="bg-white-100 p-2 flex justify-between items-center rounded-xl shadow-sm">
          <div className="flex gap-6 items-center">
            <div className="bg-light-200 p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 45 45"
                fill="none"
              >
                <g clipPath="url(#clip0_1182_4336)">
                  <path
                    d="M16.4559 32.4676V40.9223C16.4573 41.2097 16.5491 41.4893 16.7182 41.7216C16.8874 41.9538 17.1253 42.127 17.3984 42.2166C17.6714 42.3061 17.9657 42.3074 18.2395 42.2204C18.5134 42.1334 18.7529 41.9624 18.9242 41.7317L23.8697 35.0015L16.4559 32.4676ZM43.6812 0.615826C43.4758 0.469543 43.2339 0.382926 42.9823 0.365553C42.7307 0.348181 42.4793 0.400729 42.2557 0.517388L1.24006 21.9367C1.00406 22.0614 0.80962 22.2523 0.680585 22.486C0.551551 22.7196 0.493539 22.9859 0.513671 23.252C0.533802 23.5182 0.631201 23.7727 0.793913 23.9843C0.956626 24.1959 1.17757 24.3554 1.42964 24.4432L12.832 28.3406L37.1151 7.57754L18.3244 30.2163L37.4341 36.7479C37.6237 36.8116 37.8249 36.833 38.0237 36.8108C38.2225 36.7886 38.4141 36.7232 38.585 36.6192C38.7558 36.5151 38.9019 36.375 39.0129 36.2087C39.124 36.0423 39.1973 35.8536 39.2278 35.6559L44.2408 1.93197C44.2779 1.68232 44.2453 1.42728 44.1466 1.19501C44.0478 0.962743 43.8867 0.7623 43.6812 0.615826Z"
                    fill="#F64E60"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1182_4336">
                    <rect
                      width="43.75"
                      height="43.75"
                      fill="white"
                      transform="translate(0.503906 0.362305)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <p className="text-white-200">Send</p>
              <p className="text-primary-100 font-bold text-xl">
                {summaryData?.data?.send}
              </p>
            </div>
          </div>
          <CircleProgress
            percentage={summaryData?.data?.send}
            strokeWidth={4}
            secondaryColor="#f0f0f0"
            primaryColor={["#F64E60", "#F64E60"]}
            width="70"
          />
        </div>
        <div className="bg-white-100 p-2 flex justify-between items-center rounded-xl shadow-sm">
          <div className="flex gap-6 items-center">
            <div className="bg-light-300 p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 46 45"
                fill="none"
              >
                <path
                  d="M19.7252 31.1665C19.7252 24.3313 25.4322 18.7707 32.4473 18.7707C34.3159 18.7707 36.0858 19.1754 37.6858 19.8834V12.9373L42.69 6.66869C42.8178 6.50814 42.8968 6.31591 42.918 6.11381C42.9393 5.91172 42.902 5.70786 42.8104 5.52538C42.7187 5.34291 42.5764 5.18913 42.3995 5.0815C42.2227 4.97387 42.0184 4.91671 41.8099 4.9165H7.00319C6.20928 4.9165 5.44789 5.22379 4.88652 5.77078C4.32514 6.31776 4.00977 7.05962 4.00977 7.83317V36.2707C4.00977 37.0442 4.32514 37.7861 4.88652 38.3331C5.44789 38.88 6.20928 39.1873 7.00319 39.1873H22.765C20.8026 36.9524 19.7245 34.1078 19.7252 31.1665Z"
                  fill="#FBC105"
                />
                <path
                  d="M32.4477 20.9583C26.6614 20.9583 21.9707 25.5287 21.9707 31.1666C21.9707 36.8045 26.6614 41.3749 32.4477 41.3749C38.234 41.3749 42.9247 36.8045 42.9247 31.1666C42.9247 25.5287 38.234 20.9583 32.4477 20.9583ZM31.6993 36.8745L26.151 31.4685L28.2674 29.4064L31.6993 32.7503L37.3763 27.2189L39.4927 29.281L31.6993 36.8745Z"
                  fill="#FBC105"
                />
              </svg>
            </div>
            <div>
              <p className="text-white-200 text-base lg:text-xs xl:text-base">
                Delivered
              </p>
              <p className="text-primary-100 font-bold text-xl">
                {summaryData?.data?.delivered}
              </p>
            </div>
          </div>
          <CircleProgress
            percentage={summaryData?.data?.delivered}
            strokeWidth={4}
            secondaryColor="#f0f0f0"
            primaryColor={["#FBC105", "#FBC105"]}
            width="70"
          />
        </div>
        <div className="bg-white-100 p-2 flex justify-between items-center rounded-xl shadow-sm">
          <div className="flex gap-6 items-center">
            <div className="bg-black-400 p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <path
                  d="M22.024 13.1034C23.2006 13.1031 24.3657 13.3348 25.4526 13.7853C26.5396 14.2359 27.527 14.8963 28.3585 15.7288C30.0383 17.4119 30.9817 19.6927 30.9815 22.0707C30.9815 27.0232 26.9711 31.035 22.0235 31.035C20.8468 31.0357 19.6816 30.8041 18.5946 30.3536C17.5075 29.9031 16.5201 29.2424 15.689 28.4095C14.0096 26.7274 13.0664 24.4476 13.0664 22.0707C13.0664 19.6907 14.0099 17.4093 15.689 15.7288C16.5205 14.8963 17.508 14.2358 18.595 13.7853C19.6821 13.3348 20.8473 13.1031 22.024 13.1034ZM22.024 8.96655C10.0515 8.96655 3.10938 18.7904 3.10938 22.0707C3.10938 25.35 10.0515 35.1713 22.024 35.1713C34.0003 35.1713 40.9395 25.35 40.9395 22.0707C40.9395 18.7909 34.0003 8.96655 22.024 8.96655Z"
                  fill="#543D8E"
                />
                <path
                  d="M27.584 22.0711C27.584 24.7524 25.6833 27.0586 23.0524 27.568C21.7764 27.8146 20.4544 27.6094 19.3132 26.9875C18.1721 26.3656 17.283 25.3658 16.7986 24.1599C16.3137 22.9535 16.2636 21.616 16.6569 20.3767C17.0502 19.1374 17.8623 18.0735 18.954 17.3674C20.0447 16.661 21.3477 16.3569 22.6384 16.5077C23.9292 16.6584 25.1269 17.2545 26.0255 18.1933L21.9893 22.0715L27.584 22.0711Z"
                  fill="#543D8E"
                />
              </svg>
            </div>
            <div>
              <p className="text-white-200">Seen</p>
              <p className="text-primary-100 font-bold text-xl">
                {" "}
                {summaryData?.data?.seen}
              </p>
            </div>
          </div>
          <CircleProgress
            percentage={summaryData?.data?.seen}
            strokeWidth={4}
            secondaryColor="#f0f0f0"
            primaryColor={["#543D8E", "#543D8E"]}
            width="70"
          />
        </div>
        <div className="bg-white-100 p-2 flex justify-between items-center rounded-xl shadow-sm">
          <div className="flex gap-6 items-center">
            <div className="bg-light-400 p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="45"
                viewBox="0 0 44 45"
                fill="none"
              >
                <g clipPath="url(#clip0_1182_4372)">
                  <path
                    d="M11.8777 22.4227L-0.0703125 31.53V12.9955C-0.0700959 12.8405 -0.0518403 12.686 -0.0159143 12.5352L11.8777 22.4227ZM32.4821 15.3036L24.2756 22.1262C24.2669 22.1327 24.2587 22.1398 24.25 22.1474L19.7633 25.8769C19.4785 26.1139 19.1198 26.2437 18.7493 26.2437C18.3788 26.2437 18.0201 26.1139 17.7353 25.8769L13.118 22.0392C13.1071 22.0294 13.0962 22.0201 13.0848 22.0114L0.51882 11.567C0.706384 11.3776 0.929771 11.2274 1.17596 11.1252C1.42215 11.0231 1.68621 10.9709 1.95276 10.9718H30.6206C30.7385 12.5835 31.394 14.1089 32.4821 15.3036ZM37.2958 17.6579V31.5295L25.4914 22.5304L33.2796 16.057C34.423 16.989 35.8248 17.5478 37.2958 17.6579ZM37.8398 4.28467C36.6228 4.28456 35.4332 4.64534 34.4212 5.32137C33.4093 5.9974 32.6206 6.95833 32.1548 8.08263C31.689 9.20693 31.5671 10.4441 31.8044 11.6377C32.0418 12.8313 32.6278 13.9277 33.4882 14.7883C34.3487 15.6488 35.4451 16.2349 36.6387 16.4724C37.8322 16.7098 39.0694 16.588 40.1938 16.1223C41.3181 15.6566 42.2791 14.868 42.9552 13.8561C43.6314 12.8443 43.9922 11.6546 43.9922 10.4376C43.9922 8.80587 43.344 7.24092 42.1903 6.08703C41.0365 4.93313 39.4716 4.28481 37.8398 4.28467ZM39.1698 13.546C39.1698 13.7407 39.0925 13.9275 38.9547 14.0652C38.817 14.203 38.6302 14.2803 38.4355 14.2803C38.2407 14.2803 38.0539 14.203 37.9162 14.0652C37.7785 13.9275 37.7011 13.7407 37.7011 13.546V8.72791C37.3208 9.05384 36.8923 9.31882 36.4309 9.51342C36.2501 9.58599 36.0479 9.58378 35.8688 9.50726C35.6896 9.43075 35.5482 9.28621 35.4756 9.10544C35.4031 8.92466 35.4053 8.72246 35.4818 8.54332C35.5583 8.36418 35.7029 8.22277 35.8836 8.1502C36.1665 8.03434 36.952 7.61112 37.1892 7.04375C37.2454 6.91054 37.3396 6.79686 37.4601 6.71694C37.5805 6.63701 37.7219 6.5944 37.8665 6.59442H38.436C38.6308 6.59442 38.8176 6.67179 38.9553 6.80951C39.093 6.94723 39.1704 7.13402 39.1704 7.32879L39.1698 13.546Z"
                    fill="#27C68F"
                  />
                  <path
                    d="M24.6297 23.2445L20.4563 26.7135C19.9761 27.1127 19.3713 27.3313 18.7468 27.3313C18.1223 27.3313 17.5175 27.1127 17.0373 26.7135L12.7339 23.1362L-0.0507812 32.8838C0.020501 33.364 0.261787 33.8026 0.629177 34.1199C0.996567 34.4372 1.46565 34.612 1.95107 34.6126H35.2694C35.7549 34.6122 36.2242 34.4374 36.5917 34.1201C36.9592 33.8028 37.2005 33.3641 37.2718 32.8838L24.6297 23.2445ZM24.5437 31.513H12.6773C12.533 31.513 12.3947 31.4557 12.2927 31.3537C12.1906 31.2517 12.1333 31.1133 12.1333 30.969C12.1333 30.8248 12.1906 30.6864 12.2927 30.5844C12.3947 30.4824 12.533 30.425 12.6773 30.425H24.5437C24.688 30.425 24.8264 30.4824 24.9284 30.5844C25.0304 30.6864 25.0877 30.8248 25.0877 30.969C25.0877 31.1133 25.0304 31.2517 24.9284 31.3537C24.8264 31.4557 24.688 31.513 24.5437 31.513Z"
                    fill="#27C68F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1182_4372">
                    <rect
                      width="43.75"
                      height="43.75"
                      fill="white"
                      transform="translate(0.0859375 0.54126)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <p className="text-white-200 text-base lg:text-xs xl:text-base">
                Responsed
              </p>
              <p className="text-primary-100 font-bold text-xl">6822</p>
            </div>
          </div>
          <CircleProgress
            percentage={70}
            strokeWidth={4}
            secondaryColor="#f0f0f0"
            primaryColor={["#27C68F", "#27C68F"]}
            width="70"
          />
        </div>
      </div>
    </>
  )
}

const SummaryTable = ({ data }) => {
  return (
    <>
      <div className="overflow-x-auto max-h-[60vh]">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-primary-100 text-white-100 border-b sticky top-0 z-10">
            <tr>
              <th className="py-4">User</th>
              <th>Mobile Number</th>
              <th>Send</th>
              <th>Delivered</th>
              <th>Seen</th>
              <th>Received</th>
              <th>Event</th>
              <th>Sended At</th>
              <th>Delivered At</th>
              <th>Seen At</th>
              <th>Error Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.length > 0 ? (
              data.map((value, index) => (
                <tr
                  className={`text-center ${index % 2 === 0 ? "bg-[#F7F9FC]" : "bg-white-100"} text-primary-200 `}
                  key={index}
                >
                  <td className="py-6 px-2 whitespace-nowrap">{value?.user}</td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    {value?.contactNo}
                  </td>
                  <td className="px-2 whitespace-nowrap">
                    {" "}
                    {value?.send === true ? (
                      <p className=" flex justify-center items-center ">
                        <p className="bg-gray-100 text-gray-800 text-sm font-medium rounded-lg flex justify-center items-center gap-2 py-1 px-2">
                          <MdDone /> send
                        </p>
                      </p>
                    ) : (
                      <p className=" flex justify-center items-center ">
                        <p className="bg-light-200 text-red-100 text-sm font-medium rounded-lg flex justify-center items-center gap-1 py-1 px-2">
                          <MdClose /> Send
                        </p>
                      </p>
                    )}
                  </td>
                  <td className="px-2 whitespace-nowrap">
                    {value?.delivered === true ? (
                      <p className=" flex justify-center items-center ">
                        <p className="bg-gray-100 text-gray-800 text-sm font-medium rounded-lg flex justify-center items-center gap-2 py-1 px-2">
                          <MdDoneAll /> Delivered
                        </p>
                      </p>
                    ) : (
                      <p className=" flex justify-center items-center ">
                        <p className="bg-light-200 text-red-100 text-sm font-medium rounded-lg flex justify-center items-center gap-2 py-1 px-2">
                          <MdClose /> Delivered
                        </p>
                      </p>
                    )}
                  </td>
                  <td className="px-2 whitespace-nowrap">
                    {value?.seen === true ? (
                      <p className=" flex justify-center items-center ">
                        <p className="bg-blue-100 text-blue-800 text-sm font-medium rounded-lg flex justify-center items-center gap-2 py-1 px-2">
                          <MdDoneAll /> Seen
                        </p>
                      </p>
                    ) : (
                      <p className=" flex justify-center items-center ">
                        <p className="bg-light-200 text-red-100 text-sm font-medium rounded-lg flex justify-center items-center gap-2 py-1 px-2">
                          <MdClose /> Seen
                        </p>
                      </p>
                    )}
                  </td>
                  <td className="px-2 whitespace-nowrap">
                    {value?.received === true ? (
                      <p className=" flex justify-center items-center ">
                        <p className=" text-[#49CB6F] text-sm font-medium rounded-lg flex justify-center items-center gap-2 py-1 px-2">
                          <GoDotFill /> Active
                        </p>
                      </p>
                    ) : (
                      <p className=" flex justify-center items-center ">
                        <p className=" text-red-100 text-sm font-medium rounded-lg flex justify-center items-center gap-2 py-1 px-2">
                          <GoDotFill /> Block
                        </p>
                      </p>
                    )}
                  </td>
                  <td className="px-2 whitespace-nowrap">bnjnjjkjkjk</td>
                  <td className="px-2 whitespace-nowrap">
                    {value?.sended_at === null
                      ? "-"
                      : moment(value?.sended_at).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td className="px-2 whitespace-nowrap">
                    {value?.delivered_at === null
                      ? "-"
                      : moment(value?.delivered_at).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td className="px-2 whitespace-nowrap">
                    {value?.seen_at === null
                      ? "-"
                      : moment(value?.seen_at).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td className="px-2 whitespace-nowrap">
                    {value?.error_message && TruncateChar(value?.template_name, 10)}
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
    </>
  )
}
const Summary = () => {
  const { id, params } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const { summaryData, templateObjectData } = useReportMaster()
  useEffect(() => {
    dispatch({ type: FETCH_SUMMARY_DATA, payload: id, params: params })
  }, [])
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])
  const hnadleDownloadSummary = (id, params) => {
    dispatch({ type: DOWNLOAD_SUMMARY_PDF, payload: id, params: params })
    setMenuOpen(false)
  }
  return (
    <>
      <div className="px-4 md:px-8 pt-5 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 capitalize">
              <Link to={`/reports/${templateObjectData?.data?.id}`}>
                {templateObjectData?.data?.name}
              </Link>{" "}
              <MdOutlineKeyboardArrowRight />
              <TitleHeader title={summaryData?.data?.name} />
            </div>
            <p className="text-primary-200">{summaryData?.data?.description}</p>
          </div>
          <UserProfile />
        </div>
        <SummaryReport summaryData={summaryData} />
        <div className="w-full bg-white-100 2xl:h-[75vh] xl:h-[60vh] lg:h-[30vh]">
          <div className="flex justify-end gap-5 items-center py-3 pr-6">
            <button
              className="border-2 border-black-200 rounded-md p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              ref={menuRef}
            >
              <FiDownload />
            </button>
            {menuOpen && (
              <div
                className="absolute mt-32 mr-36 w-32 rounded-md shadow-lg bg-white-100 divide-y divide-gray-100"
                style={{ zIndex: 9999 }}
              >
                <div className="py-1">
                  <button
                    className="flex gap-3 items-center px-4 py-2 text-sm text-primary-100 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => hnadleDownloadSummary(id, "pdf")}
                  >
                    Download <FaFilePdf />
                  </button>
                  <button
                    className="flex gap-3 items-center px-4 py-2 text-sm text-primary-100 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => hnadleDownloadSummary(id, "xls")}
                  >
                    Download <ImFileExcel />
                  </button>
                </div>
              </div>
            )}
            <div className="border-2 border-black-200 rounded-md p-2 text-xs w-[9rem] ">
              <input
                type="date"
                value={moment(new Date()).format("YYYY-MM-DD")}
                // onChange={onDateChange}
                className="outline-none"
              />
            </div>
          </div>
          <SummaryTable data={summaryData?.data?.record} />
        </div>
      </div>
    </>
  )
}

export default Summary
