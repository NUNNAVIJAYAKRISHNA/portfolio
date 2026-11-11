import './globals.css';

export const metadata = {
  title: 'Nunna Vijaya Krishna | Software Engineer • ML • ServiceNow CAD/CSA',
  description: 'Portfolio of Nunna Vijaya Krishna - Computer Science Student, Software Developer, ML Enthusiast, and Certified ServiceNow Developer.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head><body>{children}</body></html>;
}
