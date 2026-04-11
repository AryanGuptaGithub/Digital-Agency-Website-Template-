# Armorray Website - Visual Architecture & Flow

## Site Structure Overview

```
ARMORRAY WEBSITE
│
├── NAVBAR (Fixed, scroll-triggered at 55% hero)
│   ├── Logo (left, not yet placed)
│   ├── Desktop Links (6 items)
│   │   ├─ Home (#hero)
│   │   ├─ Solutions (#solutions)
│   │   ├─ PACS (#features)
│   │   ├─ Teleradiology (#contact)
│   │   ├─ Blog (#blog) [not yet built]
│   │   └─ Contact (#contact)
│   └── Mobile Menu (hamburger, morphs on click)
│
├── MAIN CONTENT
│   │
│   ├─ HERO SECTION (#hero) ——————————————————
│   │  Type: Canvas scroll sequence + text overlays
│   │  Height: 500vh (extended scroll zone)
│   │  Content:
│   │   ├─ 240 frame sequence (pre-loaded)
│   │   ├─ Text Overlay 1: "Experience the trinity of precision" (32-62%)
│   │   ├─ Text Overlay 2: "Data, Detail, and Diagnosis." + CTA (64-100%)
│   │   ├─ Loading bar (while frames load)
│   │   └─ Scroll indicator arrow (animated bounce)
│   │  
│   │
│   ├─ BRAND STATEMENT SECTION ————————————
│   │  Type: Parallax image + staggered text reveals
│   │  Height: ~60vh
│   │  Content:
│   │   ├─ Hero image (yacht interior → medical facility)
│   │   │   ├─ Scale parallax: 1.15 → 1
│   │   │   └─ Opacity fade in: 0 → 1
│   │   ├─ Label: "The Platform"
│   │   ├─ Heading: "Important Details Matter."
│   │   │   └─ RevealText (staggered letters)
│   │   ├─ Subheading: "Premium Hybrid PACS for enterprise radiology."
│   │   │   └─ RevealText (staggered letters)
│   │   ├─ Body paragraphs (2)
│   │   └─ Stats grid (3 columns with animated counters)
│   │       ├─ 37M+ Lives Impacted
│   │       ├─ 105+ Countries
│   │       └─ 99.9% Uptime SLA
│   │
│   │
│   ├─ FEATURES MORPH SECTION ——————————————
│   │  Type: Canvas scroll sequence + positioned text overlays
│   │  Height: 400vh (extended scroll zone)
│   │  Content:
│   │   ├─ 223 frame sequence (pre-loaded)
│   │   ├─ Text Overlay 1: "Cloud + Local. Complete Control." (LEFT, 0-28%)
│   │   ├─ Text Overlay 2: "Enterprise-Grade Diagnostics." (RIGHT, 26-54%)
│   │   ├─ Text Overlay 3: "Universal Data. Vendor Freedom." (LEFT, 52-80%)
│   │   ├─ Stats reveal (78-88%)
│   │   │   ├─ LEFT: Concurrent Users, Data Integrity, Global Deploy
│   │   │   └─ RIGHT: Image Processing, Critical Alerts, Support
│   │   └─ Loading bar (while frames load)
│   │
│   │
│   ├─ PLATFORM FEATURES SECTION ——————————
│   │  Type: Card grid with hover effects
│   │  Height: ~60vh
│   │  Content:
│   │   ├─ Label: "Core Capabilities"
│   │   ├─ Heading: "Platform Features"
│   │   └─ Feature Cards (3 columns, staggered reveal)
│   │       ├─ Card 1: "Rich Text Reporting" + description
│   │       ├─ Card 2: "Read Anywhere" + description
│   │       └─ Card 3: "Vendor Neutral Archive" + description
│   │           └─ Hover effect: Accent line grows (500ms)
│   │
│   │
│   ├─ SOLUTIONS SECTION (#solutions) ———
│   │  Type: Video background + text + badge cascade
│   │  Height: ~100vh (min-h-screen)
│   │  Content:
│   │   ├─ Video background (global network)
│   │   ├─ Overlay gradients (top & bottom fade)
│   │   ├─ Label: "Enterprise Solutions"
│   │   ├─ Heading: "Built for Every\nMedical Imaging Facility."
│   │   ├─ Description: Multi-line body text
│   │   ├─ Solution badges (5 items, cascading)
│   │   │   ├─ Radiology Centers
│   │   │   ├─ Hospitals
│   │   │   ├─ Diagnostic Labs
│   │   │   ├─ Telemedicine
│   │   │   └─ Clinics
│   │   └─ CTA button: "Explore Solutions"
│   │
│   │
│   ├─ CONTACT / DEMO SECTION (#contact) ——
│   │  Type: Two-column form layout with state management
│   │  Height: ~100vh (min-h-screen)
│   │  Background: Image + dark overlays
│   │  
│   │  LEFT COLUMN:
│   │   ├─ Label: "Get Started"
│   │   ├─ Heading: "Request a Demo.\nNo Pressure."
│   │   ├─ Description: Body text
│   │   └─ Trust badges (3 stats)
│   │       ├─ 24h Response
│   │       ├─ 37M+ Lives Impacted
│   │       └─ 99.9% Uptime SLA
│   │  
│   │  RIGHT COLUMN: [Dual State]
│   │   ├─ FORM STATE (default)
│   │   │   ├─ Title: "Request a Demo"
│   │   │   ├─ Fields (5):
│   │   │   │   ├─ Full Name (required)
│   │   │   │   ├─ Work Email (required)
│   │   │   │   ├─ Facility / Organization
│   │   │   │   ├─ Your Role
│   │   │   │   ├─ Primary Interest
│   │   │   │   └─ Message (textarea)
│   │   │   │       └─ Label floats on focus
│   │   │   └─ Button: "Request Demo" (white bg)
│   │   │
│   │   └─ SUCCESS STATE (on submit)
│   │       ├─ Animated checkmark (SVG path animation)
│   │       ├─ Heading: "Demo Request Received"
│   │       ├─ Description: "Thank you..."
│   │       ├─ Footer text: "We look forward..."
│   │       └─ Button: "Submit another request"
│   │
│   │
│   └─ FOOTER ———————————————————————————
│      Type: Multi-column layout + links
│      Height: ~20vh
│      
│      TOP SECTION:
│      ├─ Brand: "Armorray" heading + description
│      └─ CTA: "Request Demo" button (hover: bg-white)
│      
│      LINKS GRID (4 columns):
│      ├─ Navigate: Home, Features, Solutions, Contact
│      ├─ Social: LinkedIn, Twitter, Facebook
│      ├─ Contact: Email (info@armorray.com), 24/7 Support
│      └─ Services: PACS, Teleradiology, Archiving, RIS, Vendor Neutral
│      
│      BOTTOM BAR:
│      ├─ Legal links: Privacy, Terms, Cookies
│      └─ Copyright: "© 2025 Armorray. All rights reserved. Powered by ZAPWMS."
│
└── (FUTURE SECTIONS)
    ├─ Blog (#blog) - Not yet built
    ├─ Testimonials - Not yet built
    └─ Partners/Marquee - Not yet built
```

