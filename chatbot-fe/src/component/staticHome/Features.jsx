import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MdOutlineEmail, MdCheck } from "react-icons/md" // Import the required icon
import { useInView } from "react-intersection-observer"
import feature1 from "../../images/feature1.png"
import feature2 from "../../images/feature2.png"
import feature3 from "../../images/feature3.png"
import feature4 from "../../images/feature4.png"
import left from "../../images/left.png"

const Features = () => {
  // Detect mobile view with state
  const [, setIsMobile] = useState(window.innerWidth <= 768)

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Intersection Observer hooks
  const [ref1, inView1] = useInView({ triggerOnce: false, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: false, threshold: 0.1 })
  const [ref3, inView3] = useInView({ triggerOnce: false, threshold: 0.1 })
  const [ref4, inView4] = useInView({ triggerOnce: false, threshold: 0.1 })

  // Simplified animation
  const simpleAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  }
  // Icon style wrapper with round background
  const IconWrapper = ({ children }) => (
    <span className="bg-[#F4EBFF] rounded-full p-2 inline-flex items-center justify-center mr-2">
      {children}
    </span>
  )

  return (
    <div
      className="bg-white-100 flex justify-center items-center min-h-screen pt-10"
      id="features"
    >
      <div className="w-full flex flex-col gap-8 px-4">
        <div className="features-title flex flex-col items-center text-center gap-4">
          <h4 className="text-3xl md:text-4xl font-bold leading-tight">Features</h4>
          <h3 className="text-black-100 font-medium text-xl leading-relaxed">
            Analytics that feels like it’s from the future
          </h3>
        </div>

        <div className="features-main space-y-16">
          <div className=" items-center justify-center mx-auto flex flex-col gap-12">
            <div className="max-w-6xl flex flex-col gap-6">
              <div
                className="features-content flex flex-col md:flex-row items-center justify-between shadow-lg rounded-lg bg-[#FEE7E0] px-20 py-10 gap-6"
                ref={ref1}
              >
                <motion.div
                  initial="hidden"
                  animate={inView1 ? "visible" : "hidden"}
                  variants={simpleAnimation}
                  className="features-text w-full md:w-1/2 text-left"
                >
                  <div className="icon bg-[#11057E] rounded-full p-2 inline-block">
                    <MdOutlineEmail size={30} className="text-white-100" />
                  </div>
                  <h5 className="text-xl md:text-2xl font-semibold mt-4">
                    Achieve 10x engagement compared to SMS and Email campaigns
                  </h5>
                  <p className="text-gray-600 text-sm md:text-base mt-2 leading-relaxed">
                    Whether you have a team of 2 or 200, our shared team inboxes keep
                    everyone on the same page and in the loop.
                  </p>
                  <ul className="features-list text-sm md:text-base text-black-100 space-y-2 mt-4">
                    <li className="flex items-center">
                      <IconWrapper>
                        <MdCheck className="text-[#6941C6]" />
                      </IconWrapper>
                      Reach where your Customers are most active
                    </li>
                    <li className="flex items-center">
                      <IconWrapper>
                        <MdCheck className="text-[#6941C6]" />
                      </IconWrapper>
                      Promote and sell your Products on WhatsApp using Catalogs
                      feature
                    </li>
                    <li className="flex items-center">
                      <IconWrapper>
                        <MdCheck className="text-[#6941C6]" />
                      </IconWrapper>
                      Redirect customers from FB Ads using Click to WhatsApp - CTWA
                    </li>
                  </ul>
                </motion.div>
                <motion.div
                  initial="hidden"
                  animate={inView1 ? "visible" : "hidden"}
                  variants={simpleAnimation}
                  className="features-image w-full md:w-1/2 md:mt-0"
                >
                  <img
                    src={feature1}
                    alt="Feature 1"
                    className="w-full h-auto max-w-xs mx-auto"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div
                  className="flex flex-col gap-4 bg-[#F3EEFF] shadow-lg rounded-lg px-16 pt-10 w-full md:w-6/12 mx-auto"
                  ref={ref2}
                >
                  <motion.div
                    initial="hidden"
                    animate={inView3 ? "visible" : "hidden"}
                    variants={simpleAnimation}
                    className="features-text text-left"
                  >
                    <div className="icon bg-[#FC5F36] rounded-full p-2 inline-block">
                      <MdOutlineEmail size={30} className="text-white-100" />
                    </div>
                    <h5 className="text-xl md:text-2xl font-semibold mt-4">
                      Automate your customer support
                    </h5>
                    <p className="text-gray-600 text-sm md:text-base mt-2 leading-relaxed">
                      Use WhatsApp flows to create interactive customer experiences.
                    </p>
                    <ul className="features-list text-sm md:text-base text-black-100 space-y-2 mt-4">
                      <li className="flex items-center">
                        <IconWrapper>
                          <MdCheck className="text-[#6941C6]" />
                        </IconWrapper>
                        Leverage automation to move fast
                      </li>
                      <li className="flex items-center">
                        <IconWrapper>
                          <MdCheck className="text-[#6941C6]" />
                        </IconWrapper>
                        Always give customers a human to chat to
                      </li>
                      <li className="flex items-center">
                        <IconWrapper>
                          <MdCheck className="text-[#6941C6]" />
                        </IconWrapper>
                        Automate customer support and close leads faster
                      </li>
                    </ul>
                  </motion.div>
                  <motion.div
                    initial="hidden"
                    animate={inView2 ? "visible" : "hidden"}
                    variants={simpleAnimation}
                    className="features-image"
                  >
                    <img
                      src={feature2}
                      alt="Feature 2"
                      className="w-full h-auto max-w-xs mx-auto"
                    />
                  </motion.div>
                </div>

                <div
                  className="flex flex-col gap-4 bg-[#FFFCEB] shadow-lg rounded-lg px-16 pt-10 w-full md:w-6/12 mx-auto"
                  ref={ref3}
                >
                  <motion.div
                    initial="hidden"
                    animate={inView3 ? "visible" : "hidden"}
                    variants={simpleAnimation}
                    className="features-text text-left"
                  >
                    <div className="icon bg-[#11057E] rounded-full p-2 inline-block">
                      <MdOutlineEmail size={30} className="text-white-100" />
                    </div>
                    <h5 className="text-xl md:text-2xl font-semibold mt-4">
                      Nudge Customers with the right message to boost sales revenue
                    </h5>
                    <p className="text-gray-600 text-sm md:text-base mt-2 leading-relaxed">
                      Use WhatsApp flows to create interactive customer experiences.
                    </p>
                    <ul className="features-list text-sm md:text-base text-black-100 space-y-2 mt-4">
                      <li className="flex items-center">
                        <IconWrapper>
                          <MdCheck className="text-[#6941C6]" />
                        </IconWrapper>
                        Increase your online sales with timely nudges
                      </li>
                      <li className="flex items-center">
                        <IconWrapper>
                          <MdCheck className="text-[#6941C6]" />
                        </IconWrapper>
                        Use WhatsApp flows to create interactive customer experiences
                      </li>
                    </ul>
                  </motion.div>
                  <motion.div
                    initial="hidden"
                    animate={inView4 ? "visible" : "hidden"}
                    variants={simpleAnimation}
                    className="features-image"
                  >
                    <img
                      src={feature3}
                      alt="Feature 3"
                      className="w-full h-auto max-w-xs mx-auto pt-14"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
            <div className=" w-[99vw]">
              <div className="sticky flex-none w-[250px] h-20">
                <img src={left} alt="Left Side" className="w-full" />
              </div>
              <div
                className="flex-1 flex flex-col justify-center items-center text-center "
                ref={ref4}
              >
                <h5 className="text-2xl md:text-3xl font-bold leading-tight">
                  Cutting-edge features for advanced analytics
                </h5>
                <p className="text-gray-600 text-sm md:text-base mt-4 mx-auto max-w-[90%] md:max-w-[40rem] leading-relaxed">
                  Powerful, self-serve product and growth analytics to help you
                  convert, engage, and retain more users. Trusted by over 4,000
                  startups.
                </p>

                <motion.div
                  initial="hidden"
                  animate={inView4 ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.5 } },
                  }}
                  className="mt-6"
                >
                  <img
                    src={feature4}
                    alt="Feature 4"
                    className="mx-auto w-full max-w-[80vw] max-h-[80vh] mb-5"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
