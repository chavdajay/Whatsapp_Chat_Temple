import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { FETCH_ALL_APP } from "../../redux/application/applicationAction.jsx"
import { useApplicationMaster } from "../../redux/application/applicationReducer.jsx"
import moment from "moment"
import authServices from "../../services/auth.services--.jsx"
import { useUIContext } from "../../context/BasicProvider.jsx"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const GoLiveApplication = () => {
  const { setSelectWabaid, setWabaidlist } = useUIContext()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { applicationData } = useApplicationMaster()

  useEffect(() => {
    dispatch({ type: FETCH_ALL_APP })
  }, [dispatch])

  const goLive = (id) => {
    try {
      authServices
        .getWabaid(id)
        .then(({ data }) => {
          setSelectWabaid(sessionStorage.getItem("wabaid"))
          if (!sessionStorage.getItem("wabaid")) {
            sessionStorage.setItem("wabaid", data?.data[0]?.waba_id)
            sessionStorage.setItem("businessid", data?.data[0]?.business_id)
            setSelectWabaid(data?.data[0]?.waba_id)
          }
          navigate("/template")
          sessionStorage.setItem("wabalist", JSON.stringify(data))
          setWabaidlist(data)
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error)
        })
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  return (
    <>
      {applicationData?.data?.map((item) => (
        <div
          className="border rounded-md border-black-200 gap-4 bg-white-100 flex justify-between items-center py-3 px-7 capitalize"
          key={item.id}
          onClick={() => goLive(item?.user_id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              goLive(item?.user_id)
            }
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[#D90C00] text-lg">access API</p>
            <h3 className="text-xl font-bold">{item?.name}</h3>
            <p className="text-black-300">
              {moment(item?.created_at).format("D/M/YYYY h:mm A")}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              className={`${item?.is_active ? "text-primary-100" : "text-[#11057E4D] "}  bg-[#11057E1A] rounded-md px-8 py-2`}
              onClick={(e) => {
                e.stopPropagation()
                goLive(item?.user_id)
              }}
              disabled={!item?.is_active}
            >
              Go Live
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default GoLiveApplication
