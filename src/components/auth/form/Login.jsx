import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import React from 'react'
import { Button } from "@/components/ui/button";
import FormField from "./FormField";

const formSchema = z.object({
    email: z.string().email({ message: "Not a valid email" }),
    password: z.string().min(8, {message: "Password must be at least 8 charactes"})
});

const Login = ({ onSignUp, onSubmit }) => {
    const { register, formState: { isSubmitting, errors }, handleSubmit } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
                label="Email"
                type="email"
                placeholder="Enter your email"
                errors={errors.email}
                {...register("email")}
            />
            <FormField
                label="Password"
                type="password"
                placeholder="Enter your password"
                errors={errors.password}
                {...register("password")}
            />
            
            <Button type="submit" className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition text-base" disabled={isSubmitting}>
                Sign In
            </Button>
            <p className="text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <span onClick={onSignUp} className="text-blue-500 hover:underline cursor-pointer">
                    Sign up
                </span>
            </p>
        </form>
    )
}

export default Login
