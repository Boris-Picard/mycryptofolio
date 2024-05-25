import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import listData from "../data/list.json"

import Steps from "./ui/steps"

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
import { useState } from "react"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function FormTemplate() {

    const [steps, setSteps] = useState(1)
    const [dataStep, setDataStep] = useState([])


    const list = listData;
    const parsedlist = JSON.parse(JSON.stringify(list));

    // Validation schema for the first form step
    const FormSchemaFirstStep = z.object({
        coins: z
            .string({
                required_error: "Please select a valid coin.",
            }).min(1, {
                message: "Please select a coin"
            }),
    });

    // Validation schema for the second form step
    const FormSchemaSecondStep = z.object({
        quantity: z.coerce.number({
            message: "Please enter a number"
        }).min(1, { message: "Please enter at least one number" }),
        price: z.coerce.number({
            message: "Please enter a number"
        }).min(1, { message: "Please enter at least one number" }),
        spent: z.coerce.number({
            message: "Please enter a number"
        }).min(1, { message: "Please enter at least one number" }),
        date: z.date().refine(date => date <= new Date(), "Please enter a valid date")
    });

    // Hook form instance for the first step with validation resolver
    const firstForm = useForm({
        resolver: zodResolver(FormSchemaFirstStep),
        defaultValues: {
            coins: "",
        }
    });

    // Hook form instance for the second step with validation resolver
    const secondForm = useForm({
        resolver: zodResolver(FormSchemaSecondStep),
        defaultValues: {
            quantity: 0,
            price: 0,
            spent: 0,
            date: new Date()
        }
    });

    // Handle submission for the first step
    const handleFirstStepSubmit = (data) => {
        try {
            // Validate the data according to the schema
            const parsedData = FormSchemaFirstStep.parse(data);
            // Proceed to the next step
            setSteps(steps + 1);
            // Store the parsed data
            setDataStep((prev) => ({ ...prev, step1: parsedData }));
        } catch (error) {
            console.log("Form data is invalid", error.message);
        }
    };

    // Handle submission for the second step
    const handleSecondStepSubmit = (data) => {
        try {
            // Validate the data according to the schema
            const parsedData = FormSchemaSecondStep.parse(data);
            // Store the parsed data
            setDataStep((prev) => ({ ...prev, step2: parsedData }));
        } catch (error) {
            console.log("Form data is invalid", error.message);
        }
    };


    console.log(dataStep);
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
                <Steps steps={steps} />
                <Form {...(steps === 1 ? firstForm : secondForm)} >
                    <form onSubmit={steps === 1 ? firstForm.handleSubmit(handleFirstStepSubmit) : secondForm.handleSubmit(handleSecondStepSubmit)} className="space-y-4 w-full">
                        {steps === 1 &&
                            <>
                                <FormField
                                    control={firstForm.control}
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
                            </>}
                        {steps === 2 &&
                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-1">
                                    <FormField
                                        control={secondForm.control}
                                        name="quantity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quantité</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="1.00" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <FormField
                                        control={secondForm.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prix par monnaie</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="1.00" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <FormField
                                        control={secondForm.control}
                                        name="spent"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total dépensé</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <FormField
                                        control={secondForm.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[240px] pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button variant="outline" type="button" onClick={() => setSteps(steps - 1)}>Revenir en arrière</Button>
                                <Button type="submit">Ajouter une transaction</Button>
                            </div>
                        }
                    </form>
                </Form >
            </div>
        </div >
    )
}

