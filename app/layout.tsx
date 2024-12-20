import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// import { localFont } from 'next/font/local';

// const geistMono = localFont({
//   src: './path/to/fonts/GeistMonoVF.woff', // Update this path
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  // src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  icons: "",
  title: "Blog",
  description: "Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
