import React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import si1 from "../../images/social icon1.png"
import si2 from "../../images/social icon2.png"
import si3 from "../../images/social icon3.png"
import si4 from "../../images/social icon4.png"
import si5 from "../../images/social icon5.png"
import si6 from "../../images/social icon6.png"
import right from "../../images/right.png"

const Channel = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 })

  const textAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  }

  const iconAnimation = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, staggerChildren: 0.2 },
    },
  }

  const iconChildAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div
      ref={ref}
      className="relative text-center py-16 bg-white-100 flex flex-col gap-5 overflow-hidden"
    >
      <img
        src={right}
        alt="Right Side"
        className="absolute top-0 right-0 w-[260px] h-auto transform translate-x-1/4 -translate-y-1/4"
        style={{ zIndex: 1 }} // Ensures the image is behind the content
      />

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={textAnimation}
        style={{ position: "relative" }}
      >
        <div className="flex flex-col gap-5">
          <h4 className="text-3xl font-semibold">Omnichannel Support</h4>
          <p className="text-gray-600">
            Be everywhere and support your users across the channels with a single
            chatbot
          </p>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={iconAnimation}
        className="flex flex-wrap justify-center gap-4"
      >
        {[si1, si2, si3, si4, si5, si6].map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Social Icon ${index + 1}`}
            variants={iconChildAnimation}
            className="w-12 h-12 md:w-16 md:h-16"
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Channel
