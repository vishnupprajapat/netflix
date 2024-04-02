import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import UserProvider from "@/context/userProvider";

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
