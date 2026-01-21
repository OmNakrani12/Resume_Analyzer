# Resume Analyzer - Application Map & Navigation

## 🗺️ Application Structure Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Resume Analyzer Frontend                      │
│                      (Next.js 16.1.4)                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
                ┌─────────────┴──────────────┐
                │                            │
         ┌──────▼──────┐           ┌────────▼─────────┐
         │  Navigation │           │     Footer       │
         │  (Sticky)   │           │  (All Pages)     │
         └─────────────┘           └──────────────────┘
                              │
                ┌─────────────┴────────────────────┐
                │                                  │
        ┌───────▼────────┐              ┌────────▼──────────┐
        │  Public Pages  │              │  Protected Pages  │
        │  (No Auth)     │              │  (Logged In)      │
        └────────────────┘              └───────────────────┘
         │               │               │
         │               │               │
    ┌────▼─┐         ┌───▼──┐      ┌────▼──────┐
    │ Home │         │About │      │Dashboard  │
    └──────┘         │ FAQ  │      └───────────┘
                     │Pricing     
                     │Contact     ┌──────────────┐
                     └───┬──┘      │   Profile   │
                         │        └─────────────┘
                    ┌────▼────┐
                    │ Analyze │
                    └─────────┘
                    
┌─────────────────────────────────────────────────────────────┐
│                   Authentication Pages                      │
├─────────────────────────────────────────────────────────────┤
│  Sign In (/signin)                  Sign Up (/signup)      │
│  ├─ Email Input                     ├─ Name Input         │
│  ├─ Password (Toggle)               ├─ Email Input        │
│  ├─ Remember Me                     ├─ Password (Toggle)  │
│  └─ Forgot Password Link            ├─ Confirm Password   │
│                                     └─ Terms Checkbox     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧭 Page Navigation Flow

```
START
  │
  ├─► Home Page (/)
  │   ├─ Features Overview
  │   ├─ How It Works
  │   ├─ CTA: "Analyze Your Resume"
  │   │   └─► Analyze Page (/analyze)
  │   │       ├─ File Upload
  │   │       ├─ Analysis Results
  │   │       └─ CTA: "Sign Up to Save"
  │   │
  │   ├─ CTA: "View Pricing"
  │   │   └─► Pricing Page (/pricing)
  │   │       ├─ 3 Plans
  │   │       ├─ FAQ
  │   │       └─ CTA: "Get Started"
  │   │
  │   └─ Navigation Links
  │       ├─► About Page (/about)
  │       ├─► FAQ Page (/faq)
  │       ├─► Contact Page (/contact)
  │       ├─► Sign In (/signin)
  │       └─► Sign Up (/signup)
  │
  ├─► Sign Up (/signup)
  │   ├─ Registration Form
  │   ├─ Email Verification
  │   └─► Dashboard (/dashboard) [After Login]
  │
  ├─► Sign In (/signin)
  │   ├─ Login Form
  │   └─► Dashboard (/dashboard) [After Login]
  │
  └─► Dashboard (/dashboard)
      ├─ User Statistics
      ├─ Recent Analyses
      ├─ CTA: "Analyze New Resume"
      ├─ Profile Link (/profile)
      │   ├─ Edit Profile
      │   └─ Security Settings
      └─ Sign Out

ERROR: 404 Not Found
  └─► Suggest Quick Links
      ├─► Home
      ├─► Analyze
      ├─► Pricing
      └─► Contact
```

---

## 📊 Component Hierarchy

```
RootLayout
├─ Navigation
├─ Main Content
│  ├─ Page Component
│  │  ├─ Hero
│  │  ├─ Features
│  │  ├─ HowItWorks
│  │  ├─ CTA
│  │  ├─ FileUpload
│  │  ├─ AnalysisResults
│  │  └─ ... Page-specific components
│  └─ Footer
└─ Error Boundaries (Future)
```

---

## 🎨 Design System Flow

```
Tailwind CSS (4)
    │
    ├─ Color Variables
    │  ├─ Primary: Blue (#3B82F6)
    │  ├─ Secondary: Gray (#1F2937)
    │  ├─ Accent: Green (#10B981)
    │  └─ ... Additional colors
    │
    ├─ Typography Scale
    │  ├─ text-xs to text-7xl
    │  └─ font-light to font-black
    │
    ├─ Spacing Scale
    │  ├─ p/m 0-96
    │  └─ gap 0-96
    │
    └─ Responsive Breakpoints
       ├─ sm (640px)
       ├─ md (768px)
       ├─ lg (1024px)
       └─ xl (1280px)

Framer Motion
    │
    ├─ Container Animations
    │  ├─ Stagger Effect
    │  └─ Delay Children
    │
    ├─ Element Animations
    │  ├─ Initial State
    │  ├─ Animate State
    │  ├─ Exit State
    │  └─ Hover State
    │
    └─ Transitions
       ├─ Duration
       ├─ Delay
       ├─ Easing
       └─ Repeat

Lucide React Icons
    └─ 50+ Icons used throughout
```

