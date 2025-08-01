import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const WeeklyReportPage = () => {
  const [reportData, setReportData] = useState({})
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const navigate = useNavigate()

  const fetchReport = async () => {
    try {
      const res = await axios.get("http://65.1.102.134:13738/api/report/weekly", {
        params: {
          startDate,
          endDate,
        },
      })

      if (res.data.success) {
        setReportData(res.data.data)
      }
    } catch (err) {
      console.error("Report fetch failed:", err)
    }
  }

  useEffect(() => {
    fetchReport()
  }, [startDate, endDate])

  const sortedDates = Object.keys(reportData).sort((a, b) => b.localeCompare(a))

  return (
    <div className="p-6">
      {/* 🔹 Date Range Filter */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div>
          <label htmlFor="start-date" className="text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-1 block"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-1 block"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={() => {
              setStartDate("")
              setEndDate("")
            }}
            className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 🔹 Report Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {sortedDates.map((date) => {
          const dailyData = reportData[date]
          const rasoiMessages = dailyData.filter((msg) => msg.isRasoi)
          const pavtiMessages = dailyData.filter((msg) => msg.isPavti)

          const successfulRasoi = rasoiMessages.filter((msg) => !msg.isError).length
          const totalRasoi = rasoiMessages.length

          const successfulPavti = pavtiMessages.filter((msg) => !msg.isError).length
          const totalPavti = pavtiMessages.length

          return (
            <div
              key={date}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/weekly-report/${date}`)}
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`/weekly-report/${date}`)
              }
              className="border p-4 rounded shadow hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <h2 className="text-lg font-bold mb-2">📅 {date}</h2>
              <p>
                🍛 Rasoi Success: {successfulRasoi}/{totalRasoi}
              </p>
              <p>
                🧾 Pavti Success: {successfulPavti}/{totalPavti}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Total: {dailyData.length} Messages
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeeklyReportPage
