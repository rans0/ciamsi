import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Fortune } from '../../types/fortune'
import { isGoodFortune } from '../../utils/fortune'

interface ValidationProps {
  fortuneNumber: number
  fortuneData: Fortune
  onValidated: () => void
}

export function Validation({ fortuneNumber, fortuneData, onValidated }: ValidationProps) {
  const [hasRevealed, setHasRevealed] = useState(false)

  const shouldFlipBowl = useMemo(() => isGoodFortune(fortuneData), [fortuneData])
  const prefersReducedMotion = useReducedMotion()

  const handleReveal = () => {
    if (hasRevealed) return
    setHasRevealed(true)
    setTimeout(() => onValidated(), 1500)
  }

  return (
    <motion.div
      className="validation-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="validation-content">
        <motion.h2
          className="validation-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Confirmation Required
        </motion.h2>

        <motion.div
          className="fallen-stick"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <div className="stick-number">#{fortuneNumber}</div>
          <div className="stick-title">{fortuneData.title_english}</div>
        </motion.div>

        <motion.p
          className="validation-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          The spirits have selected your fortune. Tap to reveal.
        </motion.p>

        <motion.div
          className="bowl-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={handleReveal}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleReveal()
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Tap to reveal fortune"
          aria-live="polite"
          aria-atomic="true"
        >
          <motion.div
            className="bowl-pair"
            animate={{
              rotateX: hasRevealed && shouldFlipBowl && !prefersReducedMotion ? 180 : 0,
              opacity: hasRevealed ? 1 : 0.9
            }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="bowl-poe bowl-poe-left"
              animate={hasRevealed ? { scale: 1, y: 0 } : { scale: 0.95, y: 5 }}
              transition={{ delay: hasRevealed ? 0.2 : 0 }}
            />
            <motion.div
              className="bowl-poe bowl-poe-right"
              animate={hasRevealed ? { scale: 1, y: 0 } : { scale: 0.95, y: 5 }}
              transition={{ delay: hasRevealed ? 0.2 : 0 }}
            />
          </motion.div>

          {hasRevealed && (
            <motion.div
              className="fortune-reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shouldFlipBowl ? 0.5 : 0.3 }}
            >
              <span className="reveal-number">#{fortuneNumber}</span>
            </motion.div>
          )}
        </motion.div>

        {!hasRevealed && (
          <motion.p
            className="tap-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Tap the bowl to reveal your fortune
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
