import { useState, useEffect, useRef } from 'react'
import { SoundEffect, AudioManager } from '../types/audio'

export function useAudioManager(): AudioManager {
  const [isLoaded, setIsLoaded] = useState(false)
  const bgmRef = useRef<HTMLAudioElement | null>(null)
  const shakeLoopRef = useRef<number | null>(null)
  const wasBGMPlayingRef = useRef(false)

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
        const bgm = new Audio('/audio/pojeng-epic-happy-love-guzheng-412659.mp3')
        bgm.loop = true
        bgm.volume = 0.3

        const shake = new Audio('/audio/freesound_community-dice-53589.mp3')
        shake.volume = 0.5

        const drop = new Audio('/audio/freesound_community-stick-snap-2-83899.mp3')
        drop.volume = 0.6

        const poe = new Audio('/audio/freesound_community-stick-snap-2-83899.mp3')
        poe.volume = 0.5

        const gong = new Audio('/audio/dragon-studio-breaking-wood-356120.mp3')
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

    // Handle visibility changes (minimize app / change tab)
    const handleVisibilityChange = () => {
      const bgm = sounds.current.bgm
      const shake = sounds.current.shake

      if (document.hidden) {
        console.log('App hidden, pausing audio')
        // Save current play state
        wasBGMPlayingRef.current = bgm ? !bgm.paused : false

        // Pause all active sounds
        bgm?.pause()
        if (shake && shake.loop) {
          shake.pause()
        }
      } else {
        console.log('App visible, checking audio resumption')
        // Resume BGM if it was playing before minimize
        if (wasBGMPlayingRef.current && bgm) {
          bgm.play().catch(err => console.warn('Resuming BGM failed:', err))
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (bgmRef.current) {
        bgmRef.current.pause()
        bgmRef.current.src = ''
      }
      if (shakeLoopRef.current) {
        clearInterval(shakeLoopRef.current)
      }
    }
  }, [])

  const initialize = async () => {
    // This should be called by a user gesture to "unlock" audio on mobile
    const promises = Object.values(sounds.current).map(audio => {
      if (audio) {
        audio.load()
        // Play and immediately pause to unlock
        return audio.play().then(() => {
          audio.pause()
          audio.currentTime = 0
        }).catch(err => {
          console.warn('Audio unlock failed:', err)
        })
      }
      return Promise.resolve()
    })
    await Promise.all(promises)
  }

  const playBGM = () => {
    const bgm = sounds.current.bgm
    if (bgm) {
      bgm.muted = false
      bgm.play().catch(err => {
        console.warn('BGM play failed:', err)
      })
    }
  }

  const stopBGM = () => {
    if (sounds.current.bgm) {
      sounds.current.bgm.pause()
    }
  }

  const playSFX = (sound: SoundEffect) => {
    const sfx = sounds.current[sound]
    if (sfx) {
      // Clone for overlapping sounds or just reset
      sfx.currentTime = 0
      sfx.play().catch(err => {
        console.warn(`SFX ${sound} play failed:`, err)
      })
    }
  }

  const playShakeLoop = () => {
    if (shakeLoopRef.current) return

    const shake = sounds.current.shake
    if (!shake) return

    shake.currentTime = 0
    shake.loop = true
    shake.play().catch(err => {
      console.warn('Shake loop play failed:', err)
    })
  }

  const stopShakeLoop = () => {
    if (sounds.current.shake) {
      sounds.current.shake.loop = false
      sounds.current.shake.pause()
      sounds.current.shake.currentTime = 0
    }
  }

  return {
    initialize,
    playBGM,
    stopBGM,
    playSFX,
    playShakeLoop,
    stopShakeLoop,
    isLoaded
  }
}
