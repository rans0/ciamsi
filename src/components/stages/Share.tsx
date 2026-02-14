import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Fortune } from '../../types/fortune'
import { FortuneCard } from '../FortuneCard'

interface ShareProps {
  fortuneData: Fortune
  onRestart: () => void
}

export function Share({ fortuneData, onRestart }: ShareProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleGenerate = async () => {
    if (isGenerating || !cardRef.current) return

    setIsGenerating(true)

    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#800000',
        useCORS: true,
        allowTaint: true,
        logging: false
      } as any)

      const link = document.createElement('a')
      link.download = `ciamsi-fortune-${fortuneData.number}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()

      setGenerated(true)
    } catch (error) {
      console.error('Failed to generate image:', error)
      alert('Failed to generate image. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div
      className="share-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="share-content">
        <motion.h2
          className="share-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Your Fortune Awaits
        </motion.h2>

        <motion.p
          className="share-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Save your fortune card to share with friends
        </motion.p>

        <div className="card-preview">
          <div ref={cardRef} className="card-capture-area">
            <FortuneCard fortuneData={fortuneData} />
          </div>
        </div>

        <motion.div
          className="share-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="save-button"
            onClick={handleGenerate}
            disabled={isGenerating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? 'Generating...' : generated ? 'Save Another' : 'Save Fortune Card'}
          </motion.button>

          <motion.button
            className="restart-button"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
