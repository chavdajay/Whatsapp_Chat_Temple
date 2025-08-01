import React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"
import { FaArrowRightLong } from "react-icons/fa6"
import bg from "../../images/contactbg.png"

const ContactUs = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Set to false to trigger animation every time it enters the viewport
    threshold: 0.3, // Adjust the value to control when the animation triggers
  })

  return (
    <motion.div
      className="bg-cover bg-center bg-no-repeat p-6 md:p-12 flex flex-col justify-center items-center gap-8 bg-white-100"
      id="contact"
      ref={ref}
      style={{
        backgroundImage: `url(${bg})`, // Set the background image
        backgroundSize: "cover", // Cover the entire div
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Avoid repeating the image
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between gap-6">
        <div className="flex flex-col gap-6">
          <motion.h4
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-3xl md:text-5xl text-header-color"
          >
            Get in touch with us. We are here to assist you.
          </motion.h4>
        </div>

        <div className="flex gap-4 md:flex-col justify-center items-center">
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-header-color text-xl transition-colors duration-300 ease-in-out hover:bg-orange-color hover:text-white"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <FaFacebook />
          </motion.div>

          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-header-color text-xl transition-colors duration-300 ease-in-out hover:bg-orange-color hover:text-white"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <FaTwitter />
          </motion.div>

          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-header-color text-xl transition-colors duration-300 ease-in-out hover:bg-orange-color hover:text-white"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <FaLinkedin />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="w-full max-w-5xl bg-white/90 p-6 md:p-8 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-4 border-b-2 border-gray-300 bg-transparent text-gray-900 focus:border-orange-color outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 border-b-2 border-gray-300 bg-transparent text-gray-900 focus:border-orange-color outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-4 border-b-2 border-gray-300 bg-transparent text-gray-900 focus:border-orange-color outline-none"
            />
          </div>

          <textarea
            placeholder="Your Message"
            className="w-full p-4 h-24 border-b-2 border-gray-300 bg-transparent text-gray-900 focus:border-orange-color outline-none resize-none"
          ></textarea>

          <button
            type="submit"
            className="bg-orange-500 text-white-100 py-3 px-6 rounded-2xl w-[15rem] flex items-center justify-center gap-2 transition-colors duration-300"
          >
            Leave us a Message <FaArrowRightLong />
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default ContactUs
