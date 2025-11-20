# AdiLabs - Personal Landing Page

Professional landing page for Adi Sumardi, a Fullstack Developer specializing in web applications, AI integration, and enterprise solutions.

## Features

- **Modern Design**: Playful yet elegant design with blue & gold color scheme
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Framer Motion animations throughout
- **SEO Optimized**: Complete SEO setup with metadata, Open Graph, Twitter Cards, JSON-LD structured data
- **Interactive Sections**:
  - Hero with animated gradient background
  - About section with stats
  - Tech Stack with filterable categories
  - Projects showcase with 7 featured projects
  - Services offerings
  - Contact form
  - Professional footer

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Font**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
adilabs-landing/
├── app/
│   ├── globals.css          # Global styles and color palette
│   ├── layout.tsx           # Root layout with SEO metadata
│   ├── page.tsx             # Main page with all sections
│   ├── sitemap.ts           # Dynamic sitemap generation
│   └── robots.ts            # Robots.txt configuration
├── components/
│   ├── Hero.tsx             # Hero section
│   ├── About.tsx            # About section
│   ├── TechStack.tsx        # Tech stack section
│   ├── Projects.tsx         # Projects showcase
│   ├── Services.tsx         # Services section
│   ├── Contact.tsx          # Contact form
│   ├── Footer.tsx           # Footer section
│   └── JsonLd.tsx           # JSON-LD structured data
├── data/
│   └── projects.ts          # Projects data
└── public/                  # Static assets
```

## Customization

### Update Personal Information

1. **Social Media Links**: Update URLs in:
   - `components/Hero.tsx`
   - `components/Contact.tsx`
   - `components/Footer.tsx`

2. **Projects**: Edit `data/projects.ts` to add/modify projects

3. **Tech Stack**: Modify `components/TechStack.tsx` to update technologies

4. **SEO Metadata**: Update `app/layout.tsx` for meta tags and `components/JsonLd.tsx` for structured data

5. **Color Scheme**: Customize colors in `app/globals.css`

### Add Google Analytics

Add your Google verification code in `app/layout.tsx`:
```typescript
verification: {
  google: "your-google-verification-code-here",
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Configure custom domain (adilabs.id)
4. Deploy!

### Deploy to Hostinger

1. Build the project:
```bash
npm run build
```

2. Upload the `.next`, `public`, and `package.json` files to your Hostinger hosting

3. Configure Node.js application in Hostinger control panel

4. Set the start command: `npm start`

## Environment Variables

The project uses EmailJS for contact form functionality. Create a `.env.local` file with:

```env
NEXT_PUBLIC_SITE_URL=https://adilabs.id
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**Note:** The EmailJS credentials are already configured. If you need to change them, update the values in `.env.local`

## SEO Features

- Meta tags (title, description, keywords)
- Open Graph tags for social media
- Twitter Card tags
- JSON-LD structured data
- Sitemap.xml
- Robots.txt
- Semantic HTML
- Fast loading performance

## Performance

- Server-side rendering (SSR)
- Image optimization with Next.js Image
- Code splitting
- CSS optimization
- Lazy loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Adi Sumardi. All rights reserved.

## Contact

- Email: adisumardi888@gmail.com
- LinkedIn: [linkedin.com/in/adi-sumardi](https://www.linkedin.com/in/adi-sumardi-9037b0156/)
- GitHub: [github.com/Adi-Sumardi](https://github.com/Adi-Sumardi)
- Instagram: [@_adi1508](https://instagram.com/_adi1508)
- Facebook: [adi.sumardi888](https://www.facebook.com/adi.sumardi888/)
