"use client";

import Button from "../Button/Button";
import { ButtonVariant, ButtonSize } from "@/enums";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { signIn } from "next-auth/react";
import { useState } from "react";
import Toast from "../Toast/Toast";
import { ToastVariant } from "@/enums";
import toast from "react-hot-toast";

const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm<z.infer<typeof LoginFormSchema>>({
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
        const validatedData = LoginFormSchema.safeParse(data);
        if (!validatedData.success) {
            toast.custom((t) => (
                <Toast variant={ToastVariant.ERROR} message={validatedData.error.errors[0].message} />
            ))
            return;
        }

        try {
            setIsLoading(true);
        const response = await signIn("credentials", {
                email: validatedData.data.email,
                password: validatedData.data.password,
                redirect: false,
            });
            if (response?.error) {
                toast.custom((t) => (
                    <Toast variant={ToastVariant.ERROR} message={response?.error || "Something went wrong"} />
                ))
            } else {
                toast.custom((t) => (
                    <Toast variant={ToastVariant.SUCCESS} message="Login successful" />
                ))
            }
        } catch (error) {
            toast.custom((t) => (
                <Toast variant={ToastVariant.ERROR} message="Something went wrong" />
            ))
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-8 animate-fade-in motion-safe:animate-show">
            <h2 className="text-2xl font-semibold tracking-tight text-center">Welcome back</h2>
            <p className="mt-2 text-sm text-center text-gray-600">Log in to continue.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" className="w-full p-2 border border-gray-200 rounded-md" {...register("email")}/>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" className="w-full p-2 border border-gray-200 rounded-md" {...register("password")}/>
                </div>
                
                <Button variant={ButtonVariant.PRIMARY} size={ButtonSize.MEDIUM} extraClasses="w-full" isLoading={isLoading}>Login</Button>

                <p className="mt-4 font-semibold text-xs text-center text-gray-500">Don't have an account? <Link href="/signup" className="text-indigo-600 hover:text-indigo-500 transition-colors">Sign Up</Link></p>
            </form>
        </div>
    )
}

export default LoginForm