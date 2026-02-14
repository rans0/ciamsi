export type SoundEffect = 'bgm' | 'shake' | 'drop' | 'poe' | 'gong'

export interface AudioManager {
  initialize: () => Promise<void>
  playBGM: () => void
  stopBGM: () => void
  playSFX: (sound: SoundEffect) => void
  playShakeLoop: () => void
  stopShakeLoop: () => void
  isLoaded: boolean
}
