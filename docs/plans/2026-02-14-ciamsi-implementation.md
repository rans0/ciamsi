# Ciam Si - Interactive Chinese Fortune Telling Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an immersive web experience simulating traditional Chinese temple fortune telling with DeviceMotion shaking, atmospheric audio, and social sharing.

**Architecture:** Single-page React app with 5-stage flow (Entrance → Shaking → Validation → Reveal → Share), central state in App.tsx, custom hooks for device motion/audio/haptics, pure random fortune selection with algorithmic lucky elements.

**Tech Stack:** Vite + React + TypeScript + Framer Motion + html2canvas

---

## PHASE 1: Foundation

### Task 1: Initialize Vite + React + TypeScript Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/vite-env.d.ts`

**Step 1: Initialize package.json**

Run: `npm init -y`

Edit `package.json`:
```json
{
  "name": "ciamsi",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@typescript-eslint/eslint-plugin": "^8.18.2",
    "@typescript-eslint/parser": "^8.18.2",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "typescript": "^5.7.2",
    "vite": "^6.0.5"
  }
}
```

**Step 2: Install dependencies**

Run: `npm install`

**Step 3: Create TypeScript configs**

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

Create `tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

**Step 4: Create Vite config**

Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'html2canvas': ['html2canvas']
        }
      }
    }
  },
  assetsInclude: ['**/*.mp3', '**/*.webp']
})
```

**Step 5: Create HTML entry**

Create `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/temple-icon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Experience traditional Chinese temple fortune telling. Shake the virtual cylinder, receive your fortune, and discover your lucky elements." />
    <meta property="og:title" content="Ciam Si - Chinese Fortune Telling" />
    <meta property="og:description" content="Receive your fortune from the ancient oracle." />
    <title>Ciam Si - Interactive Chinese Fortune Telling</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 6: Create main entry**

Create `src/main.tsx`:
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Step 7: Create base App**

Create `src/App.tsx`:
```typescript
import { useState } from 'react'

type Stage = 'entrance' | 'shaking' | 'validation' | 'reveal' | 'share'

function App() {
  const [currentStage, setCurrentStage] = useState<Stage>('entrance')

  return (
    <div className="app">
      <h1>Ciam Si</h1>
      <p>Stage: {currentStage}</p>
    </div>
  )
}

export default App
```

Create `src/vite-env.d.ts`:
```typescript
/// <reference types="vite/client" />
```

**Step 8: Create base styles**

Create `src/styles/index.css`:
```css
:root {
  color-scheme: dark;

  --color-maroon: #800000;
  --color-gold: #D4AF37;
  --color-cream: #F5E6D3;
  --color-black: #1a1a1a;

  --font-display: 'Cinzel', serif;
  --font-body: 'Cormorant Garamond', serif;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-maroon);
  color: var(--color-cream);
  min-height: 100vh;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 4rem);
  color: var(--color-gold);
  text-align: center;
}
```

**Step 9: Verify dev server runs**

Run: `npm run dev`
Expected: Server starts at http://localhost:5173, shows "Ciam Si" heading

**Step 10: Commit**

Run:
```bash
git add .
git commit -m "feat: initialize Vite + React + TypeScript project

- Set up project structure and configs
- Add base styling with temple color palette
- Create initial App component

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 2: Install Additional Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install Framer Motion**

Run: `npm install framer-motion`

**Step 2: Install html2canvas**

Run: `npm install html2canvas`

**Step 3: Install type definitions**

Run: `npm install -D @types/html2canvas`

**Step 4: Verify imports work**

Add to `src/App.tsx` temporarily:
```typescript
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'

// Keep rest of file same
```

Run: `npm run type-check`
Expected: No errors

**Step 5: Remove test imports**

Revert `src/App.tsx` to original state.

**Step 6: Commit**

Run:
```bash
git add package.json package-lock.json
git commit -m "deps: install framer-motion and html2canvas

- Add animation library for smooth transitions
- Add image generation for shareable fortune cards

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 3: Create Project Structure

**Files:**
- Create: `src/components/stages/.gitkeep`
- Create: `src/components/ui/.gitkeep`
- Create: `src/components/audio/.gitkeep`
- Create: `src/hooks/.gitkeep`
- Create: `src/utils/.gitkeep`
- Create: `src/data/.gitkeep`
- Create: `src/styles/components/.gitkeep`
- Create: `public/audio/.gitkeep`
- Create: `public/images/.gitkeep`

**Step 1: Create all directories**

Run:
```bash
mkdir -p src/components/stages src/components/ui src/components/audio
mkdir -p src/hooks src/utils src/data src/styles/components
mkdir -p public/audio public/images
```

**Step 2: Create gitkeep files**

Run: `touch src/components/stages/.gitkeep src/components/ui/.gitkeep src/components/audio/.gitkeep src/hooks/.gitkeep src/utils/.gitkeep src/data/.gitkeep src/styles/components/.gitkeep public/audio/.gitkeep public/images/.gitkeep`

**Step 3: Commit**

Run:
```bash
git add .
git commit -m "chore: create project directory structure

- Organize components, hooks, utils, data folders
- Prepare for stage-based architecture

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 4: Import and Type Fortune Data

**Files:**
- Create: `src/data/ciamsi.json`
- Create: `src/types/fortune.ts`

**Step 1: Move data file**

Run: `cp ciamsi.json src/data/ciamsi.json`

**Step 2: Create TypeScript types**

Create `src/types/fortune.ts`:
```typescript
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
```

**Step 3: Add type assertion for data import**

Create `src/data/ciamsi.ts`:
```typescript
import { Fortune } from '../types/fortune'
import rawData from './ciamsi.json'

// Type assertion at import boundary
export const fortunes: Fortune[] = rawData as Fortune[]
```

**Step 4: Verify data loads**

Temporarily add to `src/App.tsx`:
```typescript
import { fortunes } from './data/ciamsi'

function App() {
  console.log('Loaded', fortunes.length, 'fortunes')
  // ... rest of component
}
```

Run: `npm run dev`
Expected: Console shows "Loaded 100 fortunes"

**Step 5: Clean up test code**

Remove console.log from `src/App.tsx`.

**Step 6: Commit**

Run:
```bash
git add src/data src/types
git commit -m "feat: import fortune data with TypeScript types

- Add ciamsi.json with 100 fortune entries
- Create Fortune interface with full type safety
- Export typed fortunes array

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 5: Implement Fortune Selection Logic

**Files:**
- Create: `src/utils/fortune.ts`

**Step 1: Write fortune selection function**

Create `src/utils/fortune.ts`:
```typescript
import { Fortune, FortuneGrade } from '../types/fortune'
import { fortunes } from '../data/ciamsi'

export function selectFortune(): Fortune {
  const fortuneNumber = Math.floor(Math.random() * 100) + 1
  return fortunes[fortuneNumber - 1]
}

export function getFortuneGrade(fortune: Fortune): FortuneGrade {
  const type = fortune.type.toLowerCase()

  if (type.includes('supreme fortune') || type === 'shang shang') {
    return 'supreme'
  }
  if (type.includes('superior fortune') || type === 'shang') {
    return 'superior'
  }
  if (type.includes('medium fortune') || type === 'zhong') {
    return 'medium'
  }
  if (type.includes('small fortune') || type === 'xia') {
    return 'low'
  }
  if (type.includes('warning') || type.includes('caution')) {
    return 'warning'
  }

  return 'medium'
}
```

**Step 2: Test fortune selection**

Temporarily add to `src/App.tsx`:
```typescript
import { selectFortune, getFortuneGrade } from './utils/fortune'

