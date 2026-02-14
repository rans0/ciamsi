import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDeviceMotion } from '../../hooks/useDeviceMotion'
import { useHaptic } from '../../hooks/useHaptic'

interface ShakingProps {
  onComplete: (fortuneNumber: number) => void
}

const REQUIRED_TAPS = 3
const REQUIRED_DEVICE_SHAKES = 10

export function Shaking({ onComplete }: ShakingProps) {
  const [tapCount, setTapCount] = useState(0)
  const [isShaking, setIsShaking] = useState(false)
  const [inputMethod, setInputMethod] = useState<'tap' | 'motion' | null>(null)

  const deviceMotion = useDeviceMotion()
  const haptic = useHaptic()

  // Handle device motion completion
  useEffect(() => {
    if (deviceMotion.isSupported && deviceMotion.shakeCount >= REQUIRED_DEVICE_SHAKES && inputMethod !== 'tap') {
      setInputMethod('motion')
      haptic.success()
      setTimeout(() => {
        const fortuneNumber = Math.floor(Math.random() * 100) + 1
        onComplete(fortuneNumber)
      }, 500)
    }
  }, [deviceMotion.shakeCount, deviceMotion.isSupported, inputMethod, haptic, onComplete])

  // Manual tap handler (for desktop or when device motion isn't available)
  const handleTap = useCallback(() => {
    if (inputMethod === 'motion') return // Don't allow tap if motion was used

    setInputMethod('tap')
    setTapCount(prev => prev + 1)
    setIsShaking(true)
    haptic.medium()

    // After required taps, complete
    if (tapCount + 1 >= REQUIRED_TAPS) {
      setTimeout(() => {
        haptic.success()
        const fortuneNumber = Math.floor(Math.random() * 100) + 1
        onComplete(fortuneNumber)
      }, 500)
    }

    setTimeout(() => setIsShaking(false), 200)
  }, [tapCount, inputMethod, haptic, onComplete])

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

  // Calculate progress
  const progress = inputMethod === 'motion'
    ? deviceMotion.progress
    : Math.min(tapCount / REQUIRED_TAPS, 1)

  const isComplete = inputMethod === 'motion'
    ? deviceMotion.shakeCount >= REQUIRED_DEVICE_SHAKES
    : tapCount >= REQUIRED_TAPS

  const displayCount = inputMethod === 'motion'
    ? deviceMotion.shakeCount
    : tapCount
  const requiredCount = inputMethod === 'motion'
    ? REQUIRED_DEVICE_SHAKES
    : REQUIRED_TAPS

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

        {/* Progress Bar */}
        <motion.div
          className="shake-progress-container"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="shake-progress-bar">
            <motion.div
              className="shake-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.span
            className="shake-progress-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {Math.round(progress * 100)}%
          </motion.span>
        </motion.div>

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

        <motion.p
          className="shake-counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {displayCount + 1}/{requiredCount}
          {inputMethod === null && deviceMotion.isSupported && (
            <span className="shake-hint"> (shaking or tapping)</span>
          )}
        </motion.p>

      </div>
    </motion.div>
  )
}
