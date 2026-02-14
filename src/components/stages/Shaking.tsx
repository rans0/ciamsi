import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useDeviceMotion } from '../../hooks/useDeviceMotion'
import { useHaptic } from '../../hooks/useHaptic'

interface ShakingProps {
  onComplete: (fortuneNumber: number) => void
}

const MIN_ATTEMPTS = 3
const MAX_ATTEMPTS = 20

export function Shaking({ onComplete }: ShakingProps) {
  const [tapCount, setTapCount] = useState(0)
  const [isShaking, setIsShaking] = useState(false)
  const [inputMethod, setInputMethod] = useState<'tap' | 'motion' | null>(null)

  const deviceMotion = useDeviceMotion()
  const haptic = useHaptic()

  const maxAttempts = useMemo(
    () => Math.floor(Math.random() * (MAX_ATTEMPTS - MIN_ATTEMPTS + 1)) + MIN_ATTEMPTS,
    []
  )

  // Handle device motion completion
  useEffect(() => {
    if (deviceMotion.isSupported && deviceMotion.shakeCount >= maxAttempts && inputMethod !== 'tap') {
      setInputMethod('motion')
      haptic.success()
      setTimeout(() => {
        const fortuneNumber = Math.floor(Math.random() * 100) + 1
        onComplete(fortuneNumber)
      }, 500)
    }
  }, [deviceMotion.shakeCount, deviceMotion.isSupported, inputMethod, haptic, onComplete, maxAttempts])

  // Manual tap handler (for desktop or when device motion isn't available)
  const handleTap = useCallback(() => {
    if (inputMethod === 'motion') return // Don't allow tap if motion was used

    setInputMethod('tap')
    setTapCount(prev => prev + 1)
    setIsShaking(true)
    haptic.medium()

    // After required taps, complete
    if (tapCount + 1 >= maxAttempts) {
      setTimeout(() => {
        haptic.success()
        const fortuneNumber = Math.floor(Math.random() * 100) + 1
        onComplete(fortuneNumber)
      }, 500)
    }

    setTimeout(() => setIsShaking(false), 200)
  }, [tapCount, inputMethod, haptic, onComplete, maxAttempts])

  // Keyboard handler (spacebar)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !event.repeat) {
        event.preventDefault()
        handleTap()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleTap])

  const isComplete = inputMethod === 'motion'
    ? deviceMotion.shakeCount >= maxAttempts
    : tapCount >= maxAttempts

  return (
    <motion.div
      className="shaking-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="shaking-content">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="shaking-title"
        >
          Shake Cylinder
        </motion.h2>

        <motion.p
          className="shaking-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {!inputMethod ? (
            deviceMotion.isSupported
              ? 'Shake your device or tap to shake'
              : 'Tap cylinder to shake'
          ) : isComplete ? (
            'Almost there...'
          ) : inputMethod === 'motion' ? (
            'Keep shaking...'
          ) : (
            'Tap cylinder to shake'
          )}
        </motion.p>

        <motion.div
          className="cylinder-container"
          animate={
            isShaking || deviceMotion.isShaking
              ? { rotate: [-3, 3, -3, 0], y: [-2, 2, -2, 0] }
              : {}
          }
          transition={{ duration: 0.3 }}
          onClick={handleTap}
          whileHover={{ scale: inputMethod === 'motion' ? 1 : 1.05 }}
          whileTap={{ scale: inputMethod === 'motion' ? 1 : 0.95 }}
          style={{ cursor: inputMethod === 'motion' ? 'default' : 'pointer' }}
        >
          <div className="bamboo-cylinder">
            <div className="cylinder-top" />
            <div className="cylinder-body">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="bamboo-segment" />
              ))}
            </div>
            <div className="cylinder-bottom" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}
