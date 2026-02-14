# Shaking & Validation Page Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Simplify the Shaking page by removing progress indicators and redesign the Validation page with a bowl-based reveal interaction.

**Architecture:** Modify two existing stage components (Shaking.tsx and Validation.tsx) with state changes, new Framer Motion animations, and updated CSS. Fortune grade detection uses existing utility functions.

**Tech Stack:** React, TypeScript, Framer Motion, CSS 3D transforms

---

### Task 1: Update Shaking.tsx - Remove Progress UI and Add Random Max Attempts

**Files:**
- Modify: `src/components/stages/Shaking.tsx:1-183`

**Step 1: Read current Shaking.tsx to understand structure**

Run: Read the file at `src/components/stages/Shaking.tsx`
Expected: See the component with progress bar, counter, and fixed REQUIRED_TAPS/REQUIRED_DEVICE_SHAKES

**Step 2: Remove progress bar JSX elements**

Delete lines 118-141 (the entire `.shake-progress-container` section including progress bar and percentage text)

**Step 3: Remove counter JSX element**

Delete lines 167-177 (the `.shake-counter` section including "x/x" display)

**Step 4: Add useMemo import at top of file**

Add `useMemo` to the existing imports on line 1:

```typescript
import { useState, useEffect, useCallback, useMemo } from 'react'
```

**Step 5: Replace fixed constants with randomized maxAttempts**

Replace lines 10-11 with:

```typescript
const MIN_ATTEMPTS = 3
const MAX_ATTEMPTS = 20
```

**Step 6: Add maxAttempts state with useMemo**

After line 16 (after existing `useState` hooks), add:

```typescript
const maxAttempts = useMemo(() => Math.floor(Math.random() * (MAX_ATTEMPTS - MIN_ATTEMPTS + 1)) + MIN_ATTEMPTS, [])
```

**Step 7: Update device motion completion check**

Replace line 23 to use `maxAttempts`:

```typescript
if (deviceMotion.isSupported && deviceMotion.shakeCount >= maxAttempts && inputMethod !== 'tap') {
```

**Step 8: Update tap completion check**

Replace line 43 to use `maxAttempts`:

```typescript
if (tapCount + 1 >= maxAttempts) {
```

**Step 9: Update isComplete calculation**

Replace lines 72-74 with:

```typescript
const isComplete = inputMethod === 'motion'
  ? deviceMotion.shakeCount >= maxAttempts
  : tapCount >= maxAttempts
```

**Step 10: Update displayCount and requiredCount**

Delete lines 76-81 (displayCount and requiredCount variables - no longer needed)

**Step 11: Remove unused progress variable**

Delete lines 67-70 (progress calculation - no longer needed)

**Step 12: Test shaking page changes**

Run: `npm run dev`
Expected: Shaking page shows cylinder and prompt text, but NO progress bar or counter

**Step 13: Commit changes**

```bash
git add src/components/stages/Shaking.tsx
git commit -m "feat(shaking): remove progress bar and counter, add randomized max attempts

- Remove progress bar and percentage display
- Remove x/x counter display
- Add randomized maxAttempts (3-20) on mount
- Update completion checks to use maxAttempts
```

---

### Task 2: Update Shaking.css - Remove Progress Bar Styles

**Files:**
- Modify: `src/styles/components/shaking.css:1-126`

**Step 1: Read current shakings.css to see progress styles**

Run: Read the file at `src/styles/components/shaking.css`
Expected: See `.shake-progress-container`, `.shake-progress-bar`, and related styles

**Step 2: Remove progress bar container styles**

Delete lines 92-100 (`.shake-progress-container` styles)

**Step 3: Remove progress bar styles**

Delete lines 102-117 (`.shake-progress-bar`, `.shake-progress-fill`, and `.shake-progress-text`)

**Step 4: Remove counter styles**

Delete lines 71-82 (`.shake-counter` and `.shake-hint` styles)

**Step 5: Test styling changes**

Run: `npm run dev`
Expected: Page renders cleanly without console errors about missing styles

**Step 6: Commit changes**

```bash
git add src/styles/components/shaking.css
git commit -m "style(shaking): remove unused progress bar and counter styles"
```

---

### Task 3: Add Helper Function to Determine Good Fortune Grade

**Files:**
- Modify: `src/utils/fortune.ts:1-29`

**Step 1: Read current fortune.ts utility**

Run: Read the file at `src/utils/fortune.ts`
Expected: See `getFortuneGrade()` function returning FortuneGrade type

**Step 2: Add isGoodFortune helper function**

After line 29 (after `getFortuneGrade` function), add:

```typescript
export function isGoodFortune(fortune: Fortune): boolean {
  const grade = getFortuneGrade(fortune)
  return grade === 'supreme' || grade === 'superior' || grade === 'medium'
}
```

