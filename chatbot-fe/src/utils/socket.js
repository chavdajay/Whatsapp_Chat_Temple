// src/utils/socket.js
import { io } from "socket.io-client"
const socket = io("http://65.1.102.134:13738", { autoConnect: false })
export default socket
