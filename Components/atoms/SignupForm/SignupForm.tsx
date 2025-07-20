"use client";

import Button from "../Button/Button";
import { ButtonVariant, ButtonSize, ToastVariant } from "@/enums";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignupUser } from "@/app/services/user/SignupUser";
import { useState } from "react";
import toast from "react-hot-toast";
import Toast from "../Toast/Toast";
import { useRouter } from "next/navigation";

const SignupFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
})


const SignupForm = () => {
    const { register, handleSubmit } = useForm<z.infer<typeof SignupFormSchema>>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        }
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const onSubmit = async (data: z.infer<typeof SignupFormSchema>) => {
        const { email, password, confirmPassword } = data;

        const validatedData = SignupFormSchema.safeParse(data);
        if (!validatedData.success) {
            toast.custom((t) => (
                <Toast variant={ToastVariant.ERROR} message={validatedData.error.errors[0].message} />
            ))
            return;
        }
        if (password !== confirmPassword) {
            toast.custom((t) => (
                <Toast variant={ToastVariant.ERROR} message="Passwords do not match" />
            ))
            return;
        }

        try {
            setLoading(true);
            const response = await SignupUser({ email, password });
            
            if (response.success) {
                toast.custom((t) => (
                    <Toast variant={ToastVariant.SUCCESS} message={response.message} />
                ))
                router.push("/login");
            } else {
                toast.custom((t) => (
                    <Toast variant={ToastVariant.ERROR} message={response.message} />
                ))
            }
        } catch (error) {
            console.error(error);
            toast.custom((t) => (
                <Toast variant={ToastVariant.ERROR} message="Something went wrong" />
            ))
        } finally {
            setLoading(false);
        }
      
    }
    return (
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-8 animate-fade-in motion-safe:animate-show">
            <h2 className="text-2xl font-semibold tracking-tight text-center">Create an account</h2>
            <p className="mt-2 text-sm text-center text-gray-600">Start Chatting with your documents</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                    <input type="email" id="email" {...register("email")} name="email" placeholder="Enter your email" className="w-full p-2 border border-gray-200 rounded-md" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                    <input type="password" id="password" {...register("password")} name="password" placeholder="Enter your password" className="w-full p-2 border border-gray-200 rounded-md"/>
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                    <input type="password" id="confirmPassword" {...register("confirmPassword")} name="confirmPassword" placeholder="Confirm your password" className="w-full p-2 border border-gray-200 rounded-md"/>
                </div>
                <Button variant={ButtonVariant.PRIMARY} size={ButtonSize.MEDIUM} extraClasses="w-full" isLoading={loading}>Sign Up</Button>

                <p className="mt-4 font-semibold text-xs text-center text-gray-500">Already have an account? <Link href="/login" className="text-indigo-600 hover:text-indigo-500 transition-colors">Login</Link></p>
            </form>
        </div>
    )
}

export default SignupForm