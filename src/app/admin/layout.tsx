import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./admin.css";
import "react-toastify/dist/ReactToastify.css";
import SidebarHeader from "./components/sidebar/SidebarHeader";
import Sidebar from "./components/sidebar/Sidebar";
const inter = Inter({ subsets: ["latin"] });
import UserProvider from "../admin/adminContext/userProvider";
// import cookie from "./adminContext/cookie";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
  title: "Admin",
  description: "Created by vishnu Prajapat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const cookie = cookieStore.get("adminAuthToken");
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <div className="h-full relative ">
            {cookie ? <SidebarHeader /> : null}
            <div className="flex min-h-screen flex-row">
              {cookie ? <Sidebar /> : null}
              <div
                className={`${
                  cookie
                    ? "w-[1345px] mt-20 p ml-auto main flex flex-grow flex-col p-6 transition-all duration-150 ease-in md:ml-0"
                    : "w-full"
                }`}
              >
                {children}
              </div>
            </div>
          </div>
          <ToastContainer />
        </body>
      </UserProvider>
    </html>
  );
}
