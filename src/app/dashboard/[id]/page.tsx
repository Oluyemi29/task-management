import EditTask from "@/components/EditTask";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  return {
    title: task ? task.title : "Edit Page",
  };
}


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  noStore();
  const id = (await params).id;
  const task = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  return (
    <div>
      <EditTask task={task} />
    </div>
  );
};

export default page;
