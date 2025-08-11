# BMI Calculator - Fit Meter Buddy

A modern, responsive BMI (Body Mass Index) calculator built with React, TypeScript, and Tailwind CSS. Features a beautiful visual gauge display and intuitive user interface.

![BMI Calculator](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **Instant BMI Calculation** - Real-time calculation using feet/inches and kilograms
- **Visual Gauge Display** - Beautiful semi-circular gauge showing BMI categories
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Accessibility** - Built with ARIA labels and semantic HTML
- **Modern UI** - Clean, elegant interface using shadcn/ui components
- **Input Validation** - Smart validation with helpful error messages
- **SEO Optimized** - Proper meta tags and page titles

## 🎯 BMI Categories

The calculator uses standard WHO BMI categories:
- **Underweight**: < 18.5
- **Normal**: 18.5 - 24.9
- **Overweight**: 25.0 - 29.9
- **Obese Class I**: 30.0 - 34.9
- **Obese Class II**: 35.0 - 39.9

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fit-meter-buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 📱 Usage

1. **Enter your height** in feet and inches using the input fields
2. **Enter your weight** in kilograms
3. **Click "Calculate"** to see your BMI result
4. **View the visual gauge** showing your BMI category and position

The calculator automatically validates inputs and provides helpful error messages for invalid entries.

## 🛠️ Built With

- **[React 18](https://reactjs.org/)** - Frontend framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   └── BmiGauge.tsx  # Visual BMI gauge component
├── pages/
│   ├── Index.tsx     # Main BMI calculator page
│   └── NotFound.tsx  # 404 page
├── lib/              # Utility functions
├── hooks/            # Custom React hooks
└── App.tsx           # Main app component
```

## 🎨 Customization

### Styling
The project uses Tailwind CSS with custom CSS variables for BMI category colors. You can customize the appearance by modifying:

- `src/index.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration
- Component-specific styles in individual files

### BMI Categories
To modify BMI categories or ranges, update the `segments` array in `src/components/BmiGauge.tsx`:

```typescript
const segments = [
  { label: "Underweight", from: 15, to: 18.5, colorVar: "--bmi-underweight" },
  { label: "Normal", from: 18.5, to: 25, colorVar: "--bmi-normal" },
  // ... add or modify categories
];
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

The project is ready for deployment on any static hosting service:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3
   - Any static hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons

---

Made with ❤️ using modern web technologies
