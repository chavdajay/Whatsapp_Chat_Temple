// src/utils/socket.js
import { io } from "socket.io-client"
const socket = io("https://whatsapp.swaminarayanbhagwan.org/", {
  autoConnect: false,
})
export default socket
