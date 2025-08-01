import React from "react"
import logo from "../../images/white_logo.png"
import { CiMail } from "react-icons/ci"
import { FaFacebook, FaTwitter } from "react-icons/fa"
import { CiInstagram } from "react-icons/ci"
import { FaGithub } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useUIContext } from "../../context/BasicProvider.jsx"

const Footer = () => {
  const navigate = useNavigate()
  const { setSelectedNavbar } = useUIContext()
  const onTop = () => {
    setSelectedNavbar("home")
    window.scrollTo({ top: 0, behavior: "smooth" })
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
    <footer className="bg-blue-900 flex flex-col py-8 gap-8 text-white-100 ">
      <div className="flex justify-between gap-10 w-[90%] mx-auto">
        <div className="flex flex-col gap-4 text-white">
          <img src={logo} alt="Logo" className="max-w-xs h-auto" />
          <p className="text-base text-white-100">
            Our chatbot is designed to provide you with instant support and
            assistance 24/7. Whether you have questions about our services, need help
            navigating our site, or require support with a specific issue, our
            intelligent chatbot is here to help.
          </p>
          <div className="flex gap-2">
            <div className="flex items-start gap-2 text-gray-300">
              <CiMail size={30} />
              <div className="flex flex-col ">
                <p className="text-white-100">Email</p>
                <p className="text-orange-500">info@chatbot.buzz</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <SocialMediaIcon icon={<FaTwitter />} />
          <SocialMediaIcon icon={<FaFacebook />} />
          <SocialMediaIcon icon={<CiInstagram />} />
          <SocialMediaIcon icon={<FaGithub />} />
        </div>
      </div>

      <hr className="border-t border-gray-300 w-[90%] mx-auto" />

      <div className="flex justify-between items-center gap-4 text-white  w-[90%] mx-auto">
        <ul className="flex flex-col md:flex-row gap-5">
          <Link
            to="/"
            className="text-white hover:text-orange-500 transition"
            onClick={onTop}
          >
            Home
          </Link>
          <a
            href="/features"
            onClick={(e) => handleScroll(e, "features")}
            className="text-white hover:text-orange-500 transition"
          >
            Features
          </a>
          <li>
            <Link
              onClick={onTop}
              to="/contact"
              className="text-white hover:text-orange-500 transition"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="text-white text-base">© 2000-2021, All Rights Reserved</div>
      </div>
    </footer>
  )
}

const SocialMediaIcon = ({ icon }) => (
  <div className="flex justify-center items-center p-2 rounded-full bg-[#1E293B] hover:bg-orange-500 text-white text-2xl transition duration-300 ease-in-out">
    {icon}
  </div>
)

export default Footer
