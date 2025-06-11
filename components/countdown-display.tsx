"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import Counter from "./counter"
import { useIsMobile } from "@/components/ui/use-mobile"

interface CountdownDisplayProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
  totalMilliseconds: number
}

// Philippines timezone offset (UTC+8)
const PHILIPPINES_TIMEZONE_OFFSET = 8 * 60 * 60 * 1000 // 8 hours in milliseconds

export default function CountdownDisplay({ targetDate }: CountdownDisplayProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    totalMilliseconds: 0,
  })

  const [mounted, setMounted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateRef = useRef<number>(0)
  const isMobile = useIsMobile()

  // Memoized calculation function for better performance
  const calculateTimeLeft = useCallback((): TimeLeft => {
    try {
      // Get current time in UTC
      const now = new Date()
      const currentUTC = now.getTime() + now.getTimezoneOffset() * 60 * 1000

      // Convert target date to Philippines time if it's not already
      const targetTime = new Date(targetDate)
      let targetUTC: number

      // Check if the target date already includes timezone info
      if (targetDate.toString().includes("+08") || targetDate.toString().includes("GMT+0800")) {
        targetUTC = targetTime.getTime()
      } else {
        // Assume the target date is in Philippines time and convert to UTC
        targetUTC = targetTime.getTime() - PHILIPPINES_TIMEZONE_OFFSET
      }

      // Calculate the difference in milliseconds
      const difference = targetUTC - currentUTC

      // Store the last update time for debugging
      lastUpdateRef.current = currentUTC

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          totalMilliseconds: 0,
        }
      }

      // Calculate each time unit with proper rounding
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return {
        days: Math.max(0, days),
        hours: Math.max(0, hours),
        minutes: Math.max(0, minutes),
        seconds: Math.max(0, seconds),
        isExpired: false,
        totalMilliseconds: difference,
      }
    } catch (error) {
      console.error("Error calculating time left:", error)
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false,
        totalMilliseconds: 0,
      }
    }
  }, [targetDate])

  // Initialize component
  useEffect(() => {
    setMounted(true)
    // Initial calculation
    setTimeLeft(calculateTimeLeft())
  }, [calculateTimeLeft])

  // Set up the interval for real-time updates
  useEffect(() => {
    if (!mounted) return

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Create a new interval that updates every second
    intervalRef.current = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft((prevTimeLeft) => {
        // Only update if there's actually a change to prevent unnecessary re-renders
        if (
          prevTimeLeft.days !== newTimeLeft.days ||
          prevTimeLeft.hours !== newTimeLeft.hours ||
          prevTimeLeft.minutes !== newTimeLeft.minutes ||
          prevTimeLeft.seconds !== newTimeLeft.seconds ||
          prevTimeLeft.isExpired !== newTimeLeft.isExpired
        ) {
          return newTimeLeft
        }
        return prevTimeLeft
      })
    }, 1000) // Update every second

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [mounted, calculateTimeLeft])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Calculate the appropriate font size based on screen size
  const getFontSize = () => {
    if (isMobile) return 50 // Mobile
    return 80 // Desktop
  }

  const fontSize = mounted ? getFontSize() : 60
  const padding = Math.floor(fontSize * 0.1)
  const gap = Math.floor(fontSize * 0.15)

  // Common styles for all counters
  const commonContainerStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  const commonCounterStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  }

  // Gradient colors for each counter
  const gradients = {
    days: { from: "rgba(69, 28, 32, 0.8)", to: "transparent" },
    hours: { from: "rgba(89, 11, 24, 0.8)", to: "transparent" },
    minutes: { from: "rgba(255, 193, 120, 0.8)", to: "transparent" },
    seconds: { from: "rgba(207, 184, 140, 0.8)", to: "transparent" },
  }

  // Handle expired countdown
  if (timeLeft.isExpired) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <div className="bg-gradient-to-br from-burgundy to-wine text-white rounded-3xl p-8 shadow-2xl max-w-md mx-auto">
          <h3 className="text-2xl font-serif mb-4">🎉 The Big Day is Here! 🎉</h3>
          <p className="text-lg">Jackey & Jan are getting married today!</p>
        </div>
      </motion.div>
    )
  }

  // Format numbers to always show two digits with leading zeros
  const formatTwoDigits = (num: number): number => {
    return num // The Counter component will handle the two-digit display
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
      {/* Days Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col items-center"
      >
        <div className="bg-gradient-to-br from-burgundy to-wine rounded-3xl p-4 shadow-2xl w-full">
          <Counter
            value={timeLeft.days}
            fontSize={fontSize}
            padding={padding}
            places={[100, 10, 1]} // Support up to 3 digits for days
            gap={gap}
            textColor="white"
            fontWeight={700}
            borderRadius={16}
            horizontalPadding={16}
            containerStyle={commonContainerStyle}
            counterStyle={commonCounterStyle}
            gradientHeight={Math.floor(fontSize * 0.25)}
            gradientFrom={gradients.days.from}
            gradientTo={gradients.days.to}
          />
        </div>
        <div className="text-sm uppercase tracking-wider text-wine font-medium mt-3">Days</div>
      </motion.div>

      {/* Hours Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <div className="bg-gradient-to-br from-wine to-burgundy rounded-3xl p-4 shadow-2xl w-full">
          <Counter
            value={timeLeft.hours}
            fontSize={fontSize}
            padding={padding}
            places={[10, 1]} // Always show two digits for hours
            gap={gap}
            textColor="white"
            fontWeight={700}
            borderRadius={16}
            horizontalPadding={16}
            containerStyle={commonContainerStyle}
            counterStyle={commonCounterStyle}
            gradientHeight={Math.floor(fontSize * 0.25)}
            gradientFrom={gradients.hours.from}
            gradientTo={gradients.hours.to}
          />
        </div>
        <div className="text-sm uppercase tracking-wider text-wine font-medium mt-3">Hours</div>
      </motion.div>

      {/* Minutes Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col items-center"
      >
        <div className="bg-gradient-to-br from-gold to-beige rounded-3xl p-4 shadow-2xl w-full">
          <Counter
            value={timeLeft.minutes}
            fontSize={fontSize}
            padding={padding}
            places={[10, 1]} // Always show two digits for minutes
            gap={gap}
            textColor="white"
            fontWeight={700}
            borderRadius={16}
            horizontalPadding={16}
            containerStyle={commonContainerStyle}
            counterStyle={commonCounterStyle}
            gradientHeight={Math.floor(fontSize * 0.25)}
            gradientFrom={gradients.minutes.from}
            gradientTo={gradients.minutes.to}
          />
        </div>
        <div className="text-sm uppercase tracking-wider text-wine font-medium mt-3">Minutes</div>
      </motion.div>

      {/* Seconds Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="bg-gradient-to-br from-beige to-gold rounded-3xl p-4 shadow-2xl w-full">
          <Counter
            value={timeLeft.seconds}
            fontSize={fontSize}
            padding={padding}
            places={[10, 1]} // Always show two digits for seconds
            gap={gap}
            textColor="white"
            fontWeight={700}
            borderRadius={16}
            horizontalPadding={16}
            containerStyle={commonContainerStyle}
            counterStyle={commonCounterStyle}
            gradientHeight={Math.floor(fontSize * 0.25)}
            gradientFrom={gradients.seconds.from}
            gradientTo={gradients.seconds.to}
          />
        </div>
        <div className="text-sm uppercase tracking-wider text-wine font-medium mt-3">Seconds</div>
      </motion.div>

      {/* Debug Information (only in development) */}
      {/* {process.env.NODE_ENV === "development" && (
        <div className="col-span-full text-xs text-gray-500 text-center mt-4">
          <p>Target: {targetDate.toLocaleString()}</p>
          <p>Current: {new Date().toLocaleString()}</p>
          <p>Remaining: {Math.floor(timeLeft.totalMilliseconds / 1000)} seconds</p>
        </div>
      )} */}
    </div>
  )
}
