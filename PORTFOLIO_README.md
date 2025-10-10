# Portfolio Website - Harikrishna Gautam

A professional portfolio website built with Next.js and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices
- **Modern UI**: Clean and professional design with Tailwind CSS
- **Smooth Scrolling**: Seamless navigation between sections
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Sections Include**:
  - Hero section with introduction
  - About section with education details
  - Projects showcase with 6 projects
  - Certifications display
  - Contact form with social links
  - Resume download functionality

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository or navigate to the project directory:
```bash
cd portfolio-1
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
portfolio-1/
├── app/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── About.tsx         # About section
│   ├── Certifications.tsx # Certifications section
│   ├── Contact.tsx       # Contact section
│   ├── Footer.tsx        # Footer component
│   ├── Hero.tsx          # Hero section
│   ├── Navigation.tsx    # Navigation bar
│   ├── Projects.tsx      # Projects section
│   └── Resume.tsx        # Resume section
├── public/
│   ├── profile.jpg       # Your profile photo (add this)
│   ├── resume.pdf        # Your resume PDF (add this)
│   ├── projects/         # Project images folder
│   └── certifications/   # Certification images folder
└── package.json
```

## 🎨 Customization

### Add Your Profile Photo

1. Add your profile photo to `public/profile.jpg`
2. Recommended size: 400x400px or larger (square aspect ratio)

### Add Your Resume

1. Add your resume PDF to `public/resume.pdf`
2. The download button will automatically use this file

### Add Project Images

1. Create folder: `public/projects/`
2. Add images for your projects (e.g., `yatayat.jpg`, `ecommerce.jpg`, etc.)
3. Update image paths in `components/Projects.tsx`

### Add Certification Images

1. Create folder: `public/certifications/`
2. Add images for your certifications
3. Update image paths in `components/Certifications.tsx`

### Update Social Links

Edit the following files to add your social media URLs:
- `components/Contact.tsx` - Update social media links
- `components/Footer.tsx` - Update footer social links

### Update Personal Information

Edit the following:
- `components/Hero.tsx` - Update name and introduction
- `components/About.tsx` - Update education and about text
- `components/Projects.tsx` - Update project details
- `components/Certifications.tsx` - Update certification details

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy automatically

### Build for Production

```bash
npm run build
npm start
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Features to Note

1. **Smooth Navigation**: Click on any navigation link to smoothly scroll to that section
2. **Responsive Design**: Works perfectly on mobile, tablet, and desktop
3. **Dark Mode**: Automatically adapts to your system's dark mode preference
4. **Interactive Elements**: Hover effects and transitions for better UX
5. **SEO Friendly**: Semantic HTML structure for better search engine optimization

## 📧 Contact

- Email: hrkshnagtm@gmail.com
- GitHub: [Harikrishna-HG](https://github.com/Harikrishna-HG)

## 📄 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)

---

**Note**: Remember to replace placeholder images and update all personal information before deploying!
