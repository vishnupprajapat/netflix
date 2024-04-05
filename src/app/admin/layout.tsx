import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./admin.css";
import "react-toastify/dist/ReactToastify.css";
import SidebarHeader from "./components/sidebar/SidebarHeader";
import Sidebar from "./components/sidebar/Sidebar";
const inter = Inter({ subsets: ["latin"] });
import AdminProvider from "./adminContext/adminProvider";
import { ToastContainer } from "react-toastify";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Admin",
  description: "Created by vishnu Prajapat",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieData: any = await getCookieData();
  // const cookieDataValue = cookieData[0]?.value;
  const cookieStore = cookies();
  const adminAuthToken = cookieStore.get("adminAuthToken")?.value;
  return (
    <html lang="en">
      <AdminProvider>
        <body className={inter.className}>
          <div className="h-full relative ">
            {adminAuthToken ? <SidebarHeader /> : <></>}
            <div className="flex min-h-screen flex-row">
              {adminAuthToken ? <Sidebar /> : <></>}
              <div
                className={`${
                  adminAuthToken
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
      </AdminProvider>
    </html>
  );
}

// async function getCookieData() {
//   const cookieData = cookies().getAll();
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve(cookieData);
//     }, 1000)
//   );
// }