---

## 📝 Feature Dependency Tree

```
Home Page
├─ Hero Component
│  ├─ Framer Motion (Animations)
│  ├─ Lucide Icons
│  └─ Tailwind CSS
├─ Features Component
│  ├─ Feature Cards (6)
│  ├─ Hover Animations
│  └─ Icon Animations
├─ HowItWorks Component
│  ├─ Step Cards (3)
│  └─ Connector Lines
└─ CTA Component
   └─ Button Animation

Analyze Page
├─ FileUpload Component
│  ├─ File Validation (utils)
│  ├─ Drag-and-Drop
│  └─ Error Handling
└─ AnalysisResults Component
   ├─ SVG Progress Circle
   ├─ Animated Counter
   ├─ Results Display
   └─ Skills Recommendation

Authentication Pages
├─ Form Validation (utils)
├─ Password Toggle
├─ Error Display
└─ Loading State

Dashboard
├─ Statistics Display
├─ Table Component
├─ Action Links
└─ User Info

Profile
├─ Form Fields
├─ Edit Mode
├─ Save Functionality
└─ Security Section
```

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────┐
│         User Interaction / Event                │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
         ┌───────────────────┐
         │  Component State  │ (useState)
         └────────┬──────────┘
                  │
                  ▼
         ┌──────────────────┐
         │ Event Handler    │
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │ Update Component State       │
         └────────┬─────────────────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │ Re-render Component          │
         └────────┬─────────────────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │ Framer Motion Animations     │
         └────────┬─────────────────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │ Display Updated UI           │
         └──────────────────────────────┘
```

---

## 📱 Responsive Breakpoints

```
Mobile (< 640px)
├─ Single column layouts
├─ Hamburger navigation
├─ Stacked buttons
└─ Full-width inputs

Tablet (640px - 1024px)
├─ 2-column grid
├─ Bottom navigation (future)
└─ Adjusted spacing

Desktop (1024px+)
├─ 3-4 column grid
├─ Full navigation menu
├─ Multi-column footer
└─ Optimized spacing
```

---

## 🎯 User Journeys

### Journey 1: Quick Analysis
```
Home → [Click "Analyze"] → Analyze Page → Upload → Results
```

### Journey 2: Sign Up & Explore
```
Home → [Click "Sign Up"] → Sign Up Page → Form → Dashboard → Profile
```

### Journey 3: Learn & Decide
```
Home → About → Features → FAQ → Pricing → Contact
```

### Journey 4: Review Saved Analyses
```
Dashboard → [View Recent] → Analysis Details → [Download Report]
```

---

## 🔐 Security Flow

```
User Input
    │
    ├─ Client-side Validation
    │  ├─ File type check
    │  ├─ File size check
    │  └─ Form validation
    │
    ├─ Display Error (if invalid)
    │
    └─ (If valid) Prepare Submission
       │
       └─ [Backend would verify here]
          ├─ Token validation
          ├─ Rate limiting
          └─ SQL injection prevention
```

---

## 📈 Performance Optimization

```
Code Splitting
├─ Next.js automatic route splitting
├─ Dynamic imports (future)
└─ Lazy loading components (future)

Image Optimization
└─ Next.js Image component (ready)

CSS Optimization
├─ Tailwind purging
├─ Minification
└─ Tree-shaking

JavaScript Optimization
├─ Tree-shaking
├─ Minification
└─ Code elimination
```

---

## 🚀 Deployment Architecture

```
Development
└─ localhost:3000

Production
├─ Build Phase
│  ├─ npm run build
│  ├─ Next.js compilation
│  ├─ CSS optimization
│  └─ JS minification
│
├─ Deployment
│  ├─ Vercel (Recommended)
│  ├─ AWS
│  ├─ Docker
│  └─ Traditional hosting
│
└─ Runtime
   ├─ Next.js Server
   └─ Static Assets (CDN)
```

---

This map provides a complete visual guide to understand how all pages, components, and features connect in the Resume Analyzer application!
