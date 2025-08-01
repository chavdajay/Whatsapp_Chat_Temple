import React, { useEffect, useRef, useState } from "react"
import { MdOutlineFileDownload } from "react-icons/md"
import { MdOutlineFileUpload } from "react-icons/md"
import { ImFileText2, ImFileExcel } from "react-icons/im"
import { AiOutlineEye } from "react-icons/ai"
import { FaFilePdf } from "react-icons/fa6"
import { FiSend } from "react-icons/fi"
import { useDispatch } from "react-redux"
import {
  DOWNLOAD_SUMMARY_PDF,
  FETCH_REPORT_REQUEST,
} from "../../redux/report/reportAction.jsx"
import { Link, useParams } from "react-router-dom"
import { useReportMaster } from "../../redux/report/reportReducer.jsx"
import moment from "moment"
import { SlCalender } from "react-icons/sl"
import { DatePicker, Space } from "antd"
import dayjs from "dayjs"
import { IoIosArrowDown } from "react-icons/io"

const { RangePicker } = DatePicker

export const ReportCards = ({ value }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const dispatch = useDispatch()

  const handleDownloadSummary = (id, params) => {
    dispatch({ type: DOWNLOAD_SUMMARY_PDF, payload: id, params: params })
    setMenuOpen(false)
  }

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

  return (
    <div className="bg-white-500 rounded-md border border-black-200 flex flex-col gap-5">
      <div className="flex justify-between items-start p-5">
        <div>
          <p className="text-primary-100 font-bold text-xl">
            {value?.name?.length > 10 ? `${value.name.slice(0, 10)}...` : value.name}
          </p>
          <p className="text-[#363636]">
            {moment(value?.created_at).format("Do MMM YYYY")}
          </p>
        </div>
        <div className="flex justify-between gap-3 cursor-pointer">
          <Link to={`/summary/recode_id/${value.id}`}>
            <div className="rounded-full bg-orange-100 text-white-100 p-2 text-xl">
              <ImFileText2 />
            </div>
          </Link>
          <div className="relative inline-block">
            <button
              className="rounded-full bg-orange-100 text-white-100 p-2 text-xl"
              ref={menuRef}
              onClick={() => setMenuOpen(!menuOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setMenuOpen(!menuOpen)
                }
              }}
              aria-haspopup="true" // Indicates that this button opens a menu
              aria-expanded={menuOpen} // Indicates the state of the menu
            >
              <MdOutlineFileDownload />
            </button>

            {menuOpen && (
              <div
                className="absolute right-2 mt-2 w-32 rounded-md shadow-lg bg-white-100 divide-y divide-gray-100"
                style={{ zIndex: 9999 }}
              >
                <div className="py-1">
                  <button
                    className="flex gap-3 items-center px-4 py-2 text-sm text-primary-100 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => handleDownloadSummary(value?.id, "pdf")}
                  >
                    Download <FaFilePdf />
                  </button>
                  <button
                    className="flex gap-3 items-center px-4 py-2 text-sm text-primary-100 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => handleDownloadSummary(value?.id, "xls")}
                  >
                    Download <ImFileExcel />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <hr />
        <div className="rounded-md p-3 flex justify-around items-center text-icon_color-100 text-xl font-semibold">
          <div className="flex items-center gap-1.5">
            <AiOutlineEye />
            {value?.seen}
          </div>
          <div className="flex items-center gap-1.5">
            <FiSend />
            {value?.send}
          </div>
          <div className="flex items-center gap-1.5">
            <MdOutlineFileUpload />
            {value?.delivered}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getDateRangeShortcuts = () => {
  return [
    {
      label: "This Week",
      getValue: () => {
        const today = dayjs()
        return [today.startOf("week"), today.endOf("week")]
      },
    },
    {
      label: "Last Week",
      getValue: () => {
        const today = dayjs()
        const prevWeek = today.subtract(7, "day")
        return [prevWeek.startOf("week"), prevWeek.endOf("week")]
      },
    },
    {
      label: "Last 7 Days",
      getValue: () => {
        const today = dayjs()
        return [today.subtract(7, "day"), today]
      },
    },
    {
      label: "Current Month",
      getValue: () => {
        const today = dayjs()
        return [today.startOf("month"), today.endOf("month")]
      },
    },
    {
      label: "Next Month",
      getValue: () => {
        const today = dayjs()
        const startOfNextMonth = today.endOf("month").add(1, "day")
        return [startOfNextMonth, startOfNextMonth.endOf("month")]
      },
    },
    { label: "Reset", getValue: () => [null, null] },
  ]
}

const Report = () => {
  const dispatch = useDispatch()
  const { reportData } = useReportMaster()
  const { id } = useParams()

  const [selectedDateRange, setSelectedDateRange] = useState([null, null])
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  useEffect(() => {
    dispatch({ type: FETCH_REPORT_REQUEST, payload: id })
  }, [dispatch, id])

  const handleDateRangeChange = (dates) => {
    setSelectedDateRange(dates)
    setDatePickerOpen(false)
  }

  const formatSelectedDateRange = () => {
    if (selectedDateRange[0] && selectedDateRange[1]) {
      return `${selectedDateRange[0].format("MMM D, YYYY")} TO ${selectedDateRange[1].format("MMM D, YYYY")}`
    }
    return "Select Date Range"
  }

  return (
    <>
      <div className="bg-primary-100 text-white-100 p-4 rounded-t-lg flex flex-col gap-2">
        <p className="text-xl">Insights Hub</p>
        <button
          className="flex justify-between w-full"
          onClick={() => setDatePickerOpen(!datePickerOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setDatePickerOpen(!datePickerOpen)
            }
          }}
        >
          <div className="flex items-center bg-transparent border-0 cursor-pointer">
            <SlCalender />
            <span className="ml-2">{formatSelectedDateRange()}</span>
          </div>
          <IoIosArrowDown />
        </button>
        {datePickerOpen && (
          <Space direction="vertical" size={12}>
            <RangePicker
              presets={[
                {
                  label: <span aria-label="Last 7 Days">Last 7 Days</span>,
                  value: () => [dayjs().subtract(7, "d"), dayjs()],
                },
                {
                  label: <span aria-label="Last 30 Days">Last 30 Days</span>,
                  value: () => [dayjs().subtract(30, "d"), dayjs()],
                },
                {
                  label: <span aria-label="Last 90 Days">Last 90 Days</span>,
                  value: () => [dayjs().subtract(90, "d"), dayjs()],
                },
              ]}
              onChange={handleDateRangeChange}
            />
          </Space>
        )}
      </div>
      <div className="hover:overflow-auto overflow-hidden h-[74vh] flex flex-col gap-5 px-4">
        {reportData?.data?.length > 0 ? (
          reportData?.data?.map((value, index) => (
            <ReportCards key={index} value={value} />
          ))
        ) : (
          <p className="text-center">No Reports</p>
        )}
      </div>
    </>
  )
}

export default Report