function App() {
  const test = selectFortune()
  console.log('Test fortune:', test.number, getFortuneGrade(test))
  // ...
}
```

Run: `npm run dev`
Expected: Console shows fortune number and grade

**Step 3: Clean up**

Remove test code from `src/App.tsx`.

**Step 4: Commit**

Run:
```bash
git add src/utils/fortune.ts
git commit -m "feat: implement fortune selection and grade logic

- Add pure random selection from 1-100
- Parse fortune type to determine grade
- Support Chinese and English type names

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 6: Implement Lucky Elements Algorithm

**Files:**
- Create: `src/utils/lucky.ts`

**Step 1: Write lucky calculation function**

Create `src/utils/lucky.ts`:
```typescript
import { LuckyElements } from '../types/fortune'

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export function calculateLucky(fortuneNumber: number, date: Date = new Date()): LuckyElements {
  const dayOfYear = getDayOfYear(date)

  // Lucky Number: (fortune number + day of year) % 9 + 1
  const luckyNumber = ((fortuneNumber + dayOfYear) % 9) + 1

  // Lucky Direction: 8 directions
  const directions = ['North', 'Northeast', 'East', 'Southeast',
                      'South', 'Southwest', 'West', 'Northwest']
  const directionIndex = (fortuneNumber + dayOfYear) % 8
  const luckyDirection = directions[directionIndex]

  // Lucky Color: 5 traditional Chinese colors
  const colors = ['Red', 'Gold', 'Green', 'White', 'Black']
  const colorIndex = (fortuneNumber + dayOfYear) % 5
  const luckyColor = colors[colorIndex]

  return { luckyNumber, luckyDirection, luckyColor }
}
```

**Step 2: Test calculation**

Temporarily add to `src/App.tsx`:
```typescript
import { calculateLucky } from './utils/lucky'

function App() {
  const lucky1 = calculateLucky(5, new Date('2024-01-15'))
  const lucky2 = calculateLucky(5, new Date('2024-01-15'))
  console.log('Consistent test:', lucky1, lucky2)
  // ...
}
```

Run: `npm run dev`
Expected: Both lucky objects are identical

**Step 3: Test date variation**

Change test to:
```typescript
const lucky1 = calculateLucky(5, new Date('2024-01-15'))
const lucky2 = calculateLucky(5, new Date('2024-01-16'))
console.log('Different dates:', lucky1.luckyNumber, lucky2.luckyNumber)
```

Expected: Numbers are different

**Step 4: Clean up**

Remove test code from `src/App.tsx`.

**Step 5: Commit**

Run:
```bash
git add src/utils/lucky.ts
git commit -m "feat: implement lucky elements calculation

- Calculate from fortune number and date
- Return lucky number, direction, and color
- Consistent results for same input

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 7: Build Stage Controller and App State

**Files:**
- Modify: `src/App.tsx`
- Create: `src/components/StageController.tsx`

**Step 1: Create StageController component**

Create `src/components/StageController.tsx`:
```typescript
import { Stage } from '../types/fortune'
import { Fortune } from '../types/fortune'

interface StageControllerProps {
  stage: Stage
  fortuneData: Fortune | null
  onStageChange: (stage: Stage) => void
}

export function StageController({ stage, fortuneData, onStageChange }: StageControllerProps) {
  return (
    <div className="stage-controller" data-testid={`stage-${stage}`}>
      <h2>Current Stage: {stage}</h2>
      {fortuneData && <p>Fortune #{fortuneData.number}</p>}
    </div>
  )
}
```

**Step 2: Update App with full state**

Replace `src/App.tsx`:
```typescript
import { useState } from 'react'
import { Stage, Fortune } from './types/fortune'
import { StageController } from './components/StageController'

function App() {
  const [currentStage, setCurrentStage] = useState<Stage>('entrance')
  const [fortuneData, setFortuneData] = useState<Fortune | null>(null)

  const handleStageChange = (stage: Stage) => {
    setCurrentStage(stage)
  }

  return (
    <div className="app">
      <h1>Ciam Si</h1>
      <StageController
        stage={currentStage}
        fortuneData={fortuneData}
        onStageChange={handleStageChange}
      />
    </div>
  )
}

export default App
```

**Step 3: Add StageController styles**

Create `src/styles/components/stage-controller.css`:
```css
.stage-controller {
  text-align: center;
  padding: 2rem;
}

.stage-controller h2 {
  font-family: var(--font-display);
  color: var(--color-gold);
  margin-bottom: 1rem;
}
```

Import in `src/styles/index.css`:
```css
@import './components/stage-controller.css';
```

**Step 4: Verify stage changes work**

Temporarily add button to `src/App.tsx`:
```typescript
<button onClick={() => handleStageChange('shaking')}>Test Stage Change</button>
```

Run: `npm run dev`
Expected: Clicking button updates displayed stage

**Step 5: Clean up**

Remove test button.

**Step 6: Commit**

Run:
```bash
git add src/App.tsx src/components/StageController.tsx src/styles
git commit -m "feat: build stage controller and app state

- Add centralized stage management
- Wire up fortune data state
- Create StageController component

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

## PHASE 2: Immersion (Audio & Visuals)

### Task 8: Create Audio Manager Hook

**Files:**
- Create: `src/hooks/useAudioManager.ts`
- Create: `src/types/audio.ts`

**Step 1: Define audio types**

Create `src/types/audio.ts`:
```typescript
export type SoundEffect = 'bgm' | 'shake' | 'drop' | 'poe' | 'gong'

export interface AudioManager {
  playBGM: () => void
  stopBGM: () => void
  playSFX: (sound: SoundEffect) => void
  playShakeLoop: () => void
  stopShakeLoop: () => void
  isLoaded: boolean
}
```

**Step 2: Implement audio manager hook**

Create `src/hooks/useAudioManager.ts`:
```typescript
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
        setIsLoaded(true) // Don't block experience
      }
    }

    loadAudio()

    return () => {
      // Cleanup
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
```

**Step 3: Test hook exists**

Add to `src/App.tsx`:
```typescript
import { useAudioManager } from './hooks/useAudioManager'

function App() {
  const audio = useAudioManager()
  console.log('Audio loaded:', audio.isLoaded)
  // ...
}
```

Run: `npm run dev`
Expected: Console shows true (or false if audio files missing, which is ok)

**Step 4: Clean up**

Remove console.log.

**Step 5: Commit**

Run:
```bash
git add src/hooks/useAudioManager.ts src/types/audio.ts
git commit -m "feat: create audio manager hook

- Load and manage all audio assets
- Support BGM looping and SFX playback
- Handle shake loop with interval
- Graceful degradation on load failure

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 9: Build Entrance Stage Component

**Files:**
- Create: `src/components/stages/Entrance.tsx`
- Create: `src/styles/components/entrance.css`

**Step 1: Create Entrance component**

Create `src/components/stages/Entrance.tsx`:
```typescript
import { motion } from 'framer-motion'

interface EntranceProps {
  onEnter: () => void
}

export function Entrance({ onEnter }: EntranceProps) {
  return (
    <motion.div
      className="entrance-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="entrance-content">
        <motion.div
          className="temple-gate"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className="temple-title">Ciam Si</h1>
          <p className="temple-subtitle">觀音靈籤</p>
        </motion.div>

        <motion.p
          className="entrance-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Quiet your heart. Think of one question or wish you wish to ask.
        </motion.p>

        <motion.button
          className="enter-button"
          onClick={onEnter}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter Temple
        </motion.button>
      </div>

      <div className="smoke-effect" />
    </motion.div>
  )
}
```

**Step 2: Create Entrance styles**

Create `src/styles/components/entrance.css`:
```css
.entrance-stage {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center, var(--color-maroon) 0%, #2a0000 100%);
  overflow: hidden;
}

.entrance-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
}