**Step 3: Test the helper function**

Create temporary test in browser console or add debug log:

```typescript
// In Validation component during development
console.log(isGoodFortune(fortuneData))
```

Expected: Returns true for supreme/superior/medium grades, false for low/warning

**Step 4: Commit changes**

```bash
git add src/utils/fortune.ts
git commit -m "utils(fortune): add isGoodFortune helper function

Returns true for supreme, superior, and medium fortune grades.
Used to determine bowl flip animation direction.
```

---

### Task 4: Redesign Validation.tsx - Bowl Visualization and Tap Interaction

**Files:**
- Modify: `src/components/stages/Validation.tsx:1-151`

**Step 1: Read current Validation.tsx**

Run: Read the file at `src/components/stages/Validation.tsx`
Expected: See current poe block throwing animation with attempts tracking

**Step 2: Add imports for new utilities**

Replace line 1-3 with:

```typescript
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Fortune } from '../../types/fortune'
import { isGoodFortune } from '../../utils/fortune'
```

**Step 3: Add hasRevealed state**

After line 14 (after existing useState hooks), add:

```typescript
const [hasRevealed, setHasRevealed] = useState(false)
```

**Step 4: Add isGoodFortune calculation**

After the hasRevealed state, add:

```typescript
const shouldFlipBowl = useMemo(() => isGoodFortune(fortuneData), [fortuneData])
```

**Step 5: Add handleReveal function**

After line 16 (after MAX_ATTEMPTS constant), add:

```typescript
const handleReveal = () => {
  if (hasRevealed) return
  setHasRevealed(true)
  setTimeout(() => onValidated(), 1500)
}
```

**Step 6: Replace poe-blocks-container JSX with bowl container**

Replace lines 102-109 (poe blocks container) with:

```typescript
<motion.div
  className="bowl-container"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
  onClick={handleReveal}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleReveal()
    }
  }}
  tabIndex={0}
  role="button"
  aria-label="Tap to reveal fortune"
>
  <motion.div
    className="bowl-pair"
    animate={{
      rotateX: hasRevealed && shouldFlipBowl ? 180 : 0
    }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    style={{ transformStyle: 'preserve-3d' }}
  >
    <motion.div
      className="bowl-poe bowl-poe-left"
      animate={hasRevealed ? { scale: 1, y: 0 } : { scale: 0.95, y: 5 }}
      transition={{ delay: hasRevealed ? 0.2 : 0 }}
    />
    <motion.div
      className="bowl-poe bowl-poe-right"
      animate={hasRevealed ? { scale: 1, y: 0 } : { scale: 0.95, y: 5 }}
      transition={{ delay: hasRevealed ? 0.2 : 0 }}
    />
  </motion.div>

  {hasRevealed && (
    <motion.div
      className="fortune-reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: shouldFlipBowl ? 0.5 : 0.3 }}
    >
      <span className="reveal-number">#{fortuneNumber}</span>
    </motion.div>
  )}
</motion.div>
```

**Step 7: Remove throw button and retry button**

Delete lines 125-146 (throw button and retry button - tap interaction replaces these)

**Step 8: Add tap hint text**

After the bowl container (after line added in step 6), add:

```typescript
{!hasRevealed && (
  <motion.p
    className="tap-hint"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
  >
    Tap the bowl to reveal your fortune
  </motion.p>
)}
```

**Step 9: Update validation prompt text**

Replace lines 93-100 (validation prompt) with simpler message:

```typescript
<motion.p
  className="validation-prompt"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
>
  The spirits have selected your fortune. Tap to reveal.
</motion.p>
```

**Step 10: Test bowl interaction**

Run: `npm run dev`
Expected:
- Bowl appears upright initially
- Tap triggers animation
- Good fortune flips 180°, bad fortune stays upright
- Fortune number appears after animation

**Step 11: Commit changes**

```bash
git add src/components/stages/Validation.tsx
git commit -m "feat(validation): redesign with bowl reveal interaction

- Remove throw/retry buttons
- Add bowl visualization with two poe circles
- Tap triggers flip animation (good fortune) or stay (bad fortune)
- Add isGoodFortune utility to determine flip direction
- Add keyboard accessibility (Enter/Space)
- Auto-proceed to Reveal after animation"
```

---

### Task 5: Add Bowl CSS Styles with 3D Effect

**Files:**
- Modify: `src/styles/components/validation.css:1-108`

**Step 1: Read current validation.css**

Run: Read the file at `src/styles/components/validation.css`
Expected: See existing `.poe-block` and related styles

**Step 2: Remove old poe block styles**

Delete lines 57-72 (`.poe-blocks-container` and `.poe-block` styles)

**Step 3: Remove old button styles**

Delete lines 84-107 (`.throw-button`, `.retry-button`, and `:disabled` styles)

