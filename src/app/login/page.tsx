import Login from "@/components/Login";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
};
const page = () => {
  return (
    <div className="w-full">
      <Login />
    </div>
  );
};

export default page;
