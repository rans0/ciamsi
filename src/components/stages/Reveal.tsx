import { motion } from 'framer-motion'
import { Fortune } from '../../types/fortune'
import { getFortuneGrade } from '../../utils/fortune'
import { calculateLucky } from '../../utils/lucky'

interface RevealProps {
  fortuneData: Fortune
  onShare: () => void
}

export function Reveal({ fortuneData, onShare }: RevealProps) {
  const grade = getFortuneGrade(fortuneData)
  const lucky = calculateLucky(fortuneData.number)

  const getGradeLabel = () => {
    switch (grade) {
      case 'supreme': return 'Supreme Fortune'
      case 'superior': return 'Superior Fortune'
      case 'medium': return 'Medium Fortune'
      case 'low': return 'Small Fortune'
      case 'warning': return 'Caution Advised'
    }
  }

  const getGradeColor = () => {
    switch (grade) {
      case 'supreme': return '#FFD700'
      case 'superior': return '#FFA500'
      case 'medium': return '#87CEEB'
      case 'low': return '#DDA0DD'
      case 'warning': return '#FF6B6B'
    }
  }

  return (
    <motion.div
      className="reveal-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="scroll-container">
        <motion.div
          className="fortune-scroll"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div className="scroll-top" />

          <div className="scroll-content">
            <motion.div
              className="fortune-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="fortune-number">Fortune #{fortuneData.number}</div>
              <h2 className="fortune-title">{fortuneData.title_english}</h2>
              <div
                className="fortune-grade"
                style={{ color: getGradeColor() }}
              >
                {getGradeLabel()}
              </div>
            </motion.div>

            <motion.div
              className="fortune-verse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="verse-text">
                {fortuneData.verse.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < fortuneData.verse.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </motion.div>

            <motion.div
              className="fortune-interpretation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <h3>Interpretation</h3>

              <div className="interpretation-item">
                <span className="interpretation-label">General:</span>
                <p>{fortuneData.interpretation.general}</p>
              </div>

              <div className="interpretation-item">
                <span className="interpretation-label">Business:</span>
                <p>{fortuneData.interpretation.business}</p>
              </div>

              <div className="interpretation-item">
                <span className="interpretation-label">Romance:</span>
                <p>{fortuneData.interpretation.romance}</p>
              </div>

              <div className="interpretation-item">
                <span className="interpretation-label">Health:</span>
                <p>{fortuneData.interpretation.health}</p>
              </div>
            </motion.div>

            <motion.div
              className="lucky-elements"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <h3>Lucky Elements</h3>

              <div className="lucky-grid">
                <div className="lucky-item">
                  <span className="lucky-label">Number</span>
                  <span className="lucky-value">{lucky.luckyNumber}</span>
                </div>

                <div className="lucky-item">
                  <span className="lucky-label">Direction</span>
                  <span className="lucky-value">{lucky.luckyDirection}</span>
                </div>

                <div className="lucky-item">
                  <span className="lucky-label">Color</span>
                  <span className="lucky-value">{lucky.luckyColor}</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="scroll-bottom" />
        </motion.div>
      </div>

      <motion.button
        className="share-button"
        onClick={onShare}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Save Fortune Card
      </motion.button>
    </motion.div>
  )
}
