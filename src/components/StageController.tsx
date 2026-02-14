import { Stage } from '../types/fortune'
import { Fortune } from '../types/fortune'

interface StageControllerProps {
  stage: Stage
  fortuneData: Fortune | null
  onStageChange: (stage: Stage) => void
}

export function StageController({ stage, fortuneData }: StageControllerProps) {
  return (
    <div className="stage-controller" data-testid={`stage-${stage}`}>
      <h2>Current Stage: {stage}</h2>
      {fortuneData && <p>Fortune #{fortuneData.number}</p>}
    </div>
  )
}
