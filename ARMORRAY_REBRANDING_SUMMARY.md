# Armorray Rebranding Summary

## Overview
Successfully transformed the Yacht Cinematic Scrollytelling template into an **Armorray Enterprise Hybrid PACS** marketing website. All original animations, interactions, and responsive layouts have been preserved while content, copy, branding, and assets were completely rebranded for the medical imaging SaaS industry.

---

## What Was Done

### 1. **Saved Armorray Logo**
- Imported the Armorray logo (`ArmorrayLogo.jpeg`) to `/public/armorray-logo.png`
- Logo is a radioactive/cyan-themed shield design with "ARMORRAY HEALTHTECH" text
- Available for integration into header/footer as needed

### 2. **Updated Navigation (navbar.tsx)**
- Changed from yacht-focused links to healthcare/product links:
  - `Home` → `#hero`
  - `Solutions` → `#solutions` (same component, new ID context)
  - `PACS` → `#features`
  - `Teleradiology` → `#contact`
  - `Blog` → `#blog`
  - `Contact` → `#contact`

### 3. **Hero Section (hero-scroll.tsx) - Canvas Scroll Animation**
- **Animation Type**: Frame sequence scroll animation with text overlay fades
- **Total Scroll Duration**: 5x viewport height (500vh)
- **Text Overlays**:
  1. First overlay: "Experience the trinity of precision" (fades in at 32-40%, out at 55-62%)
  2. Main headline: "Data, Detail, and Diagnosis." with subheading "Hybrid PACS impacting millions across 100+ countries" (fades in at 64-72%, out at 92-100%)
  3. CTA: "Contact Us" button with hover scale animation
- **Loading State**: Animated progress bar (0-100%) during frame preload
- **Scroll Indicator**: Animated downward arrow with Y-axis bounce (duration: 2.5s infinite)
- **Effect**: Smooth parallax text reveal tied to scroll progress, with opacity and translateY transforms

---

## Section-by-Section Animation Breakdown

### **SECTION 1: NAVBAR**
- **Animation**: Scroll-triggered fade-in
- **Trigger**: Navbar becomes visible at 55% of hero scroll progress
- **Effect**: `opacity: 0→1, y: -20→0` over 0.6s ease-out
- **Mobile**: Hamburger menu with staggered line animations (rotation, scale, opacity)
- **Menu Items**: Staggered entrance with 0.08s delays between items

---

### **SECTION 2: HERO / CINEMATIC SCROLL**
- **Animation Type**: Frame-by-frame canvas animation synced to scroll
- **Canvas Rendering**: 240 preloaded image frames (1000-1239) drawn based on scroll progress
- **Text Overlays**: Dual-layer opacity animations:
  - Character-based fade-in (opacity + translateY)
  - Tied to scroll progress thresholds (inStart, inEnd, outStart, outEnd)
  - Max text opacity drives overall scene intensity (tint + bottom fade)
- **Loading Indicator**: Linear progress bar that fills as frames load
- **Responsive**: Canvas auto-scales to viewport dimensions with DPR support
- **Scroll Detection**: Real-time scroll listener updating progress (0-1 range)

**Text Sequence:**
1. **0-62% scroll**: "Experience the trinity of precision" - soft intro text
2. **64-100% scroll**: "Data, Detail, and Diagnosis." - main headline with CTA

---

### **SECTION 3: BRAND STATEMENT**
- **Animation Type**: Scroll-triggered reveal animations
- **Hero Image Container**: 
  - Scale: 1.15→1 (over 50% of section viewport)
  - Opacity: 0→1 (over first 20% of section viewport)
  - Effect: Parallax zoom-out on scroll
- **Text Reveals**:
  - Heading: **RevealText** component with staggered character animations
    - Each character: `opacity: 0→1, y: 30→0` over 0.5s
    - Stagger delay: 0.025s between characters
    - Delay offset: 0.4s for first line, 0.8s for second line
  - Subheading in lighter weight for hierarchy
- **Description Paragraphs**: 
  - FadeUp animation: `opacity: 0→1, y: 40→0` over 1s
  - Delay: 0.1s and 0.2s respectively
