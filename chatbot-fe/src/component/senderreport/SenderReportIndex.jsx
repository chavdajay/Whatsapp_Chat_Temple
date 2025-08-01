import React, { useEffect } from "react"
import Report from "./Report.jsx"
import SenderTable from "./SenderTable.jsx"
import Preview from "./Preview.jsx"
import { RiDeleteBin6Line } from "react-icons/ri"

import { useDispatch } from "react-redux"
import { FETCH_IDTEMPLATE } from "../../redux/report/reportAction.jsx"
import { Link, useParams } from "react-router-dom"
import { useReportMaster } from "../../redux/report/reportReducer.jsx"
import { TitleHeader } from "../global/TitleHeader.jsx"
import UserProfile from "../global/UserProfile.jsx"

const SenderReportIndex = () => {
  const dispatch = useDispatch()
  const { templateObjectData } = useReportMaster()
  const { id } = useParams()
  useEffect(() => {
    dispatch({ type: FETCH_IDTEMPLATE, payload: id })
  }, [])

  return (
    <>
      <div className="px-4 md:px-8 pt-5 flex flex-col gap-6">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-3 ">
            <Link to="/template">
              <TitleHeader title={templateObjectData?.data?.name} />
            </Link>
            <RiDeleteBin6Line className="text-4xl p-1 border rounded-lg bg-white-100 text-primary-100 hover:bg-white-500" />
          </div>
          <UserProfile />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-1 md:col-span-3 overflow-auto flex flex-col justify-between gap-5 bg-white-100 py-5 2xl:h-[87vh] xl:h-[85vh] lg:h-[82vh] rounded-md">
            <Preview templateObjectData={templateObjectData} />
          </div>
          <div className="col-span-1 md:col-span-6 overflow-auto bg-white-100 rounded-md flex flex-col justify-between gap-5 2xl:h-[87vh] xl:h-[85vh] lg:h-[82vh]">
            <SenderTable />
          </div>
          <div className="col-span-1 md:col-span-3 bg-white-100 rounded-md flex flex-col gap-5 2xl:h-[87vh] xl:h-[85vh] lg:h-[82vh]">
            <Report />
          </div>
        </div>
      </div>
    </>
  )
}

export default SenderReportIndex