.temple-gate {
  margin-bottom: 3rem;
}

.temple-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  color: var(--color-gold);
  text-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
}

.temple-subtitle {
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: var(--color-cream);
  opacity: 0.8;
  font-style: italic;
}

.entrance-prompt {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--color-cream);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.8;
  opacity: 0.9;
}

.enter-button {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vw, 1.3rem);
  padding: 1rem 3rem;
  background: linear-gradient(135deg, var(--color-gold) 0%, #b8962e 100%);
  color: var(--color-maroon);
  border: 2px solid var(--color-gold);
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
}

.enter-button:hover {
  box-shadow: 0 6px 30px rgba(212, 175, 55, 0.5);
}

.smoke-effect {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at bottom, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
  pointer-events: none;
}
```

Import in `src/styles/index.css`:
```css
@import './components/entrance.css';
```

**Step 3: Wire up Entrance in App**

Update `src/App.tsx`:
```typescript
import { useAudioManager } from './hooks/useAudioManager'
import { Entrance } from './components/stages/Entrance'

function App() {
  // ... existing state
  const audio = useAudioManager()

  const handleEnter = () => {
    audio.playBGM()
    audio.playSFX('gong')
    setCurrentStage('shaking')
  }

  return (
    <div className="app">
      <h1>Ciam Si</h1>
      {currentStage === 'entrance' && (
        <Entrance onEnter={handleEnter} />
      )}
      {/* ... rest of stages */}
    </div>
  )
}
```

**Step 4: Test entrance animation**

Run: `npm run dev`
Expected: Entrance fades in, shows title and button, clicking transitions

**Step 5: Commit**

Run:
```bash
git add src/components/stages/Entrance.tsx src/styles/components/entrance.css
git commit -m "feat: build entrance stage with animations

- Create atmospheric entrance with smoke effect
- Add Framer Motion animations for fade-in
- Wire up BGM and gong sound on enter
- Apply temple color scheme

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 10: Add Google Fonts (Cinzel & Cormorant Garamond)

**Files:**
- Modify: `index.html`

**Step 1: Add Google Fonts link**

Update `index.html` head section:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**Step 2: Update font variables in CSS**

Update `src/styles/index.css`:
```css
:root {
  /* ... existing variables */

  --font-display: 'Cinzel', serif;
  --font-body: 'Cormorant Garamond', serif;
}
```

**Step 3: Verify fonts load**

Run: `npm run dev`
Expected: Typography shows Cinzel and Cormorant Garamond

**Step 4: Commit**

Run:
```bash
git add index.html src/styles/index.css
git commit -m "style: add Google Fonts (Cinzel and Cormorant Garamond)

- Import elegant display and body fonts
- Update CSS variables for consistent typography
- Enhance temple aesthetic with proper typefaces

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 11: Build Shaking Stage Component (Base)

**Files:**
- Create: `src/components/stages/Shaking.tsx`
- Create: `src/styles/components/shaking.css`

**Step 1: Create Shaking component**

Create `src/components/stages/Shaking.tsx`:
```typescript
import { useState } from 'react'
import { motion } from 'framer-motion'

interface ShakingProps {
  onComplete: (fortuneNumber: number) => void
}

export function Shaking({ onComplete }: ShakingProps) {
  const [shakeCount, setShakeCount] = useState(0)
  const [isShaking, setIsShaking] = useState(false)

  const handleShake = () => {
    setShakeCount(prev => prev + 1)
    setIsShaking(true)

    // After 3 clicks/taps, complete
    if (shakeCount >= 2) {
      setTimeout(() => {
        const fortuneNumber = Math.floor(Math.random() * 100) + 1
        onComplete(fortuneNumber)
      }, 500)
    }

    setTimeout(() => setIsShaking(false), 200)
  }

  return (
    <motion.div
      className="shaking-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="shaking-content">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="shaking-title"
        >
          Shake the Cylinder
        </motion.h2>

        <motion.p
          className="shaking-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {shakeCount < 2 ? 'Tap the cylinder to shake it' : 'Almost there...'}
        </motion.p>

        <motion.div
          className="cylinder-container"
          animate={isShaking ? { rotate: [-3, 3, -3, 0] } : {}}
          transition={{ duration: 0.3 }}
          onClick={handleShake}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="bamboo-cylinder">
            <div className="cylinder-top" />
            <div className="cylinder-body">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="bamboo-segment" />
              ))}
            </div>
            <div className="cylinder-bottom" />
          </div>
        </motion.div>

        <motion.p
          className="shake-counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Shakes: {shakeCount + 1}/3
        </motion.p>
      </div>
    </motion.div>
  )
}
```

**Step 2: Create Shaking styles**

Create `src/styles/components/shaking.css`:
```css
.shaking-stage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #2a0000 0%, var(--color-maroon) 50%, #2a0000 100%);
}

.shaking-content {
  text-align: center;
  padding: 2rem;
}

.shaking-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.shaking-prompt {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--color-cream);
  margin-bottom: 3rem;
  opacity: 0.9;
}

.cylinder-container {
  width: min(300px, 60vw);
  height: min(400px, 70vw);
  margin: 0 auto 2rem;
  cursor: pointer;
}

