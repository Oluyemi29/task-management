import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import NavbarInfo from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Task Management System",
    template: "%s | Task Management System",
  },
  description:
    "This is a site for that allow Creating Retreiving Updating and Deleting task",
  openGraph: {
    title: "Task Management System",
    description:
      "This is a site for that allow Creating Retreiving Updating and Deleting task",
    url: "https://task-management.vercel.app",
    siteName: "Task Management System",
    images: {
      url: "/rs.jpg",
      width: 1200,
      height: 630,
      alt: "Task Management System",
    },
    type: "website",
  },
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
        <Provider>
          <Toaster position="top-center" />
          <div className="w-[95%] mx-auto">
            <NavbarInfo />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
