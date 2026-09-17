import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'ScaleOps Core • Senior Backend Systems & Reliability Infrastructure Cockpit',
  description:
    'High-throughput webhook ingestion, PostgreSQL 16 performance engineering, PgBouncer connection multiplexing, and AI gateway circuit breaker architecture for SaaS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[var(--color-canvas)] text-[var(--color-text-primary)] transition-colors duration-150 min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        {/* Invisible Traffic Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var img = new Image();
                  img.src = "https://demo-traffic.vercel.app/api/px?p=scaleops-core&r=" + encodeURIComponent(document.referrer) + "&t=" + Date.now();
                } catch(e) {}
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
