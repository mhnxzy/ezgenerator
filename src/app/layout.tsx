import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const font = JetBrains_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "ez-Generator",
   description: "Created by @Mhnxzy",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
   return (
      <html
         lang="en"
         className={`${font.className} antialiased bg-gray-950 text-white`}
      >
         <body>{children}</body>
      </html>
   );
}