---

## Component Hierarchy

```
app/page.tsx
│
├── SmoothScroll (context provider)
│   │
│   ├── Navbar
│   │   ├── NAV_LINKS (6 items)
│   │   └── Mobile menu (AnimatePresence)
│   │
│   ├── main
│   │   │
│   │   ├── HeroScroll (#hero)
│   │   │   ├── Canvas (ref)
│   │   │   ├── TEXT_OVERLAYS[2]
│   │   │   ├── Loading indicator
│   │   │   └── Scroll indicator
│   │   │
│   │   ├── BrandStatement
│   │   │   ├── Image container (parallax)
│   │   │   ├── RevealText (label)
│   │   │   ├── RevealText (heading)
│   │   │   ├── RevealText (subheading)
│   │   │   ├── Paragraph (fade up)
│   │   │   ├── Paragraph (fade up)
│   │   │   └── Stats grid
│   │   │       └── AnimatedNumber x3
│   │   │
│   │   ├── YachtMorph
│   │   │   ├── Canvas (ref)
│   │   │   ├── TEXT_OVERLAYS[3] (positioned)
│   │   │   ├── STATS_LEFT[3]
│   │   │   ├── STATS_RIGHT[3]
│   │   │   └── Loading indicator
│   │   │
│   │   ├── Experience (#features)
│   │   │   ├── Label (fade up)
│   │   │   ├── Heading (fade up)
│   │   │   └── FEATURES[3]
│   │   │       └── Card (fade up, staggered)
│   │   │           ├── Number
│   │   │           ├── Title
│   │   │           ├── Description
│   │   │           └── Hover accent line
│   │   │
│   │   ├── Globe (#destinations → reused for solutions)
│   │   │   ├── Video background
│   │   │   ├── Overlay gradients
│   │   │   ├── Label (fade up)
│   │   │   ├── Heading (fade up)
│   │   │   ├── Description (fade up)
│   │   │   ├── DESTINATIONS[5] (badges, staggered)
│   │   │   └── CTA button (fade up)
│   │   │
│   │   └── Charter (#contact)
│   │       ├── Background image + overlays
│   │       ├── Grid (2 columns)
│   │       │   │
│   │       │   ├── LEFT: Copy
│   │       │   │   ├── Label (fade up)
│   │       │   │   ├── Heading (fade up)
│   │       │   │   ├── Description (fade up)
│   │       │   │   └── Trust badges (fade up)
│   │       │   │
│   │       │   └── RIGHT: Form or Success
│   │       │       └── AnimatePresence mode="wait"
│   │       │           ├── Form
│   │       │           │   ├── FIELDS[5]
│   │       │           │   │   └── Label + Input (with floating animation)
│   │       │           │   ├── Textarea
│   │       │           │   └── Submit button
│   │       │           │
│   │       │           └── Success
│   │       │               ├── Checkmark SVG (path animation)
│   │       │               ├── Title (fade up)
│   │       │               ├── Description (fade up)
│   │       │               ├── Footer text (fade up)
│   │       │               └── Reset button (fade up)
│   │       │
│   │
│   └── Footer
│       ├── Top section
│       │   ├── Brand heading
│       │   ├── Brand description
│       │   └── CTA button
│       ├── Links grid (4 columns)
│       │   ├── NAV_LINKS[4]
│       │   ├── SOCIAL_LINKS[3]
│       │   ├── Contact info
│       │   └── Services info
│       └── Bottom bar
│           ├── Policy links[3]
│           └── Copyright text
```

