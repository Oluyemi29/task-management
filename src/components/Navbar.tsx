"use client";
import React from "react";
import {
  Navbar,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import { signOut, useSession } from "next-auth/react";

const NavbarInfo = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session } = useSession();

  const menuitem = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Upload Task",
      link: "/dashboard/uploadtask",
    },
    {
      name: "Login",
      link: "/login",
    },
  ];
  const pathname = usePathname();

  return (
    <Navbar
      maxWidth="full"
      className="flex flex-row justify-between items-center"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="" justify="start">
        <Link href="/" className="font-bold">
          TMS
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/dashboard"}>
          <Link color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/dashboard/uploadtask"}>
          <Link href="/dashboard/uploadtask">Upload Task</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {session ? (
          <>
            <NavbarMenuItem className="">
              <p className="text-sm font-semibold">{session.user.name}</p>
            </NavbarMenuItem>
            <NavbarMenuItem className="">
              <Button
                onPress={() => signOut()}
                className="text-white bg-red-700"
              >
                Log Out
              </Button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link className="text-taskmain" href="/login">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                className="bg-taskmain text-white"
                href="/register"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
        <NavbarItem className="flex lg:hidden">
          {isMenuOpen ? (
            <HiMiniXMark size={28} onClick={() => setIsMenuOpen(false)} />
          ) : (
            <IoMenu onClick={() => setIsMenuOpen(true)} size={28} />
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="">
        {menuitem.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className={
                item.name === "Login" && session
                  ? "hidden"
                  : "w-full font-semibold"
              }
              color={item.name === "Login" ? "danger" : "foreground"}
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarInfo;
