import React from "react"
import { HashLoader } from "react-spinners"

const Loader = () => {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black-100 bg-opacity-40 z-50 flex justify-center items-center ">
        <HashLoader color="#4C426D" loading size={75} />
      </div>
    </>
  )
}

export default Loader
