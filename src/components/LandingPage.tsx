"use client";
import { Image } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="w-full  flex flex-col h-screen justify-center items-center">
      <div className="lg:w-3/6 md:w-3/6 -mt-16 w-full flex justify-center items-center flex-col gap-5 overflow-auto no-scrollbar">
        <Image
          src={"/task.png"}
          alt="welcome"
          width={"100%"}
          className="h-32"
        />
        <motion.h1
          initial={{
            x: -900,
          }}
          animate={{
            x: 0,
          }}
          transition={{
            delay: 2,
            duration: 2,
            type: "spring",
            stiffness: 500,
            damping: 10,
          }}
          className="md:text-5xl text-3xl text-taskmain font-bold"
        >
          WELCOME
        </motion.h1>
        <motion.h1
          initial={{
            x: 700,
          }}
          animate={{
            x: 0,
          }}
          transition={{
            delay: 4,
            duration: 2,
            type: "spring",
            stiffness: 400,
            damping: 10,
          }}
          className="md:text-2xl text-xl text-taskmain font-bold"
        >
          TO
        </motion.h1>
        <motion.h1
          initial={{
            x: 700,
          }}
          animate={{
            x: 0,
          }}
          transition={{
            delay: 6,
            duration: 2,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="md:text-5xl text-3xl text-center text-taskmain font-bold"
        >
          TASK MANAGEMENT
        </motion.h1>
        <motion.button
          initial={{
            x: 700,
          }}
          animate={{
            x: 0,
          }}
          transition={{
            delay: 8,
            duration: 4,
            type: "spring",
            stiffness: 50,
            damping: 10,
          }}
          className="text-white bg-taskmain w-2/3 h-14 rounded-md cursor-pointer mt-5"
          onClick={() => router.push("/register")}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default LandingPage;
