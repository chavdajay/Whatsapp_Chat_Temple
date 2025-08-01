import React, { useState } from "react"
import logo from "../images/logo.png"
import login from "../images/login.png"
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../utils/toastUtils"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../config/Api.jsx"
import axios from "axios"

const Login = ({ setAuth }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleSubmit = async () => {
    const { email, password } = loginData

    if (!email || !password) {
      handleError("All fields are required")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      handleError("Please enter a valid email address")
      return
    }

    if (password.length < 6) {
      handleError("Password must be at least 6 characters long")
      return
    }

    try {
      const response = await axios.post(BASE_URL + "/login", loginData)
      const { message, token } = response.data

      if (token) {
        handleSuccess(message)
        localStorage.setItem("token", token)
        setAuth(true)
        setTimeout(() => navigate("/chats"), 1000)
      } else {
        handleError(message)
      }
    } catch (err) {
      handleError("Login failed. Please try again.")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white-100 px-4">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white-100 p-4 md:p-0">
        <div className="w-full max-w-lg flex flex-col gap-3 md:gap-5">
          <img src={logo} alt="logo" className="w-20" />
          <div>
            <p className="text-2xl md:text-3xl font-bold text-primary-100">Login</p>
            <p className="text-gray-500 text-sm md:text-base">
              Login to access your account
            </p>
          </div>
          <div className="w-full flex flex-col gap-5 md:gap-7">
            <div className="relative">
              <input
                type="text"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black-100 bg-transparent rounded-lg border border-black-200 focus:outline-none peer"
                placeholder=""
                name="email"
                value={loginData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm md:text-base text-black-100 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white-100 px-2 peer-focus:px-2 peer-focus:text-black-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black-100 bg-transparent rounded-lg border border-black-200 focus:outline-none peer"
                placeholder=""
                name="password"
                value={loginData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm md:text-base text-black-100 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white-100 px-2 peer-focus:px-2 peer-focus:text-black-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Password
              </label>
            </div>
            <button
              type="button"
              className="bg-primary-100 text-white-100 font-bold py-2 px-4 rounded w-full"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <hr className="border-gray-300 flex-grow" />
            <span className="text-gray-400 px-2"> Or Login With </span>
            <hr className="border-gray-300 flex-grow" />
          </div>
          <div className="flex items-center justify-between gap-3 mt-4">
            <button className="text-[#1877F2] border border-primary-200 font-bold py-2 px-4 rounded w-1/2 flex justify-center text-2xl">
              <FaFacebook />
            </button>
            <button className="text-white border border-primary-200 font-bold py-2 px-4 rounded w-1/2 flex justify-center text-2xl">
              <FcGoogle />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white-100 p-4 md:p-0">
        <img
          src={login}
          alt="login"
          className="object-cover rounded-2xl w-full md:w-auto"
        />
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login
