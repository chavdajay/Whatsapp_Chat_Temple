import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FaArrowUpLong } from "react-icons/fa6"
import { useUIContext } from "../../context/BasicProvider.jsx"

export default function GoToTop() {
  const [showButton, setShowButton] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { setSelectedNavbar } = useUIContext()

  const onTop = () => {
    setSelectedNavbar("home")
    window.scrollTo({ top: 0, behavior: "smooth" }) // Smooth scroll to top
  }

  const handleGoToTopClick = () => {
    onTop()
    navigate("/") // Redirect to homepage
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        // Show button after hero section
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [location])

  return (
    showButton && (
      <button
        className="fixed bottom-4 right-4 bg-orange-500 text-white-100 p-3 rounded-full shadow-lg "
        onClick={handleGoToTopClick}
      >
        <FaArrowUpLong className="go-to-top" />
      </button>
    )
  )
}
