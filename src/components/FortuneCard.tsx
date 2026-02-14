import { Fortune } from '../types/fortune'
import { getFortuneGrade } from '../utils/fortune'
import { calculateLucky } from '../utils/lucky'

interface FortuneCardProps {
  fortuneData: Fortune
}

export function FortuneCard({ fortuneData }: FortuneCardProps) {
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

  return (
    <div className="fortune-card" data-testid="fortune-card">
      <div className="card-header">
        <div className="card-traditional">觀音靈籤</div>
        <div className="card-title">Ciam Si</div>
      </div>

      <div className="card-number">#{fortuneData.number}</div>

      <h2 className="card-fortune-title">{fortuneData.title_english}</h2>

      <div className="card-grade">{getGradeLabel()}</div>

      <div className="card-verse">
        {fortuneData.verse.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="card-lucky">
        <div className="card-lucky-item">
          <span>Lucky {lucky.luckyNumber}</span>
        </div>
        <div className="card-lucky-item">
          <span>{lucky.luckyDirection}</span>
        </div>
        <div className="card-lucky-item">
          <span>{lucky.luckyColor}</span>
        </div>
      </div>

      <div className="card-footer">
        <div className="card-date">
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  )
}
