import { useState } from 'react'
import { motion } from 'framer-motion'

interface ShakingProps {
  onComplete: (fortuneNumber: number) => void
}

export function Shaking({ onComplete }: ShakingProps) {
  const [shakeCount, setShakeCount] = useState(0)
  const [isShaking, setIsShaking] = useState(false)

  const handleShake = () => {
    setShakeCount(prev => prev + 1)
    setIsShaking(true)

    // After 3 clicks/taps, complete
    if (shakeCount >= 2) {
      setTimeout(() => {
        const fortuneNumber = Math.floor(Math.random() * 100) + 1
        onComplete(fortuneNumber)
      }, 500)
    }

    setTimeout(() => setIsShaking(false), 200)
  }

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
          {shakeCount < 2 ? 'Tap cylinder to shake it' : 'Almost there...'}
        </motion.p>

        <motion.div
          className="cylinder-container"
          animate={isShaking ? { rotate: [-3, 3, -3, 0] } : {}}
          transition={{ duration: 0.3 }}
          onClick={handleShake}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
          Shakes: {shakeCount + 1}/3
        </motion.p>
      </div>
    </motion.div>
  )
}