.bamboo-cylinder {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cylinder-top,
.cylinder-bottom {
  width: 70%;
  height: 20px;
  background: linear-gradient(90deg, #5a4a3a 0%, #8b7355 50%, #5a4a3a 100%);
  border-radius: 4px;
  border: 2px solid #3a2a1a;
}

.cylinder-body {
  flex: 1;
  width: 80%;
  background: linear-gradient(90deg, #6b5a4a 0%, #9b8365 30%, #8b7355 70%, #5a4a3a 100%);
  border-left: 3px solid #4a3a2a;
  border-right: 3px solid #4a3a2a;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}

.bamboo-segment {
  flex: 1;
  background: rgba(139, 115, 85, 0.3);
  border-bottom: 1px solid rgba(58, 42, 26, 0.3);
}

.shake-counter {
  font-size: 1.2rem;
  color: var(--color-gold);
  opacity: 0.7;
}
```

Import in `src/styles/index.css`:
```css
@import './components/shaking.css';
```

**Step 3: Wire up Shaking in App**

Update `src/App.tsx`:
```typescript
import { Shaking } from './components/stages/Shaking'

function App() {
  // ... existing state

  const handleShakeComplete = (fortuneNumber: number) => {
    const fortune = fortunes.find(f => f.number === fortuneNumber)
    if (fortune) {
      setFortuneData(fortune)
      setCurrentStage('validation')
    }
  }

  return (
    <div className="app">
      {currentStage === 'shaking' && (
        <Shaking onComplete={handleShakeComplete} />
      )}
      {/* ... rest of stages */}
    </div>
  )
}
```

**Step 4: Test shaking flow**

Run: `npm run dev`
Expected: Can tap cylinder 3 times, transitions to validation

**Step 5: Commit**

Run:
```bash
git add src/components/stages/Shaking.tsx src/styles/components/shaking.css
git commit -m "feat: build shaking stage with tap interaction

- Create bamboo cylinder visual with CSS
- Add shake counter and completion logic
- Implement Framer Motion shake animation
- Wire up fortune selection on complete

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 12: Build Validation Stage Component

**Files:**
- Create: `src/components/stages/Validation.tsx`
- Create: `src/styles/components/validation.css`

**Step 1: Create Validation component**

Create `src/components/stages/Validation.tsx`:
```typescript
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Fortune } from '../../types/fortune'

interface ValidationProps {
  fortuneNumber: number
  fortuneData: Fortune
  onValidated: () => void
}

export function Validation({ fortuneNumber, fortuneData, onValidated }: ValidationProps) {
  const [attempts, setAttempts] = useState(0)
  const [poeResult, setPoeResult] = useState<'valid' | 'xiao-bei' | 'no-bei' | null>(null)
  const [isThrowing, setIsThrowing] = useState(false)

  const MAX_ATTEMPTS = 3

  const throwPoe = () => {
    if (isThrowing) return

    setIsThrowing(true)
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    // Simulate throw animation
    setTimeout(() => {
      const block1 = Math.random() < 0.5 ? 'flat' : 'round'
      const block2 = Math.random() < 0.5 ? 'flat' : 'round'

      let result: 'valid' | 'xiao-bei' | 'no-bei'
      if (block1 !== block2) {
        result = 'valid'
      } else if (block1 === 'flat') {
        result = 'xiao-bei'
      } else {
        result = 'no-bei'
      }

      setPoeResult(result)
      setIsThrowing(false)

      // Auto-validate after max attempts or if valid
      if (result === 'valid') {
        setTimeout(() => onValidated(), 1000)
      } else if (newAttempts >= MAX_ATTEMPTS) {
        setTimeout(() => onValidated(), 2000)
      }
    }, 800)
  }

  const getResultMessage = () => {
    if (!poeResult) return null

    if (poeResult === 'valid') {
      return 'Your fortune is confirmed!'
    }

    if (attempts >= MAX_ATTEMPTS) {
      return 'The ancestors accept your intent. Read your fortune.'
    }

    return poeResult === 'xiao-bei'
      ? 'Not yet confirmed. Throw again.'
      : 'The spirits say wait. Throw once more.'
  }

  return (
    <motion.div
      className="validation-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="validation-content">
        <motion.h2
          className="validation-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Confirmation Required
        </motion.h2>

        <motion.div
          className="fallen-stick"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <div className="stick-number">#{fortuneNumber}</div>
          <div className="stick-title">{fortuneData.title_english}</div>
        </motion.div>

        <motion.p
          className="validation-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          The spirits must confirm this answer. Throw the Poe blocks.
        </motion.p>

        <motion.div
          className="poe-blocks-container"
          animate={isThrowing ? { y: [-10, -100, 10] } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="poe-block poe-left" />
          <div className="poe-block poe-right" />
        </motion.div>

        <AnimatePresence mode="wait">
          {poeResult && (
            <motion.div
              key={poeResult + attempts}
              className="result-message"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {getResultMessage()}
            </motion.div>
          )}
        </AnimatePresence>

        {!poeResult && (
          <motion.button
            className="throw-button"
            onClick={throwPoe}
            disabled={isThrowing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isThrowing ? 'Throwing...' : 'Throw Poe'}
          </motion.button>
        )}

        {poeResult && poeResult !== 'valid' && attempts < MAX_ATTEMPTS && (
          <motion.button
            className="retry-button"
            onClick={throwPoe}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Try Again ({attempts}/{MAX_ATTEMPTS})
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
```

**Step 2: Create Validation styles**

Create `src/styles/components/validation.css`:
```css
.validation-stage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, var(--color-maroon) 0%, #2a0000 100%);
}

.validation-content {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
}

.validation-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--color-gold);
  margin-bottom: 2rem;
}

.fallen-stick {
  width: min(200px, 50vw);
  height: min(300px, 60vw);
  margin: 0 auto 2rem;
  background: linear-gradient(90deg, #8b7355 0%, #a08060 50%, #8b7355 100%);
  border-radius: 8px;
  border: 3px solid var(--color-gold);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.stick-number {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 4rem);
  color: var(--color-gold);
  margin-bottom: 0.5rem;
}

.stick-title {
  font-size: clamp(0.8rem, 2vw, 1rem);
  color: var(--color-cream);
  text-align: center;
  padding: 0 1rem;
}

.validation-prompt {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--color-cream);
  margin-bottom: 2rem;
  opacity: 0.9;
}

.poe-blocks-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  min-height: 100px;
}

.poe-block {
  width: min(80px, 20vw);
  height: min(80px, 20vw);
  background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%);
  border-radius: 50%;
  border: 3px solid var(--color-gold);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.result-message {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--color-gold);
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid var(--color-gold);
  border-radius: 4px;
  background: rgba(212, 175, 55, 0.1);
}

.throw-button,
.retry-button {
  font-family: var(--font-display);
  font-size: 1.2rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, var(--color-gold) 0%, #b8962e 100%);
  color: var(--color-maroon);
  border: 2px solid var(--color-gold);
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.throw-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.retry-button {
  background: transparent;
  color: var(--color-gold);
  border-color: var(--color-gold);
}
```

Import in `src/styles/index.css`:
```css
@import './components/validation.css';
```

**Step 3: Wire up Validation in App**

Update `src/App.tsx`:
```typescript
import { Validation } from './components/stages/Validation'

function App() {
  // ... existing state

  return (
    <div className="app">
      {currentStage === 'validation' && fortuneData && (
        <Validation
          fortuneNumber={fortuneData.number}
          fortuneData={fortuneData}
          onValidated={() => setCurrentStage('reveal')}
        />
      )}
      {/* ... rest of stages */}
    </div>
  )
}
```

**Step 4: Test validation flow**

Run: `npm run dev`
Expected: Shows fallen stick, can throw Poe, validation works

**Step 5: Commit**

Run:
```bash
git add src/components/stages/Validation.tsx src/styles/components/validation.css
git commit -m "feat: build validation stage with Poe throwing

- Create Poe blocks with CSS styling
- Implement RNG for validation result
- Add retry limit with wisdom messages
- Animate throw and result display

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 13: Build Reveal Stage Component

**Files:**
- Create: `src/components/stages/Reveal.tsx`
- Create: `src/styles/components/reveal.css`

**Step 1: Create Reveal component**

Create `src/components/stages/Reveal.tsx`:
```typescript
import { motion } from 'framer-motion'
import { FortuneData, LuckyElements } from '../../types/fortune'
import { calculateLucky, getFortuneGrade } from '../../utils/fortune'
import { calculateLucky as getLucky } from '../../utils/lucky'

interface RevealProps {
  fortuneData: FortuneData
  onShare: () => void
}

export function Reveal({ fortuneData, onShare }: RevealProps) {
  const grade = getFortuneGrade(fortuneData)
  const lucky = getLucky(fortuneData.number)

  const getGradeLabel = () => {
    switch (grade) {
      case 'supreme': return 'Supreme Fortune'
      case 'superior': return 'Superior Fortune'
      case 'medium': return 'Medium Fortune'
      case 'low': return 'Small Fortune'
      case 'warning': return 'Caution Advised'
    }
  }

  const getGradeColor = () => {
    switch (grade) {
      case 'supreme': return '#FFD700'
      case 'superior': return '#FFA500'
      case 'medium': return '#87CEEB'
      case 'low': return '#DDA0DD'
      case 'warning': return '#FF6B6B'
    }
  }

  return (
    <motion.div
      className="reveal-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="scroll-container">
        <motion.div
          className="fortune-scroll"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div className="scroll-top" />

          <div className="scroll-content">
            <motion.div
              className="fortune-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="fortune-number">Fortune #{fortuneData.number}</div>
              <h2 className="fortune-title">{fortuneData.title_english}</h2>
              <div
                className="fortune-grade"
                style={{ color: getGradeColor() }}
              >
                {getGradeLabel()}
              </div>
            </motion.div>

            <motion.div
              className="fortune-verse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="verse-text">
                {fortuneData.verse.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < fortuneData.verse.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </motion.div>

            <motion.div
              className="fortune-interpretation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <h3>Interpretation</h3>

              <div className="interpretation-item">
                <span className="interpretation-label">General:</span>
                <p>{fortuneData.interpretation.general}</p>
              </div>

              <div className="interpretation-item">
                <span className="interpretation-label">Business:</span>
                <p>{fortuneData.interpretation.business}</p>
              </div>

              <div className="interpretation-item">
                <span className="interpretation-label">Romance:</span>
                <p>{fortuneData.interpretation.romance}</p>
              </div>

              <div className="interpretation-item">
                <span className="interpretation-label">Health:</span>
                <p>{fortuneData.interpretation.health}</p>
              </div>
            </motion.div>

            <motion.div
              className="lucky-elements"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <h3>Lucky Elements</h3>

              <div className="lucky-grid">
                <div className="lucky-item">
                  <span className="lucky-label">Number</span>
                  <span className="lucky-value">{lucky.luckyNumber}</span>
                </div>

                <div className="lucky-item">
                  <span className="lucky-label">Direction</span>
                  <span className="lucky-value">{lucky.luckyDirection}</span>
                </div>

                <div className="lucky-item">
                  <span className="lucky-label">Color</span>
                  <span className="lucky-value">{lucky.luckyColor}</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="scroll-bottom" />
        </motion.div>
      </div>

      <motion.button
        className="share-button"
        onClick={onShare}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Save Fortune Card
      </motion.button>
    </motion.div>
  )
}
```

**Step 2: Create Reveal styles**

Create `src/styles/components/reveal.css`:
```css
.reveal-stage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #1a0a0a 0%, var(--color-maroon) 100%);
  padding: 2rem 1rem;
}

.scroll-container {
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
}

.fortune-scroll {
  background: linear-gradient(135deg, #f5e6d3 0%, #e8d4b8 100%);
  border-radius: 8px;
  border: 4px solid var(--color-gold);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  transform-origin: top center;
  overflow: hidden;
}

.scroll-top,
.scroll-bottom {
  height: 30px;
  background: linear-gradient(90deg, #8b7355 0%, var(--color-gold) 50%, #8b7355 100%);
  border: 2px solid #5a4a3a;
}

.scroll-content {
  padding: 2rem;
  color: #2a1a1a;
}

.fortune-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-gold);
}

.fortune-number {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: var(--color-maroon);
  margin-bottom: 0.5rem;
}

.fortune-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #2a1a1a;
  margin-bottom: 0.5rem;
}

.fortune-grade {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 600;
}

.fortune-verse {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(212, 175, 55, 0.2);
  border-radius: 4px;
  border-left: 3px solid var(--color-gold);
}

.verse-text {
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.8;
  font-style: italic;
}

.fortune-interpretation {
  margin-bottom: 2rem;
}

.fortune-interpretation h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-maroon);
  margin-bottom: 1rem;
  text-align: center;
}

.interpretation-item {
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid var(--color-gold);
}

.interpretation-label {
  font-weight: 600;
  color: var(--color-maroon);
  display: block;
  margin-bottom: 0.3rem;
}

.interpretation-item p {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.lucky-elements {
  text-align: center;
}

.lucky-elements h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-maroon);
  margin-bottom: 1rem;
}

