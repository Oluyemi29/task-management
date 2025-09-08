"use client";
import React, { Key, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
} from "@heroui/react";
import { DeleteTaskAction } from "@/app/api/Action";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FaFilter } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";
import { Input } from "./ui/input";

type AllTaskProps = {
  alltask: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
    status: string;
    userId: string;
  }[];
};
type EachTaskProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  status: string;
  userId: string;
};
const Dashboard = ({ alltask }: AllTaskProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filteredBy, setFilteredBy] = useState("title");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const taskPerPage = 5;
  const [deleted, setDeleted] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [filteredTask, setFilteredTask] = useState(alltask);

  const from = (currentPage - 1) * taskPerPage;
  const to = from + taskPerPage;
  const pagination = filteredTask.slice(from, to);
  const total = Math.ceil(
    filteredTask.length > 0 ? filteredTask.length / taskPerPage : 1
  );
  const handleSearch = (value: string) => {
    const key: keyof EachTaskProps = filteredBy as keyof EachTaskProps;
    if (value) {
      setFilteredTask(
        alltask.filter((eachTask) => {
          return eachTask[key as keyof EachTaskProps]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        })
      );
      setCurrentPage(1);
    } else {
      setFilteredTask(alltask);
    }
  };
  const handleSort = (e: string) => {
    if (e === "new to old") {
      setFilteredTask((prevData) => {
        return prevData.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
      });
    }
    if (e === "old to new") {
      setFilteredTask((prevData) => {
        return prevData.sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        );
      });
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const id = deleted.id;
      const userId = session!.user.id;
      const response = await DeleteTaskAction({ id, userId });
      if (response.success) {
        toast.success(response.message);
        setOpenModal(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-4 w-full items-center my-3">
        <Dropdown>
          <DropdownTrigger>
            <FaFilter size={28} className="cursor-pointer" />
          </DropdownTrigger>
          <DropdownMenu
            onAction={(e: Key) => {
              setFilteredBy(e.toString());
            }}
            aria-label="Static Actions"
          >
            <DropdownItem key="title">Title</DropdownItem>
            <DropdownItem key="description">Description</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Input
          placeholder={`Search by ${filteredBy}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSearch(e.target.value);
          }}
          className="h-11"
        />
        <Dropdown>
          <DropdownTrigger>
            <MdOutlineSort size={28} className="cursor-pointer" />
          </DropdownTrigger>
          <DropdownMenu
            onAction={(e: Key) => {
              handleSort(e.toString());
              setSortBy(e.toString());
            }}
            aria-label="Static Actions"
          >
            <DropdownItem
              className={
                sortBy === "new to old" ? "bg-slate-200" : "bg-transparent"
              }
              key="new to old"
            >
              New to Old task
            </DropdownItem>
            <DropdownItem
              className={
                sortBy === "old to new" ? "bg-slate-200" : "bg-transparent"
              }
              key="old to new"
            >
              Old to New task
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {pagination.length < 1 ? (
        <>
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="w-full lg:w-2/6 text-center md:w-3/6">
              <p className="font-semibold text-sm">No Task found</p>
            </div>
          </div>
        </>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          {pagination.map((eachTask, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{eachTask.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-40 overflow-y-auto no-scrollbar">
                    <CardDescription>{eachTask.description}</CardDescription>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row gap-3 justify-end">
                  <Link
                    className="bg-blue-600 text-white px-5 py-1.5 rounded-md"
                    href={`/dashboard/${eachTask.id}`}
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => {
                      setDeleted((prevData) => {
                        return {
                          ...prevData,
                          description: eachTask.description,
                          id: eachTask.id,
                          title: eachTask.title,
                        };
                      });
                      setOpenModal(true);
                    }}
                    className="bg-red-700 text-white hover:bg-red-700/75 cursor-pointer"
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent>
          <ModalHeader>Delete this task</ModalHeader>
          <ModalBody className=" w-full h-40 flex flex-col gap-2 overflow-y-auto no-scroll-bar">
            <h1>{deleted.title}</h1>
            <h1>{deleted.description}</h1>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => setOpenModal(false)}
              className="shadow-md border-2 cursor-pointer hover:bg-white text-red-700 bg-white"
            >
              Close
            </Button>
            {loading ? (
              <Button
                className="cursor-not-allowed bg-red-700 hover:bg-red-700/75 text-white"
                type="button"
              >
                Loading...
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleDelete();
                }}
                className="bg-red-700 text-white hover:bg-red-700/75 cursor-pointer"
              >
                Delete
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="w-full flex flex-row my-5 justify-center">
        <Pagination
          initialPage={currentPage}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
          total={total}
          showControls
        />
      </div>
    </div>
  );
};

export default Dashboard;
