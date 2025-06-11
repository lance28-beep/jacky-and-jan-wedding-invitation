"use client"

import type React from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { useIsMobile } from "@/components/ui/use-mobile"

interface CardRotateProps {
  children: React.ReactNode
  onSendToBack: () => void
  sensitivity: number
  onDragStart: () => void
  onDragEnd: () => void
}

function CardRotate({ children, onSendToBack, sensitivity, onDragStart, onDragEnd }: CardRotateProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [60, -60])
  const rotateY = useTransform(x, [-100, 100], [-60, 60])

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack()
    } else {
      x.set(0)
      y.set(0)
    }
    onDragEnd()
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  )
}

interface StackProps {
  randomRotation?: boolean
  sensitivity?: number
  cardDimensions?: { width: number; height: number }
  sendToBackOnClick?: boolean
  cardsData?: { id: number; img: string }[]
  animationConfig?: { stiffness: number; damping: number }
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
}: StackProps) {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          {
            id: 1,
            img: "/couple_image/image_2.png",
          },
          {
            id: 2,
            img: "/couple_image/image_1.png",
          },
          {
            id: 3,
            img: "/couple_image/image_3.png",
          },
          {
            id: 4,
            img: "/couple_image/image_4.png",
          },
        ],
  )

  // Responsive card dimensions
  const getResponsiveCardDimensions = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 480) {
        return { width: 250, height: 250 }
      }
      if (window.innerWidth < 768) {
        return { width: 250, height: 250 }
      }
    }
    return cardDimensions
  }

  const [responsiveCardDimensions, setResponsiveCardDimensions] = useState(cardDimensions)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setResponsiveCardDimensions(getResponsiveCardDimensions())
    }

    // Set initial dimensions
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [cardDimensions])

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev]
      const index = newCards.findIndex((card) => card.id === id)
      const [card] = newCards.splice(index, 1)
      newCards.unshift(card)
      return newCards
    })
  }

  // Pre-calculate random rotations to ensure consistency
  const randomRotations = useMemo(() => {
    if (!mounted || !randomRotation) return cards.map(() => 0)
    return cards.map(() => Math.random() * 10 - 5)
  }, [mounted, randomRotation, cards.length])

  if (!mounted) {
    return (
      <div
        className="relative"
        style={{
          width: responsiveCardDimensions.width,
          height: responsiveCardDimensions.height,
          perspective: 600,
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="absolute rounded-2xl overflow-hidden border-4 border-white shadow-xl"
            style={{
              width: responsiveCardDimensions.width,
              height: responsiveCardDimensions.height,
              transform: `rotateZ(${(cards.length - index - 1) * 4}deg) scale(${1 + index * 0.06 - cards.length * 0.06})`,
              transformOrigin: "90% 90%",
            }}
          >
            <img
              src={card.img || "/placeholder.svg"}
              alt={`card-${card.id}`}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="relative"
      style={{
        width: responsiveCardDimensions.width,
        height: responsiveCardDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => (
        <CardRotate 
          key={card.id} 
          onSendToBack={() => sendToBack(card.id)} 
          sensitivity={sensitivity}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          <motion.div
            className="rounded-2xl overflow-hidden border-4 border-white shadow-xl"
            onClick={() => sendToBackOnClick && sendToBack(card.id)}
            animate={{
              rotateZ: (cards.length - index - 1) * 4 + randomRotations[index],
              scale: 1 + index * 0.06 - cards.length * 0.06,
              transformOrigin: "90% 90%",
              y: isDragging && index > 0 ? -20 : 0,
            }}
            initial={false}
            transition={{
              type: "spring",
              stiffness: animationConfig.stiffness,
              damping: animationConfig.damping,
            }}
            style={{
              width: responsiveCardDimensions.width,
              height: responsiveCardDimensions.height,
            }}
          >
            <img
              src={card.img || "/placeholder.svg"}
              alt={`card-${card.id}`}
              className="w-full h-full object-cover pointer-events-none"
            />
          </motion.div>
        </CardRotate>
      ))}
    </div>
  )
}
