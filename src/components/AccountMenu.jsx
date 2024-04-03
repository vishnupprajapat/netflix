import UserContext from "@/context/userContext";
import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const AccountMenu = ({ visible }) => {
  const context = useContext(UserContext);
  const { user } = context;
  const router = useRouter(); // Use useRouter hook to get the router object

  const logOut = useCallback(async () => {
    try {
      await axios.post("/api/logout");
      // window.location.reload();
      router.push("/login"); // Use router.push() to navigate to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [router]);

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt=""
            width={100}
            height={100}
          />
          <p className="text-white text-sm group-hover/item:underline">
            {user?.username}
          </p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={logOut}
        className="px-3 text-center text-white text-sm hover:underline"
      >
        Sign out of Netflix
      </div>
    </div>
  );
};

export default AccountMenu;
