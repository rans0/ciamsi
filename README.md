# Ciam Si - Chinese Fortune Telling

A traditional Chinese fortune telling (Kau Chim) web application built with React, TypeScript, and Vite.

## Features

- **Interactive Fortune Telling**: Shake the virtual cylinder to receive your fortune
- **Device Motion Support**: On mobile devices, physically shake your device
- **Haptic Feedback**: Vibration feedback on supported devices
- **Touch/Tap Support**: Tap the cylinder to shake if motion is not supported
- **Beautiful Fortune Cards**: Download your fortune results as a high-quality card
- **100 Traditional Fortunes**: Complete with verses and interpretations
- **Lucky Elements**: Get your lucky number, direction, and color
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Background Audio Management**: Automatically pauses audio when the app is minimized

## Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Framer Motion**: Smooth animations
- **html-to-image**: Fortune card generation (mobile-optimized)

## Project Structure

```
src/
├── components/
│   ├── stages/
│   │   ├── Entrance.tsx    # Welcome screen
│   │   ├── Shaking.tsx     # Cylinder shaking with device motion
│   │   ├── Validation.tsx  # Fortune number reveal
│   │   ├── Reveal.tsx      # Full fortune display
│   │   └── Share.tsx       # Save fortune card
│   ├── FortuneCard.tsx     # Shareable card component
│   └── StageController.tsx # Stage transition management
├── hooks/
│   ├── useAudioManager.ts  # Audio playback management
│   ├── useDeviceMotion.ts  # Accelerometer detection
│   └── useHaptic.ts        # Vibration feedback
├── types/
│   ├── fortune.ts          # Fortune data types
│   └── audio.ts            # Audio types
├── data/
│   └── ciamsi.ts           # 100 fortune records
├── utils/
│   ├── fortune.ts          # Fortune grading logic
│   └── lucky.ts           # Lucky element calculation
└── styles/
    ├── index.css           # Global styles + noise texture
    └── components/        # Component-specific styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## Features Implementation

### Device Motion (useDeviceMotion Hook)
- Detects accelerometer on mobile devices
- Configurable shake threshold and cooldown
- iOS 13+ permission handling
- Fallback to tap interaction on unsupported devices

### Haptic Feedback (useHaptic Hook)
- Vibration API integration
- Predefined patterns (light, medium, heavy, success, warning, error)
- Custom intensity and duration support
- Graceful fallback on unsupported devices

### Shaking Stage
- Dual input: device motion or tap
- Visual progress bar
- Animated cylinder shaking
- Audio and haptic feedback integration

### Responsive Design
- Mobile-first approach
- Fluid typography with clamp()
- Responsive images and layouts
- Reduced motion support
- Accessibility focus indicators

### Performance Optimizations
- Lazy-loaded html2canvas (202KB separate chunk)
- Code splitting via Vite
- Optimized animations with Framer Motion
- Noise texture via SVG data URI (no additional request)

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Vercel will automatically detect Vite configuration
4. Deploy!

### Manual Deployment

```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

## Audio Files

Place audio files in `/public/audio/`:
- `pojeng-epic-happy-love-guzheng-412659.mp3` - Background music (loops)
- `freesound_community-dice-53589.mp3` - Shaking sound effect
- `freesound_community-stick-snap-2-83899.mp3` - Stick dropping / poe sound
- `dragon-studio-breaking-wood-356120.mp3` - Gong sound for transitions

Placeholder files are included for development.

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- iOS Safari 14+
- Android Chrome 90+

## License

MIT

## Credits

Traditional Chinese fortune telling (Kau Chim / 求籤)
Based on the Ciam Si (籤詩) fortune tradition
