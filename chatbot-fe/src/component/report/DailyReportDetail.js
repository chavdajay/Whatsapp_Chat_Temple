import React, { useEffect, useState } from "react"
import { useParams, Link, useSearchParams } from "react-router-dom"
import { handleSuccess, handleError } from "../../utils/toastUtils"
import axios from "axios"
import { IoArrowBack } from "react-icons/io5"

// ✅ No hover styles now
const tabClass = (isActive) =>
  `px-4 py-1.5 rounded-full text-sm font-semibold transition duration-200 border ${
    isActive
      ? "bg-blue-600 text-white-100 border-blue-600"
      : "bg-white text-blue-600 border-blue-600"
  }`

const DailyReportDetail = () => {
  const { date } = useParams()
  const [searchParams] = useSearchParams()
  const [data, setData] = useState([])
  const [type, setType] = useState(searchParams.get("type") || "all")

  useEffect(() => {
    axios
      .get(`http://65.1.102.134:13738/api/report/weekly/${date}`)
      .then((res) => {
        if (res.data.success) {
          const all = res.data.data
          let filtered = all

          if (type === "rasoi") filtered = all.filter((msg) => msg.isRasoi)
          else if (type === "pavti") filtered = all.filter((msg) => msg.isPavti)
          else filtered = all.filter((msg) => msg.isRasoi || msg.isPavti)

          setData(filtered)
        }
      })
      .catch((err) => console.error("Daily report fetch failed:", err))
  }, [date, type])

  const handleResend = async (msg) => {
    try {
      const res = await axios.post(
        "http://65.1.102.134:13738/api/messages/send/number",
        {
          contactNo: msg.mobileNumber,
          message: msg.message,
          originalMessageId: msg._id,
        }
      )

      if (res.data.message) {
        handleSuccess("Resent successfully")
        setData((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, isError: false } : m))
        )
      }
    } catch (error) {
      handleError("Resend failed")
      console.error("Resend error:", error)
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 🔙 Back Button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Link
          to="/weekly-report"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg transition"
        >
          <IoArrowBack size={18} />
          Back
        </Link>

        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          📅 Report for <span className="text-blue-600">{date}</span>
        </h1>
      </div>

      {/* 🔘 Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["all", "rasoi", "pavti"].map((key) => (
          <button
            key={key}
            onClick={() => setType(key)}
            className={tabClass(type === key)}
          >
            {key === "all" ? "All" : key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* 🚫 No Messages */}
      {data.length === 0 ? (
        <p className="text-gray-500">No messages found for selected type.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.map((msg, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-4 border shadow-md transition ${
                msg.isError ? "bg-red-50 border-red-300" : "bg-white border-gray-200"
              }`}
            >
              <p className="text-sm text-gray-700">
                <strong>👤 Name:</strong> {msg.senderName || "Unknown"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>📱 Number:</strong> {msg.mobileNumber}
              </p>
              <p className="text-sm text-gray-700 break-words">
                <strong>💬 Message:</strong> {msg.message}
              </p>

              {/* Rasoi Status */}
              {msg.isRasoi && (
                <p className="mt-2 text-sm font-medium text-amber-600">
                  🍛 Rasoi:{" "}
                  {msg.isError ? (
                    <>
                      ❌
                      <button
                        className="ml-2 px-3 py-1 text-xs bg-red-100 text-red-800 rounded"
                        onClick={() => handleResend(msg)}
                      >
                        Resend
                      </button>
                    </>
                  ) : (
                    "✅"
                  )}
                </p>
              )}

              {/* Pavti Status */}
              {msg.isPavti && (
                <p className="text-sm font-medium text-emerald-600">
                  🧾 Pavti:{" "}
                  {msg.isError ? (
                    <>
                      ❌
                      <button
                        className="ml-2 px-3 py-1 text-xs bg-red-100 text-red-800 rounded"
                        onClick={() => handleResend(msg)}
                      >
                        Resend
                      </button>
                    </>
                  ) : (
                    "✅"
                  )}
                </p>
              )}

              {/* Error Note */}
              {msg.isError && (
                <p className="text-xs mt-3 text-red-600 italic">
                  ❗ Message failed. You can try resending.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DailyReportDetail
