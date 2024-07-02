import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import mycryptofolio from "../../assets/mycryptofolio.png"

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

import { Info } from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link, useNavigate } from "react-router-dom"

import bglogin from "../../assets/bglogin.jpg"

import axios from "axios"

// import { useAuthStore } from "@/stores/useAuthStore"
import { useState } from "react"


export default function SignUp() {
    const [isSignUp, setIsSignUp] = useState(false)

    const { toast } = useToast()
    // const { setUser } = useAuthStore()
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
        try {
            const parsedData = FormSchema.parse(data)
            const response = await axios.post("http://localhost:3001/api/auth/signup", {
                mail: parsedData.email,
                password: parsedData.password,
            }, {
                withCredentials: true
            })
            toast({
                variant: "success",
                title: "signIn successfully",
            })
            setIsSignUp(true)
            // setTimeout(() => {
            //     setUser(response.data.user)
            // }, 3000)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Somethings went wrong:",
                description: error.response.data.error,
            })
        }
    }

    return (
        !isSignUp ? <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12 h-screen">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold dark:text-white">Sign Up</h1>
                        <p className="text-balance text-gray-500 dark:text-gray-400">
                            Enter your email below to create your account
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <div className="grid gap-4">
                                <div className="grid gap-2 dark:text-white">
                                    <FormField
                                        control={form.control}
                                        name="email"
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
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex gap-2 items-center">
                                                    <FormLabel>Password</FormLabel>
                                                    <TooltipProvider>
                                                        <Tooltip delayDuration={0}>
                                                            <TooltipTrigger asChild>
                                                                <Info width={20} height={20} />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Password must be between 8 and 50 characters and must contain one uppercase letter, one lowercase letter, one number, and one special character.</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>
                                                <FormControl>
                                                    <PasswordInput autoComplete="new-password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Sign up
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Sign up with Google
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm dark:text-white">
                        Already have an account?{" "}
                        <Link to="/signin" className="underline">
                            Sign in
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
        </div> : <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12 h-screen bg-gray-100">
                <div className="flex flex-col space-y-6 items-center p-8 bg-white rounded-lg shadow-xl">
                    <h1 className="font-bold text-4xl">Vérifiez votre boîte mail.</h1>
                    <h2 className="text-lg text-gray-700">Vous avez 15 minutes pour valider votre compte.</h2>
                    <p className="text-slate-500 text-center">
                        Si vous n'avez pas reçu de mail ou que vous n'arrivez pas à valider votre compte
                    </p>
                    <Button>
                        Cliquez ici
                    </Button>
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


