import React from "react"
import Sidebar from "./appbar/Sidebar.jsx"

const Main = ({ component }) => {
  const ComponentTorender = component
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 h-screen overflow-auto">
          <ComponentTorender />
        </main>
      </div>
    </>
  )
}

export default Main
