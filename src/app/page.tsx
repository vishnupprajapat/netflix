import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import UserProvider from "@/context/userProvider";
import { cookies } from "next/headers";

export default function Home() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Banner />
      </UserProvider>
    </>
  );
}
