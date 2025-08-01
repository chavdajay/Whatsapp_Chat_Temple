import React from "react"
import ChatBg from "../../images/chat_bg.png"
import DocImg from "../../images/doc_img.png"
import VideoImg from "../../images/video.png"
import ImgPlace from "../../images/image.png"
import LocImg from "../../images/loc_img.png"

const PreviewTemplate = ({
  footerText,
  editorContent,
  headerText,
  selectedFormat,
  file,
}) => {
  let content

  switch (selectedFormat.title) {
    case "Text":
      content = <div className="text-wrap h-auto p-2 break-words">{headerText}</div>
      break
    case "Image":
      content = (
        <img
          src={file || ImgPlace}
          alt="selected_content"
          className="flex w-full object-cover h-[10rem] rounded"
        />
      )
      break
    case "Video":
      content = (
        <>
          {file ? (
            <video controls className="flex w-full object-cover h-[10rem] rounded">
              <source src={file} type="video/mp4" />
              <track kind="captions" srcLang="en" label="English" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={VideoImg}
              alt="Placeholder"
              className="flex w-full object-cover h-[10rem] rounded"
            />
          )}
        </>
      )
      break
    case "Document":
      content = (
        <img
          src={DocImg}
          alt="Placeholder"
          className="flex w-full object-cover h-[10rem] rounded"
        />
      )
      break
    case "Location":
      content = (
        <img
          src={file || LocImg}
          alt="selected_content"
          className="flex w-full object-cover h-[10rem] rounded"
        />
      )
      break
    default:
      content = null
  }

  return (
    <div className="w-50 h-full">
      <div className="text-2xl font-medium h-[3.5rem] flex px-3 items-center border-b">
        Templates Preview
      </div>
      <div
        className="p-3 h-[93%] relative"
        style={{
          backgroundImage: `url(${ChatBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {selectedFormat.title !== "None" ? (
          <div className="bg-white-100 rounded p-1 min-w-[10rem] relative top-5">
            {content}
            <div
              className="text-wrap h-auto p-2 break-words"
              dangerouslySetInnerHTML={{ __html: editorContent }}
            />
            <div className="text-grey_font-100 text-wrap h-auto p-2 break-words">
              {footerText}
            </div>
          </div>
        ) : (
          <>
            {(editorContent.length > 0 || footerText.length > 0) && (
              <div className="bg-white-100 rounded">
                <div
                  className="text-wrap p-2 break-words"
                  dangerouslySetInnerHTML={{ __html: editorContent }}
                />
                <div className="text-grey_font-100 text-wrap h-auto p-2 break-words">
                  {footerText}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PreviewTemplate
