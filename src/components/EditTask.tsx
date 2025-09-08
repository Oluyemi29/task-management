"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateTask } from "@/app/api/Action";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
type TaskProps = {
  task: {
    title: string;
    description: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    status: string;
  } | null;
};
const EditTask = ({ task }: TaskProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    title: z.string().min(2, { message: "Minimum of two character" }),
    description: z.string().min(2, { message: "Minimum of two character" }),
  });
  type formSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const submit = async (value: formSchemaType) => {
    try {
      setLoading(true);
      const userId = session!.user.id;
      const id = task?.id as string;
      const { title, description } = value;
      const response = await UpdateTask({ description, id, title, userId });
      if (response.success) {
        toast.success(response.message);
        return router.push("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setLoading(false);
    }
  };
  return (
    <div className="w-full  flex flex-col h-screen justify-center items-center">
      <div className="lg:w-2/6 md:w-3/6 w-full">
        <form onSubmit={handleSubmit(submit)}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Edit This Task</CardTitle>
              <CardDescription>
                Enter correct Task details below to create edit task
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <div className="flex flex-col justify-start">
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter task title"
                      defaultValue={task?.title}
                      required
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-red-700 text-sm">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Description</Label>
                  <div className="flex flex-col justify-start">
                    <Textarea
                      id="description"
                      placeholder="Description"
                      defaultValue={task?.description}
                      required
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="text-red-700 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              {loading ? (
                <Button
                  type="button"
                  className="w-full bg-taskmain/65 hover:bg-taskmain/45 cursor-not-allowed"
                >
                  Loading...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-taskmain hover:bg-taskmain/80 cursor-pointer"
                >
                  Submit Edit
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
