// CardComponent.js
import React from "react"
import { motion } from "framer-motion"
import styled from "styled-components"
import { CiMail } from "react-icons/ci"
import { BsLightningCharge } from "react-icons/bs"
import { LuBarChart2 } from "react-icons/lu"

// Styled Components for the container and card layout
const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1286px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  max-height: 40vh;
  overflow: auto;
`
const cardBackgroundColors = [
  "#B8A33305", // Card 1 background
  "#7F56D90D", // Card 2 background
  " #AC1B3505", // Card 3 background
  "#B8A33305", // Card 4 background
]
const Card = styled(motion.div)`
  max-width: 22%;
  width: 100%;
  padding: 20px;
  margin: 10px;
  border-radius: 15px;
  text-align: center;
  background-color: #fff;
  position: relative;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-size: contain;
    background-position: left top;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
  }

  &::before {
    ${(props) =>
      props.beforeBackground && `background-image: ${props.beforeBackground};`}
  }

  &::after {
    ${(props) =>
      props.afterBackground && `background-image: ${props.afterBackground};`}
    background-position: left bottom;
    transform: rotate(180deg);
  }

  .icon {
    font-size: 30px;
    margin-bottom: 15px;
    color: #f2994a;
    z-index: 2;
    position: relative;
    background-color: ${(props) => props.bgColor};
    border-radius: 50%; // Make it round
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px; // Adjust size as needed
    height: 50px; // Adjust size as needed
    margin: 0 auto; // Center it in the card
  }
  h3 {
    font-size: 18px;

    font-weight: bold;
    z-index: 2;
    position: relative;
  }

  p {
    font-size: 14px;
    color: #666;
    z-index: 2;
    position: relative;
  }

  @media only screen and (max-width: 1024px) {
    max-width: 42%;
  }

  @media only screen and (max-width: 767px) {
    max-width: 39%;
  }

  @media only screen and (max-width: 480px) {
    max-width: 100%;
  }
