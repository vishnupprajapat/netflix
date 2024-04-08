import { Inter } from "next/font/google";
import "./admin.css";
import "react-toastify/dist/ReactToastify.css";
import SidebarHeader from "./components/sidebar/SidebarHeader";
import Sidebar from "./components/sidebar/Sidebar";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import { cookies } from "next/headers";
export const metadata = {
  title: "Admin",
  description: "Created by vishnu Prajapat",
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const adminAuthToken = cookieStore.get("adminAuthToken")?.value;
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <div className="h-full relative ">
          {adminAuthToken ? <SidebarHeader /> : null}
          <div className="flex min-h-screen flex-row">
            {adminAuthToken ? <Sidebar /> : null}
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
      </body>
    </html>
  );
}
