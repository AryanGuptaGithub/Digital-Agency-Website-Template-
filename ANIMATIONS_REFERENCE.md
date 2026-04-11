# Armorray Website - Complete Animation Reference

## Quick Navigation
- [Hero Section](#hero)
- [Brand Statement](#brand)
- [Features Morph](#morph)
- [Platform Features](#features)
- [Solutions](#solutions)
- [Contact/Demo](#contact)
- [Footer](#footer)
- [Navbar](#navbar)

---

## HERO
**Component**: `hero-scroll.tsx`  
**Duration**: 500vh (entire section height)  
**Primary Animation**: Canvas frame sequence scroll sync

### Frame Sequence
- **Frames**: 240 images (sequence-1000 through 1239)
- **Loading**: Progress bar 0-100% with percent display
- **Rendering**: Real-time canvas drawing with DPR optimization

### Text Layer Animations
```
Overlay 1: "Experience the trinity of precision"
├─ Fade In: 32-40% scroll progress
├─ Fade Out: 55-62% scroll progress
└─ Transform: opacity + translateY(15px * fade)

Overlay 2: "Data, Detail, and Diagnosis."
├─ Fade In: 64-72% scroll progress
├─ Fade Out: 92-100% scroll progress
├─ CTA Button: Hover scale 1.02x, tap scale 0.97x
└─ Transform: opacity + translateY(15px * fade)
```

### Visual Effects
- **Scene Intensity**: Max text opacity drives:
  - Overall dark tint (0.25 * opacity)
  - Bottom fade gradient (0.85 * opacity)
- **Loading State**: Smooth bar with numeric display
- **Scroll Indicator**: ↓ Arrow with bounce animation (2.5s infinite)

---

## BRAND
**Component**: `brand-statement.tsx`  
**Duration**: Variable (scroll-triggered)  
**Primary Animation**: Parallax zoom + staggered text reveals

### Image Parallax
```
Hero Image Container:
├─ Scale: 1.15 → 1 (over 50% section progress)
├─ Opacity: 0 → 1 (over 20% section progress)
├─ Target: Image appears to zoom into focus as you scroll down
└─ Dark overlays (gradient) ensure text readability
```

### Text Reveals
```
Label: "The Platform"
├─ Initial: opacity 0, x -20
├─ Animate: opacity 1, x 0
└─ Transition: 0.8s ease-out

Heading 1: "Important Details Matter."
├─ Component: RevealText with staggered characters
├─ Each character: 
│  ├─ Initial: opacity 0, y 30
│  ├─ Animate: opacity 1, y 0
│  ├─ Duration: 0.5s per character
│  └─ Delay: 0.025s between chars (+ 0.4s base)
└─ Effect: Letter-by-letter elegant reveal

Heading 2: "Premium Hybrid PACS for enterprise radiology."
├─ Same staggered reveal
├─ Base delay: 0.8s (reveals after heading 1)
├─ Lighter font weight for hierarchy
└─ Same character animation pattern
```

### Body Text
```
Para 1 (Description):
├─ Initial: opacity 0, y 40
├─ Animate: opacity 1, y 0
├─ Duration: 1s ease-out
└─ Delay: 0.1s

Para 2 (Follow-up):
├─ Same animation pattern
└─ Delay: 0.2s
```

### Stats Counter
```
3-column grid with animated numbers:
├─ Stat 1: 37M+ Lives Impacted
├─ Stat 2: 105+ Countries
└─ Stat 3: 99.9% Uptime SLA

Counter Animation:
├─ Trigger: When element enters viewport
├─ Duration: 1800ms (1.8s)
├─ Easing: Cubic ease-out (progress: 1 - (1 - p)^4)
├─ Interval: RAF-based smooth counting
└─ Effect: Smooth number progression from 0 to target
```

---

## MORPH
**Component**: `yacht-morph.tsx`  
**Duration**: 400vh (entire section height)  
**Primary Animation**: Canvas frame sequence + positioned text overlays

### Frame Sequence
- **Frames**: 223 images (sequence-2000 through 2222)
- **Loading**: Progress bar with "Loading" text
- **Rendering**: Canvas with vignette overlay (radial gradient darkening)

### Text Overlay Animations (Position-Aware)

```
Overlay 1: LEFT positioned
├─ Label: "HYBRID ARCHITECTURE"
├─ Heading: "Cloud + Local.\nComplete Control."
├─ Timing: 0% → 8% fade in, 22% → 28% fade out
├─ Position: Left side with 40% max-width
└─ Transform: opacity + translateY(30px * inverse_fade)

Overlay 2: RIGHT positioned
├─ Label: (none)
├─ Heading: "Enterprise-Grade\nDiagnostics."
├─ Sub: "View on any device, anywhere, instantly."
├─ Timing: 26% → 34% fade in, 48% → 54% fade out
├─ Position: Right side, right-aligned text
└─ Transform: opacity + translateY(30px * inverse_fade)

Overlay 3: LEFT positioned
├─ Label: "VENDOR NEUTRAL"
├─ Heading: "Universal Data.\nVendor Freedom."
├─ Sub: "Seamless integration with any DICOM source."
├─ Timing: 52% → 60% fade in, 74% → 80% fade out
├─ Position: Left side
└─ Transform: opacity + translateY(30px * inverse_fade)
```

### Stats Reveal (78-88% scroll)

```
Left Column Stats:
├─ "Unlimited" - Concurrent Users
├─ "99.9% SLA" - Data Integrity
└─ "105+" - Global Deploy

Right Column Stats:
├─ "Real-time" - Image Processing
├─ "24/7 SMS/Email" - Critical Alerts
└─ "24/7 Free" - Support

Animation per stat:
├─ Opacity: 0 → 1
├─ Transform: translateY(20px * inverse_opacity)
├─ Delay per row: i * 0.1s (staggered)
└─ Overall container opacity: driven by scroll 78-88%
```

---

## FEATURES
**Component**: `experience.tsx`  
**Duration**: Section-length (scroll-triggered)  
**Primary Animation**: Staggered card reveals + hover effects

### Header
```
Label: "Core Capabilities"
├─ Initial: opacity 0, y 50
├─ Animate: opacity 1, y 0
├─ Duration: 1s ease-out
├─ Viewport trigger: -80px margin
└─ Timing: Immediate

Heading: "Platform Features"
├─ Same animation as label
├─ Delay: 0.1s
└─ Larger font size emphasizes importance
```

### Feature Cards (3 columns)
```
Card 1: "Rich Text Reporting"
├─ Initial: opacity 0, y 50
├─ Animate: opacity 1, y 0
├─ Duration: 1s
├─ Delay: 0.15s * 1 = 0.15s
└─ Delay: 0.15s

Card 2: "Read Anywhere"
├─ Same animation
└─ Delay: 0.15s * 2 = 0.30s

Card 3: "Vendor Neutral Archive"
├─ Same animation
└─ Delay: 0.15s * 3 = 0.45s

Hover Effect (Desktop):
├─ Accent line: bottom left (initially 0 width)
├─ On hover: animate width 0 → 100%
├─ Transition: 700ms
└─ Mobile: Horizontal line variant

Hover Effect (Mobile):
├─ Accent line: left side (initially 0 height)
├─ On hover: animate height 0 → 100%
└─ Transition: 700ms
```

---

## SOLUTIONS
**Component**: `globe.tsx`  
**Duration**: ~100vh (min-h-screen flex)  
**Primary Animation**: Video background + text reveals + badge cascade

### Background
```
Video Element:
├─ Source: /Globe Animation Prompt.mp4
├─ Properties: autoplay, loop, muted, playsInline
├─ Initial: opacity 0
├─ On canplay: opacity 0 → 1 over 1s
└─ Overlay: Dark tint (0.7 opacity) + gradient fades
```

### Text Content
```
Label: "Enterprise Solutions"
├─ Initial: opacity 0, y 40
├─ Animate: opacity 1, y 0
├─ Duration: 1s ease-out
└─ Viewport margin: -80px

Heading: "Built for Every\nMedical Imaging Facility."
├─ Same animation
├─ Delay: 0.1s
└─ Split line styling (second line lighter)

Description: Multi-line text
├─ Same animation
├─ Delay: 0.2s
├─ Font: light, text-white/40
└─ Max-width constraint
```

### Solution Badges (5 items)
```
Each badge: "Radiology Centers", "Hospitals", etc.

Animation per badge:
├─ Initial: opacity 0, scale 0.9
├─ Animate: opacity 1, scale 1
├─ Duration: 0.6s
├─ Delay: 0.4s (base) + i * 0.1s
├─ Viewport: once true
└─ Stagger Example:
    ├─ Item 1: 0.4s delay
    ├─ Item 2: 0.5s delay
    ├─ Item 3: 0.6s delay
    ├─ Item 4: 0.7s delay
    └─ Item 5: 0.8s delay

Hover Effect:
├─ Border: white/10 → white/30
├─ Text color: white/45 → white
├─ Transition: 500ms
└─ Subtle lift visual feedback
```

### CTA Button
```
"Explore Solutions" Button:
├─ Initial: opacity 0, y 40
├─ Animate: opacity 1, y 0
├─ Duration: 1s ease-out
├─ Delay: 0.5s
├─ Whilehover: scale 1.03
├─ Whiletap: scale 0.98
└─ Border hover: white/15 → white/40
```

---

## CONTACT
**Component**: `charter.tsx`  
**Duration**: Section-length (~100vh min-height)  
**Primary Animation**: Grid entrance + form state management + success celebration

### Layout Setup
```
Two-column grid:
├─ Left: Copy & trust badges
├─ Right: Form or success state
└─ Background: Full-width image with dark overlays
```

### Left Column (Copy)
```
Label: "Get Started"
├─ Initial: opacity 0, y 40
├─ Animate: opacity 1, y 0
├─ Duration: 1s
└─ Delay: 0s

Heading: "Request a Demo.\nNo Pressure."
├─ Same animation
└─ Delay: 0.1s

Description: Multi-line body text
├─ Same animation
└─ Delay: 0.2s

Trust Badges Grid (3 items):
├─ Initial: opacity 0, y 40
├─ Animate: opacity 1, y 0
├─ Duration: 1s
├─ Delay: 0.3s
└─ Shows: 24h response, 37M+ lives, 99.9% SLA
```

### Right Column - Form State
```
Form Container:
├─ Initial: opacity 0, y 40
├─ Animate: opacity 1, y 0
├─ Duration: 1s
├─ Delay: 0.2s
└─ Border: white/8, semi-transparent bg

Form Fields (5 total):
├─ Name, Email, Facility, Role, Interest
├─ Plus: Message textarea
├─ Label Animation: Floating label on focus
│  ├─ Placeholder shown: top 5, larger, dimmer
│  ├─ Focus/Input: top 0, smaller, brighter
│  ├─ Font size: 1rem → 10px
│  ├─ Tracking: normal → 0.2em
│  └─ Transition: All 300ms
└─ Border bottom: white/10 → white/30 on focus

Submit Button:
├─ Type: motion button
├─ Whilehover: scale 1.01
├─ Whiletap: scale 0.98
├─ Full width, white background
├─ Text: "Request Demo"
└─ Hover: bg-white/90
```

### Right Column - Success State

**Entry Animation** (AnimatePresence mode="wait"):
```
Success Container:
├─ Initial: opacity 0, scale 0.92, y 20
├─ Animate: opacity 1, scale 1, y 0
├─ Duration: 0.8s
└─ Easing: [0.25, 0.1, 0.25, 1] (custom bezier)
```

**Checkmark SVG**:
```
SVG Path (checkmark shape):
├─ Initial: pathLength 0 (empty path)
├─ Animate: pathLength 1 (drawn path)
├─ Duration: 0.6s
├─ Delay: 0.4s (waits for container entry)
└─ Effect: Smooth line drawing animation
```

**Success Content**:
```
Heading: "Demo Request Received"
├─ Initial: opacity 0, y 10
├─ Animate: opacity 1, y 0
├─ Delay: 0.6s
└─ Duration: 0.6s

Description: "Thank you for your interest..."
├─ Initial: opacity 0, y 10
├─ Animate: opacity 1, y 0
├─ Delay: 0.75s
└─ Duration: 0.6s

Footer Text: "We look forward..."
├─ Initial: opacity 0
├─ Animate: opacity 1
├─ Delay: 1s
└─ Duration: 0.6s

Reset Button: "Submit another request"
├─ Initial: opacity 0
├─ Animate: opacity 1
├─ Delay: 1.2s
└─ Duration: 0.6s
```

**Exit Animation** (Back to form):
```
Success exit:
├─ opacity 0
├─ scale 0.95
├─ y -10
└─ Duration: 0.4s
```

---

## FOOTER
**Component**: `footer.tsx`  
**Duration**: Static section  
**Primary Animation**: Scroll-triggered entrance

### Top Section
```
Container (Brand + CTA):
├─ Initial: opacity 0, y 20
├─ Animate: opacity 1, y 0
├─ Duration: 1s
├─ Viewport: once true
└─ Delay: 0s

Heading: "Armorray" (static, no animation)
Description: Brand statement (static)

CTA Button: "Request Demo"
├─ Hover: Border white/20 → white/60
├─ Hover: Background transparent → white
├─ Hover: Text white/70 → #111111
└─ Transition: 500ms
```

### Links Grid
```
4 column layout:
├─ Navigate (Home, Features, Solutions, Contact)
├─ Social (LinkedIn, Twitter, Facebook)
├─ Contact (Email, Support)
└─ Services (PACS, Teleradiology, etc.)

Link Hover Effect:
├─ Text color: white/45 → white/80
└─ Transition: 400ms
```

### Bottom Bar
```
Copyright notice (static):
└─ "© 2025 Armorray. All rights reserved. Powered by ZAPWMS."

Policy links:
├─ Privacy, Terms, Cookies
├─ Hover: white/20 → white/50
└─ Transition: 400ms
```

---

## NAVBAR
**Component**: `navbar.tsx`  
**Duration**: Persistent, scroll-triggered visibility  
**Primary Animation**: Fade-in + hamburger menu morphing

### Navbar Container
```
Initial: opacity 0, y -20, pointerEvents none
Visible (at 55% hero scroll):
├─ opacity 0 → 1
├─ y -20 → 0
├─ pointerEvents none → auto
├─ Duration: 0.6s
└─ Easing: ease-out
```

### Desktop Links
```
Static text links with underline hover:
├─ Text: white/60 base
├─ Underline: 0% scale-x initially
├─ On hover:
│  ├─ Text: white/60 → white
│  ├─ Underline: 0 → 100% scale-x
│  └─ Transition: 500ms ease-out
└─ Duration for all transitions: 500ms
```

### Mobile Hamburger
```
3-line hamburger menu with morphing animation:

Line 1 (top):
├─ Closed: rotate 0, y 0, width 24px
├─ Open: rotate 45, y 9, width 24px
└─ Transition: 0.35s ease-in-out

Line 2 (middle):
├─ Closed: opacity 0.5, scaleX 1
├─ Open: opacity 0, scaleX 0
└─ Transition: 0.25s

Line 3 (bottom):
├─ Closed: rotate 0, y 0, width 16px
├─ Open: rotate -45, y -9, width 24px
└─ Transition: 0.35s ease-in-out
```

### Mobile Menu (when open)
```
Full-screen menu backdrop:
├─ Initial: opacity 0
├─ Animate: opacity 1
├─ Duration: 0.5s ease-out
└─ Backdrop: #050505 at 98% opacity + blur

Menu Items (6 items):
├─ Initial: opacity 0, y 40
├─ Animate: opacity 1, y 0
├─ Duration: 0.6s
├─ Delay per item: i * 0.08s
│  ├─ Item 0: 0s
│  ├─ Item 1: 0.08s
│  ├─ Item 2: 0.16s
│  ├─ Item 3: 0.24s
│  ├─ Item 4: 0.32s
│  └─ Item 5: 0.40s
└─ Exit: opacity 0, y 20 (faster, 0.4s)

Divider Line:
├─ Initial: scaleX 0
├─ Animate: scaleX 1
├─ Delay: 0.4s
└─ Duration: 0.8s ease-out

Item Hover:
├─ Text color: white/80 → white
└─ Transition: 400ms
```

---

## Animation Timing Summary

| Section | Type | Duration | Trigger | Effect |
|---------|------|----------|---------|--------|
| **Hero** | Canvas scroll | 500vh | Scroll | Frame sequence sync |
| **Brand** | Parallax + Reveals | 1-2s | InView | Image zoom + text stagger |
| **Morph** | Canvas scroll | 400vh | Scroll | Frame sequence + text overlay |
| **Features** | FadeUp stagger | 1s each | InView | 0.15s stagger (3 cards) |
| **Solutions** | FadeUp + Scale | 0.6s each | InView | Badge stagger 0.1s |
| **Contact** | FadeUp + State | 0.8-1s | InView/State | Form ↔ Success with ease |
| **Navbar** | Fade-in | 0.6s | Scroll 55% | Smooth entrance |
| **Footer** | FadeUp | 1s | InView | Container entrance |

---

## Performance Notes
✅ Canvas rendering optimized with DPR scaling  
✅ RAF-based animations for 60fps  
✅ Lazy loading of frame sequences  
✅ CSS transitions (500ms) for simple hover states  
✅ useInView hooks prevent off-screen calculations  
✅ AnimatePresence for efficient mount/unmount  
✅ Passive scroll listeners for better performance  

---

## Browser Support
- Modern browsers: Chrome, Firefox, Safari, Edge
- Canvas: HTMLCanvasElement with getContext('2d')
- Video: HTML5 video element with autoplay support
- CSS: Gradients, transforms, transitions
- JS: ES6+, requestAnimationFrame, IntersectionObserver
