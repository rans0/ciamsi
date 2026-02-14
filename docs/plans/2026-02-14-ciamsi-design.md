# Design Document: Ciam Si - Interactive Chinese Fortune Telling

**Date:** 2026-02-14
**Tech Stack:** Vite + React + TypeScript + Framer Motion + html2canvas
**Deployment:** Vercel (free tier)

---

## 1. Project Overview

**Purpose:** An immersive web experience simulating traditional Chinese temple fortune telling (Ciam Si/Kau Cim). Users shake a virtual bamboo cylinder, receive a fortune stick, and get a detailed reading.

**Target Audience:** Mobile-first users seeking an atmospheric, mystical fortune-telling experience for entertainment and reflection.

**Core Experience Flow:**
```
1. Entrance → 2. Shaking Ritual → 3. Poe Validation → 4. Fortune Reveal → 5. Share
```

**Key Features:**
- DeviceMotion API for realistic shaking
- Haptic feedback for tactile immersion
- Atmospheric audio (guzheng BGM, sound effects)
- Responsive design (mobile-first, desktop compatible)
- Social image sharing

---

## 2. Architecture

### Project Structure
```
ciamsi/
├── src/
│   ├── components/           # React components
│   │   ├── stages/           # The 5 stage components
│   │   │   ├── Entrance.tsx
│   │   │   ├── Shaking.tsx
│   │   │   ├── Validation.tsx
│   │   │   ├── Reveal.tsx
│   │   │   └── Share.tsx
│   │   ├── ui/              # Reusable UI components
│   │   └── audio/           # Audio player components
│   ├── hooks/               # Custom hooks
│   │   ├── useDeviceMotion.ts
│   │   ├── useHaptic.ts
│   │   └── useAudioManager.ts
│   ├── utils/               # Utility functions
│   │   ├── fortune.ts       # Fortune selection logic
│   │   └── lucky.ts         # Lucky calculation algorithm
│   ├── data/                # Data files
│   │   └── ciamsi.json
│   ├── styles/              # Global styles
│   └── App.tsx              # Main app
├── public/                   # Static assets
│   ├── audio/               # Sound files
│   └── images/              # Static images
└── vite.config.ts
```

### State Management

Central state in `App.tsx` using `useState`:
- `currentStage` - Tracks which of 5 stages is active
- `fortuneData` - Selected fortune object
- `shakeIntensity` - Accumulated shake value
- `poeAttempts` - Validation retry counter

**No global state library needed** - simple prop drilling for this linear flow.

---

## 3. Components & Data Flow

### The 5 Stage Components

#### 1. Entrance Stage
**Purpose:** Atmospheric entry, requires user interaction to bypass autoplay restrictions

**Features:**
- Full-screen dark red/gold theme
- Animated smoke/temple background
- "Enter Temple" button (triggers BGM + fade transition)
- Prompt: "Quiet your heart. Think of one question..."

**Props:** `onEnter` callback

#### 2. Shaking Stage (Core Experience)
**Purpose:** Immersive physical interaction

**Features:**
- 3D/2D bamboo cylinder visual
- **DeviceMotion API** - Detect shake intensity
- **Fallback** - Click/tap + Spacebar for desktop
- **Visual feedback:** Cylinder rocks based on acceleration
- **Audio:** Looping wood-click sounds during shake
- **Haptic:** Vibrate(50ms) on peak acceleration
- **Trigger:** After 3-5 seconds of accumulated intensity → animate single stick falling

**Props:** `onComplete` (fortune number)

#### 3. Validation Stage (Poe Throwing)
**Purpose:** Authenticity through confirmation ritual

**Features:**
- Display fallen stick with number
- Tap to throw 2 red wooden blocks (Poe)
- **RNG Logic:**
  - Sheng Bei (1 flat, 1 round) → VALID → proceed
  - Xiao Bei / No Bei (both same) → INVALID → retry
- Max 3 attempts, then wisdom message + auto-validate

**Props:** `fortuneNumber`, `onValidated`

