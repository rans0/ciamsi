import { motion } from 'framer-motion'

interface EntranceProps {
  onEnter: () => void
}

export function Entrance({ onEnter }: EntranceProps) {
  return (
    <motion.div
      className="entrance-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="entrance-content">
        <motion.div
          className="temple-gate"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className="temple-title">Ciam Si</h1>
          <p className="temple-subtitle">觀音靈籤</p>
        </motion.div>

        <motion.p
          className="entrance-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Quiet your heart. Think of one question or wish you wish to ask.
        </motion.p>

        <motion.button
          className="enter-button"
          onClick={onEnter}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter Temple
        </motion.button>
      </div>

      <div className="smoke-effect" />
    </motion.div>
  )
}
