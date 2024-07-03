import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import bglogin from "../../assets/bglogin.jpg"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { PasswordInput } from "@/components/ui/password-input"

import { Link, useNavigate } from "react-router-dom"

import { useAuthStore } from "@/stores/useAuthStore"

import axios from "axios"

import { useState } from "react"

export default function SignIn() {
    const [loading, setLoading] = useState(false)

    const { toast } = useToast()
    const { setUser } = useAuthStore()
    const navigate = useNavigate()

    const passwordValidation = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/
    );

    const FormSchema = z.object({
        email: z.string()
            .min(2, {
                message: "Email must be at least 2 characters.",
            })
            .email({ message: "Email is Invalid" }),
        password: z.string()
            .min(8, { message: "Password must be at least 8 characters." })
            .max(50, { message: "Password must be at most 50 characters." })
            .regex(passwordValidation, {
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            })
    })

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "picard.boris@gmail.com",
            password: "Password123!",
        },
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const parsedData = FormSchema.parse(data)
            const response = await axios.post("http://localhost:3001/api/auth/signin", {
                mail: parsedData.email,
                password: parsedData.password,
            }, {
                withCredentials: true
            })

            toast({
                variant: "success",
                title: "signIn successfully",
            })

            setTimeout(() => {

                setUser(response.data.user)
                navigate("/")

                setLoading(false)
            }, 3000)
        } catch (error) {

            toast({
                variant: "destructive",
                title: "Somethings went wrong:",
                description: error.response?.data?.error || "Unknown error occurred",
            })
            
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12 h-screen">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold dark:text-white">Sign In</h1>
                        <p className="text-balance text-gray-500 dark:text-gray-400">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <div className="grid gap-4">
                                <div className="grid gap-2 dark:text-white">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        disabled={loading}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" autoComplete="email" placeholder="example@gmail.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2 dark:text-white">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        disabled={loading}
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex">
                                                    <FormLabel>Password</FormLabel>
                                                    <Link
                                                        to="/forgot-password"
                                                        className="ml-auto inline-block text-sm underline"
                                                    >
                                                        Forgot your password?
                                                    </Link>
                                                </div>
                                                <FormControl>
                                                    <PasswordInput autoComplete="current-password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {!loading ? <>
                                    <Button type="submit" className="w-full">
                                        Sign in
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Sign in with Google
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
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="underline">
                            Sign up
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
    )
}


