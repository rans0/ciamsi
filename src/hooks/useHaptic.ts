import { useEffect, useRef } from 'react'

type HapticPattern =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'success'
  | 'warning'
  | 'error'
  | 'selection'
  | 'impact'

interface HapticFeedbackOptions {
  intensity?: number
  duration?: number
}

// Pattern definitions (in milliseconds)
const HAPTIC_PATTERNS: Record<HapticPattern, number[]> = {
  light: [10],
  medium: [20],
  heavy: [30],
  success: [10, 50, 10],
  warning: [20, 50, 20],
  error: [30, 50, 30],
  selection: [5],
  impact: [15]
}

export function useHaptic() {
  const isSupported = useRef('vibrate' in navigator)

  useEffect(() => {
    isSupported.current = 'vibrate' in navigator
  }, [])

  const trigger = (
    pattern: HapticPattern = 'medium',
    options?: HapticFeedbackOptions
  ): boolean => {
    if (!isSupported.current) {
      return false
    }

    try {
      const vibrationPattern = HAPTIC_PATTERNS[pattern]

      if (options?.intensity !== undefined) {
        // Adjust duration based on intensity (0-1)
        const intensity = options.intensity ?? 1
        const adjustedPattern = vibrationPattern.map(duration =>
          Math.round(duration * intensity)
        )
        return navigator.vibrate(adjustedPattern)
      }

      if (options?.duration !== undefined) {
        return navigator.vibrate(options.duration)
      }

      return navigator.vibrate(vibrationPattern)
    } catch (error) {
      console.warn('Haptic feedback error:', error)
      return false
    }
  }

  const light = () => trigger('light')
  const medium = () => trigger('medium')
  const heavy = () => trigger('heavy')
  const success = () => trigger('success')
  const warning = () => trigger('warning')
  const error = () => trigger('error')
  const selection = () => trigger('selection')
  const impact = () => trigger('impact')

  const custom = (pattern: number | number[]) => {
    if (!isSupported.current) return false
    try {
      return navigator.vibrate(pattern)
    } catch {
      return false
    }
  }

  const stop = () => {
    if (!isSupported.current) return
    try {
      navigator.vibrate(0)
    } catch {
      // Ignore
    }
  }

  return {
    trigger,
    light,
    medium,
    heavy,
    success,
    warning,
    error,
    selection,
    impact,
    custom,
    stop,
    isSupported: isSupported.current
  }
}

