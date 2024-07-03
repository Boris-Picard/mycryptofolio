import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import bglogin from "../../assets/bglogin.jpg";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/components/ui/use-toast";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { useState } from "react";

import { useLocation } from "react-router-dom";

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);

    const location = useLocation()
    const { toast } = useToast();
    const { navigate } = useNavigate()

    const passwordValidation = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/
    );


    const FormSchema = z.object({
        password: z.string()
            .min(8, { message: "Password must be at least 8 characters." })
            .max(50, { message: "Password must be at most 50 characters." })
            .regex(passwordValidation, {
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            }),
        confirmPassword: z.string()
            .min(8, { message: "Password must be at least 8 characters." })
            .max(50, { message: "Password must be at most 50 characters." })
            .regex(passwordValidation, {
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match.",
        path: ["confirmPassword"],
    });

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "Azerty123!",
            confirmPassword: "Azerty123!",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        try {
            const parsedData = FormSchema.parse(data);
            const response = await axios.post(`http://localhost:3001/api/auth/reset-password?token=${token}`, {
                password: parsedData.password,
            });

            toast({
                variant: "success",
                title: response.data.message,
            });

            setTimeout(() => {
                setLoading(false);
            }, 3000);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong:",
                description: error.response?.data?.error || "Unknown error occurred",
            });

            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12 h-screen">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold dark:text-white">Reset Password</h1>
                        <p className="text-balance font-semibold text-red-500">
                            You have 15 minutes to reset your password
                        </p>
                        <p className="text-balance text-gray-500 dark:text-gray-400">
                            Enter your new password below to reset your password
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <div className="grid gap-4">
                                <div className="grid gap-2 dark:text-white">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        disabled={loading}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <PasswordInput autoComplete="current-password" placeholder="Enter new password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        disabled={loading}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <PasswordInput autoComplete="current-password" placeholder="Confirm new password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {!loading ? <>
                                    <Button type="submit" className="w-full">
                                        Reset Password
                                    </Button>
                                </> : <Button disabled={true}>
                                    <svg className="animate-spin h-5 w-5 mr-3 border-gray-200 border-2 border-t-blue-600 rounded-full" viewBox="0 0 24 24">
                                        ...
                                    </svg>
                                    Processing...
                                </Button>}
                            </div>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm dark:text-white text-gray-800">
                        <Link to="/signin" className="underline">
                            Back to sign in page
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <img
                    loading="lazy"
                    src={bglogin}
                    alt="cryptocurrencybg"
                    className="h-full w-full object-cover brightness-[0.4] grayscale"
                />
            </div>
        </div>
    );
}
