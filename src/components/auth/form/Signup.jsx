import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import FormField from './FormField';
import { Button } from '@/src/components/ui/button';

const baseSchema = z.object({
    email: z.string().email({ message: "Not a valid email" }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    cpassword: z.string(),
    fname: z.string().min(1, "First name is required"),
    lname: z.string().min(1, "Last name is required"),
});

const getFormSchema = (isOwner) => {
    const refinedSchema = (schema) => {
        return schema.refine(data => data.password === data.cpassword, {
            message: "Passwords do not match",
            path: ['cpassword']
        })
    }

    if (isOwner) {
        return refinedSchema(baseSchema);
    } else {
        return refinedSchema(baseSchema.omit({ fname: true, lname: true }));
    }
}

const Signup = ({ onSignIn, onSubmit, isOwner=false }) => {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({
        resolver: zodResolver(getFormSchema(isOwner)),
        defaultValues: {
            email: "",
            password: "",
            cpassword: "",
            fname: "",
            lname: ""
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {isOwner && (
                <div className='flex flex-col xl:flex-row xl:gap-2 w-full'>
                    <FormField
                        label="First Name"
                        type="text"
                        placeholder="Enter your first name"
                        errors={errors.fname}
                        disabled={isSubmitting}
                        className='w-full'
                        {...register("fname")}
                    />
                    <FormField
                        label="Last Name"
                        type="text"
                        placeholder="Enter your last name"
                        errors={errors.lname}
                        disabled={isSubmitting}
                        className='w-full'
                        {...register("lname")}
                    />
                </div>
            )}
            <FormField
                label="Email"
                type="email"
                placeholder="Enter your email"
                errors={errors.email}
                disabled={isSubmitting}
                {...register("email")}
            />
            <FormField
                label="Password"
                type="password"
                placeholder="Enter your password"
                errors={errors.password}
                disabled={isSubmitting}
                {...register("password")}
            />
            <FormField
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                errors={errors.cpassword}
                disabled={isSubmitting}
                {...register("cpassword")}
            />

            <Button type="submit" className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition text-base" disabled={isSubmitting}>
                Sign Up
            </Button>
            <p className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <span onClick={onSignIn} className="text-blue-500 hover:underline cursor-pointer">
                    Sign in
                </span>
            </p>
        </form>
    )
}

export default Signup
