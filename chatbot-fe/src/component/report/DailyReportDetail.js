import React, { useEffect, useState } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom"
import { handleSuccess, handleError } from "../../utils/toastUtils"
import axiosInstance from "../../services/axios.config.jsx"
import { IoArrowBack } from "react-icons/io5"

const mainCities = ["Vadodara", "Kundal", "Trust", "Other"]

const tabClass = (isActive) =>
  `px-4 py-1.5 rounded-full text-sm font-semibold transition duration-200 border ${
    isActive
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-white text-blue-600 border-blue-600"
  }`

const DailyReportDetail = () => {
  const { date } = useParams()
  const [searchParams] = useSearchParams()
  const selectedCity = searchParams.get("city") || "Vadodara" // 📌 City from Weekly page
  const [data, setData] = useState([])
  const [type, setType] = useState(searchParams.get("type") || "all")
  const [resendingId, setResendingId] = useState(null)

  const fetchReport = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/report/weekly/${date}`)
      if (res.data.success) setData(res.data.data)
    } catch (err) {
      console.error("Daily report fetch failed:", err)
    }
  }

  useEffect(() => {
    axiosInstance
      .get(`/report/weekly/${date}`)
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
    setResendingId(msg._id)
    try {
      const res = await axiosInstance.post("/messages/send/number", {
        contactNo: msg.mobileNumber,
        message: msg.message,
        originalMessageId: msg._id,
      })
      if (res.data.message) {
        handleSuccess("Resent successfully")
        setData((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, isError: false } : m))
        )
      }
    } catch (error) {
      handleError("Resend failed")
      console.error("Resend error:", error)
    } finally {
      setResendingId(null)
    }
  }

  const renderStatus = (msg, label, color, condition) => {
    if (!condition) return null
    return (
      <p className={`text-sm font-medium ${color}`}>
        {label}:{" "}
        {msg.isError ? (
          <>
            ❌
            <button
              disabled={resendingId === msg._id}
              className={`ml-2 px-3 py-1 text-xs rounded ${
                resendingId === msg._id
                  ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                  : "bg-red-100 text-red-800 hover:bg-red-200"
              }`}
              onClick={() => handleResend(msg)}
            >
              {resendingId === msg._id ? "Resending..." : "Resend"}
            </button>
          </>
        ) : (
          "✅"
        )}
      </p>
    )
  }

  // ✅ Filter data only by type AND selected city from Weekly page
  const filteredData = data.filter((msg) => {
    const typeMatch =
      type === "all"
        ? msg.isRasoi || msg.isPavti || msg.isPayoutMsg
        : type === "rasoi"
          ? msg.isRasoi
          : type === "pavti"
            ? msg.isPavti
            : msg.isPayoutMsg

    const cityMatch =
      selectedCity === "Other"
        ? !mainCities.slice(0, 3).includes(msg.rasoiPlace)
        : msg.rasoiPlace === selectedCity

    return typeMatch && cityMatch
  })

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 🔙 Back Button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Link
          to="/weekly-report"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
        >
          <IoArrowBack size={18} />
          Back
        </Link>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          📅 Report for <span className="text-blue-600">{date}</span> |{" "}
          <span className="text-green-600">{selectedCity}</span>
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-4">
        {["all", "rasoi", "payout", "pavti"].map((key) => (
          <button
            key={key}
            onClick={() => setType(key)}
            className={tabClass(type === key)}
          >
            {key === "all"
              ? "All"
              : key === "rasoi"
                ? "Rasoi"
                : key === "pavti"
                  ? "Pavti"
                  : "Payout"}
          </button>
        ))}
      </div>

      {filteredData.length === 0 ? (
        <p className="text-gray-500">No messages found for selected type/city.</p>
      ) : (
        <div className="h-[70vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.map((msg, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-4 border shadow-md transition ${
                  msg.isError
                    ? "bg-red-50 border-red-300"
                    : "bg-white border-gray-200"
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

                <div className="mt-2 space-y-1">
                  {renderStatus(msg, "🍛 Rasoi", "text-amber-600", msg.isRasoi)}
                  {renderStatus(msg, "🧾 Pavti", "text-emerald-600", msg.isPavti)}
                  {renderStatus(msg, "💸 Payout", "text-blue-600", msg.isPayoutMsg)}
                </div>

                {msg.isError && (
                  <p className="text-xs mt-3 text-red-600 italic">
                    ❗ Message failed. You can try resending.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        //new data
      )}
    </div>
  )
}

export default DailyReportDetail
