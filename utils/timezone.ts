/**
 * Utility functions for handling timezone conversions and date calculations
 */

// Philippines timezone offset (UTC+8)
export const PHILIPPINES_TIMEZONE_OFFSET = 8 * 60 * 60 * 1000 // 8 hours in milliseconds

/**
 * Convert a date to Philippines timezone
 * @param date - The date to convert
 * @returns Date object adjusted to Philippines timezone
 */
export function toPhilippinesTime(date: Date): Date {
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000
  return new Date(utc + PHILIPPINES_TIMEZONE_OFFSET)
}

/**
 * Get current time in Philippines timezone
 * @returns Current date/time in Philippines timezone
 */
export function getCurrentPhilippinesTime(): Date {
  return toPhilippinesTime(new Date())
}

/**
 * Calculate precise time difference between two dates
 * @param targetDate - The target date
 * @param currentDate - The current date (optional, defaults to now)
 * @returns Object with days, hours, minutes, seconds, and total milliseconds
 */
export function calculateTimeDifference(targetDate: Date, currentDate?: Date) {
  const now = currentDate || new Date()
  const target = new Date(targetDate)

  // Ensure we're working with UTC times for accuracy
  const currentUTC = now.getTime() + now.getTimezoneOffset() * 60 * 1000
  const targetUTC = target.getTime()

  const difference = targetUTC - currentUTC

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMilliseconds: 0,
      isExpired: true,
    }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    totalMilliseconds: difference,
    isExpired: false,
  }
}

/**
 * Format a number to always show two digits with leading zero if needed
 * @param num - The number to format
 * @returns String with leading zero if needed
 */
export function formatTwoDigits(num: number): string {
  return num.toString().padStart(2, "0")
}

/**
 * Validate if a date is in the future
 * @param date - The date to validate
 * @returns Boolean indicating if the date is in the future
 */
export function isDateInFuture(date: Date): boolean {
  return date.getTime() > Date.now()
}