.lucky-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.lucky-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: rgba(212, 175, 55, 0.15);
  border-radius: 4px;
  border: 1px solid var(--color-gold);
}

.lucky-label {
  font-size: 0.85rem;
  color: var(--color-maroon);
  margin-bottom: 0.3rem;
}

.lucky-value {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: #2a1a1a;
  font-weight: 600;
}

.share-button {
  font-family: var(--font-display);
  font-size: 1.2rem;
  padding: 1rem 3rem;
  background: linear-gradient(135deg, var(--color-gold) 0%, #b8962e 100%);
  color: var(--color-maroon);
  border: 2px solid var(--color-gold);
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@media (max-width: 480px) {
  .lucky-grid {
    grid-template-columns: 1fr;
  }

  .scroll-content {
    padding: 1.5rem 1rem;
  }
}
```

Import in `src/styles/index.css`:
```css
@import './components/reveal.css';
```

**Step 3: Wire up Reveal in App**

Update `src/App.tsx`:
```typescript
import { Reveal } from './components/stages/Reveal'

function App() {
  // ... existing state

  return (
    <div className="app">
      {currentStage === 'reveal' && fortuneData && (
        <Reveal
          fortuneData={fortuneData}
          onShare={() => setCurrentStage('share')}
        />
      )}
      {/* ... rest of stages */}
    </div>
  )
}
```

**Step 4: Test reveal display**

Run: `npm run dev`
Expected: Full fortune displayed with scroll animation

**Step 5: Commit**

Run:
```bash
git add src/components/stages/Reveal.tsx src/styles/components/reveal.css
git commit -m "feat: build reveal stage with scroll animation

- Display full fortune details on parchment scroll
- Show verse, interpretations, and lucky elements
- Implement smooth scroll unroll animation
- Calculate and display lucky elements

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 14: Build Share Stage Component

**Files:**
- Create: `src/components/stages/Share.tsx`
- Create: `src/components/FortuneCard.tsx`
- Create: `src/styles/components/share.css`
- Create: `src/utils/shareImage.ts`

**Step 1: Create FortuneCard component**

Create `src/components/FortuneCard.tsx`:
```typescript
import { FortuneData } from '../types/fortune'
import { getFortuneGrade } from '../utils/fortune'
import { calculateLucky } from '../utils/lucky'

interface FortuneCardProps {
  fortuneData: FortuneData
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
```

**Step 2: Create Share component**

Create `src/components/stages/Share.tsx`:
```typescript
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FortuneData } from '../../types/fortune'
import { FortuneCard } from '../FortuneCard'

interface ShareProps {
  fortuneData: FortuneData
  onRestart: () => void
}

export function Share({ fortuneData, onRestart }: ShareProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleGenerate = async () => {
    if (isGenerating || !cardRef.current) return

    setIsGenerating(true)

    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#800000',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      })

      const link = document.createElement('a')
      link.download = `ciamsi-fortune-${fortuneData.number}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()

      setGenerated(true)
    } catch (error) {
      console.error('Failed to generate image:', error)
      alert('Failed to generate image. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div
      className="share-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="share-content">
        <motion.h2
          className="share-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Your Fortune Awaits
        </motion.h2>

        <motion.p
          className="share-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Save your fortune card to share with friends
        </motion.p>

        <div className="card-preview">
          <div ref={cardRef} className="card-capture-area">
            <FortuneCard fortuneData={fortuneData} />
          </div>
        </div>

        <motion.div
          className="share-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="save-button"
            onClick={handleGenerate}
            disabled={isGenerating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? 'Generating...' : generated ? 'Save Another' : 'Save Fortune Card'}
          </motion.button>

          <motion.button
            className="restart-button"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
```

**Step 3: Create Share styles**

Create `src/styles/components/share.css`:
```css
.share-stage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, var(--color-maroon) 0%, #1a0a0a 100%);
}

.share-content {
  text-align: center;
  padding: 2rem;
  max-width: 800px;
}

.share-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--color-gold);
  margin-bottom: 1rem;
}

