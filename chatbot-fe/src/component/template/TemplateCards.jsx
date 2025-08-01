import React from "react"
import { FiFileText } from "react-icons/fi"
import { Link } from "react-router-dom"
import { IoMdImages } from "react-icons/io"
import Tooltip from "../../utils/ToolTip.jsx"
import { AiOutlineDelete } from "react-icons/ai"
import { TruncateChar, TruncateText } from "../../utils/Truncate.jsx"
import { IoVideocamOutline } from "react-icons/io5"
import { GrLocation } from "react-icons/gr"

const TemplateCards = ({ template, index }) => {
  const getBackgroundColor = (index) => {
    const colors = [
      "bg-template_card-100",
      "bg-template_card-200",
      "bg-template_card-300",
    ]
    return colors[index % colors.length] // This will cycle through the colors
  }
  const getBorderColor = (index) => {
    const colors = [
      "border-template_card_border-100",
      "border-template_card_border-200",
      "border-template_card_border-300",
    ]
    return colors[index % colors.length] // This will cycle through the colors
  }
  const getIconBgcolor = (index) => {
    const colors = [
      "bg-template_icon_bg-100",
      "bg-template_icon_bg-200",
      "bg-template_icon_bg-300",
    ]
    return colors[index % colors.length] // This will cycle through the colors
  }
  const getIconFontcolor = (index) => {
    const colors = [
      "text-template_icon_font-100",
      "text-template_icon_font-200",
      "text-template_icon_font-300",
    ]
    return colors[index % colors.length] // This will cycle through the colors
  }
  return (
    <>
      <Link
        to={`/reports/${template.id}`}
        className={` ${getBackgroundColor(index)} bg-template_card-100 rounded-lg flex flex-col justify-between border ${getBorderColor(index)}`}
      >
        <div className="px-4 py-4 ">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative inline-flex items-center justify-center p-2 overflow-hidden bg-orange-100 rounded-full">
                <FiFileText className="text-white-100 2xl:text-2xl md:text-xl text-base" />
              </div>
              <Tooltip text={template?.name} width="w-4/2">
                <p className="text-black-100  2xl:text-xl md:text-base text-base capitalize font-medium ">
                  {template?.name && TruncateChar(template?.name, 15)}
                </p>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <div className="py-2 relative flex justify-end">
                <div className="bg-[#11057E0D] text-black-100 rounded-full  p-2 2xl:text-2xl md:text-xl text-base">
                  <AiOutlineDelete />
                </div>
              </div>
              {template?.components.map((component, i) => {
                if (component.type === "HEADER" && component.format === "IMAGE") {
                  return (
                    <>
                      <div key={i} className="py-2 relative flex justify-end">
                        <div
                          className={`${getBackgroundColor(index)} rounded-full  ${getIconFontcolor(index)} p-2 2xl:text-2xl md:text-xl text-base`}
                        >
                          <IoMdImages />
                        </div>
                      </div>
                    </>
                  )
                } else if (
                  component.type === "HEADER" &&
                  component.format === "VIDEO"
                ) {
                  return (
                    <div key={index} className="py-2 relative flex justify-end">
                      <div
                        className={`${getIconBgcolor(index)} rounded-full  ${getIconFontcolor(index)} p-2 2xl:text-2xl md:text-xl text-base`}
                      >
                        <IoVideocamOutline />
                      </div>
                    </div>
                  )
                }
                return null
              })}
              {template?.components.map((component) => {
                if (component.type === "HEADER" && component.format === "LOCATION") {
                  return (
                    <>
                      {template?.components.map((component) => {
                        if (component?.type === "BUTTONS") {
                          return component?.buttons?.map((buttons, i) => (
                            <>
                              {buttons?.type === "URL" ? (
                                <div
                                  key={i}
                                  className="py-2 relative flex justify-end"
                                >
                                  <div
                                    className={`${getIconBgcolor(index)} rounded-full  ${getIconFontcolor(index)} p-2 2xl:text-2xl md:text-xl text-base`}
                                  >
                                    <GrLocation />
                                  </div>
                                </div>
                              ) : null}
                            </>
                          ))
                        }
                      })}
                    </>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </div>
          {template?.components.map((component, index) => {
            if (component.type === "HEADER" && component.format === "TEXT") {
              const headerText =
                component.example && component.example.header_text
                  ? component.text.replace(
                      "{{1}}",
                      component.example.header_text[0] || ""
                    )
                  : component.text

              return (
                <p className="text-black-100 py-1.5 text-sm" key={index}>
                  {headerText}
                </p>
              )
            }
            return null
          })}
          {template?.components.map((component, idx) => {
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
                <Tooltip text={bodyText} key={idx} width="w-2/3">
                  <p className="text-black-100 pt-2 2xl:text-base md:text-sm text-base">
                    {bodyText && TruncateText(bodyText, 30)}
                  </p>
                </Tooltip>
              )
            }
            return null
          })}
        </div>

        <div>
          {template.components.map((component, index) => {
            if (component.type === "FOOTER") {
              return (
                <p
                  key={index}
                  className="2xl:text-sm md:text-xs text-base text-grey_font-100 px-4 pb-1"
                >
                  {component.text}
                </p>
              )
            } else {
              return null
            }
          })}

          {template.components.map((component, index) => {
            if (component.type === "BUTTONS") {
              const buttonsToShow = component.buttons.slice(0, 2)

              return (
                <div key={index} className="flex flex-col gap-1.5 pt-3 px-2 pb-3">
                  {buttonsToShow.map((button, btnIndex) => (
                    <button
                      key={btnIndex}
                      className="bg-white-100 text-primary-200 py-1 2xl:text-base text-sm rounded-md font-medium border border-[#11057E26]"
                      onClick={() => console.log(button.text)}
                    >
                      {button.text}
                    </button>
                  ))}
                  {component.buttons.length > 2 && (
                    <button className="bg-white-100 text-primary-200 py-1.5 rounded-md font-medium border border-[#11057E26]">
                      Show More
                    </button>
                  )}
                </div>
              )
            } else {
              return null
            }
          })}
        </div>
      </Link>
    </>
  )
}

export default TemplateCards
