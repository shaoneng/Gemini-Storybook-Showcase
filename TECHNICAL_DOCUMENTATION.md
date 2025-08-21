# Gemini Storybook Showcase - Technical Documentation

## Overview

The Gemini Storybook Showcase is a Next.js-based web application that displays AI-generated stories created with Google Gemini Storybook. The application features bilingual support (Chinese and English), responsive design, and optimized performance for static deployment.

## Architecture

### Technology Stack
- **Framework**: Next.js 15.4.6 with static export
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-i18next
- **UI Components**: Headless UI
- **Deployment**: Cloudflare Pages
- **Analytics**: Google Analytics

### Project Structure
```
gemini-showcase/
├── components/          # React components
├── pages/              # Next.js pages
├── public/             # Static assets
│   └── locales/        # Translation files
├── data/               # Story data
├── scripts/            # Build and deployment scripts
├── styles/             # Global styles
└── __tests__/          # Test files
```

## Core Components

### LanguageSwitcher (components/LanguageSwitcher.js:13)
Handles bilingual switching with smooth transitions:
- Path-based language detection
- Smooth fade animations
- Loading state feedback
- Current language indication

### SEOHead (components/SEOHead.js:4)
Comprehensive SEO optimization:
- Multi-language meta tags
- Open Graph and Twitter Cards
- Schema.org structured data
- hreflang tags for international SEO

### Layout System (components/Layout.js:28)
Consistent page structure:
- Gradient background design
- Responsive container
- Header and Footer integration
- Mobile-first approach

## Internationalization Implementation

### Configuration (next-i18next.config.js:1)
```javascript
module.exports = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
```

### Translation Files
- `public/locales/en/common.json` - English translations
- `public/locales/zh/common.json` - Chinese translations
- Consistent key structure across languages

### Language Detection
Routes use path-based detection:
- `/` - Chinese version
- `/en` - English version
- Automatic path mapping for all pages

## Performance Optimizations

### Image Optimization (next.config.mjs:10)
```javascript
images: {
  unoptimized: true,  // Required for static export
  domains: ['localhost', 'geministorybook.online'],
  formats: ['image/webp', 'image/avif'],  // Modern formats
},
```

### Component-Level Optimizations
- Lazy loading with `loading="lazy"`
- Async decoding with `decoding="async"`
- Priority management with `fetchpriority="low"`
- Error handling and fallbacks

## Security Features

### Content Security Policy (pages/_document.js:12)
```javascript
<meta httpEquiv="Content-Security-Policy" content=
  "default-src 'self'; 
   script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com; 
   style-src 'self' 'unsafe-inline'; 
   img-src 'self' data: blob:;" 
/>
```

### Additional Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Data Structure

### Story Data (data/stories.json)
Each story contains:
```json
{
  "id": "unique-identifier",
  "title": { "zh": "中文标题", "en": "English Title" },
  "author": { "zh": "作者", "en": "Author" },
  "content": { "zh": "内容", "en": "Content" },
  "coverImageUrl": "/covers/filename.png",
  "prompt": "AI generation prompt",
  "submissionDate": "2024-01-01"
}
```

## Build and Deployment

### Static Export (next.config.mjs:8)
```javascript
trailingSlash: true,
output: 'export',
distDir: 'out',
```

### Deployment Script (scripts/deploy.sh)
Multi-step deployment process:
1. Clean previous builds
2. Install dependencies
3. Build project
4. Verify build integrity
5. Performance checks
6. Deployment instructions

### Build Verification (scripts/verify-build.js)
Comprehensive build validation:
- File existence checks
- Route validation
- Language consistency
- Image availability

## Testing Strategy

### Jest Configuration (jest.config.js)
- JSDOM test environment
- Module path mapping
- Coverage reporting
- Next.js compatibility

### Test Examples (__tests__/components/LanguageSwitcher.test.js)
Comprehensive component testing:
- Rendering verification
- Interaction testing
- State management
- Accessibility checks

## Performance Metrics

### Bundle Analysis
- First Load JS: ~149kB
- Shared chunks: ~153kB
- Optimized static export
- Code splitting by page

### Core Web Vitals
- LCP optimization through image handling
- CLS prevention with stable layouts
- FID optimization with minimal JavaScript

## Browser Support

### Modern Features
- CSS Grid and Flexbox
- ES6+ JavaScript
- WebP and AVIF image formats
- CSS Custom Properties

### Fallback Strategies
- Graceful image degradation
- JavaScript-free functionality
- Mobile-responsive design
- Progressive enhancement

## Development Workflow

### Scripts Available
```bash
npm run dev          # Development server
npm run build        # Production build
npm run test         # Run tests
npm run deploy       # Build and verify
npm run add-story    # Add new story
```

### Code Quality
- ESLint configuration
- Pre-commit validation
- Build verification
- Automated testing

## Monitoring and Analytics

### Google Analytics
- Web Vitals tracking
- Event monitoring
- Performance metrics
- User behavior analysis

### Error Tracking
- React Error Boundaries
- Console error logging
- Build error detection
- Runtime validation

## Future Enhancements

### Planned Features
- User story submission
- Advanced search functionality
- Story categories and tags
- Social sharing integration
- Comment system
- User authentication

### Technical Improvements
- Incremental Static Regeneration
- API route optimization
- CDN image optimization
- Advanced caching strategies
- PWA capabilities

---

*This documentation provides a comprehensive overview of the Gemini Storybook Showcase architecture and implementation. For specific implementation details, refer to the corresponding source files.*