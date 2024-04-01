import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./admin.css";
import SidebarHeader from "./components/sidebar/SidebarHeader";
import Sidebar from "./components/sidebar/Sidebar";
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
      <body className={inter.className}>
        <div className="h-full relative ">
          <SidebarHeader />
          <div className="flex min-h-screen flex-row">
            <Sidebar />
            <div className=" relative mt-20 w-[1345px] p ml-auto main flex flex-grow flex-col p-6 transition-all duration-150 ease-in md:ml-0">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
