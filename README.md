# ZAP Solutionz – Business Support & Digital Solutions Website

## 🚀 Project Overview

This is a modern, scroll-based marketing website for **ZAP Solutionz**, a company with over 25 years of experience in business support, cloud services, mobile & web development, CRM, and responsive design.

The site features cinematic frame-by-frame animations, interactive backgrounds, and a fully responsive layout.

Built with Next.js 16, Tailwind CSS, GSAP, Framer Motion, and custom canvas animations.

---

## 🧩 Included Sections

1. **Hero Scroll** – 192-frame canvas animation (scroll-linked) with text overlays  
2. **Yacht Morph** – 192-frame canvas animation showing transformation / capabilities  
3. **Testimonials** – Horizontal scroll (GSAP + ScrollTrigger) featuring ZAP’s core philosophy cards  
4. **Charter (Contact)** – Floating Lines background + demo request form with success animation  
5. **About Page** (`/about`) – Full company story with interactive Particles background  
6. **Navbar** – Sticky, scroll-revealed navigation with mobile hamburger menu  
7. **Footer** – Multi-column links, contact info, and social links  
8. **Scroll Controls** – Floating buttons to jump to top / bottom  

---

## 🎬 Animations & Interactions

| Section        | Animation / Effect |
|----------------|------------------|
| Hero Scroll    | 192 frames (`.jpg`) update based on scroll progress; text overlays fade in/out using GSAP timeline |
| Yacht Morph    | 192 frames with vignette overlay; text overlays positioned left/right; stats fade in at bottom |
| Testimonials   | Horizontal scroll (pinned) with glassmorphic cards; DarkVeil background |
| Charter        | Floating Lines interactive canvas background; form floating labels; success state with animated checkmark |
| About Page     | Custom Canvas particle system (mouse-repelled particles); fade-up content reveals |
| Navbar         | Fades in after scrolling past 40% of hero; mobile menu morphs and staggers links |
| Footer         | Fade-up on viewport entry; hover effects on links and CTA |
| Scroll Controls| Fixed bottom-right buttons; top button appears after scrolling down |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS + custom CSS modules
- **Animations**: GSAP (ScrollTrigger), Framer Motion
- **Canvas**: Custom `requestAnimationFrame` loops for frame sequences
- **Backgrounds**: DarkVeil, FloatingLines, Particles (custom canvas implementations)
- **Icons**: SVG / Lucide
- **Form**: Client-side state with success simulation (ready for API integration)
- **Deployment**: Vercel / any Node.js host

---


---

## 🎨 Design System

- **Primary background**: `#050505`
- **Card backgrounds**: `white/5` with `backdrop-blur-sm`
- **Text**: White with varying opacities (`white/80`, `white/60`, `white/30`)
- **Borders**: `white/10` to `white/20`
- **Accents**: White glow on hover, subtle gradients
- **Typography**: `Inter`

> Dark, cinematic UI focused on readability and smooth scroll interactions.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended)

### Installation

```bash
git clone <your-repo>
cd zap-website
pnpm install


Development
pnpm dev

Production Build
pnpm build
pnpm start

🔧 Customisation
1. Replace Logo & Branding


Update logo in navbar.tsx and footer.tsx


Update metadata in app/layout.tsx


2. Change Frame Sequences


Add frames to /public/frames-1/


Naming: frame_0001.jpg → frame_0192.jpg


Update FRAME_END in:


hero-scroll.tsx


yacht-morph.tsx




3. Modify Content


Hero text → TEXT_ITEMS in hero-scroll.tsx


Yacht text → TEXT_OVERLAYS, STATS_LEFT, STATS_RIGHT


Testimonials → TESTIMONIALS


Form fields → FIELDS in charter.tsx


4. Background Effects


Floating Lines → charter.tsx


DarkVeil → testimonials section props


Particles → ParticleBackground.tsx


5. Form Backend Integration
onSubmit={async (e) => {  e.preventDefault();  const res = await fetch('/api/contact', {    method: 'POST',    body: JSON.stringify(formState),    headers: { 'Content-Type': 'application/json' }  });  if (res.ok) setSubmitted(true);}}
Then create:
app/api/contact/route.ts

📦 Dependencies
PackageUsenextFrameworkreact, react-domUIframer-motionAnimationsgsapScrollTrigger animationstailwindcssStyling@radix-ui/*UI primitivesthreeOptional

📱 Responsive Behaviour


Mobile (<768px): Vertical layouts, hamburger menu


Tablet (768–1024px): Adjusted layouts


Desktop (>1024px): Full animations and horizontal scroll



🧪 Performance


60fps canvas animations


GSAP ScrollTrigger with smooth scrubbing


Lazy loading with Next.js Image


Optimized builds with Turbopack



🚢 Deployment
Vercel (Recommended)


Push to GitHub


Import into Vercel


Deploy automatically


Add custom domain


Other Platforms
pnpm buildpnpm start
Supports any Node.js hosting.

📄 License
Proprietary to ZAP Solutionz. All rights reserved.

🤝 Support & Contact


Email: info@zapsolutionz.com


Phone: +91 8652071903



✨ Acknowledgements


Frame sequences by ZAP creative team


Custom canvas effects inspired by ReactBits


Icons from Lucide



Happy building – ZAP Solutionz 🚀
If you want, I can also:- Add badges (build, version, license)- Make it more “startup-polished” (like Stripe/Vercel style README)- Or generate a GitHub repo description + tags for better visibility

