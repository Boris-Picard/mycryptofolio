import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import listData from "../data/list.json"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function FormTemplate() {

    const list = listData;
    const parsedlist = JSON.parse(JSON.stringify(list));

    const FormSchema = z.object({
        coins: z
            .string({
                required_error: "Please select a coin.",
            }).min(1, {
                message: "Please select a coin"
            })
    })

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            coins: "",
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
                            name="coins"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Coins</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a coin" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {parsedlist.map((coin) => {
                                                return (
                                                    <SelectItem key={coin.symbol} value={coin.symbol}><div className="flex items-center"><img src={coin.logoURI} className="mr-2" width={24} height={24}></img>{coin.symbol}</div></SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select a coin and valid to go next step
                                    </FormDescription>
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

