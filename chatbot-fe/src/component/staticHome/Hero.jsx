import React from "react"
// import slick1 from "../../images/1.png"
// import slick2 from "../../images/2.png"
// import slick3 from "../../images/3.png"
// import slick4 from "../../images/4.png"
// import slick5 from "../../images/5.png"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import homebg from "../../images/homebg.png"
import right from "../../images/right.png"
import "slick-carousel/slick/slick.css"
const Hero = () => {
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 1200,
  //   slidesToShow: 7,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 1000,
  //   responsive: [
  //     {
  //       breakpoint: 1200,
  //       settings: {
  //         slidesToShow: 5,
  //       },
  //     },
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 4,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 576,
  //       settings: {
  //         slidesToShow: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // }

  return (
    <div>
      <div
        className="bg-cover bg-center h-[90vh] w-full flex items-start justify-center relative"
        style={{ backgroundImage: `url(${homebg})` }}
      >
        <div className="bg-white p-6 flex flex-col gap-4 text-center items-center w-full md:w-3/5 mx-auto">
          <p className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-snug md:leading-tight lg:leading-tight w-full mt-6">
            Create powerful conversations with WhatsApp API solution
          </p>

          {/* <h6 className="text-lg w-3/5">
              Clarity gives you the blocks & components you need to create a truly
              professional website, landing page, or admin panel for your SaaS.
            </h6>
            <button className="bg-[#fc5f36] text-white-100 py-2 px-6 rounded w-40">
              LEARN MORE
            </button> */}
        </div>
        <img
          src={right}
          alt="Right Side"
          className="absolute top-[85%] right-0 w-[200px] md:w-[260px] h-auto md:translate-x-0 "
        />
      </div>

      {/* <div className="w-full flex justify-center items-center mt-4 md:mt-8 h-[10rem]">
          <div className="w-[90%] mx-auto">
            <Slider {...settings}>
              {[
                { src: slick1, alt: "Slide 1" },
                { src: slick2, alt: "Slide 2" },
                { src: slick3, alt: "Slide 3" },
                { src: slick4, alt: "Slide 4" },
                { src: slick5, alt: "Slide 5" },
                { src: slick2, alt: "Slide 6" },
                { src: slick1, alt: "Slide 7" },
              ].map((slide, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex justify-center"
                >
                  <motion.img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full max-w-[120px] md:max-w-[150px] lg:max-w-[180px] rounded-lg"
                  />
                </motion.div>
              ))}
            </Slider>
          </div>
        </div> */}
    </div>
  )
}

export default Hero
