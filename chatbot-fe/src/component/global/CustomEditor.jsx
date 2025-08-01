import React, { useState, useRef } from "react"
import { FaBold, FaItalic, FaStrikethrough, FaSmile } from "react-icons/fa"
import EmojiPicker from "emoji-picker-react"
const CustomEditor = ({ value, onChange, name }) => {
  const [text, setText] = useState(value || "")
  const textareaRef = useRef(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  // Insert formatted text at the cursor position
  const insertTextAtCursor = (textToInsert) => {
    const textarea = textareaRef.current
    const startPos = textarea.selectionStart
    const endPos = textarea.selectionEnd
    const beforeText = text.slice(0, startPos)
    const afterText = text.slice(endPos)
    const newText = beforeText + textToInsert + afterText
    setText(newText)
    textarea.focus()
    textarea.selectionStart = textarea.selectionEnd = startPos + textToInsert.length
    onChange(newText)
  }

  // Handle text formatting
  const handleFormat = (command) => {
    const textarea = textareaRef.current
    const startPos = textarea.selectionStart
    const endPos = textarea.selectionEnd
    const selectedText = text.slice(startPos, endPos)
    let insertion = ""

    switch (command) {
      case "bold":
        insertion = `**${selectedText}**`
        break
      case "italic":
        insertion = `*${selectedText}*`
        break
      case "strikeThrough":
        insertion = `~~${selectedText}~~`
        break
      default:
        break
    }

    insertTextAtCursor(insertion)
  }

  const handleEmojiSelect = (emojiData) => {
    const emoji = emojiData.emoji
    insertTextAtCursor(emoji)
    setShowEmojiPicker(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <textarea
          ref={textareaRef}
          name={name}
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            onChange(e.target.value)
          }}
          className="min-h-[8rem] border p-2 rounded bg-gray-100 w-full"
        />
        <div className="flex float-end gap-2">
          <button
            onClick={() => handleFormat("bold")}
            className="hover:bg-gray-200 p-2 rounded"
          >
            <FaBold />
          </button>
          <button
            onClick={() => handleFormat("italic")}
            className="hover:bg-gray-200 p-2 rounded"
          >
            <FaItalic />
          </button>
          <button
            onClick={() => handleFormat("strikeThrough")}
            className="hover:bg-gray-200 p-2 rounded"
          >
            <FaStrikethrough />
          </button>
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="hover:bg-gray-200 p-2 rounded"
          >
            <FaSmile />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-12 right-0 bg-white p-2 border border-gray-300 rounded z-10">
              <EmojiPicker onEmojiClick={handleEmojiSelect} disableSkinTonePicker />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomEditor
