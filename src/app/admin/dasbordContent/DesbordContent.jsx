import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
const tableheader = [
  "Movie name",
  "Description",
  "genre",
  "duration",
  "Action",
];

const DesbordContent = () => {
  return (
    <main className=" relative mt-20 w-[1345px] p ml-auto main flex flex-grow flex-col p-6 transition-all duration-150 ease-in md:ml-0"></main>
  );
};

export default DesbordContent;
