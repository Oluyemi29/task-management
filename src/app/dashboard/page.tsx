import Dashboard from "@/components/Dashboard";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const page = async () => {
  noStore();
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  const alltask = await prisma.task.findMany({
    where: {
      userId: session.user.id,
    },
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