`

// Background styles for different cards
// Background styles for different cards with unique SVGs
const cardBackgrounds = {
  "payment-reminders": {
    before:
      "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22268%22 height=%22268%22 viewBox=%220 0 268 268%22 fill=%22none%22%3E%3Cpath d=%22M267.25 1H21C9.95431 1 1 9.9543 1 21V267.25%22 stroke=%22url(%23paint0_radial_24_381)%22 stroke-width=%222%22/%3E%3Cdefs%3E%3CradialGradient id=%22paint0_radial_24_381%22 cx=%220%22 cy=%220%22 r=%221%22 gradientUnits=%22userSpaceOnUse%22 gradientTransform=%22translate(248.5 255.652) rotate(-132.088) scale(343.144 345.783)%22%3E%3Cstop stop-color=%22%23FC5F36%22/%3E%3Cstop offset=%220.225%22 stop-color=%22white%22/%3E%3Cstop offset=%220.48%22 stop-color=%22white%22/%3E%3Cstop offset=%220.762723%22 stop-color=%22white%22/%3E%3Cstop offset=%221%22 stop-color=%22%23FC5F36%22/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E')",
    after:
      "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22268%22 height=%22268%22 viewBox=%220 0 268 268%22 fill=%22none%22%3E%3Cpath d=%22M267.25 1H21C9.95431 1 1 9.9543 1 21V267.25%22 stroke=%22url(%23paint0_radial_24_381)%22 stroke-width=%222%22/%3E%3Cdefs%3E%3CradialGradient id=%22paint0_radial_24_381%22 cx=%220%22 cy=%220%22 r=%221%22 gradientUnits=%22userSpaceOnUse%22 gradientTransform=%22translate(248.5 255.652) rotate(-132.088) scale(343.144 345.783)%22%3E%3Cstop stop-color=%22%23FC5F36%22/%3E%3Cstop offset=%220.225%22 stop-color=%22white%22/%3E%3Cstop offset=%220.48%22 stop-color=%22white%22/%3E%3Cstop offset=%220.762723%22 stop-color=%22white%22/%3E%3Cstop offset=%221%22 stop-color=%22%23FC5F36%22/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E')",
  },
  "agent-chat-support": {
    before:
      "url('data:image/svg+xml,%3Csvg%20width%3D%22268%22%20height%3D%22268%22%20viewBox%3D%220%200%20268%20268%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M267.25%201H21C9.95431%201%201%209.9543%201%2021V267.25%22%20stroke%3D%22url(%23paint0_radial_29_352)%22%20stroke-width%3D%222%22%2F%3E%3Cdefs%3E%3CradialGradient%20id%3D%22paint0_radial_29_352%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate(248.5%20255.652)%20rotate(-132.088)%20scale(343.144%20345.783)%22%3E%3Cstop%20stop-color%3D%22%237F56D9%22%2F%3E%3Cstop%20offset%3D%220.225%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%220.48%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%220.762723%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%237F56D9%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E')",
    after:
      "url('data:image/svg+xml,%3Csvg%20width%3D%22268%22%20height%3D%22268%22%20viewBox%3D%220%200%20268%20268%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M267.25%201H21C9.95431%201%201%209.9543%201%2021V267.25%22%20stroke%3D%22url(%23paint0_radial_29_352)%22%20stroke-width%3D%222%22%2F%3E%3Cdefs%3E%3CradialGradient%20id%3D%22paint0_radial_29_352%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate(248.5%20255.652)%20rotate(-132.088)%20scale(343.144%20345.783)%22%3E%3Cstop%20stop-color%3D%22%237F56D9%22%2F%3E%3Cstop%20offset%3D%220.225%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%220.48%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%220.762723%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%237F56D9%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E')",
  },
  "faq-bot": {
    before:
      "url('data:image/svg+xml,%3Csvg%20width%3D%22268%22%20height%3D%22268%22%20viewBox%3D%220%200%20268%20268%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M267.25%201H21C9.95431%201%201%209.9543%201%2021V267.25%22%20stroke%3D%22url(%23paint0_radial_29_353)%22%20stroke-width%3D%222%22/%3E%3Cdefs%3E%3CradialGradient%20id%3D%22paint0_radial_29_353%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate(248.5%20255.652)%20rotate(-132.088)%20scale(343.144%20345.783)%22%3E%3Cstop%20stop-color%3D%22%23AC1B35%22/%3E%3Cstop%20offset%3D%220.225%22%20stop-color%3D%22white%22/%3E%3Cstop%20offset%3D%220.48%22%20stop-color%3D%22white%22/%3E%3Cstop%20offset%3D%220.762723%22%20stop-color%3D%22white%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23AC1B35%22/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E')",
    after:
      "url('data:image/svg+xml,%3Csvg%20width%3D%22268%22%20height%3D%22268%22%20viewBox%3D%220%200%20268%20268%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M267.25%201H21C9.95431%201%201%209.9543%201%2021V267.25%22%20stroke%3D%22url(%23paint0_radial_29_353)%22%20stroke-width%3D%222%22/%3E%3Cdefs%3E%3CradialGradient%20id%3D%22paint0_radial_29_353%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate(248.5%20255.652)%20rotate(-132.088)%20scale(343.144%20345.783)%22%3E%3Cstop%20stop-color%3D%22%23AC1B35%22/%3E%3Cstop%20offset%3D%220.225%22%20stop-color%3D%22white%22/%3E%3Cstop%20offset%3D%220.48%22%20stop-color%3D%22white%22/%3E%3Cstop%20offset%3D%220.762723%22%20stop-color%3D%22white%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23AC1B35%22/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E')",
  },
  "whatsapp-broadcast": {
    before:
      "url('data:image/svg+xml,%3Csvg%20width%3D%22268%22%20height%3D%22268%22%20viewBox%3D%220%200%20268%20268%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M267.25%201H21C9.95431%201%201%209.9543%201%2021V267.25%22%20stroke%3D%22url(%23paint0_radial_29_354)%22%20stroke-width%3D%222%22%2F%3E%3Cdefs%3E%3CradialGradient%20id%3D%22paint0_radial_29_354%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate(248.5%20255.652)%20rotate(-132.088)%20scale(343.144%20345.783)%22%3E%3Cstop%20stop-color%3D%22%23B8A333%22%2F%3E%3Cstop%20offset%3D%220.225%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%220.48%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%220.762723%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8A333%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E');",
    after:
      "url('data:image/svg+xml,%3Csvg%20width%3D%22268%22%20height%3D%22268%22%20viewBox%3D%220%200%20268%20268%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M267.25%201H21C9.95431%201%201%209.9543%201%2021V267.25%22%20stroke%3D%22url(%23paint0_radial_29_354)%22%20stroke-width%3D%222%22%2F%3E%3Cdefs%3E%3CradialGradient%20id%3D%22paint0_radial_29_354%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate(248.5%20255.652)%20rotate(-132.088)%20scale(343.144%20345.783)%22%3E%3Cstop%20stop-color%3D%22%23B8A333%22%2F%3E%3Cstop%20offset%3D%220.225%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%220.48%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%220.762723%22%20stop-color%3D%22white%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B8A333%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E');",
  },
}

// Sample card data
const cardsData = [
  {
    id: "payment-reminders",
    icon: <CiMail />,
    title: "Payment reminders",
    description:
      "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
  },
  {
    id: "agent-chat-support",
    icon: <CiMail />,
    title: "Agent Chat Support",
    description:
      "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
  },
  {
    id: "faq-bot",
    icon: <BsLightningCharge />,
    title: "FAQ Bot",
    description:
      "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
  },
  {
    id: "whatsapp-broadcast",
    icon: <LuBarChart2 />,
    title: "Message Broadcast",
    description:
      "Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drill down on the data in a couple of clicks.",
  },
]
const iconColors = [
  "rgba(252, 95, 54, 0.10)",
  "rgba(127, 86, 217, 0.10)",
  "rgba(172, 27, 53, 0.10)",
  "rgba(184, 163, 51, 0.10)",
]
const iconHexColors = [
  "#FC5F36", // Icon color
  "#7F56D9", // Icon color
  "#AC1B35", // Icon color
  "#B8A333", // Icon color
]
const Faq = () => {
  return (
    <div className="flex text-end justify-end items-end" style={{ height: "35vh" }}>
      <CardsContainer>
        {cardsData.map((card, index) => (
          <Card
            key={card.id}
            style={{
              backgroundColor: cardBackgroundColors[index],
            }} // Set card background color
            beforeBackground={cardBackgrounds[card.id]?.before}
            afterBackground={cardBackgrounds[card.id]?.after}
            bgColor={iconColors[index]} // Background color for the card
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="icon"
              style={{
                color: iconHexColors[index],
                boxShadow: `0 2px 6px ${iconHexColors[index]}`, // Add box shadow matching the icon color
              }}
            >
              {card.icon}
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </Card>
        ))}
      </CardsContainer>
    </div>
  )
}

export default Faq
