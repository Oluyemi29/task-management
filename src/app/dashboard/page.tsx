import Dashboard from "@/components/Dashboard";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const page = async () => {
  noStore();
  const alltask = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <Dashboard alltask={alltask} />
    </div>
  );
};

export default page;