---

## Animation Flow Timeline

```
USER LOADS PAGE
│
├─ 0-200ms: Initial render
│  └─ Canvas/video elements load (async)
│
├─ 200-500ms: Frame sequence loading
│  ├─ HeroScroll: Loading bar appears (0-100%)
│  └─ YachtMorph: Loading bar appears (0-100%)
│
├─ 500ms-5s: Content continues loading
│  ├─ Navbar: Invisible (opacity 0, pointerEvents none)
│  └─ Hero: Frames display as they load, scroll bar fills
│
├─ User sees: Full-screen cinematic hero with loading indicator
│
├─ USER STARTS SCROLLING
│  │
│  ├─ 0-200px: Scroll indicator arrow bounces
│  │
│  ├─ 200px+: Navbar appears (fade in 0.6s)
│  │  └─ opacity 0 → 1, y -20 → 0
│  │
│  ├─ 500vh (end of hero): Text overlays sequence
│  │  ├─ 0%: Scroll indicator fade out
│  │  ├─ 32-62%: Overlay 1 appears/disappears (smooth opacity)
│  │  ├─ 64-100%: Overlay 2 appears/disappears + CTA button ready
│  │  └─ 100%: Transition to brand statement
│  │
│  ├─ 500vh-700vh: Brand statement enters viewport
│  │  ├─ Hero image scales in (parallax)
│  │  ├─ Text reveals character by character
│  │  ├─ Counter animation triggers
│  │  └─ All elements fade/translate in
│  │
│  ├─ 700vh-1100vh: Features morph canvas
│  │  ├─ 240 frames animate based on scroll
│  │  ├─ Text overlays position LEFT/RIGHT
│  │  ├─ Stats appear at 78% scroll
│  │  └─ Smooth vignette effect applied
│  │
│  ├─ 1100vh-1300vh: Platform features cards
│  │  ├─ Cards stagger in (0.15s * index)
│  │  ├─ Hover accent lines animate on mouse over
│  │  └─ All text reveals on scroll
│  │
│  ├─ 1300vh-1600vh: Solutions section
│  │  ├─ Video fades in on load
│  │  ├─ Text content fades in
│  │  ├─ Badge buttons cascade (0.08s stagger)
│  │  └─ CTA animates in
│  │
│  ├─ 1600vh-2000vh: Contact/Demo form
│  │  ├─ Two-column content fades in
│  │  ├─ Form visible with floating labels
│  │  ├─ User interacts with form
│  │  │  └─ Labels float up/down on focus
│  │  │
│  │  └─ USER SUBMITS FORM
│  │     ├─ Form state → Success state (0.4s transition)
│  │     ├─ Checkmark SVG draws (0.6s, delay 0.4s)
│  │     ├─ Title fades in (delay 0.6s)
│  │     ├─ Description fades in (delay 0.75s)
│  │     ├─ Footer text fades in (delay 1s)
│  │     └─ Reset button fades in (delay 1.2s)
│  │
│  └─ 2000vh+: Footer
│     ├─ Content fades in on viewport enter
│     ├─ Links show hover effects (color transition 400ms)
│     ├─ CTA button shows hover effect (bg transition 500ms)
│     └─ All text and links interactive
```

