/**
 * Formats a date to "DD MMM YYYY HH:mm:ss" format
 * @example formatDateForAPI(new Date()) // "25 Nov 2025 14:30:45"
 */
export const formatDateForAPI = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0")
  const month = date.toLocaleString("en-US", { month: "short" })
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`
}

/**
 * Sets a date to the start of the day (00:00:00)
 * @example setStartOfDay(new Date("2025-11-25")) // 2025-11-25 00:00:00
 */
export const setStartOfDay = (date: Date): Date => {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

/**
 * Sets a date to the end of the day (23:59:59)
 * @example setEndOfDay(new Date("2025-11-25")) // 2025-11-25 23:59:59
 */
export const setEndOfDay = (date: Date): Date => {
  const newDate = new Date(date)
  newDate.setHours(23, 59, 59, 999)
  return newDate
}

/**
 * Parses a date string or Date object and returns a Date
 * @example parseDate("2025-11-25") // Date object
 */
export const parseDate = (dateInput: string | Date): Date => {
  return dateInput instanceof Date ? dateInput : new Date(dateInput)
}
