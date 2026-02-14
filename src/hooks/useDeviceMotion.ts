import { useState, useEffect, useRef, useCallback } from 'react'

interface DeviceMotionState {
  isShaking: boolean
  shakeCount: number
  progress: number
  isSupported: boolean
}

const SHAKE_THRESHOLD = 15 // Acceleration threshold for shake detection
const REQUIRED_SHAKES = 10 // Number of shakes required to complete
const SHAKE_COOLDOWN = 300 // Cooldown between shake detections (ms)

// Global state to track if permission has been granted
let permissionGranted = false

export function useDeviceMotion(): DeviceMotionState & { reset: () => void; requestPermission: () => Promise<boolean> } {
  const [isShaking, setIsShaking] = useState(false)
  const [shakeCount, setShakeCount] = useState(0)
  const [isSupported, setIsSupported] = useState(false)
  const lastShakeTime = useRef<number>(0)

  // Check if DeviceMotionEvent is supported
  useEffect(() => {
    const supported = 'DeviceMotionEvent' in window
    setIsSupported(supported)

    if (!supported) {
      console.log('DeviceMotionEvent not supported')
    }
  }, [])

  const handleMotion = useCallback((event: DeviceMotionEvent) => {
    const acceleration = event.accelerationIncludingGravity
    if (!acceleration) return

    const currentX = acceleration.x ?? 0
    const currentY = acceleration.y ?? 0
    const currentZ = acceleration.z ?? 0

    // Simplistic but effective shake detection
    const totalAcc = Math.abs(currentX) + Math.abs(currentY) + Math.abs(currentZ)

    if (totalAcc > SHAKE_THRESHOLD * 2) { // Adjusting threshold for sensitivity
      const now = Date.now()
      if (now - lastShakeTime.current > SHAKE_COOLDOWN) {
        lastShakeTime.current = now
        setIsShaking(true)
        setShakeCount(prev => prev + 1)
        setTimeout(() => setIsShaking(false), 200)
      }
    } else {
      setIsShaking(false)
    }
  }, [])

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) return false

    const DeviceMotionEventWithPermission = DeviceMotionEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>
    }

    if (typeof DeviceMotionEventWithPermission.requestPermission === 'function') {
      try {
        const permission = await DeviceMotionEventWithPermission.requestPermission()
        if (permission === 'granted') {
          permissionGranted = true
          window.addEventListener('devicemotion', handleMotion)
          return true
        }
        return false
      } catch (error) {
        console.error('Error requesting device motion permission:', error)
        return false
      }
    } else {
      permissionGranted = true
      window.addEventListener('devicemotion', handleMotion)
      return true
    }
  }

  useEffect(() => {
    if (permissionGranted) {
      window.addEventListener('devicemotion', handleMotion)
    }
    return () => {
      window.removeEventListener('devicemotion', handleMotion)
    }
  }, [handleMotion])

  const reset = () => {
    setShakeCount(0)
    setIsShaking(false)
  }

  return {
    isShaking,
    shakeCount,
    progress: Math.min(shakeCount / REQUIRED_SHAKES, 1),
    isSupported,
    reset,
    requestPermission
  }
}

