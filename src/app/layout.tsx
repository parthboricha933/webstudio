import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parth Web Studio | Professional Web Development Agency",
  description:
    "Parth Web Studio creates professional, responsive websites for Restaurants, Cafes, Hotels, Hospitals, Shops, Gyms, Schools, Startups, and Businesses. Get your website live within 7-14 days!",
  keywords: [
    "Web Development",
    "Website Design",
    "Restaurant Website",
    "Hotel Website",
    "Business Website",
    "E-Commerce",
    "Parth Web Studio",
    "Professional Websites",
    "India Web Developer",
  ],
  authors: [{ name: "Parth Web Studio" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Parth Web Studio | Professional Web Development Agency",
    description:
      "Professional websites that grow your business. Custom web solutions for every industry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
