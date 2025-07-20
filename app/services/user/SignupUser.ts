"use server"

import { prisma } from "@/lib/prisma"
import { ApiResponse } from "../servicesTypes"
import { User } from "@prisma/client"
import { hash } from "bcrypt"
import { z } from "zod"

const UserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})


export async function SignupUser({ email, password }: { email: string, password: string }): Promise<ApiResponse<User>> {
    try {

        const validatedData = UserSchema.safeParse({ email, password });

        if (!validatedData.success) {
            return {
                success: false,
                message: "Invalid data",
            }
        }

        const user = await prisma.user.create({
            data: {
                email: validatedData.data.email,
                password: await hash(validatedData.data.password, 10),
            }
        })

        return {
            success: true,
            message: "User created successfully",
            data: user
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        }
    }
}