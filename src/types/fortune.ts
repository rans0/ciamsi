export interface Fortune {
  number: number
  title_mandarin: string
  title_english: string
  type: string
  verse: string
  interpretation: {
    general: string
    business: string
    romance: string
    health: string
  }
}

export interface FortuneData extends Fortune {
  grade: FortuneGrade
}

export type FortuneGrade = 'supreme' | 'superior' | 'medium' | 'low' | 'warning'

export interface LuckyElements {
  luckyNumber: number
  luckyDirection: string
  luckyColor: string
}

export type PoeResult = 'valid' | 'xiao-bei' | 'no-bei'

export type Stage = 'entrance' | 'shaking' | 'validation' | 'reveal' | 'share'
