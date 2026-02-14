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
  const captureRef = useRef<HTMLDivElement>(null)

  const handleSaveCard = async () => {
    const captureElement = captureRef.current
    if (!captureElement) return

    setIsGenerating(true)
    try {
      const { toCanvas } = await import('html-to-image')

      console.log('Starting capture process...')

      // Wait for fonts to be ready - CRITICAL for mobile Safari
      if (document.fonts) {
        console.log('Waiting for fonts...')
        await document.fonts.ready
        console.log('Fonts ready')
      }

      // Wait 2 seconds for mobile rendering engine to settle
      console.log('Waiting for layout stabilization...')
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Rendering to canvas...')
      const canvas = await toCanvas(captureElement, {
        quality: 1.0,
        pixelRatio: 2,
        width: 360,
        height: 640,
        backgroundColor: '#800000',
        style: {
          transform: 'none',
          visibility: 'visible',
          opacity: '1'
        }
      })

      console.log('Converting canvas to data URL...')
      const dataUrl = canvas.toDataURL('image/png')

      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `ciam-si-fortune-${fortuneData.number}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      console.log('Capture successful')
      setIsGenerating(false)
      alert('Fortune card saved!')
    } catch (error) {
      console.error('Save failed:', error)
      setIsGenerating(false)
      alert('Failed to save image. Please try again.')
    }
  }

  return (
    <motion.div
      className="share-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="share-content">
        <motion.h2
          className="share-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your Fortune Awaits
        </motion.h2>

        <motion.p
          className="share-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Save your fortune card for your memories
        </motion.p>

        {/* Visible Preview */}
        <div className="card-preview">
          <FortuneCard fortuneData={fortuneData} />
        </div>

        {/* Hidden capture container */}
        <div className="capture-container" ref={captureRef}>
          <FortuneCard fortuneData={fortuneData} />
        </div>

        <motion.div
          className="share-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            className="save-button"
            onClick={handleSaveCard}
            disabled={isGenerating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? 'Saving...' : 'Save Fortune Card'}
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
