export function TruncateText(text, maxLength) {
  let words = text.split(" ")
  if (words.length > maxLength) {
    return words.slice(0, maxLength).join(" ") + "..."
  } else {
    return text
  }
}

export function TruncateChar(text, numChars) {
  if (!text) return ""

  if (text.length <= numChars) {
    return text
  }

  const truncatedText = `${text.substring(0, numChars)} ...`

  return truncatedText
}
