import { useState, useEffect, useRef } from 'react'
import { SoundEffect, AudioManager } from '../types/audio'

export function useAudioManager(): AudioManager {
  const [isLoaded, setIsLoaded] = useState(false)
  const bgmRef = useRef<HTMLAudioElement | null>(null)
  const shakeLoopRef = useRef<number | null>(null)

  const sounds = useRef<Record<SoundEffect, HTMLAudioElement | null>>({
    bgm: null,
    shake: null,
    drop: null,
    poe: null,
    gong: null
  })

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const bgm = new Audio('/audio/bgm.mp3')
        bgm.loop = true
        bgm.volume = 0.3

        const shake = new Audio('/audio/shake.mp3')
        shake.volume = 0.5

        const drop = new Audio('/audio/drop.mp3')
        drop.volume = 0.6

        const poe = new Audio('/audio/poe.mp3')
        poe.volume = 0.5

        const gong = new Audio('/audio/gong.mp3')
        gong.volume = 0.4

        sounds.current = { bgm, shake, drop, poe, gong }
        bgmRef.current = bgm

        setIsLoaded(true)
      } catch (error) {
        console.warn('Audio failed to load:', error)
        setIsLoaded(true)
      }
    }

    loadAudio()

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause()
        bgmRef.current.src = ''
      }
      if (shakeLoopRef.current) {
        clearInterval(shakeLoopRef.current)
      }
    }
  }, [])

  const playBGM = () => {
    if (sounds.current.bgm) {
      sounds.current.bgm.play().catch(() => {})
    }
  }

  const stopBGM = () => {
    if (sounds.current.bgm) {
      sounds.current.bgm.pause()
    }
  }

  const playSFX = (sound: SoundEffect) => {
    if (sounds.current[sound]) {
      sounds.current[sound]!.currentTime = 0
      sounds.current[sound]!.play().catch(() => {})
    }
  }

  const playShakeLoop = () => {
    if (shakeLoopRef.current) return

    const shake = sounds.current.shake
    if (!shake) return

    shake.currentTime = 0
    shake.play().catch(() => {})

    shakeLoopRef.current = window.setInterval(() => {
      shake.currentTime = 0
      shake.play().catch(() => {})
    }, 500)
  }

  const stopShakeLoop = () => {
    if (shakeLoopRef.current) {
      clearInterval(shakeLoopRef.current)
      shakeLoopRef.current = null
    }
    if (sounds.current.shake) {
      sounds.current.shake.pause()
    }
  }

  return {
    playBGM,
    stopBGM,
    playSFX,
    playShakeLoop,
    stopShakeLoop,
    isLoaded
  }
}