**Step 4: Add bowl container styles**

After `.result-message` styles (around line 82), add:

```css
/* Bowl Container */
.bowl-container {
  position: relative;
  width: min(250px, 60vw);
  height: 250px;
  margin: 0 auto 3rem;
  cursor: pointer;
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bowl-pair {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transform-style: preserve-3d;
}

.bowl-poe {
  width: min(100px, 25vw);
  height: min(100px, 25vw);
  background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%);
  border-radius: 50%;
  border: 4px solid var(--color-gold);
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.4),
    inset 0 -10px 20px rgba(0, 0, 0, 0.3),
    inset 0 5px 10px rgba(255, 255, 255, 0.2);
  position: relative;
}

.bowl-poe::before {
  content: '';
  position: absolute;
  top: 10%;
  left: 10%;
  width: 30%;
  height: 30%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
  border-radius: 50%;
}

.bowl-poe-left {
  z-index: 2;
}

.bowl-poe-right {
  z-index: 1;
}

.bowl-container:hover .bowl-poe {
  box-shadow:
    0 12px 25px rgba(212, 175, 55, 0.3),
    inset 0 -10px 20px rgba(0, 0, 0, 0.3),
    inset 0 5px 10px rgba(255, 255, 255, 0.2);
}

/* Fortune Reveal */
.fortune-reveal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none;
}

.reveal-number {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 3rem);
  color: var(--color-gold);
  text-shadow:
    0 0 20px rgba(212, 175, 55, 0.8),
    0 0 40px rgba(212, 175, 55, 0.5);
  background: rgba(42, 0, 0, 0.9);
  padding: 1rem 2rem;
  border-radius: 8px;
  border: 2px solid var(--color-gold);
}

/* Tap Hint */
.tap-hint {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--color-gold);
  opacity: 0.8;
  margin-top: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* Keyboard Focus */
.bowl-container:focus-visible {
  outline: 3px solid var(--color-gold);
  outline-offset: 4px;
  border-radius: 8px;
}
```

**Step 6: Test bowl styling**

Run: `npm run dev`
Expected:
- Bowl has 3D appearance with shadows
- Hover effect on bowl
- Fortune number has glow effect
- Tap hint pulses
- Focus indicator visible when tabbing

**Step 7: Commit changes**

```bash
git add src/styles/components/validation.css
git commit -m "style(validation): add bowl visualization styles

- Add 3D bowl container with perspective
- Style poe blocks as bowl with shadows and highlights
- Add hover effect with golden glow
- Add fortune reveal with glowing text
- Add pulsing tap hint animation
- Add keyboard focus indicator"
```

---

### Task 6: Accessibility - Add Reduced Motion Support

**Files:**
- Modify: `src/components/stages/Validation.tsx`

**Step 1: Add useReducedMotion hook import**

Update line 2 to include useReducedMotion:

```typescript
import { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
```

**Step 2: Add reducedMotion detection**

After `shouldFlipBowl` useMemo (around line 17), add:

```typescript
const prefersReducedMotion = useReducedMotion()
```

**Step 3: Update bowl animation to respect reduced motion**

Update the bowl-pair animate prop (around line 60):

```typescript
animate={{
  rotateX: hasRevealed && shouldFlipBowl && !prefersReducedMotion ? 180 : 0,
  opacity: hasRevealed ? 1 : 0.9
}}
transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeInOut" }}
```

**Step 4: Add ARIA live region for screen readers**

Update `.bowl-container` to include aria-live (around line 55):

```typescript
<motion.div
  className="bowl-container"
  // ... existing props ...
  aria-live="polite"
  aria-atomic="true"
>
```

**Step 5: Test reduced motion**

Run: `npm run dev` with prefers-reduced-motion enabled in browser
Expected: Animation is skipped or simplified

**Step 6: Test screen reader announcements**

Run: `npm run dev` with screen reader
Expected: Announces when fortune is revealed

**Step 7: Commit changes**

```bash
git add src/components/stages/Validation.tsx
git commit -m "a11y(validation): add reduced motion and screen reader support

- Respect prefers-reduced-motion for bowl flip animation
- Add ARIA live region for screen reader announcements
- Simplify animation when reduced motion is preferred"
```

---

### Task 7: Manual Testing Checklist

**Files:**
- Test: All components in browser

**Step 1: Test Shaking page**

Run: `npm run dev`

Checklist:
- [ ] No progress bar visible
- [ ] No "x/x" counter visible
- [ ] Shaking animation works (device motion or tap)
- [ ] Transitions to Validation after 3-20 shakes (test multiple times)

**Step 2: Test Validation page - Bowl interaction**

