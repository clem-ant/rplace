import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./navbar/navbar";
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
  title: "Place - niclem 4l",
  icons: {
    icon: "/favicon.png",
  },
  description: "r/place clone pour niclem 4l trophy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