- **Stats Section**:
  - Grid: 3 animated counters
  - **AnimatedNumber**: Counts from 0 to target value when in view
    - Duration: 1800ms (1.8s)
    - Easing: Cubic ease-out (1 - (1 - progress)^4)
    - Triggers: Once per element (inView detection with margin)
  - Labels fade in with number reveal

---

### **SECTION 4: YACHT MORPH / FEATURES SHOWCASE**
- **Animation Type**: Frame-by-frame canvas animation with textured overlays
- **Canvas Rendering**: 223 preloaded frames (2000-2222) for morphing sequence
- **Frame Drawing**: Center-fitting with aspect-ratio handling, vignette overlay
- **Text Overlays** (Left-Right positioned):
  1. **0-28% scroll**: "Cloud + Local. Complete Control." (left)
  2. **26-54% scroll**: "Enterprise-Grade Diagnostics." (right)
  3. **52-80% scroll**: "Universal Data. Vendor Freedom." (left)
- **Overlay Animations**:
  - Opacity: Fade in/out tied to scroll progress
  - Transform: `translateY((1 - opacity) * 30px)` - subtle lift effect
  - Text Shadow: Strong shadow for visibility over dynamic background
- **Stats Reveal** (78-88% scroll):
  - Left column stats + Right column stats
  - Staggered reveal: Each stat delays by i * 0.1
  - Opacity: Smooth transition with easing
  - Transform: `translateY((1 - opacity) * 20px)`

---

### **SECTION 5: EXPERIENCE / FEATURES**
- **Animation Type**: Scroll-triggered component entrance with hover states
- **Section Label**: FadeUp with 1s duration
- **Heading**: FadeUp with 1s duration, 0.1s delay
- **Feature Cards** (3 columns, staggered):
  - Each card: FadeUp animation with delay = 0.15s * (i + 1)
  - Duration: 1s, ease-out
  - Viewport trigger: When element enters with -80px margin
  - **Hover Effect**: 
    - Desktop: Vertical accent line grows from bottom-left
    - Mobile: Horizontal accent line grows from left
    - Transition: 700ms duration

---

### **SECTION 6: GLOBE / SOLUTIONS**
- **Background**: Full-width video with play/pause and opacity transition
- **Video Loading**: Fade-in animation (opacity 0→1 over 1s when video canplay)
- **Overlays**:
  - Top fade gradient (transparent → dark)
  - Bottom fade gradient (dark → transparent)
- **Text Content** (centered):
  - Label: FadeUp animation (1s duration)
  - Heading: FadeUp with 0.1s delay (1s duration)
  - Description: FadeUp with 0.2s delay (1s duration)
- **Destination Badges** (5 items):
  - Staggered entrance: `opacity: 0→1, scale: 0.9→1`
  - Delay: 0.4s base + i * 0.1s
  - Duration: 0.6s
  - Hover: Border and text color transition (500ms)
- **CTA Button**:
  - FadeUp with 0.5s delay
  - Hover: `scale: 1.03`
  - Tap: `scale: 0.98`

---

### **SECTION 7: CHARTER / CONTACT**
- **Background**: Full-width image with dark overlays (black/70 + gradient)
- **Layout**: Two-column grid (left text, right form)
- **Left Column** (Copy):
  - Label: FadeUp (1s, no delay)
  - Heading: FadeUp (1s, 0.1s delay)
  - Description: FadeUp (1s, 0.2s delay)
  - Trust Badges: FadeUp (1s, 0.3s delay)
    - Animated numbers: Simple tabular display
- **Right Column** (Form/Success State):
  - Wrapper: FadeUp (1s, 0.2s delay)
  - **AnimatePresence** with mode="wait" for form ↔ success transition
  
  **Form State**:
  - Form fields with animated label floating
    - Label floats up on focus/input: Top position changes from 5 (placeholder-shown) → 0 (focus)
    - Font size: 0.875rem → 10px
    - Opacity: 0.2 → 0.5+ on focus
    - Transition: All 300ms
  - Submit button: `whileHover={{ scale: 1.01 }}, whileTap={{ scale: 0.98 }}`
  
  **Success State**:
  - Entry: `opacity: 0→1, scale: 0.92→1, y: 20→0` over 0.8s
  - Checkmark SVG: `pathLength: 0→1` over 0.6s (delay 0.4s)
  - Title: Fade-in at 0.6s delay
  - Description: Fade-in at 0.75s delay
  - Footer text: Fade-in at 1s delay
  - "Submit another request" button: Fade-in at 1.2s delay
  - Exit animation: `opacity: 0, scale: 0.95, y: -10` over 0.4s

