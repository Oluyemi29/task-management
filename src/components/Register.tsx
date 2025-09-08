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
import { RegisterUser } from "@/app/api/Action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formSchema = z.object({
    name: z.string().min(2, { message: "Minimum of two character" }),
    email: z.email(),
    password: z.string().min(4, { message: "Minimum of four character" }),
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
      const { email, name, password } = value;
      const response = await RegisterUser({ email, name, password });
      if (response.success) {
        toast.success(response.message);
        return router.push("/login");
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
              <CardTitle>Register your account</CardTitle>
              <CardDescription>
                Enter your Registration details below to create account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Name</Label>
                  <div className="flex flex-col justify-start">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-700 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex flex-col justify-start">
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-700 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="flex flex-col justify-start">
                    <div className="flex flex-row items-center relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        {...register("password")}
                      />
                      {showPassword ? (
                        <EyeOff
                          className=" absolute right-3 cursor-pointer"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <Eye
                          className=" absolute right-3 cursor-pointer"
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                    {errors.password && (
                      <p className="text-red-700 text-sm">
                        {errors.password.message}
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
                  Register
                </Button>
              )}
              <div className="flex flex-row justify-between items-center w-full">
                <Link href={"/login"} className="text-blue-600 text-sm italic">
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Register;
