import { Fortune, FortuneGrade } from '../types/fortune'
import { fortunes } from '../data/ciamsi'

export function selectFortune(): Fortune {
  const fortuneNumber = Math.floor(Math.random() * 100) + 1
  return fortunes[fortuneNumber - 1]
}

export function getFortuneGrade(fortune: Fortune): FortuneGrade {
  const type = fortune.type.toLowerCase()

  if (type.includes('supreme fortune') || type.includes('shang shang')) {
    return 'supreme'
  }
  if (type.includes('superior fortune') || type.includes('shang') && !type.includes('shang shang')) {
    return 'superior'
  }
  if (type.includes('medium fortune') || type.includes('zhong')) {
    return 'medium'
  }
  if (type.includes('small fortune') || type.includes('xia')) {
    return 'low'
  }
  if (type.includes('warning') || type.includes('caution')) {
    return 'warning'
  }

  return 'medium'
}

export function isGoodFortune(fortune: Fortune): boolean {
  const grade = getFortuneGrade(fortune)
  return grade === 'supreme' || grade === 'superior' || grade === 'medium'
}
