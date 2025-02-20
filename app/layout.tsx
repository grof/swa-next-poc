import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from './_components/Header/Header';
import Navigation from './_components/Navigation/Navigation';
import styles from './layout.module.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SWA Next.js POC",
  description: "Static Web Apps POC with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <Header />
        <main className={styles.main}>
          <div className={styles.content}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
