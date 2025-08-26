import React, { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../config/Api.jsx"
import { useNavigate } from "react-router-dom"

const mainCities = ["Vadodara", "Kundal", "Trust", "Other"]

const WeeklyReportPage = () => {
  const [reportData, setReportData] = useState({})
  const [cityCounts, setCityCounts] = useState({})
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedCity, setSelectedCity] = useState("Vadodara")
  const navigate = useNavigate()

  const fetchReport = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/report/weekly`, {
        params: { startDate, endDate },
      })
      if (res.data.success) {
        setReportData(res.data.data || {})
        setCityCounts(res.data.cityCounts || {})
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchReport()
  }, [startDate, endDate])

  const sortedDates = Object.keys(reportData).sort((a, b) => b.localeCompare(a))

  const totalCityCounts = mainCities.reduce((acc, city) => {
    let rasoi = 0,
      pavti = 0,
      payout = 0,
      error = 0
    Object.keys(cityCounts).forEach((date) => {
      const counts = cityCounts[date]?.[city] || {
        rasoi: 0,
        pavti: 0,
        payout: 0,
        error: 0,
      }
      rasoi += counts.rasoi
      pavti += counts.pavti
      payout += counts.payout
      error += counts.error
    })
    acc[city] = { rasoi, pavti, payout, error }
    return acc
  }, {})

  return (
    <div className="p-6">
      {/* Date Filter */}
      <div className="flex gap-4 mb-6 flex-wrap items-end">
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
        <button
          onClick={() => {
            setStartDate("")
            setEndDate("")
          }}
          className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* City Selector */}
      <div className="flex gap-3 mb-4">
        {mainCities.map((city) => {
          const cityTotal = totalCityCounts[city] || {
            rasoi: 0,
            pavti: 0,
            payout: 0,
            error: 0,
          }
          const total =
            cityTotal.rasoi + cityTotal.pavti + cityTotal.payout + cityTotal.error
          return (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1 rounded ${selectedCity === city ? "bg-blue-600 text-white" : "bg-gray-100"}`}
            >
              {city} ({total})
            </button>
          )
        })}
      </div>

      {/* Report Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {sortedDates.map((date) => {
          const counts = cityCounts[date]?.[selectedCity] || {
            rasoi: 0,
            pavti: 0,
            payout: 0,
            error: 0,
          }
          const totalMessages = reportData[date]?.length || 0
          return (
            <div
              key={date}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/weekly-report/${date}?city=${selectedCity}`)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                navigate(`/weekly-report/${date}?city=${selectedCity}`)
              }
              className="border p-4 rounded shadow hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <h2 className="text-lg font-bold mb-2">📅 {date}</h2>
              <p>🍛 Rasoi: {counts.rasoi}</p>
              <p>🧾 Pavti: {counts.pavti}</p>
              <p>💸 Payout: {counts.payout}</p>
              <p>❌ Error: {counts.error}</p>
              <p className="text-xs text-gray-500 mt-2">
                Total Messages: {totalMessages}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeeklyReportPage
