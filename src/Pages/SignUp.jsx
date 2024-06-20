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
import { Link } from "react-router-dom"


export default function SignUp() {

    const { toast } = useToast()

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
            email: "",
            password: "",
        },
    })

    const onSubmit = (data) => {
        console.log(data);
        toast({
            title: "You submitted the following values:",
            description: JSON.stringify(data),
        })
    }

    return (
        <div className="container">
            <div className="h-screen flex items-center justify-center">
                <div className="bg-white rounded-xl p-10 w-2/4">
                    <div className="flex flex-col justify-center items-center py-6">
                        <h1 className="font-bold text-6xl">SignUp</h1>
                        <img src={mycryptofolio} alt="" width={190} height={150} className="brightness-0 invert-0 object-cover" />
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                            <div className="flex pt-3">
                                <Button className="w-full" type="submit">Sign Up</Button>
                            </div>
                        </form>
                    </Form>
                    <div className="flex gap-3 pt-3">
                        <span className="font-normal text-slate-500">Already have an account ?</span><Link className="font-semibold" to="/signin">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )

}


