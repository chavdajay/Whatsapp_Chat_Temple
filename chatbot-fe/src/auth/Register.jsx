import React from "react"
import logo from "../images/logo.png"
import login from "../images/login.png"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa6"

const Register = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen px-4 bg-white-100">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white-100 p-4 md:p-0">
          <div className="w-full max-w-xl flex flex-col gap-3 md:gap-5">
            <img src={logo} alt="logo" className="w-56" />
            <div className="flex flex-col gap-2 md:gap-3">
              <p className="text-2xl md:text-3xl font-bold text-primary-100">
                Register
              </p>
              <p className="text-gray-500 text-sm md:text-base">
                Let’s get you all set up so you can access your personal account.
              </p>
            </div>
            <div className="w-full flex flex-col gap-5 md:gap-7">
              <div className="relative">
                <input
                  type="text"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black-100 bg-transparent rounded-md border border-black-200 focus:outline-none peer"
                  placeholder=""
                  name="username"
                />
                <label
                  htmlFor="username"
                  className="absolute text-sm md:text-base text-black-100 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white-100 px-2 peer-focus:px-2 peer-focus:text-black-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Username
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="email"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black-100 bg-transparent rounded-md border border-black-200 focus:outline-none peer"
                    placeholder=""
                    name="email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm md:text-base text-black-100 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white-100 px-2 peer-focus:px-2 peer-focus:text-black-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black-100 bg-transparent rounded-md border border-black-200 focus:outline-none peer"
                    placeholder=" "
                    name="password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute text-sm md:text-base text-black-100 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white-100 px-2 peer-focus:px-2 peer-focus:text-black-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Password
                  </label>
                </div>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black-100 bg-transparent rounded-md border border-black-200 focus:outline-none peer"
                  placeholder=""
                  name="phone"
                />
                <label
                  htmlFor="phone"
                  className="absolute text-sm md:text-base text-black-100 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white-100 px-2 peer-focus:px-2 peer-focus:text-black-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Phone Number
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black-100 bg-transparent rounded-md border border-black-200 focus:outline-none peer"
                    placeholder=""
                    name="country"
                  />
                  <label
                    htmlFor="country"
                    className="absolute text-sm md:text-base text-black-100 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white-100 px-2 peer-focus:px-2 peer-focus:text-black-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Country
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black-100 bg-transparent rounded-md border border-black-200 focus:outline-none peer"
                    placeholder=""
                    name="state"
                  />
                  <label
                    htmlFor="state"
                    className="absolute text-sm md:text-base text-black-100 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white-100 px-2 peer-focus:px-2 peer-focus:text-black-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    State
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-white-100 border-black-200 rounded"
                />
                <label
                  htmlFor="default-checkbox"
                  className="text-sm font-medium text-[#667085]"
                >
                  I agree to all the <span className="text-red-400">Terms</span> and
                  <span className="text-red-400"> Privacy Policies</span>
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-[#4D426D] py-2 px-4 rounded w-full text-white-100"
              >
                Create account
              </button>
              <p className="text-center text-sm md:text-base">
                Already have an account? <span className="text-red-400"> Login</span>
              </p>
            </div>
            <div className="flex items-center justify-center">
              <hr className="border-gray-300 flex-grow" />
              <span className="text-gray-400 px-2"> Or Login With </span>
              <hr className="border-gray-300 flex-grow" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                className="text-[#1877F2] border border-primary-200 font-bold py-2 px-4 rounded w-1/2 flex justify-center text-2xl"
              >
                <FaFacebook />
              </button>
              <button
                type="button"
                className="text-white border border-primary-200 font-bold py-2 px-4 rounded w-1/2 flex justify-center text-2xl"
              >
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
      </div>
    </>
  )
}

export default Register
