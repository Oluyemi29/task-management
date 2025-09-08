import UploadTask from "@/components/UploadTask";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Task",
};
const page = () => {
  return (
    <div className="w-full">
      <UploadTask />
    </div>
  );
};

export default page;
