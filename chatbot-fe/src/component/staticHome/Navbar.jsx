import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../../images/logo.png"
import { useUIContext } from "../../context/BasicProvider.jsx"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { setSelectedNavbar, selectedNavbar } = useUIContext()
  const onTop = () => {
    setSelectedNavbar("home")
    window.scrollTo({ top: 0, behavior: "smooth" }) // Smooth scroll to top
  }

  const handleScroll = (event, target) => {
    event.preventDefault()
    setSelectedNavbar("features")
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        scrollToTarget(target)
      }, 100)
    } else {
      scrollToTarget(target)
    }
  }

  const scrollToTarget = (target) => {
    const element = document.getElementById(target)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 85,
        behavior: "smooth",
      })
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white-100 shadow-md py-4 ">
      <div className=" w-[90%] mx-auto flex justify-between items-center">
        <div>
          <img src={logo} className="w-52 cursor-pointer" alt="logo" />
        </div>

        <ul className="hidden md:flex gap-8 list-none">
          <button onClick={() => onTop()}>
            <Link
              to="/"
              className={`${location.pathname === "/" && selectedNavbar === "home" ? "border-b-2 border-orange-500 font-bold" : ""}`}
            >
              Home
            </Link>
          </button>
          <li>
            <Link
              to="#features"
              onClick={(e) => handleScroll(e, "features")}
              className={`${
                location.pathname === "/" && selectedNavbar === "features"
                  ? "border-b-2 border-orange-500 font-bold"
                  : ""
              }`}
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              onClick={() => onTop()}
              to="/contact"
              className={`${location.pathname === "/contact" ? "border-b-2 border-orange-500 font-bold" : ""}`}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex space-x-4">
          {/* Book Live Demo Button */}
          <button
            onClick={() => {
              navigate("/Contact")
              onTop()
            }} // Set the link for "Book Live Demo"
            className="bg-orange-500 text-white-100 py-2 px-4 rounded"
          >
            Book Live Demo
          </button>

          {/* Login Button */}
          <button
            onClick={() => navigate("/login")} // Set the link for "Login"
            className="border border-orange-500 text-orange-500 py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </div>

        <div className="md:hidden">
          <button className="text-black focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
