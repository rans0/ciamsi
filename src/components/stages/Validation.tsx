import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Fortune } from '../../types/fortune'

interface ValidationProps {
  fortuneNumber: number
  fortuneData: Fortune
  onValidated: () => void
}

export function Validation({ fortuneNumber, fortuneData, onValidated }: ValidationProps) {
  const [attempts, setAttempts] = useState(0)
  const [poeResult, setPoeResult] = useState<'valid' | 'xiao-bei' | 'no-bei' | null>(null)
  const [isThrowing, setIsThrowing] = useState(false)

  const MAX_ATTEMPTS = 3

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
          The spirits must confirm this answer. Throw the Poe blocks.
        </motion.p>

        <motion.div
          className="poe-blocks-container"
          animate={isThrowing ? { y: [-10, -100, 10] } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="poe-block poe-left" />
          <div className="poe-block poe-right" />
        </motion.div>

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

        {!poeResult && (
          <motion.button
            className="throw-button"
            onClick={throwPoe}
            disabled={isThrowing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isThrowing ? 'Throwing...' : 'Throw Poe'}
          </motion.button>
        )}

        {poeResult && poeResult !== 'valid' && attempts < MAX_ATTEMPTS && (
          <motion.button
            className="retry-button"
            onClick={throwPoe}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Try Again ({attempts}/{MAX_ATTEMPTS})
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
