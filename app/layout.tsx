import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AidLink - Transparent Aid Fulfillment Platform",
  description:
    "AidLink transforms donations into guaranteed impact through verified fulfillment partners. Trust, transparency, and measurable social change.",
  keywords: ["aid", "donation", "charity", "fulfillment", "transparency", "social impact"],
  openGraph: {
    title: "AidLink - Turning Donations Into Guaranteed Impact",
    description:
      "A transparent aid fulfillment platform ensuring every donation delivers real-world assistance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
<<<<<<< HEAD
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
=======
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('aidlink-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
    </html>
  );
}