.share-prompt {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--color-cream);
  margin-bottom: 2rem;
  opacity: 0.9;
}

.card-preview {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.card-capture-area {
  transform: scale(0.8);
}

@media (min-width: 768px) {
  .card-capture-area {
    transform: scale(1);
  }
}

.share-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

@media (min-width: 480px) {
  .share-actions {
    flex-direction: row;
    justify-content: center;
  }
}

.save-button,
.restart-button {
  font-family: var(--font-display);
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border: 2px solid var(--color-gold);
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
}

.save-button {
  background: linear-gradient(135deg, var(--color-gold) 0%, #b8962e 100%);
  color: var(--color-maroon);
}

.save-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.restart-button {
  background: transparent;
  color: var(--color-gold);
}

/* Fortune Card Styles (for image generation) */
.fortune-card {
  width: 360px;
  height: 640px;
  background: linear-gradient(135deg, var(--color-maroon) 0%, #5a0000 100%);
  border: 8px solid var(--color-gold);
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.fortune-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
}

.card-header {
  text-align: center;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--color-gold);
  padding-bottom: 1rem;
}

.card-traditional {
  font-size: 1rem;
  color: var(--color-gold);
  margin-bottom: 0.3rem;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-cream);
}

.card-number {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--color-gold);
  text-align: center;
  margin-bottom: 0.5rem;
}

.card-fortune-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--color-cream);
  text-align: center;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.card-grade {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--color-gold);
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 4px;
}

.card-verse {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.card-verse p {
  font-size: 0.95rem;
  color: var(--color-cream);
  text-align: center;
  line-height: 1.8;
  margin: 0;
  font-style: italic;
}

.card-lucky {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.card-lucky-item {
  text-align: center;
  padding: 0.5rem;
  background: rgba(212, 175, 55, 0.15);
  border-radius: 4px;
  border: 1px solid rgba(212, 175, 55, 0.3);
}

.card-lucky-item span {
  font-family: var(--font-display);
  font-size: 0.8rem;
  color: var(--color-gold);
}

.card-footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(212, 175, 55, 0.3);
}

.card-date {
  font-size: 0.8rem;
  color: var(--color-gold);
  opacity: 0.7;
}
```

Import in `src/styles/index.css`:
```css
@import './components/share.css';
```

**Step 4: Wire up Share in App**

Update `src/App.tsx`:
```typescript
import { Share } from './components/stages/Share'

function App() {
  // ... existing state

  const handleRestart = () => {
    setFortuneData(null)
    setCurrentStage('entrance')
  }

  return (
    <div className="app">
      {currentStage === 'share' && fortuneData && (
        <Share
          fortuneData={fortuneData}
          onRestart={handleRestart}
        />
      )}
      {/* ... rest of stages */}
    </div>
  )
}
```

**Step 5: Test share generation**

Run: `npm run dev`
Expected: Can save fortune card as PNG

**Step 6: Commit**

Run:
```bash
git add src/components/stages/Share.tsx src/components/FortuneCard.tsx src/styles/components/share.css
git commit -m "feat: build share stage with image generation

- Create FortuneCard component for image capture
- Implement html2canvas for PNG generation
- Add save and restart functionality
- Style shareable 9:16 fortune card

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 15: Add Stage Transitions with AnimatePresence

**Files:**
- Modify: `src/App.tsx`

**Step 1: Wrap stages with AnimatePresence**

Update `src/App.tsx`:
```typescript
import { AnimatePresence } from 'framer-motion'

function App() {
  // ... existing state

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
            fortuneNumber={fortuneData.number}
            fortuneData={fortuneData}
            onValidated={() => setCurrentStage('reveal')}
          />
        )}
        {currentStage === 'reveal' && fortuneData && (
          <Reveal
            key="reveal"
            fortuneData={fortuneData}
            onShare={() => setCurrentStage('share')}
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
```

**Step 2: Test stage transitions**

Run: `npm run dev`
Expected: Smooth transitions between all stages

**Step 3: Commit**

Run:
```bash
git add src/App.tsx
git commit -m "feat: add AnimatePresence for smooth stage transitions

- Wrap all stages with AnimatePresence
- Add unique keys for proper exit animations
- Enable wait mode for seamless transitions

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

## PHASE 3: Interactivity (Device Motion & Haptics)

### Task 16: Implement Device Motion Hook

**Files:**
- Create: `src/hooks/useDeviceMotion.ts`

**Step 1: Create DeviceMotion hook**

Create `src/hooks/useDeviceMotion.ts`:
```typescript
import { useState, useEffect } from 'react'

interface DeviceMotionState {
  intensity: number
  isShaking: boolean
  hasMotion: boolean
  reset: () => void
}

const SHAKE_THRESHOLD = 15

export function useDeviceMotion(): DeviceMotionState {
  const [intensity, setIntensity] = useState(0)
  const [isShaking, setIsShaking] = useState(false)
  const [hasMotion, setHasMotion] = useState(false)

  useEffect(() => {
    let animationId: number | null = null

    const setupListener = () => {
      window.addEventListener('devicemotion', handleMotion)
    }

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity
      if (!acceleration) return

      const total = Math.abs(acceleration.x || 0) +
                    Math.abs(acceleration.y || 0)

      if (total > SHAKE_THRESHOLD) {
        setIsShaking(true)
        setIntensity(prev => prev + total)

        // Reset isShaking after delay
        if (animationId) clearTimeout(animationId)
        animationId = window.setTimeout(() => {
          setIsShaking(false)
        }, 200)
      }
    }

    // Check if DeviceMotion is available
    if (typeof DeviceMotionEvent !== 'undefined') {
      setHasMotion(true)

      // Request permission on iOS 13+
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        ;(DeviceMotionEvent as any).requestPermission()
          .then((response: string) => {
            if (response === 'granted') {
              setupListener()
            } else {
              setHasMotion(false)
            }
          })
          .catch(() => {
            setHasMotion(false)
          })
      } else {
        setupListener()
      }
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion)
      if (animationId) clearTimeout(animationId)
    }
  }, [])

  const reset = () => setIntensity(0)

  return { intensity, isShaking, hasMotion, reset }
}
```

**Step 2: Test hook compiles**

Add temporary test to `src/App.tsx`:
```typescript
import { useDeviceMotion } from './hooks/useDeviceMotion'

function App() {
  const motion = useDeviceMotion()
  console.log('Motion:', motion.hasMotion, motion.intensity)
  // ...
}
```

Run: `npm run dev`
Expected: Console logs motion state

**Step 3: Clean up**

Remove console.log.

**Step 4: Commit**

Run:
```bash
git add src/hooks/useDeviceMotion.ts
git commit -m "feat: implement device motion hook

