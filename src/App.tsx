import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Stage, Fortune } from './types/fortune'
import { Entrance } from './components/stages/Entrance'
import { Shaking } from './components/stages/Shaking'
import { Validation } from './components/stages/Validation'
import { Reveal } from './components/stages/Reveal'
import { Share } from './components/stages/Share'
import { useAudioManager } from './hooks/useAudioManager'
import { useDeviceMotion } from './hooks/useDeviceMotion'
import { fortunes } from './data/ciamsi'
import './styles/index.css'

function App() {
  const [currentStage, setCurrentStage] = useState<Stage>('entrance')
  const [fortuneData, setFortuneData] = useState<Fortune | null>(null)
  const audio = useAudioManager()
  const deviceMotion = useDeviceMotion()

  const handleEnter = async () => {
    // Request motion permission (needed for iOS)
    if (deviceMotion.isSupported) {
      await deviceMotion.requestPermission()
    }

    // Initialize/unlock audio on mobile
    await audio.initialize()

    audio.playBGM()
    audio.playSFX('gong')
    setCurrentStage('shaking')
  }

  const handleShakeComplete = (fortuneNumber: number) => {
    const fortune = fortunes.find(f => f.number === fortuneNumber)
    if (fortune) {
      setFortuneData(fortune)
      setCurrentStage('validation')
    }
  }

  const handleValidated = () => {
    setCurrentStage('reveal')
  }

  const handleShare = () => {
    setCurrentStage('share')
  }

  const handleRestart = () => {
    setFortuneData(null)
    setCurrentStage('entrance')
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {currentStage === 'entrance' && (
          <Entrance key="entrance" onEnter={handleEnter} />
        )}
        {currentStage === 'shaking' && (
          <Shaking key="shaking" onComplete={handleShakeComplete} />
        )}
        {currentStage === 'validation' && fortuneData && (
          <Validation
            key="validation"
            fortuneData={fortuneData}
            onValidated={handleValidated}
          />
        )}
        {currentStage === 'reveal' && fortuneData && (
          <Reveal
            key="reveal"
            fortuneData={fortuneData}
            onShare={handleShare}
          />
        )}
        {currentStage === 'share' && fortuneData && (
          <Share
            key="share"
            fortuneData={fortuneData}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
