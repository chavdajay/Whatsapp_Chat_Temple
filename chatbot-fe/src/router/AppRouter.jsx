import React, { Suspense, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Loader from "../component/global/Loader.jsx"
import Login from "../auth/Login.jsx"
import ChatIndex from "../component/chats/ChatIndex.jsx"
import Sidebar from "../appbar/Sidebar.jsx"
import WeeklyReportPage from "../component/report/WeeklyReportPage.js"
import DailyReportDetail from "../component/report/DailyReportDetail.js"

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  )

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/chats" replace />
              ) : (
                <Login setAuth={setIsAuthenticated} />
              )
            }
          />

          {isAuthenticated ? (
            <>
              <Route
                path="/chats"
                element={
                  <div className="flex h-screen overflow-hidden">
                    {/* Sidebar fixed width */}
                    <div className="w-[18rm] flex-shrink-0 h-full overflow-y-auto border-r">
                      <Sidebar />
                    </div>
                    {/* Main Chat Panel */}
                    <div className="w-[100%] h-full overflow-hidden">
                      <ChatIndex />
                    </div>
                  </div>
                }
              />

              <Route
                path="/weekly-report"
                element={
                  <div className="flex h-screen overflow-hidden">
                    <div className="w-[18rm] flex-shrink-0 h-full overflow-y-auto border-r">
                      <Sidebar />
                    </div>
                    <div className="w-[100%] h-full overflow-hidden">
                      <WeeklyReportPage />
                    </div>
                  </div>
                }
              />

              <Route
                path="/weekly-report/:date"
                element={
                  <div className="flex h-screen overflow-hidden">
                    <div className="w-[18rm] flex-shrink-0 h-full overflow-y-auto border-r">
                      <Sidebar />
                    </div>
                    <div className="w-[100%] h-full overflow-hidden">
                      <DailyReportDetail />
                    </div>
                  </div>
                }
              />

              <Route path="/" element={<Navigate to="/chats" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