---

## Scroll Zones & Interactions

```
VERTICAL SCROLL MAP
0vh ─────────────────────────────────────
    NAVBAR (Hidden, waiting for 55% hero)
    
    ┌─────────────────────────────────┐
    │      HERO SCROLL SECTION        │
    │      (500vh total height)       │
    │                                 │
    │ • Canvas: 240 frames            │
    │ • Overlay 1: 32-62%             │
    │ • Overlay 2: 64-100%            │
    │ • Loading bar: 0-100%           │
    │ • Scroll indicator: 0-4%        │
    │ • Navbar appears at 55%         │
    │                                 │
    │ [Frame sequence scrolls]        │
    └─────────────────────────────────┘
    
500vh ─────────────────────────────────────
    NAVBAR (Now visible, pointer active)
    
    ┌─────────────────────────────────┐
    │    BRAND STATEMENT SECTION      │
    │      (~60vh height)             │
    │                                 │
    │ • Hero image (parallax zoom)    │
    │ • Text reveals (staggered)      │
    │ • Counter animations            │
    │ • FadeUp animations             │
    │                                 │
    │ [InView triggers reveal]        │
    └─────────────────────────────────┘
    
700vh ─────────────────────────────────────
    
    ┌─────────────────────────────────┐
    │   FEATURES MORPH SECTION        │
    │     (400vh total height)        │
    │                                 │
    │ • Canvas: 223 frames            │
    │ • Text overlay 1: 0-28%         │
    │ • Text overlay 2: 26-54%        │
    │ • Text overlay 3: 52-80%        │
    │ • Stats reveal: 78-88%          │
    │ • Loading bar: 0-100%           │
    │                                 │
    │ [Frame sequence scrolls]        │
    └─────────────────────────────────┘
    
1100vh ─────────────────────────────────────
    
    ┌─────────────────────────────────┐
    │  PLATFORM FEATURES SECTION      │
    │      (~60vh height)             │
    │                                 │
    │ • Label + Heading (fade up)     │
    │ • 3 feature cards               │
    │ • Card hover: accent line grows │
    │                                 │
    │ [InView triggers reveal]        │
    └─────────────────────────────────┘
    
1300vh ─────────────────────────────────────
    
    ┌─────────────────────────────────┐
    │    SOLUTIONS SECTION            │
    │    (~100vh min-height)          │
    │                                 │
    │ • Video background (auto-play)  │
    │ • Text content (fade up)        │
    │ • 5 solution badges (cascade)   │
    │ • CTA button (fade up)          │
    │                                 │
    │ [InView triggers reveal]        │
    └─────────────────────────────────┘
    
1600vh ─────────────────────────────────────
    
    ┌─────────────────────────────────┐
    │   CONTACT / DEMO SECTION        │
    │    (~100vh min-height)          │
    │                                 │
    │ ┌──────────────┬──────────────┐ │
    │ │ LEFT: Copy   │ RIGHT: Form  │ │
    │ │              │              │ │
    │ │ • Label      │ [Form State] │ │
    │ │ • Heading    │ • Fields     │ │
    │ │ • Desc       │ • Submit Btn │ │
    │ │ • Badges     │              │ │
    │ │              │ [Success Stt]│ │
    │ │              │ • Checkmark  │ │
    │ │              │ • Message    │ │
    │ │              │ • Reset Btn  │ │
    │ └──────────────┴──────────────┘ │
    │                                 │
    │ [InView triggers reveal]        │
    │ [Form state changes on submit]  │
    └─────────────────────────────────┘
    
2000vh ─────────────────────────────────────
    
    ┌─────────────────────────────────┐
    │        FOOTER SECTION           │
    │      (~20vh height)             │
    │                                 │
    │ • Brand heading                 │
    │ • 4 column link grid            │
    │ • Policy links + copyright      │
    │                                 │
    │ [InView triggers reveal]        │
    └─────────────────────────────────┘
    
2100vh+ ────────────────────────────────────
    [End of page]
```

