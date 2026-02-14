import { LuckyElements } from '../types/fortune'

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export function calculateLucky(fortuneNumber: number, date: Date = new Date()): LuckyElements {
  const dayOfYear = getDayOfYear(date)

  // Lucky Number: (fortune number + day of year) % 9 + 1
  const luckyNumber = ((fortuneNumber + dayOfYear) % 9) + 1

  // Lucky Direction: 8 directions
  const directions = ['North', 'Northeast', 'East', 'Southeast',
                      'South', 'Southwest', 'West', 'Northwest']
  const directionIndex = (fortuneNumber + dayOfYear) % 8
  const luckyDirection = directions[directionIndex]

  // Lucky Color: 5 traditional Chinese colors
  const colors = ['Red', 'Gold', 'Green', 'White', 'Black']
  const colorIndex = (fortuneNumber + dayOfYear) % 5
  const luckyColor = colors[colorIndex]

  return { luckyNumber, luckyDirection, luckyColor }
}
