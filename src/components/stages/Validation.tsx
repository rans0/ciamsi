import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Fortune } from '../../types/fortune'
import { isGoodFortune } from '../../utils/fortune'

interface ValidationProps {
  fortuneData: Fortune
  onValidated: () => void
}

const MIN_ATTEMPTS = 3
const MAX_ATTEMPTS = 20

type PoeResult = 'valid' | 'xiao-bei' | 'no-bei'

export function Validation({ fortuneData, onValidated }: ValidationProps) {
  const [attempts, setAttempts] = useState(0)
  const [poeResult, setPoeResult] = useState<PoeResult | null>(null)
  const [isThrowing, setIsThrowing] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)

  const maxAttempts = useMemo(
    () => Math.floor(Math.random() * (MAX_ATTEMPTS - MIN_ATTEMPTS + 1)) + MIN_ATTEMPTS,
    []
  )
  const shouldFlipBowl = useMemo(() => isGoodFortune(fortuneData), [fortuneData])
  const prefersReducedMotion = useReducedMotion()

  const throwPoe = () => {
    if (isThrowing || hasRevealed) return

    setIsThrowing(true)
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    // Simulate throw animation
    setTimeout(() => {
      const block1 = Math.random() < 0.5 ? 'flat' : 'round'
      const block2 = Math.random() < 0.5 ? 'flat' : 'round'

      let result: PoeResult
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
        setTimeout(() => {
          setHasRevealed(true)
          setTimeout(() => onValidated(), 1500)
        }, 800)
      } else if (newAttempts >= maxAttempts) {
        setTimeout(() => {
          setHasRevealed(true)
          setTimeout(() => onValidated(), 2000)
        }, 1000)
      }
    }, 800)
  }

  const getResultMessage = () => {
    if (!poeResult) return null

    if (poeResult === 'valid') {
      return 'Your fortune is confirmed!'
    }

    if (attempts >= maxAttempts) {
      return 'The ancestors accept your intent. Read your fortune.'
    }

    return poeResult === 'xiao-bei'
      ? 'Not yet confirmed. Tap the bowl to throw again.'
      : 'The spirits say wait. Tap the bowl to throw again.'
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
          <div className="stick-title">{fortuneData.title_english}</div>
        </motion.div>

        <motion.p
          className="validation-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {!hasRevealed ? (poeResult
            ? getResultMessage()
            : 'The spirits must confirm this answer. Tap the bowl to throw the Poe blocks.'
          ) : 'Revealing your fortune...'}
        </motion.p>

        <motion.div
          className="bowl-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={throwPoe}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              throwPoe()
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={hasRevealed ? 'Fortune revealed' : poeResult ? 'Throw Poe again' : 'Throw Poe blocks'}
          aria-live="polite"
          aria-atomic="true"
        >
          <motion.div
            className="bowl-pair"
            animate={{
              rotateX: hasRevealed && shouldFlipBowl && !prefersReducedMotion ? 180 : 0,
              opacity: hasRevealed ? 1 : 0.9,
            }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="bowl-poe bowl-poe-left"
              animate={isThrowing ? { y: [-10, -100, 10] } : hasRevealed ? { scale: 1, y: 0 } : { scale: 0.95, y: 5 }}
              transition={{ duration: isThrowing ? 0.8 : 0.2 }}
            />
            <motion.div
              className="bowl-poe bowl-poe-right"
              animate={isThrowing ? { y: [-10, -100, 10] } : hasRevealed ? { scale: 1, y: 0 } : { scale: 0.95, y: 5 }}
              transition={{ duration: isThrowing ? 0.8 : 0.2 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