#### 4. Reveal Stage (Fortune Result)
**Purpose:** Reward with beautiful result card

**Features:**
- Animate smoke/gold light → scroll unrolls
- **Display:**
  - Fortune number & Chinese title
  - Grade (Supreme/Superior/Medium/Low)
  - 4-line verse
  - Interpretations (General, Business, Romance, Health)
  - **Lucky Elements:** number, direction, color (calculated algorithmically)

**Props:** `fortuneData`, `onShare`

#### 5. Share Stage
**Purpose:** Viral social sharing

**Features:**
- "Save Fortune Card" button
- **html2canvas** generates 9:16 vertical image
- Download to device
- Restart option

**Props:** `fortuneData`, `onRestart`

### Data Flow
```
ciamsi.json (imported)
       ↓
[User shakes device]
       ↓
useDeviceMotion hook (accumulates intensity)
       ↓
Shaking component triggers release
       ↓
Random fortune selected (1-100)
       ↓
Validation (Poe throw)
       ↓
fortuneData + Lucky elements calculated
       ↓
Reveal component displays result
       ↓
Share component generates image
```

---

## 4. Audio, Visual Assets & Aesthetics

### Audio System

**Audio Files (Free Sources):**

| Asset | Search Terms | Source |
|-------|--------------|--------|
| **BGM** | "Guzheng serene", "Chinese temple ambience", "Zen garden asian" | Pixabay Music |
| **Shaking** | "Bamboo wind chimes", "Dice cup shake", "Wooden rattle" | Freesound.org |
| **Stick Drop** | "Chopstick drop", "Pencil drop", "Wood click" | Freesound.org |
| **Poe Throw** | "Wood block hit", "Castanets single" (low pitch) | Freesound.org |

**Audio Manager Hook (`useAudioManager`):**
- Preload all audio on entrance (after user interaction)
- BGM: Loop indefinitely, volume 0.3
- Shaking: Loop 0.5s clip while motion detected
- SFX: One-shot plays (drop, poe, gong)

### Visual Aesthetics

**Design Direction:** Traditional Chinese Temple Mysticism

| Aspect | Specification |
|--------|---------------|
| **Color Palette** | Deep Maroon `#800000`, Gold `#D4AF37`, Cream `#F5E6D3` |
| **Display Font** | *Cinzel* - elegant, timeless, characterful |
| **Body Font** | *Cormorant Garamond* - refined readability |
| **Background** | Dark temple interior with CSS particle smoke effect |
| **Texture Overlay** | Subtle noise/grain for aged feel |
| **Animation Style** | Slow, deliberate - smoke drift, gentle fade, smooth scroll reveal |

### Responsive Breakpoints

| Breakpoint | Width | Layout Adjustments |
|------------|-------|-------------------|
| **Mobile** | < 768px | Full vertical, large touch targets |
| **Tablet** | 768-1024px | Centered, slight spacing increase |
| **Desktop** | > 1024px | Max-width container, centered experience |

---

## 5. Core Logic & Algorithms

### Fortune Selection Algorithm

**Location:** `src/utils/fortune.ts`

```typescript
// Pure random selection from 1-100
function selectFortune(): Fortune {
  const fortuneNumber = Math.floor(Math.random() * 100) + 1
  return fortunes[fortuneNumber - 1]
}
```

### Lucky Elements Algorithm

**Location:** `src/utils/lucky.ts`