Checklist:
- [ ] Bowl appears upright initially
- [ ] Tap hint pulses below bowl
- [ ] Tap triggers reveal animation
- [ ] Good fortune flips bowl 180°
- [ ] Bad fortune stays upright
- [ ] Fortune number appears after animation
- [ ] Auto-proceeds to Reveal stage

**Step 3: Test Validation page - Different fortune grades**

Test with different fortune numbers (1-100) to verify:
- [ ] Supreme/Superior fortune → bowl flips
- [ ] Medium fortune → bowl flips
- [ ] Low/Warning fortune → bowl stays upright

**Step 4: Test Accessibility**

Checklist:
- [ ] Tab key focuses bowl (visible indicator)
- [ ] Enter/Space key triggers reveal
- [ ] Reduced motion preference is respected
- [ ] Screen reader announces fortune reveal

**Step 5: Test Edge Cases**

Checklist:
- [ ] Repeated taps don't cause issues (debounced)
- [ ] Keyboard navigation works throughout
- [ ] No console errors during any interaction

**Step 6: Test Responsive Design**

Checklist:
- [ ] Bowl displays correctly on mobile
- [ ] Bowl displays correctly on tablet
- [ ] Bowl displays correctly on desktop
- [ ] Text scales appropriately

**Step 7: Document any issues found**

If issues found:
1. Create note of issue
2. Return to relevant task to fix
3. Retest after fix

**Step 8: Mark all tests complete**

If all tests pass, continue to final commit.

---

### Task 8: Final Verification and Documentation

**Files:**
- Update: `docs/plans/2026-02-14-shaking-validation-redesign-design.md`

**Step 1: Update design doc with implementation notes**

Add to bottom of design doc:

```markdown
## Implementation Complete

**Date:** [implementation date]

**Changes Made:**
- Shaking.tsx: Removed progress bar and counter, added randomized maxAttempts (3-20)
- Shaking.css: Removed unused styles
- fortune.ts: Added isGoodFortune() helper function
- Validation.tsx: Complete redesign with bowl visualization and tap interaction
- validation.css: Added 3D bowl styles with shadows and animations
- Accessibility: Added reduced motion support and ARIA live regions

**Testing Status:** All manual tests passed
```

**Step 2: Run TypeScript type checking**

Run: `npm run type-check`
Expected: No type errors

**Step 3: Run linter**

Run: `npm run lint`
Expected: No linting errors (or fix any found)

**Step 4: Production build test**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 5: Verify production build**

Run: `npm run preview`
Expected: All features work in production build

**Step 6: Commit final updates**

```bash
git add docs/plans/2026-02-14-shaking-validation-redesign-design.md
git commit -m "docs: mark implementation complete"
```

**Step 7: Tag completion**

Create git tag for this feature:

```bash
git tag -a feat/shaking-validation-redesign -m "Shaking and Validation page redesign

- Remove progress indicators from Shaking page
- Add bowl-based reveal interaction to Validation page
- Add randomized shake attempts (3-20)
- Implement fortune-grade-based bowl flip animation
- Add accessibility features (keyboard, reduced motion, ARIA)"
```

**Step 8: Push changes (if ready)**

```bash
git push origin main
git push origin feat/shaking-validation-redesign
```

---

## Implementation Notes

### Fortune Grade Mapping

Based on existing `getFortuneGrade()` function:
- **supreme** (上上/Supreme Fortune) → Flip bowl
- **superior** (上/Superior Fortune) → Flip bowl
- **medium** (中/Medium Fortune) → Flip bowl
- **low** (小/Low Fortune) → No flip (stay upright)
- **warning** (Warning/Caution) → No flip (stay upright)

### Framer Motion Animation

The bowl flip uses `rotateX` transform:
- Good fortune: `rotateX: 180deg` (flips over)
- Bad fortune: `rotateX: 0deg` (stays upright)

CSS `transform-style: preserve-3d` ensures proper 3D rendering.

### Random Attempt Calculation

Formula: `Math.floor(Math.random() * (MAX - MIN + 1)) + MIN`
- MIN = 3, MAX = 20
- Result: Integer between 3 and 20 (inclusive)
- Recalculated each time Shaking component mounts

### Browser Compatibility

- CSS 3D transforms: Supported in all modern browsers
- Framer Motion: Polyfills for older browsers
- Reduced motion: `prefers-reduced-motion` media query

### Files Modified Summary

1. `src/components/stages/Shaking.tsx` - Removed progress UI, added randomized attempts
2. `src/styles/components/shaking.css` - Removed progress styles
3. `src/utils/fortune.ts` - Added isGoodFortune helper
4. `src/components/stages/Validation.tsx` - Complete redesign with bowl interaction
5. `src/styles/components/validation.css` - Added 3D bowl styles
6. `docs/plans/2026-02-14-shaking-validation-redesign-design.md` - Updated with completion status
