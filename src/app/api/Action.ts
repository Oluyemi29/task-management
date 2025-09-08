"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}
export const RegisterUser = async ({ email, name, password }: RegisterUser) => {
  try {
    if (!name || !email || !password) {
      return {
        success: false,
        message: "All field are required",
      };
    }
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existUser) {
      return {
        success: false,
        message: "User already exist, kindly login",
      };
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });
    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface CreateTask {
  userId: string;
  title: string;
  description: string;
}

export const CreateTask = async ({
  description,
  title,
  userId,
}: CreateTask) => {
  try {
    if (!description || !title || !userId) {
      return {
        success: false,
        message: "All fields are required",
      };
    }
    const existTask = await prisma.task.findFirst({
      where: {
        title,
        description,
        userId,
      },
    });
    if (existTask) {
      return {
        success: false,
        message: "Task Already created",
      };
    }
    const task = await prisma.task.create({
      data: {
        description,
        title,
        userId,
      },
    });
    if (task) {
      revalidatePath("/dashboard");
      return {
        success: true,
        message: "Task created successfully",
      };
    } else {
      return {
        success: false,
        message: "An error when creating task",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface EditTask {
  id: string;
  userId: string;
  title: string;
  description: string;
}

export const UpdateTask = async ({
  id,
  description,
  title,
  userId,
}: EditTask) => {
  try {
    if (!description || !title || !userId || !id) {
      return {
        success: false,
        message: "All fields are required",
      };
    }
    const existTask = await prisma.task.findFirst({
      where: {
        id,
      },
    });
    if (!existTask) {
      return {
        success: false,
        message: "Task not found",
      };
    }
    if (existTask.userId !== userId) {
      return {
        success: false,
        message: "unauthorise access",
      };
    }

    const task = await prisma.task.update({
      where: {
        id,
        userId,
      },
      data: {
        description,
        title,
      },
    });
    if (task) {
      revalidatePath("/dashboard");
      return {
        success: true,
        message: "Task edited successfully",
      };
    } else {
      return {
        success: false,
        message: "An error when creating task",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

interface DeleteTask {
  id: string;
  userId: string;
}

export const DeleteTaskAction = async ({ id, userId }: DeleteTask) => {
  try {
    if (!id || !userId) {
      return {
        success: false,
        message: "All fields are required",
      };
    } 
    const existTask = await prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!existTask) {
      return {
        success: false,
        message: "Task not found",
      };
    }
    if (existTask.userId !== userId) {
      return {
        success: false,
        message: "unauthorise access",
      };
    }
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    if (task) {
      revalidatePath("/dashboard");
      return {
        success: true,
        message: "task deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "Error when deleting task",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};
