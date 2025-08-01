import React, { useEffect } from "react"
import { FiFileText } from "react-icons/fi"
import { IoClose } from "react-icons/io5"
import { useDispatch } from "react-redux"
import {
  FETCH_RECENTTEMPLATE_REQUEST,
  RECENT_TEMPLATE_DELETE,
} from "../../redux/template/templateAction.jsx"
import { useTemplateMaster } from "../../redux/template/templateReducer.jsx"
import { TruncateChar } from "../../utils/Truncate.jsx"
import Tooltip from "../../utils/ToolTip.jsx"
import { Link } from "react-router-dom"
import { useUIContext } from "../../context/BasicProvider.jsx"

function RecentTemplates() {
  const dispatch = useDispatch()
  const { recentTemplateData } = useTemplateMaster()
  const { selectWabaid, setLoading } = useUIContext()

  useEffect(() => {
    if (selectWabaid) {
      dispatch({ type: FETCH_RECENTTEMPLATE_REQUEST, payload: selectWabaid })
      setLoading(false)
    }
  }, [selectWabaid, dispatch, setLoading])
  const deleteRecentTemplate = (id) => {
    dispatch({ type: RECENT_TEMPLATE_DELETE, payload: id, wabid: selectWabaid })
  }
  return (
    <>
      <p className="2xl:text-xl xl:text-lg lg:text-sm font-medium leading-normal text-black-100">
        Send Template History
      </p>
      <div className="flex flex-col gap-4">
        {recentTemplateData?.data?.length > 0 ? (
          recentTemplateData.data.map((value, index) => (
            <Tooltip text={value?.template_name} key={index}>
              <div className="flex justify-between items-center gap-2 2xl:p-2 lg:p-2 rounded-md bg-template_card-100 shadow-sm border border-template_card_border-100 relative group">
                <Link to={`/summary/template_history_id/${value.id}`}>
                  <div className="flex items-center gap-3">
                    <FiFileText className="text-orange-100 font-bold 2xl:text-xl md:text-base text-base" />
                    <span className="capitalize">
                      {value?.template_name === null
                        ? "-"
                        : value.template_name &&
                          TruncateChar(value.template_name, 10)}
                    </span>
                  </div>
                </Link>

                <button
                  className="absolute cursor-pointer flex items-end end-2 -top-3  gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={() => deleteRecentTemplate(value?.id)}
                >
                  <div className="bg-[#F8F6FD] text-black-100 rounded-full border-t border-template_card_border-100  p-1 text-xl">
                    <IoClose />
                  </div>
                </button>
              </div>
            </Tooltip>
          ))
        ) : (
          <>
            <hr />
            <p className="2xl:text-lg xl:text-lg lg:text-sm text-center">
              No data found
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default RecentTemplates
