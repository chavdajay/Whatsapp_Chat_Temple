import { useDispatch } from "react-redux"
import { useUIContext } from "../../context/BasicProvider.jsx"
import { useTemplateMaster } from "../../redux/template/templateReducer.jsx"
import React, { useEffect, useCallback, Suspense } from "react"
import { FETCH_TEMPLATE_REQUEST } from "../../redux/template/templateAction.jsx"
import Loader from "../global/Loader.jsx"
import UserProfile from "../global/UserProfile.jsx"
import { TitleHeader } from "../global/TitleHeader.jsx"

// Dynamically import TemplateCards and RecentTemplates for lazy loading
const TemplateCards = React.lazy(() => import("./TemplateCards.jsx"))
const RecentTemplates = React.lazy(() => import("./RecentTemplates.jsx"))

const TemplateIndex = () => {
  const dispatch = useDispatch()
  const { selectWabaid, setLoading, loading } = useUIContext()
  const { templateData } = useTemplateMaster()

  // Memoized fetchTemplateData to prevent unnecessary re-renders
  const fetchTemplateData = useCallback(() => {
    if (selectWabaid) {
      dispatch({ type: FETCH_TEMPLATE_REQUEST, payload: selectWabaid })
      setLoading(false)
    }
  }, [selectWabaid])

  // Trigger data fetch when selectWabaid changes
  useEffect(() => {
    fetchTemplateData()
  }, [fetchTemplateData])

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="px-4 sm:px-8 pt-4 sm:pt-5 flex flex-col gap-6 ">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <TitleHeader title="Templates" />
          <UserProfile />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 ">
          {/* Left section: Template Cards */}
          <div className="sm:col-span-4 overflow-auto 2xl:h-[88vh] xl:h-[85vh] lg:h-[82vh] ">
            <Suspense fallback={<Loader />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 ">
                {templateData &&
                  templateData?.data?.map((template, index) => (
                    <TemplateCards template={template} index={index} key={index} />
                  ))}
              </div>
            </Suspense>
          </div>

          {/* Right section: Recent Templates */}
          <div className="overflow-auto bg-white-100 flex flex-col border gap-5 2xl:p-3 xl:p-2 lg:p-2 p-2 border-gray-200 rounded-lg 2xl:h-[87vh] xl:h-[85vh] lg:h-[82vh]">
            <Suspense fallback={<Loader />}>
              <RecentTemplates />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default TemplateIndex
