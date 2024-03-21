import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./admin.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "Created by vishnu Prajapat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
