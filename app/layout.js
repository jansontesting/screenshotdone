import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'ScreenshotDONE — HTML to WebP Screenshot API',
    description:
        'Send HTML via API, get pixel-perfect full-body WebP screenshots back instantly. Powered by headless Chromium on Vercel.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
