import { useState } from 'react'
import { Stage, Fortune } from './types/fortune'
import { Entrance } from './components/stages/Entrance'
import { StageController } from './components/StageController'
import { useAudioManager } from './hooks/useAudioManager'
import './styles/index.css'

function App() {
  const [currentStage, setCurrentStage] = useState<Stage>('entrance')
  const [fortuneData, _setFortuneData] = useState<Fortune | null>(null)
  const audio = useAudioManager()

  const handleStageChange = (stage: Stage) => {
    setCurrentStage(stage)
  }

  const handleEnter = () => {
    audio.playBGM()
    audio.playSFX('gong')
    setCurrentStage('shaking')
  }

  return (
    <div className="app">
      {currentStage === 'entrance' && (
        <Entrance onEnter={handleEnter} />
      )}
      {currentStage !== 'entrance' && (
        <StageController
          stage={currentStage}
          fortuneData={fortuneData}
          onStageChange={handleStageChange}
        />
      )}
    </div>
  )
}

export default App
