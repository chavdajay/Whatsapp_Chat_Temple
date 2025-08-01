import React from "react"

const Tooltip = ({ text, children, width }) => {
  return (
    <div className="relative inline-block">
      <div className="group">
        {children}
        <div
          className={`${width} text-wrap opacity-0 invisible group-hover:opacity-100 group-hover:visible border bg-white-100 text-black-100 text-xs rounded-lg p-2 absolute z-10 top-full left-1/2 transform -translate-x-1/2 pointer-events-none whitespace-nowrap`}
        >
          {text}
        </div>
      </div>
    </div>
  )
}

export default Tooltip
