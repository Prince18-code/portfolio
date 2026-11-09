import type { Metadata } from "next";
import type { ReactNode } from "react";
import StarBackground from "@/components/main/StarBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prince Shukla — Full Stack Developer",
  description: "Prince Shukla is a BCA undergraduate and full stack developer in Kanpur, India, building thoughtful web applications and AI-powered tools.",
  openGraph: {
    title: "Prince Shukla — Full Stack Developer",
    description: "Thoughtful code. Cosmic ideas. Explore the work and journey of Prince Shukla.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><StarBackground />{children}</body></html>;
}
