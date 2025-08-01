import React, { useState } from "react"
import { RiSendPlane2Fill } from "react-icons/ri"
import location from "../../images/location.png"
import { RiEdit2Fill } from "react-icons/ri"

const ChatComponent = ({ templateObjectData }) => {
  const [showMore, setShowMore] = useState(false)
  return (
    <>
      <div className="overflow-hidden hover:overflow-auto 2xl:max-h-[69vh] xl:max-h-[57vh] lg:max-h-[53vh]">
        <div className=" flex-1 px-5">
          <div className="flex flex-col gap-5 mb-5">
            <div className="flex justify-end"></div>
            <div className="flex justify-start items-end gap-3 ">
              <div className="w-full flex flex-col gap-1">
                {templateObjectData?.data?.components.map((component, index) => {
                  if (component.type === "HEADER" && component.format === "IMAGE") {
                    return (
                      <div key={index}>
                        <img
                          src={component?.example?.header_handle[0]}
                          alt=""
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    )
                  } else if (
                    component.type === "HEADER" &&
                    component.format === "VIDEO"
                  ) {
                    return (
                      <div key={index}>
                        <video
                          className="video-player"
                          controls={false}
                          autoPlay
                          loop={Infinity}
                        >
                          <track
                            kind="captions"
                            srcLang="en"
                            label="English captions"
                          />
                          <source
                            src={component?.example?.header_handle[0]}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )
                  } else if (
                    component.type === "HEADER" &&
                    component.format === "TEXT"
                  ) {
                    const headerText =
                      component.example && component.example.header_text
                        ? component.text.replace(
                            "{{1}}",
                            component.example.header_text[0] || ""
                          )
                        : component.text

                    return (
                      <p
                        className="bg-white-500 text-primary-300 p-2 leading-1.5 rounded-e-xl rounded-es-xl"
                        key={index}
                      >
                        {headerText}
                      </p>
                    )
                  } else if (
                    component.type === "HEADER" &&
                    component.format === "DOCUMENT"
                  ) {
                    return (
                      <button
                        key={index}
                        className="bg-white-500 text-primary-300 p-2 leading-1.5 rounded-e-xl rounded-es-xl flex justify-center text-5xl"
                        onClick={() =>
                          window.open(component?.example?.header_handle[0], "_blank")
                        }
                      >
                        <svg
                          xmlns="
http://www.w3.org/2000/svg"
                          width="80"
                          height="80"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20.6305 6.62812V21.1078C20.6305 22.7062 19.3367 24 17.7383 24H6.26328C4.66484 24 3.37109 22.7062 3.37109 21.1078V2.89219C3.37109 1.29375 4.66484 0 6.26328 0H14.0023L20.6305 6.62812Z"
                            fill="#F15642"
                          />
                          <path
                            d="M20.6301 6.62812H15.1973C14.5363 6.62812 14.002 6.09375 14.002 5.43281V0L20.6301 6.62812Z"
                            fill="#FF9587"
                          />
                          <path
                            d="M10.2148 12.9374C10.2148 13.9358 9.68516 14.489 8.75234 14.489H8.18047V16.1624H7.49609V11.3999H8.75234C9.68516 11.3999 10.2148 11.9671 10.2148 12.9374ZM9.51172 12.9374C9.51172 12.3515 9.25859 12.0515 8.74297 12.0515H8.18047V13.8327H8.74297C9.26328 13.8374 9.51172 13.5515 9.51172 12.9374ZM10.7961 11.3999H11.9773C12.9008 11.3999 13.4445 11.9437 13.4445 12.8812V14.6624C13.4445 15.6046 12.9008 16.1577 11.982 16.1577H10.7914V11.3999H10.7961ZM11.9867 15.5062C12.4742 15.5062 12.7555 15.2155 12.7555 14.6483V12.8952C12.7555 12.3374 12.4836 12.0515 11.9867 12.0515H11.4852V15.5062H11.9867ZM14.9492 12.0468V13.4671H16.3836V14.0905H14.9492V16.1577H14.2648V11.3999H16.5102V12.0468H14.9492Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    )
                  } else if (
                    component.type === "HEADER" &&
                    component.format === "LOCATION"
                  ) {
                    return (
                      <>
                        {templateObjectData?.data?.components.map((component) => {
                          if (component?.type === "BUTTONS") {
                            return component?.buttons?.map((buttons, index) => (
                              <>
                                {buttons?.type === "URL" ? (
                                  <button
                                    key={index}
                                    className="bg-white-500 text-primary-300 leading-1.5 rounded-e-xl rounded-es-xl flex justify-center text-5xl"
                                    onClick={() =>
                                      window.open(buttons?.url, "_blank")
                                    }
                                  >
                                    <img src={location} alt="" className="w-full" />
                                  </button>
                                ) : null}
                              </>
                            ))
                          }
                        })}
                      </>
                    )
                  }

                  return null
                })}
                {templateObjectData?.data?.components.map((component, idx) => {
                  if (component.type === "BODY") {
                    let bodyText = component.text
                    if (
                      component.example &&
                      component.example.body_text &&
                      component.example.body_text[0]
                    ) {
                      bodyText = bodyText
                        .replace("{{1}}", component.example.body_text[0][0] || "")
                        .replace("{{2}}", component.example.body_text[0][1] || "")
                        .replace("{{3}}", component.example.body_text[0][2] || "")
                        .replace("{{4}}", component.example.body_text[0][3] || "")
                        .replace("{{5}}", component.example.body_text[0][4] || "")
                    }
                    return (
                      <p
                        key={idx}
                        className="bg-white-500 text-primary-300 p-2 leading-1.5  rounded-e-xl rounded-es-xl 2xl:text-base md:text-sm text-sm"
                      >
                        {bodyText}
                      </p>
                    )
                  }
                  return null
                })}
                {templateObjectData?.data?.components.map((component, index) => {
                  if (component.type === "FOOTER") {
                    return (
                      <p
                        key={index}
                        className="bg-white-500 text-primary-300 p-2 leading-1.5  rounded-e-xl rounded-es-xl 2xl:text-base md:text-sm text-sm"
                      >
                        {component.text}
                      </p>
                    )
                  } else {
                    return null
                  }
                })}
                {templateObjectData?.data?.components.map((component, index) => {
                  if (component.type === "BUTTONS") {
                    const buttonsToShow = showMore
                      ? component.buttons
                      : component.buttons.slice(0, 2)

                    return (
                      <div key={index} className="flex flex-col gap-1.5">
                        {buttonsToShow.map((button, btnIndex) => (
                          <>
                            <button
                              key={btnIndex}
                              className="bg-white-500 text-primary-100 py-2 2xl:text-base md:text-sm text-sm rounded-md font-medium border"
                              onClick={() => {
                                if (button.type === "URL") {
                                  window.open(button.url, "_blank")
                                } else if (button.type === "COPY_CODE") {
                                  console.log("Copy code logic here")
                                } else if (button.type === "PHONE_NUMBER") {
                                  console.log("Call phone number logic here")
                                } else if (button.type === "QUICK_REPLY") {
                                  console.log("Quick reply logic here")
                                }
                              }}
                            >
                              {button.text}
                            </button>
                          </>
                        ))}

                        {component.buttons.length > 3 && !showMore && (
                          <button
                            key="showMoreButton"
                            className="bg-white-500 text-primary-100 py-2 rounded-md font-medium border"
                            onClick={() => setShowMore(true)}
                          >
                            Show More
                          </button>
                        )}

                        {showMore && component.buttons.length > 3 && (
                          <div key="optionMenu" className="relative inline-block">
                            <button
                              className="bg-white-500 text-primary-100 py-2 rounded-md font-medium border w-full"
                              onClick={() => setShowMore(false)}
                            >
                              Show Less
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const Preview = ({ templateObjectData }) => {
  return (
    <>
      <div className="flex flex-col gap-5 relative">
        <div className="flex justify-between items-center px-5">
          <p className="text-black-100 text-xl font-medium">Preview</p>
          <RiEdit2Fill className="text-4xl text-primary-100 border p-1 rounded-lg hover:bg-white-500" />
        </div>
        <ChatComponent templateObjectData={templateObjectData} />
      </div>
      <div className="flex flex-col  px-5">
        <div className="relative">
          <input
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-black-100  rounded-full shadow-2xl outline-none"
            placeholder="Write your Mobile Number"
          />
          <div className="text-primary-100 absolute end-2.5 bottom-0.5 font-medium text-2xl py-3 cursor-pointer ">
            <RiSendPlane2Fill />
          </div>
        </div>
      </div>
    </>
  )
}

export default Preview
