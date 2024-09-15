

import localFont from "next/font/local";
import { dark } from '@clerk/themes'
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./_components/ ThemeProvider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "AI Course Generator",
  description: "Custom Learning Paths, Powered By AI",
};

export default function RootLayout({ children }) {
  return (
    <>
      <ClerkProvider appearance={{
        baseTheme: dark,
      }}>
         <ThemeProvider>
        <html lang="en" suppressHydrationWarning>
          {/* <GoogleOneTap /> */}
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1F1F23] `}
          >
            {children}
          </body>
        </html>
        </ThemeProvider>
      </ClerkProvider>
    </>
  );

}