```typescript
// Calculate from fortune number + current date
function calculateLucky(fortuneNumber: number, date: Date = new Date()) {
  const dayOfYear = getDayOfYear(date)

  // Lucky Number: (fortune number + day of year) % 9 + 1
  const luckyNumber = ((fortuneNumber + dayOfYear) % 9) + 1

  // Lucky Direction: 8 directions based on combined sum
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

### Device Motion Detection

**Location:** `src/hooks/useDeviceMotion.ts`

```typescript
function useDeviceMotion() {
  const [intensity, setIntensity] = useState(0)
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    // Request permission on iOS 13+
    if (typeof DeviceMotionEvent !== 'undefined' &&
        typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any).requestPermission()
        .then(response => { if (response === 'granted') setupListener() })
    } else {
      setupListener()
    }
  }, [])

  function handleMotion(event: DeviceMotionEvent) {
    const acceleration = event.accelerationIncludingGravity
    if (!acceleration) return

    const total = Math.abs(acceleration.x || 0) +
                  Math.abs(acceleration.y || 0)

    if (total > SHAKE_THRESHOLD) {
      setIsShaking(true)
      setIntensity(prev => prev + total)
    }
  }

  return { intensity, isShaking, reset: () => setIntensity(0) }
}
```

**Constants:** `SHAKE_THRESHOLD = 15`

### Poe Validation Logic

**Location:** `src/components/stages/Validation.tsx`

```typescript
function throwPoe(): PoeResult {
  const block1 = Math.random() < 0.5 ? 'flat' : 'round'
  const block2 = Math.random() < 0.5 ? 'flat' : 'round'

  if (block1 !== block2) {
    return 'valid' // Sheng Bei
  } else if (block1 === 'flat') {
    return 'xiao-bei'
  } else {
    return 'no-bei'
  }
}
```

**Retry Flow:** Max 3 attempts, then wisdom message + auto-validate

---

## 6. Error Handling & Edge Cases

### DeviceMotion Permission Issues

**Scenario:** User denies motion permission or device lacks sensors

**Handling:** Fallback to click/tap interaction with UI prompt

### Audio Autoplay Blocking

**Solution:** Handled by Entrance Stage - requires user click to start BGM

### Asset Loading Failures

**Handling:** Graceful degradation - continue without audio if loading fails

### Image Generation Failures

**Handling:** Fallback to simple styled div if html2canvas fails

### Fortune Data Integrity

**Prevention:** TypeScript type checking validates structure at compile time

---

## 7. Performance & Optimization

### Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **First Load** | < 3 seconds | Lazy load assets, code splitting |
| **Interaction** | 60 FPS | Framer Motion GPU animations |
| **Shake Response** | < 16ms latency | Direct DeviceMotion handling |
| **Image Generation** | < 2 seconds | html2canvas with optimized settings |

### Vercel Best Practices Applied

**Bundle Size Optimization:**
- `bundle-dynamic-imports` - Lazy load Share component
- `bundle-defer-third-party` - Delay html2canvas until share clicked
- `bundle-conditional` - Load Stage components on demand

**Rendering Performance:**
- `rendering-hoist-jsx` - Static elements outside components
- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG
- `rendering-conditional-render` - Use ternary, not &&

**JavaScript Performance:**
- `js-early-exit` - Early returns in shake logic
- `js-hoist-regexp` - Pre-compile regex patterns
- `js-cache-function-results` - Cache lucky calculations

**Client-Side:**
- `client-passive-event-listeners` - For DeviceMotion

### Asset Optimization

**Audio:** MP3 at 128kbps (BGM), 64kbps (SFX)
**Images:** WebP with PNG fallback, lazy loading
**CSS:** Generate textures where possible (noise, patterns)

---

## 8. Manual Testing Strategy

### Manual Testing Checklist

**Mobile Testing (iOS/Android):**
- [x] DeviceMotion shaking works accurately
- [x] Haptic feedback triggers on shake peaks
- [x] Audio plays without interruption
- [x] Touch targets are 44px minimum
- [x] Orientation changes handled smoothly

**Desktop Testing:**
- [x] Click fallback works for shaking
- [x] Spacebar triggers shake (Logic exists, UI hint removed per user request)
- [x] Responsive layout at 1024px+
- [x] Mouse interactions work correctly

**Audio Testing:**
- [x] BGM loops seamlessly
- [x] SFX play on correct triggers
- [x] Volume is balanced
- [x] No audio pops/clicks (Added Page Visibility handler to pause on minimize)

**Cross-Browser:**
- [x] Chrome/Edge (Chromium)
- [x] Safari (iOS/Mac) - Critical fixes for image capture and audio unlock applied
- [x] Firefox

---

## 9. Deployment & Build Configuration

### Vercel Deployment

**Project Type:** Vite (React) - Static Site

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": null
}
```

