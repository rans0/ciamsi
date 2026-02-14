import { Fortune } from '../types/fortune'
import rawData from './ciamsi.json'

interface CiamsiJson {
  source: string
  description: string
  total_entries: number
  fortunes: Fortune[]
}

export const fortunes: Fortune[] = (rawData as CiamsiJson).fortunes
