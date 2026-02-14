# Shaking & Validation Page Redesign Design

**Date:** 2026-02-14
**Status:** Approved

## Overview

Redesign the Shaking and Validation pages of the Ciam Si fortune telling app to simplify UI and add a bowl-based reveal interaction.

## Requirements

### Shaking Page
- Remove progress bar percentage display
- Remove "x/x" counter display
- Keep only the shaking animation
- Internal attempt tracking: minimum 3, maximum 20 (randomized per session)

### Validation Page
- Visualize two poe circles as a 3D bowl
- User taps to trigger reveal animation
- Good fortune → flip bowl 180°
- Bad fortune → bowl stays upright
- Show fortune number based on flip result

## Architecture

### Shaking.tsx Changes
```typescript
// Remove from JSX:
// - progress-bar element
// - counter text display

// Add:
const maxAttempts = useMemo(() => Math.floor(Math.random() * 18) + 3, []);
// Internal shakeCount state remains but not displayed
// Transition when shakeCount >= maxAttempts
```

### Validation.tsx Changes
```typescript
interface ValidationProps {
  fortune: Fortune;
  onReveal: () => void;
  onNext: () => void;
}

// State:
const [hasRevealed, setHasRevealed] = useState(false);
const isGoodFortune = getFortuneGrade(fortune) in ['上吉', '大吉', '中吉', '吉'];

// Bowl flip animation with Framer Motion:
// - Good fortune: rotateX(180deg)
// - Bad fortune: rotateX(0deg)
```

### Fortune Grade Detection
Uses existing `utils/fortune.ts` `getFortuneGrade()` function:
- Good grades (上吉, 大吉, 中吉, 吉) → flip bowl
- Other grades (小吉, 末吉, etc.) → upright reveal

## Data Flow

```
Shaking.tsx
  ├─ Internal shakeCount (hidden)
  ├─ maxAttempts (3-20, randomized on mount)
  └─ When shakeCount >= maxAttempts → StageController
       └─ Generates fortune → Validation.tsx
            ├─ Determines fortune grade
            ├─ Waits for tap
            └─ Animates flip based on grade
                 └─ Enable continue → Reveal.tsx
```

## Error Handling & Edge Cases

- **Repeated taps:** Debounce handler, animate once
- **Missing fortune data:** Fallback to upright reveal
- **Framer Motion unsupported:** CSS transition fallback
- **Accessibility:** Keyboard (Enter/Space) + ARIA announcements
- **Reduced motion:** Skip flip animation for prefers-reduced-motion

## Testing Checklist

- [ ] Shaking: No progress bar or counter visible
- [ ] Shaking: Transitions between 3-20 shakes
- [ ] Validation: Bowl appears upright initially
- [ ] Validation: Tap triggers appropriate animation
- [ ] Validation: Good fortune flips 180°
- [ ] Validation: Bad fortune stays upright
- [ ] Animation completes before "continue" enables
- [ ] Keyboard accessible (Tab/Enter)
- [ ] Reduced motion respected
- [ ] All fortune grades tested

## Implementation Complete

**Date:** 2026-02-14

**Changes Made:**
- Shaking.tsx: Removed progress bar and counter, added randomized maxAttempts (3-20)
- Shaking.css: Removed unused styles
- fortune.ts: Added isGoodFortune() helper function
- Validation.tsx: Complete redesign with bowl visualization and tap interaction
- validation.css: Added 3D bowl styles with shadows and animations
- Accessibility: Added reduced motion support and ARIA live regions

**Testing Status:** All tasks completed
- Type checking: ✅ Passed
- Linting: ✅ Passed (1 pre-existing warning in unrelated file)
- Production build: ✅ Succeeded
- All spec compliance reviews: ✅ Passed
- All code quality reviews: ✅ Approved

## Implementation Notes

- Leverage existing Framer Motion setup
- No changes to `useDeviceMotion` or `useHaptic` hooks
- Maintain existing `StageController` flow
- CSS 3D transforms for bowl appearance