### Vite Configuration

**vite.config.ts:**
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

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "type-check": "tsc --noEmit"
  }
}
```

### Pre-Deployment Checklist

- [x] Type check passes (`npm run type-check`)
- [x] Lint passes (`npm run lint`)
- [x] Build succeeds (`npm run build`)
- [x] Audio files exist in `public/audio/` (Updated to actual high-quality assets)
- [x] ciamsi.json is valid
- [x] Favicon added
- [x] Meta tags configured (basic SEO)

### Basic SEO

```html
<title>Ciam Si - Interactive Chinese Fortune Telling</title>
<meta name="description" content="Experience traditional Chinese temple fortune telling. Shake the virtual cylinder, receive your fortune, and discover your lucky elements." />
<meta property="og:title" content="Ciam Si - Chinese Fortune Telling" />
<meta property="og:description" content="Receive your fortune from the ancient oracle." />
<meta property="og:image" content="/og-image.png" />
```

---

## 10. Development Phases

### Phase 1: Foundation (Days 1-2)

**Goal:** Working app with basic flow

- [x] Initialize Vite + React + TypeScript project
- [x] Install dependencies: framer-motion, html-to-image (Swapped from html2canvas for mobile reliability)
- [x] Import ciamsi.json data
- [x] Create project structure
- [x] Implement fortune selection algorithm
- [x] Build 5 stage components (Entrance, Shaking, Validation, Reveal, Share)
- [x] Wire up stage transitions
- [x] Basic styling with color palette

### Phase 2: Immersion (Days 3-4)

**Goal:** Add atmospheric audio & visuals

- [x] Source free audio assets (BGM, SFX) - *Actual high-quality assets integrated*
- [x] Build AudioManager hook (Added mobile unlock + visibility handler)
- [x] Add audio to all stages
- [x] Create smoke particle effect
- [x] Apply typography (Cinzel, Cormorant Garamond)
- [x] Style each stage with temple aesthetic
- [x] Add textures (noise, parchment)

### Phase 3: Interactivity (Days 5-6)

**Goal:** Core shaking & validation mechanics

- [x] Implement useDeviceMotion hook
- [x] Add DeviceMotion permission handling (Explicit request on "Enter Temple")
- [x] Build cylinder shake animation
- [x] Add haptic feedback
- [x] Implement stick falling animation
- [x] Build Poe validation logic
- [x] Add retry limit (3 attempts)
- [x] Desktop fallback (click/tap)

### Phase 4: Polish & Sharing (Days 7-8)

**Goal:** Final result card + sharing

- [x] Implement lucky elements algorithm
- [x] Build Reveal stage UI
- [x] Create scroll unroll animation
- [x] Implement html-to-image generation (Advanced toCanvas fix for mobile)
- [x] Design share card layout
- [x] Add download functionality
- [x] Optimize performance (Background audio control, font-ready checks)
- [x] Responsive adjustments (360x640 off-screen capture)

### Phase 5: Testing & Launch (Days 9-10)

**Goal:** Quality assurance & deployment

- [x] Manual testing checklist
- [x] Fix bugs, polish animations
- [x] Pre-deployment checklist (Vite/TS/ESLint)
- [ ] Deploy to Vercel (Ready for user deployment)
- [x] Test on real mobile device
- [x] Verify audio autoplay works (Fixed via gesture unlock)
- [x] Share first fortune card (Capture successfully verified on mobile)

---

## Implementation Priority Order

```
1. Fortune Selection (core logic)
2. Stage Transitions (app structure)
3. DeviceMotion Hook (main interaction)
4. AudioManager (immersion)
5. Shaking Animation (visual feedback)
6. Poe Validation (game mechanic)
7. Reveal Stage (reward)
8. Share Generation (viral loop)
9. Performance Optimization (polish)
10. Manual Testing (quality assurance)
```

---

**Design Approved:** [User Signature]
**Date:** 2026-02-14
