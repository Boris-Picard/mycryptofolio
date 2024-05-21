import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

export default function FormTemplate() {

    const FormSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        lastname: z.string().min(2, {
            message: "lastname must be at least 2 characters.",
        }),
        password: z.string().refine(value => value.length >= 8, {
            message: "Password must be at least 8 characters long",
        }),
    })

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            lastname: "",
            password: "",
        }
    })

    const onSubmit = (data) => {
        try {
            FormSchema.parse(data);
            console.log("Form data is valid");
            console.log(data);
        } catch (error) {
            console.log("Form data is invalid", error.message);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex w-1/2 flex-col justify-center items-center shadow-lg p-6 rounded-md bg-slate-200">
                <div className="flex flex-col space-y-3 items-center">
                    <h1 className="font-bold text-5xl">
                        Welcome
                    </h1>
                    <h2 className="font-bold text-3xl">
                        Sign in
                    </h2>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <div className="grid grid-cols-2 gap-6 my-3">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Boris" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>lastname</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Picard" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="col-span-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Picard" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form >
            </div>
        </div>
    )
}