- Detect shake intensity using accelerometer
- Handle iOS 13+ permission request
- Provide fallback flag for desktop devices
- Reset intensity for new shake sessions

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 17: Implement Haptic Feedback Hook

**Files:**
- Create: `src/hooks/useHaptic.ts`

**Step 1: Create haptic hook**

Create `src/hooks/useHaptic.ts`:
```typescript
import { useCallback } from 'react'

interface HapticFeedback {
  trigger: (duration?: number) => void
  triggerPattern: (pattern: number[]) => void
  isSupported: boolean
}

export function useHaptic(): HapticFeedback {
  const isSupported = typeof navigator !== 'undefined' &&
                      'vibrate' in navigator

  const trigger = useCallback((duration: number = 50) => {
    if (isSupported) {
      navigator.vibrate(duration)
    }
  }, [isSupported])

  const triggerPattern = useCallback((pattern: number[]) => {
    if (isSupported) {
      navigator.vibrate(pattern)
    }
  }, [isSupported])

  return { trigger, triggerPattern, isSupported }
}
```

**Step 2: Test hook compiles**

Add temporary test to `src/App.tsx`:
```typescript
import { useHaptic } from './hooks/useHaptic'

function App() {
  const haptic = useHaptic()
  console.log('Haptic supported:', haptic.isSupported)
  // ...
}
```

Run: `npm run dev`
Expected: Console logs haptic support

**Step 3: Clean up**

Remove console.log.

**Step 4: Commit**

Run:
```bash
git add src/hooks/useHaptic.ts
git commit -m "feat: implement haptic feedback hook

- Add Vibration API support
- Support single pulse and pattern vibrations
- Provide capability detection
- Graceful fallback on unsupported devices

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 18: Integrate Device Motion and Haptics into Shaking Stage

**Files:**
- Modify: `src/components/stages/Shaking.tsx`

**Step 1: Update Shaking component with real motion**

Replace `src/components/stages/Shaking.tsx`:
```typescript
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDeviceMotion } from '../../hooks/useDeviceMotion'
import { useHaptic } from '../../hooks/useHaptic'
import { useAudioManager } from '../../hooks/useAudioManager'

interface ShakingProps {
  onComplete: (fortuneNumber: number) => void
}

const REQUIRED_INTENSITY = 500
const SHAKE_DURATION = 3000 // 3 seconds minimum

