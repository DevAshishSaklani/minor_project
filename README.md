# CreatorBridge

A fully responsive landing page for CreatorBridge - the campaign marketplace for real momentum. Built with Next.js 16, TypeScript, Tailwind CSS, and PostgreSQL via Drizzle ORM.

## 🎨 Design System

The application uses a custom editorial design system with the following color palette:

* **Paper**: `#F5F1EA` - Warm background color
* **Ink**: `#172B3A` - Primary text color (navy)
* **Orange**: `#F26B38` - Signal/accent color
* **Sage**: `#D9E5D7` - Secondary background
* **Lavender**: `#E5E0EE` - Secondary background
* **White**: `#FFFDF9` - Pure white with warm tint
* **Line**: `#DCD5CA` - Border color
* **Muted**: `#6E777B` - Secondary text

### Typography

* **Headings**: Space Grotesk (700 weight)
* **Body**: DM Sans (400, 500, 600, 700 weights)

## 📱 Responsive Breakpoints

The design is fully responsive with careful attention to these breakpoints:

* **Mobile**: < 640px (sm)
* **Tablet**: 640px - 768px (md)
* **Desktop**: 768px - 1024px (lg)
* **Large Desktop**: 1024px+ (xl, 2xl)

### Key Responsive Features

1. **Navigation**
   * Full navigation on desktop
   * Compact navigation with hamburger menu on mobile
   * Responsive padding and spacing

2. **Hero Section**
   * Two-column layout on desktop
   * Single-column stack on mobile/tablet
   * Fluid typography
   * Responsive hero art and sticker positioning

3. **Stats Strip**
   * 5-column grid on desktop
   * 4-column grid on medium screens
   * 2-column grid on mobile

4. **How It Works Section**
   * 3-column step cards on desktop
   * Single-column stack on mobile
   * Featured card highlighting

5. **Feature Section**
   * Side-by-side layout on desktop
   * Stacked layout on mobile
   * Flexible content ordering

6. **Campaign Directory**
   * Centered layout with responsive padding
   * Fluid typography scaling

7. **Footer**
   * Multi-column grid on desktop
   * Single-column stack on mobile

## 🚀 Features

### Fully Responsive Components

* ✅ **Navigation Bar**: Adaptive layout with mobile menu
* ✅ **Hero Section**: Fluid typography and layout
* ✅ **Stats Strip**: Responsive grid system
* ✅ **Process Steps**: Adaptive card layout
* ✅ **Feature Sections**: Flexible content blocks
* ✅ **Campaign Directory**: Responsive content area
* ✅ **Footer**: Multi-level responsive navigation
* ✅ **CTAs**: Touch-optimized buttons
* ✅ **Dark Mode**: Complete theme switching with smooth transitions

### Design Elements

* Custom brand mark with CSS-only graphics
* Editorial asymmetry with intentional off-balance
* Signal orange for calls-to-action
* Smooth transitions and hover states
* Custom shadows and depth
* Warm paper texture background (light mode)
* Deep charcoal background (dark mode)
* System preference detection
* Persistent theme storage

## 📦 Tech Stack

* **Framework**: Next.js 16.2.6 (App Router)
* **Language**: TypeScript 5.9.3
* **Styling**: Tailwind CSS 4.1.17
* **Database**: PostgreSQL with Drizzle ORM
* **Icons**: Lucide React
* **Fonts**: Google Fonts (Space Grotesk, DM Sans)

## 🛠 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or remote)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DevAshishSaklani/minor_project.git
cd minor_project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# .env file should contain:
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app_db
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Performance Optimizations

1. **Static Generation**: Pages are pre-rendered for optimal performance
2. **Font Optimization**: Google Fonts with preconnect
3. **CSS Optimization**: Tailwind CSS purging unused styles
4. **Code Splitting**: Automatic code splitting per route
5. **Server Components**: Leveraging React Server Components

## 📱 Testing Responsive Design

Test the responsive design at various breakpoints:

1. **Mobile (375px)**: iPhone SE, iPhone 12 mini
2. **Mobile Large (414px)**: iPhone 12 Pro Max
3. **Tablet (768px)**: iPad, iPad Mini
4. **Tablet Large (1024px)**: iPad Pro
5. **Desktop (1280px)**: Standard laptop
6. **Desktop Large (1920px)**: Full HD displays

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --paper: #F5F1EA;
  --ink: #172B3A;
  --orange: #F26B38;
  /* ... other colors */
}
```

### Adjusting Breakpoints

Tailwind CSS breakpoints can be customized in the configuration. The current breakpoints are:

* `sm`: 640px
* `md`: 768px
* `lg`: 1024px
* `xl`: 1280px
* `2xl`: 1536px

### Typography

Font families are loaded from Google Fonts in `src/app/layout.tsx` and applied in `src/app/globals.css`.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── health/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── HowItWorks.tsx
│   ├── Features.tsx
│   ├── CampaignDirectory.tsx
│   ├── FooterCTA.tsx
│   └── Footer.tsx
└── db/
    ├── index.ts
    └── schema.ts
```

## 🌙 Dark Mode

The application includes a complete dark mode implementation:

- System preference detection
- Manual toggle with persistent storage
- Smooth transitions between themes
- Inverted colors for light sections in dark mode
- Accessible theme switching button

## 📄 License

MIT

## 🙏 Credits

Based on the original CreatorBridge design, reimplemented with full responsive capabilities for modern web browsers and devices.

---

**Built with ❤️ for campaigns that matter**
