import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Fortune } from '../../types/fortune'
import { isGoodFortune } from '../../utils/fortune'

interface ValidationProps {
  fortuneNumber: number
  fortuneData: Fortune
  onValidated: () => void
}

export function Validation({ fortuneNumber, fortuneData, onValidated }: ValidationProps) {
  const [attempts, setAttempts] = useState(0)
  const [poeResult, setPoeResult] = useState<'valid' | 'xiao-bei' | 'no-bei' | null>(null)
  const [isThrowing, setIsThrowing] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)

  const MAX_ATTEMPTS = 3

  const shouldFlipBowl = useMemo(() => isGoodFortune(fortuneData), [fortuneData])

  const handleReveal = () => {
    if (hasRevealed) return
    setHasRevealed(true)
    setTimeout(() => onValidated(), 1500)
  }

  const throwPoe = () => {
    if (isThrowing) return

    setIsThrowing(true)
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    // Simulate throw animation
    setTimeout(() => {
      const block1 = Math.random() < 0.5 ? 'flat' : 'round'
      const block2 = Math.random() < 0.5 ? 'flat' : 'round'

      let result: 'valid' | 'xiao-bei' | 'no-bei'
      if (block1 !== block2) {
        result = 'valid'
      } else if (block1 === 'flat') {
        result = 'xiao-bei'
      } else {
        result = 'no-bei'
      }

      setPoeResult(result)
      setIsThrowing(false)

      // Auto-validate after max attempts or if valid
      if (result === 'valid') {
        setTimeout(() => onValidated(), 1000)
      } else if (newAttempts >= MAX_ATTEMPTS) {
        setTimeout(() => onValidated(), 2000)
      }
    }, 800)
  }

  const getResultMessage = () => {
    if (!poeResult) return null

    if (poeResult === 'valid') {
      return 'Your fortune is confirmed!'
    }

    if (attempts >= MAX_ATTEMPTS) {
      return 'The ancestors accept your intent. Read your fortune.'
    }

    return poeResult === 'xiao-bei'
      ? 'Not yet confirmed. Throw again.'
      : 'The spirits say wait. Throw once more.'
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
        >
          <motion.div
            className="bowl-pair"
            animate={{
              rotateX: hasRevealed && shouldFlipBowl ? 180 : 0
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
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

        <AnimatePresence mode="wait">
          {poeResult && (
            <motion.div
              key={poeResult + attempts}
              className="result-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {getResultMessage()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