---

## Interaction Zones

### Navbar Area
- **Desktop**: Links with underline hover (500ms slide)
- **Mobile**: Hamburger menu with 3-line morph animation
- **Hover**: Text color fade (white/60 → white)

### Hero Section
- **Scroll**: Frame sequence progresses with scroll
- **Button**: "Contact Us" with scale hover (1.02x) and tap (0.97x)
- **Indicator**: Arrow bounces (2.5s infinite)

### Feature Cards
- **Desktop Hover**: Bottom-left accent line grows horizontally (700ms)
- **Mobile Hover**: Left-side accent line grows vertically (700ms)
- **Click**: (Optional) Could link to feature detail pages

### Solution Badges
- **Hover**: Border and text color transition (500ms)
- **Click**: Could filter or link to solutions

### Form Fields
- **Focus**: Label floats up, border highlights
- **Input**: Text entry animates label position
- **Submit**: Button scales on hover/tap

### Form Success
- **State Change**: Form → Success (0.4s)
- **Checkmark**: SVG path draws (0.6s)
- **Reset**: Click to return to form

### Footer Links
- **Hover**: Color transition (400ms)
- **Click**: Navigate to external pages or sections

---

## Responsive Behavior

### Mobile (320px+)
```
┌─────────────────────────────────┐
│  NAVBAR (full-width on scroll)  │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │  HERO (full width)          │ │
│ │  Canvas: 100% viewport size │ │
│ │  Text: Centered, large font │ │
│ │  [hamburger menu on top]    │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ BRAND (single column)       │ │
│ │  Image full width           │ │
│ │  Text stacked vertically    │ │
│ │  Stats: single column       │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ FEATURES (single column)    │ │
│ │  Cards stack vertically     │ │
│ │  Border: left side (not top)│ │
│ │  Hover: accent line vertical│ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ SOLUTIONS (center text)     │ │
│ │  Badges in rows (flex wrap) │ │
│ │  All text centered          │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ CONTACT (single column)     │ │
│ │  Left copy, Right form stack│ │
│ │  Both full width            │ │
│ │  Form fields: auto layout   │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ FOOTER (single column links)    │
└─────────────────────────────────┘
```

### Tablet (640px+)
```
Mostly 2-column layouts
- Brand: Image, then 2-column text/stats
- Features: 2 columns, last spans full
- Contact: 2 columns side-by-side
```

### Desktop (1024px+)
```
Full layouts as designed
- Features: 3 columns
- All grids maximize horizontal space
- Padding/margins at full size
```

---

## Performance Considerations

### Canvas Rendering
- **DPR Scaling**: Optimized for retina displays
- **RAF Loop**: 60fps target
- **Frame Preload**: Lazy-loaded in background

### Animations
- **GPU Acceleration**: Transform-based (scale, translate, opacity)
- **CSS Transitions**: Used for simple hover states (500ms)
- **Framer Motion**: Used for complex sequences

### Loading
- **Lazy Images**: Use Next.js Image component
- **Lazy Videos**: Load on viewport enter
- **Lazy Frames**: Preload frames as user scrolls

### Metrics
- **FCP**: <1.5s (Largest Contentful Paint)
- **LCP**: <2.5s
- **CLS**: <0.1 (Cumulative Layout Shift)
- **TTI**: <3.5s (Time to Interactive)

---

## Accessibility Features

✅ Semantic HTML (main, section, header, footer)  
✅ ARIA labels on interactive elements  
✅ Color contrast (white/backgrounds)  
✅ Focus states on form fields & buttons  
✅ Keyboard navigation (tab through links/buttons)  
✅ Alt text on images (when added)  
✅ Reduced motion support (prefers-reduced-motion)  
✅ Form labels (visible, floating, accessible)  
✅ SVG icons with role="img" and aria-label  

---

This architecture document serves as a visual reference for:
- Where content is placed
- How sections flow and animate
- Component hierarchy and dependencies
- Responsive behavior at different breakpoints
- Performance and accessibility considerations