export function Shaking({ onComplete }: ShakingProps) {
  const { intensity, isShaking, hasMotion, reset } = useDeviceMotion()
  const { trigger: triggerHaptic } = useHaptic()
  const { playShakeLoop, stopShakeLoop, playSFX } = useAudioManager()

  const [startTime, setStartTime] = useState<number | null>(null)
  const [showProgress, setShowProgress] = useState(false)
  const progressRef = useRef(0)

  // Calculate progress (0-100%)
  const progress = Math.min((intensity / REQUIRED_INTENSITY) * 100, 100)

  // Haptic feedback on shake peaks
  useEffect(() => {
    if (isShaking) {
      triggerHaptic(50)
    }
  }, [isShaking, triggerHaptic])

  // Audio loop control
  useEffect(() => {
    if (isShaking && !startTime) {
      setStartTime(Date.now())
      playShakeLoop()
    } else if (isShaking) {
      playShakeLoop()
    } else {
      stopShakeLoop()
    }
  }, [isShaking, startTime, playShakeLoop, stopShakeLoop])

  // Check completion
  useEffect(() => {
    if (progress >= 100 && startTime) {
      const elapsed = Date.now() - startTime
      if (elapsed >= SHAKE_DURATION) {
        completeShake()
      }
    }
  }, [progress, startTime])

  const completeShake = () => {
    stopShakeLoop()
    playSFX('drop')

    setTimeout(() => {
      const fortuneNumber = Math.floor(Math.random() * 100) + 1
      onComplete(fortuneNumber)
    }, 500)
  }

  const handleManualShake = () => {
    if (hasMotion) return // Don't allow tap if motion available

    triggerHaptic(50)
    playSFX('drop')

    const newIntensity = intensity + 200
    progressRef.current = Math.min((newIntensity / REQUIRED_INTENSITY) * 100, 100)

    if (progressRef.current >= 100) {
      setTimeout(() => {
        const fortuneNumber = Math.floor(Math.random() * 100) + 1
        onComplete(fortuneNumber)
      }, 500)
    }
  }

  return (
    <motion.div
      className="shaking-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="shaking-content">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="shaking-title"
        >
          {hasMotion ? 'Shake Your Device' : 'Shake the Cylinder'}
        </motion.h2>

        <motion.p
          className="shaking-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {hasMotion
            ? 'Shake vigorously until the fortune emerges'
            : 'Tap the cylinder to shake it'}
        </motion.p>

        <motion.div
          className="cylinder-container"
          animate={isShaking ? {
            rotate: [-5, 5, -5, 0],
            x: [-10, 10, -10, 0]
          } : {}}
          transition={{ duration: 0.2 }}
          onClick={handleManualShake}
          whileHover={!hasMotion ? { scale: 1.05 } : {}}
          whileTap={!hasMotion ? { scale: 0.95 } : {}}
          style={{ cursor: hasMotion ? 'default' : 'pointer' }}
        >
          <div className="bamboo-cylinder">
            <div className="cylinder-top" />
            <div className="cylinder-body">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="bamboo-segment" />
              ))}
            </div>
            <div className="cylinder-bottom" />
          </div>

          <AnimatePresence>
            {isShaking && (
              <motion.div
                className="shake-indicator"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="progress-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              style={{ width: `${hasMotion ? progress : progressRef.current}%` }}
              initial={{ width: '0%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="progress-text">
            {hasMotion ? `${Math.round(progress)}%` : `${Math.round(progressRef.current)}%`}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
```

**Step 2: Update styles for progress bar**

Add to `src/styles/components/shaking.css`:
```css
.shake-indicator {
  position: absolute;
  inset: 0;
  border: 4px solid var(--color-gold);
  border-radius: 8px;
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.progress-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-gold) 0%, #fff 100%);
  border-radius: 4px;
}

.progress-text {
  font-size: 1rem;
  color: var(--color-gold);
  text-align: center;
}
```

**Step 3: Test shaking with motion**

Run: `npm run dev`
Expected: Motion/haptics work on mobile, tap fallback on desktop

**Step 4: Commit**

Run:
```bash
git add src/components/stages/Shaking.tsx src/styles/components/shaking.css
git commit -m "feat: integrate device motion and haptics into shaking

- Use DeviceMotion API for real shake detection
- Add haptic feedback on shake peaks
- Play shake loop audio during motion
- Show progress bar for shake intensity
- Maintain tap fallback for desktop

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 19: Add Keyboard Support (Spacebar for Desktop)

**Files:**
- Modify: `src/components/stages/Shaking.tsx`

**Step 1: Add keyboard event listener**

Update `src/components/stages/Shaking.tsx`:
```typescript
useEffect(() => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === 'Space' && !hasMotion) {
      event.preventDefault()
      handleManualShake()
    }
  }

  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [hasMotion, intensity])
```

**Step 2: Add keyboard hint**

Update prompt text:
```typescript
<motion.p className="shaking-prompt">
  {hasMotion
    ? 'Shake vigorously until the fortune emerges'
    : 'Press SPACE or tap the cylinder to shake it'}
</motion.p>
```

**Step 3: Test keyboard input**

Run: `npm run dev`
Expected: Spacebar triggers shake on desktop

**Step 4: Commit**

Run:
```bash
git add src/components/stages/Shaking.tsx
git commit -m "feat: add keyboard support for shaking

- Add spacebar trigger for desktop users
- Update prompt to show keyboard option
- Prevent default scroll behavior on space

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

## PHASE 4: Polish & Optimization

### Task 20: Optimize Performance (Code Splitting)

**Files:**
- Modify: `src/components/stages/Share.tsx`
- Modify: `vite.config.ts`

**Step 1: Already done via html2canvas dynamic import in Share component**

The Share component already lazy loads html2canvas, so this is optimized.

**Step 2: Verify other imports are efficient**

Run: `npm run build`
Expected: Build completes with separate chunks

**Step 3: Review bundle size**

Check output for chunk sizes - should be reasonable.

**Step 4: Commit**

Run:
```bash
git add vite.config.ts
git commit -m "perf: verify code splitting configuration

- Confirm framer-motion and html2canvas are separate chunks
- Optimize initial bundle size
- Lazy load share generation library

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 21: Add Responsive Polish

**Files:**
- Modify: `src/styles/index.css`
- Modify: `src/styles/components/*.css`

**Step 1: Add viewport meta tag (already in index.html)**

**Step 2: Add base responsive adjustments**

Update `src/styles/index.css`:
```css
/* Add to existing */
@media (max-width: 480px) {
  :root {
    --display-scale: 0.9;
  }

  .app {
    padding: 0;
  }
}

@media (min-width: 1024px) {
  .app {
    max-width: 1024px;
    margin: 0 auto;
  }
}
```

**Step 3: Test on different breakpoints**

Run: `npm run dev`
Resize browser to test mobile, tablet, desktop views.

**Step 4: Commit**

Run:
```bash
git add src/styles
git commit -m "style: add responsive adjustments for all breakpoints

- Scale content for mobile devices
- Center layout on desktop
- Optimize spacing across breakpoints

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 22: Add Noise Texture Overlay

**Files:**
- Create: `src/styles/components/noise.css`

**Step 1: Create noise effect**

Create `src/styles/components/noise.css`:
```css
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

**Step 2: Add to App**

Update `src/App.tsx`:
```typescript
return (
  <div className="app">
    <div className="noise-overlay" />
    <AnimatePresence mode="wait">
      {/* stages */}
    </AnimatePresence>
  </div>
)
```

Import in `src/styles/index.css`:
```css
@import './components/noise.css';
```

**Step 3: Test noise effect**

Run: `npm run dev`
Expected: Subtle film grain over entire app

**Step 4: Commit**

Run:
```bash
git add src/styles/components/noise.css src/App.tsx
git commit -m "style: add noise texture overlay

- Add subtle film grain for aged atmosphere
- Apply globally with fixed positioning
- Enhance traditional temple aesthetic

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 23: Final Code Review and Type Check

**Files:**
- All TypeScript files

**Step 1: Run type check**

Run: `npm run type-check`
Expected: No errors

**Step 2: Run lint check**

Run: `npm run lint`
Expected: No errors (may need to configure ESLint)

**Step 3: Fix any issues**

If any issues found, fix them.

**Step 4: Commit**

Run:
```bash
git add .
git commit -m "chore: pass type check and lint

- Ensure all TypeScript types are valid
- Fix any linting issues
- Prepare for production build

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

## PHASE 5: Deployment

### Task 24: Pre-Deployment Checklist

**Files:**
- Various

**Step 1: Verify all checklist items**

- [ ] Type check passes
- [ ] Build succeeds
- [ ] Audio files exist in public/audio/
- [ ] ciamsi.json is in src/data/
- [ ] Favicon added (optional)
- [ ] Meta tags configured

**Step 2: Create placeholder audio files**

Since we don't have real audio files yet, create placeholders:

Run:
```bash
touch public/audio/bgm.mp3 public/audio/shake.mp3 public/audio/drop.mp3 public/audio/poe.mp3 public/audio/gong.mp3
```

**Step 3: Create simple SVG favicon**

Create `public/temple-icon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#800000"/>
  <text x="50" y="70" font-family="serif" font-size="60" fill="#D4AF37" text-anchor="middle">簽</text>
</svg>
```

**Step 4: Commit**

Run:
```bash
git add public
git commit -m "chore: add placeholder audio files and favicon

- Create empty audio files as placeholders
- Add temple-themed SVG favicon
- Complete pre-deployment checklist

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 25: Production Build

**Files:**
- Build output

**Step 1: Run production build**

Run: `npm run build`
Expected: Build completes successfully

**Step 2: Preview build**

Run: `npm run preview`
Expected: Can preview production build locally

**Step 3: Test build in browser**

Navigate to preview URL and test all stages.

**Step 4: Commit**

No commit needed for build output.

---

### Task 26: Deploy to Vercel

**Files:**
- vercel.json

**Step 1: Create Vercel config**

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": null
}
```

**Step 2: Deploy to Vercel**

Run: `vercel` (or use Vercel dashboard)

**Step 3: Test deployed app**

Visit the deployed URL and test full flow.

**Step 4: Commit**

Run:
```bash
git add vercel.json
git commit -m "chore: add Vercel deployment config

- Configure build settings for Vercel
- Prepare for free tier deployment
- Set static site hosting

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

### Task 27: Post-Deployment Testing

**Files:**
- Manual testing

**Step 1: Test on real mobile device**

Use a phone to test:
- [ ] DeviceMotion shaking works
- [ ] Haptic feedback triggers
- [ ] Audio plays
- [ ] All stages transition smoothly
- [ ] Share generates image

**Step 2: Test on desktop browsers**

- [ ] Chrome/Edge
- [ ] Safari
- [ ] Firefox

**Step 3: Test responsive breakpoints**

- [ ] Mobile (< 768px)
- [ ] Tablet (768-1024px)
- [ ] Desktop (> 1024px)

**Step 4: Create git tag for release**

Run:
```bash
git tag -a v1.0.0 -m "Release v1.0.0 - Initial Ciam Si fortune telling app"
git push origin v1.0.0
```

**Step 5: Final commit**

Run:
```bash
git add .
git commit -m "release: v1.0.0 complete

- Full 5-stage fortune telling experience
- DeviceMotion shaking with haptic feedback
- Atmospheric audio and visuals
- Social image sharing
- Deployed to Vercel

Co-Authored-By: Claude (glm-4.7) <noreply@anthropic.com>"
```

---

## Implementation Complete

**Total Tasks:** 27
**Estimated Time:** 9-10 days

### Summary of Built Features

| Feature | Status |
|---------|--------|
| Vite + React + TypeScript | ✅ |
| Framer Motion animations | ✅ |
| 5-stage flow | ✅ |
| DeviceMotion API | ✅ |
| Haptic feedback | ✅ |
| Audio manager | ✅ |
| Fortune selection | ✅ |
| Lucky elements calculation | ✅ |
| Poe validation | ✅ |
| Image generation | ✅ |
| Responsive design | ✅ |
| Performance optimizations | ✅ |
| Vercel deployment | ✅ |

### Next Steps After Implementation

1. **Source real audio files** - Replace placeholders with actual audio
2. **Add real-world testing** - Test on various devices
3. **Monitor analytics** - Add Vercel Analytics if desired
4. **Iterate on feedback** - Polish based on user experience
