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
        coin: z.string().min(2, {
            message: "Coin must be at least 2 characters.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            coin: "",
        }
    })

    const onSubmit = (data) => {
        try {
            FormSchema.parse(data);
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
                        Add a coin
                    </h2>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <FormField
                            control={form.control}
                            name="coin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Coin</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Bitcoin" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Next Step</Button>
                    </form>
                </Form >
            </div>
        </div>
    )
}

