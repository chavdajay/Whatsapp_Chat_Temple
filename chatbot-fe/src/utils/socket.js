// src/utils/socket.js
import { io } from "socket.io-client"
import { SOCKET_URL } from "../config/Api.jsx"

const socket = io(SOCKET_URL, {
  autoConnect: false,
  extraHeaders: {
    "ngrok-skip-browser-warning": "true",
  },
})
export default socket
