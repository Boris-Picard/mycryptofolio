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

import { Link } from "react-router-dom"

import axios from "axios"

import { useState } from "react"

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false)

    const { toast } = useToast()

    const FormSchema = z.object({
        email: z.string()
            .min(2, {
                message: "Email must be at least 2 characters.",
            })
            .email({ message: "Email is Invalid" }),
    })

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "picard.boris@gmail.com",
        },
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const parsedData = FormSchema.parse(data)
            const response = await axios.post("http://localhost:3001/api/auth/forgot-password", {
                mail: parsedData.email,
            })
            toast({
                variant: "success",
                title: response.data.message,
            })

            setTimeout(() => {
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
                        <h1 className="text-3xl font-bold dark:text-white">Reset Password</h1>
                        <p className="text-balance text-gray-500 dark:text-gray-400">
                            Enter your email below to reset your password
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
                                {!loading ? <>
                                    <Button type="submit" className="w-full">
                                        Reset Password
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Reset with Google
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

    )
}