---

### **SECTION 8: FOOTER**
- **Top Section** (Brand + CTA):
  - Container: FadeUp animation (1s, opacity + y transform)
  - Heading: Static
  - Description: Static
  - CTA Button: Hover state with background transition (500ms)
- **Links Grid** (4 columns):
  - Static layout
  - Link hover: Color transition (400ms) from text-white/45 → text-white/80
- **Bottom Bar**:
  - Policy links: Hover color transition (400ms)
  - Copyright: Static text

---

## Animation Summary by Type

### **Scroll-Triggered Animations (InView)**
1. RevealText (staggered character reveals)
2. AnimatedNumber (count-up transitions)
3. FadeUp (standard scroll reveal)
4. Parallax scale/opacity (hero image)

### **Canvas/Frame Animations**
1. Hero scroll frame sequence (240 frames)
2. Yacht morph frame sequence (223 frames)
3. Both tied to scroll progress with smooth rendering

### **Interactive/Gesture Animations**
1. Hamburger menu morphing (3 lines)
2. Button hover scales
3. Form field label floating
4. Accordion/collapse states

### **State-Based Animations**
1. Form → Success transition (AnimatePresence)
2. Navbar visibility toggle
3. Video fade-in on load

### **Looping Animations**
1. Scroll indicator arrow bounce (2.5s infinite easeInOut)

---

## Key Preserved Features
✅ Full cinematic scroll experience with frame sequences  
✅ Responsive design (mobile-first, all breakpoints)  
✅ Smooth scroll detection and progress tracking  
✅ High-performance canvas rendering with DPR optimization  
✅ Staggered, choreographed text reveals  
✅ Video backgrounds with fade effects  
✅ Form interactions with floating labels  
✅ Success state animations  
✅ Accessibility (aria-labels, semantic HTML)  

---

## Content Rebranding
| Section | Original | Armorray |
|---------|----------|----------|
| **Headline** | "Boundless" | "Data, Detail, and Diagnosis." |
| **Subheading** | "Charter the extraordinary" | "Hybrid PACS impacting millions across 100+ countries" |
| **Brand Philosophy** | "A private world at sea" | "Important Details Matter" |
| **Stats** | 42m, 12 guests, 8 crew | 37M+ lives, 105+ countries, 99.9% uptime |
| **Features** | Sundeck, Cabins, Crew | Rich Text Reporting, Read Anywhere, Vendor Neutral Archive |
| **Morphing Features** | Yacht specs | Cloud+Local, Enterprise Diagnostics, Vendor Freedom |
| **Solutions** | Destinations (travel) | Solutions (healthcare facilities) |
| **Contact Form** | "Request a Charter" | "Request a Demo" |
| **Footer** | Yacht branding | Armorray + ZAPWMS attribution |

---

## Files Modified
1. `/components/navbar.tsx` - Navigation links
2. `/components/hero-scroll.tsx` - Hero content & ID
3. `/components/brand-statement.tsx` - Philosophy section
4. `/components/yacht-morph.tsx` - Features morphing overlays
5. `/components/experience.tsx` - Platform features section
6. `/components/globe.tsx` - Enterprise solutions section
7. `/components/charter.tsx` - Demo request form
8. `/components/footer.tsx` - Footer branding & links
9. `/app/layout.tsx` - Metadata for SEO
10. `/public/armorray-logo.png` - Logo asset

---

## Result
A fully-branded Armorray marketing website with:
- **All original animations intact** - frame sequences, scroll reveals, overlays
- **Medical industry copy** - PACS, diagnostics, radiology-specific language
- **Enterprise tone** - Professional, premium, global reach emphasis
- **Brand consistency** - Colors (navy/cyan), typography, messaging aligned
- **Fully responsive** - Mobile to desktop, all breakpoints covered
- **SEO-optimized** - Metadata updated for organic search

The template's stunning cinematic scrollytelling experience is now perfectly suited to showcase Armorray's enterprise PACS platform to medical professionals and facility decision-makers.
