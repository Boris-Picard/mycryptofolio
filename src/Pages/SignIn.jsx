import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import mycryptofolio from "../../assets/mycryptofolio.png"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { PasswordInput } from "@/components/ui/password-input"

import { Info } from "lucide-react"


export default function SignIn() {

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
            .min(8, { message: "min 8" })
            .max(50, { message: "max 50" })
            .regex(passwordValidation, {
                message: 'Your password is not valid',
            })
    })

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
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
                    <div className="flex justify-center">
                        <img src={mycryptofolio} alt="" width={190} height={150} className="brightness-0 invert-0" />
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
                                            <Input placeholder="example@gmail.com" {...field} />
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        <FormDescription className="py-3">
                                            <div className="flex gap-3">
                                                <div className="text-red-500"><Info /></div> Password must be between 8 and 50 characters and must contain one uppercase letter, one lowercase letter, one number, and one special character.
                                            </div>
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full" type="submit">Create Account</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )

}


