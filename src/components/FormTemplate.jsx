import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Progress } from "./ui/progress"

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
import { useState, useEffect } from "react"

import { format } from "date-fns"
import { CalendarIcon, LogIn } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useNavigate, useParams } from "react-router-dom"

import axios from "axios"
import Error from "./ui/error"

export default function FormTemplate() {

    const [steps, setSteps] = useState(1)
    const [dataStep, setDataStep] = useState([])
    const [coinId, setCoinId] = useState(null)
    const [error, setError] = useState(null)
    const [transaction, setTransaction] = useState([])
    const [selectData, setSelectData] = useState([])
    const [searchText, setSearchText] = useState("")
    const [queryData, setQueryData] = useState([])



    const navigate = useNavigate()
    const { id, name } = useParams()

    useEffect(() => {
        const fetchTransaction = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/transaction/id/${id}`);
                    setTransaction(response.data.transaction);
                    setCoinId(response.data.transaction.coin._id)
                    setSteps(2)
                } catch (error) {
                    console.error("Error fetching transaction", error);
                }
            } else if (name) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/transaction/name/${name}`);
                    setTransaction(response.data.coin[0]);
                    setCoinId(response.data.coin[0]._id)
                    setDataStep({ step1: { coin: response.data.coin[0]._id } })
                    setSteps(2)
                } catch (error) {
                    console.error("Error fetching transaction", error);
                }
            }
        };
        fetchTransaction();
    }, [id, name]);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc?x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R`)
                setSelectData(response.data)
            } catch (error) {
                console.log("Error fetching CoinGecko list :", error)
            }
        }
        fetchList()
    }, [])

    // Validation schema for the first form step
    const FormSchemaFirstStep = z.object({
        coin: z
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
        }).min(0.0000000001, { message: "Please enter at least one number" }),
        price: z.coerce.number({
            message: "Please enter a number"
        }).min(0.0000000001, { message: "Please enter at least one number" }),
        spent: z.coerce.number({
            message: "Please enter a number"
        }).min(0.0000000001, { message: "Please enter at least one number" }),
        date: z.coerce.date().refine(date => date <= new Date(), "Please enter a valid date")
    });

    // Hook form instance for the first step with validation resolver
    const firstForm = useForm({
        resolver: zodResolver(FormSchemaFirstStep),
        defaultValues: {
            coin: "",
        }
    });

    useEffect(() => {
        try {
            if (id) {
                firstForm.setValue('coin', transaction.coin.name);
            }
            if (name) {
                firstForm.setValue('coin', transaction.name)
            }
        } catch (error) {
            console.log(error);
        }

    }, [transaction, firstForm, name, id]);

    // Hook form instance for the second step with validation resolver
    const secondForm = useForm({
        resolver: zodResolver(FormSchemaSecondStep),
        defaultValues: {
            quantity: 0,
            price: 0,
            spent: 0,
            date: new Date(),
        }
    });

    useEffect(() => {
        if (id) {
            secondForm.setValue('quantity', transaction.quantity);
            secondForm.setValue('price', transaction.price);
            secondForm.setValue('spent', transaction.spent);
            secondForm.setValue('date', transaction.date);
        }
        if (name) {
            secondForm.setValue('date', new Date());
        }
    }, [transaction, secondForm, name, id]);

    // Handle submission for the first step
    const handleFirstStepSubmit = async (data) => {
        console.log(data);
        try {
            // Validate the data according to the schema
            const parsedData = FormSchemaFirstStep.parse(data);
            // Store the parsed data
            setDataStep((prev) => ({ ...prev, step1: parsedData }));
            let response;
            if (id && transaction && transaction.coin.name) {
                response = await axios.put(`http://localhost:3001/api/coin/${transaction.coin._id}`, {
                    name: parsedData.coin
                })
            } else {
                response = await axios.post("http://localhost:3001/api/coin", {
                    name: parsedData.coin,
                })
            }
            setCoinId(response.data._id)
            // Proceed to the next step
            setSteps(2);
        } catch (error) {
            setError(error.response.data.error)
            console.log("Form data is invalid", error.message);
        }
    };

    // Handle submission for the second step
    const handleSecondStepSubmit = async (data) => {
        console.log(data);
        try {
            const parsedData = FormSchemaSecondStep.parse(data);
            setDataStep((prev) => ({ ...prev, step2: parsedData }));
            if (id) {
                await axios.put(`http://localhost:3001/api/transaction/id/${transaction._id}`, {
                    quantity: parsedData.quantity,
                    price: parsedData.price,
                    spent: parsedData.spent,
                    date: parsedData.date,
                })
            } else if (name) {
                await axios.post(`http://localhost:3001/api/transaction/name/${transaction.name}`, {
                    quantity: parsedData.quantity,
                    price: parsedData.price,
                    spent: parsedData.spent,
                    date: parsedData.date,
                    coinId: coinId,
                })
            } else {
                await axios.post("http://localhost:3001/api/coin/transaction", {
                    coinId: coinId,
                    transactionData: {
                        quantity: parsedData.quantity,
                        price: parsedData.price,
                        spent: parsedData.spent,
                        date: parsedData.date,
                    },
                });
            }
            setSteps(3);
            setTimeout(() => {
                navigate('/seecoins');
            }, 4000);
        } catch (error) {
            setError(error.response.data.error)
            console.log("Form data is invalid", error.message);
        }
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        if (searchText === "") {
            return true;
        }
    }

    useEffect(() => {
        const getQuery = async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${searchText}&x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R`)
                setQueryData(response.data.coins);
            } catch (error) {
                console.log(error);
            }
        }
        getQuery()
    }, [searchText])

    const arrowUpOrDown = (value) => {
        if (!value) {
            return
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        return (
            <div className={`flex ${direction === "down" ? "text-red-500" : "text-green-500"}`}>
                <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
                    />
                </svg>
                <span>{value.toFixed(1)} %</span>
            </div>
        );
    };

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex w-full md:w-1/2 flex-col justify-center items-center shadow-lg p-6 rounded-md bg-slate-200">
                <div className="flex flex-col space-y-3 items-center">
                    <h1 className="font-bold text-5xl">
                        Welcome.
                    </h1>
                    <h2 className="font-bold text-3xl">
                        Add a coin
                    </h2>
                </div>
                <div className="my-5 w-full">
                    <Progress value={steps === 1 ? 0 : steps === 2 ? 50 : steps === 3 ? 100 : ""} />
                </div>
                <Form {...(steps === 1 ? firstForm : secondForm)} >
                    <form onSubmit={steps === 1 ? firstForm.handleSubmit(handleFirstStepSubmit) : secondForm.handleSubmit(handleSecondStepSubmit)} className="space-y-4 w-full">
                        {steps === 1 &&
                            <>
                                <Error message={error} />
                                <FormField
                                    control={firstForm.control}
                                    name="coin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Coins</FormLabel>
                                            <Select onValueChange={value => {
                                                field.onChange(value);
                                            }} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a coin" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <div className="flex p-4">
                                                        <Input placeholder="Rechercher un token (CoinGecko data)" value={searchText} onChange={handleSearch} />
                                                    </div>
                                                    <div className="flex pl-8 py-3 font-normal text-slate-500">
                                                        {queryData.length > 0 ? "Searched tokens" : "Top 100 Tokens"}
                                                    </div>
                                                    {queryData.length > 0 ?
                                                        queryData.map((coin) => (
                                                            <SelectItem key={coin.api_symbol} value={coin.id}>
                                                                <div className="flex items-center">
                                                                    <span className="mr-3 font-semibold">{coin.market_cap_rank}</span>
                                                                    <img src={coin.thumb} className="mr-2" width={24} height={24} />
                                                                    <div className="flex gap-2">
                                                                        <span className="font-semibold">{coin.name}</span>
                                                                        <span className="uppercase font-normal text-slate-500">{coin.symbol}</span>
                                                                    </div>
                                                                </div>
                                                            </SelectItem>
                                                        )) :
                                                        selectData.map((coin) => (
                                                            <SelectItem key={coin.symbol} value={coin.id}>
                                                                <div className="flex items-center">
                                                                    <span className="mr-3 font-semibold">{coin.market_cap_rank}</span>
                                                                    <img src={coin.image} className="mr-2" width={24} height={24} />
                                                                    <div className="flex gap-2">
                                                                        <span className="font-semibold">{coin.name}</span>
                                                                        <span className="uppercase font-normal text-slate-500">{coin.symbol}</span>
                                                                        {arrowUpOrDown(coin.price_change_percentage_24h)}
                                                                    </div>
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                Select a coin and valid to go next step
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">Next Step</Button>
                            </>}
                        {steps >= 2 &&
                            <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-1">
                                    <Error message={error} />
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
                                                            required
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
                                <div className="md:col-span-1 col-span-2">
                                    {steps === 2 && !id && !name ? <Button variant="outline" type="button" onClick={() => setSteps(steps - 1)} disabled={steps === 3} className="w-full">Revenir en arrière</Button> : ""}
                                </div>
                                <div className={`${steps === 2 && !id && !name ? "md:col-span-1 col-span-2" : "md:col-span-2 col-span-2"}`}>
                                    {steps === 2 &&
                                        <Button type="submit" className="w-full">
                                            {id ? "Modifier la transaction" : "Ajouter une transaction"}
                                        </Button>}
                                    {steps === 3 && <Button type="submit" disabled={true} className="w-full">
                                        <svg className="animate-spin h-5 w-5 mr-3 border-gray-200 border-2 border-t-blue-600 rounded-full" viewBox="0 0 24 24">
                                        </svg>
                                        Loading...
                                    </Button>}
                                </div>
                            </div>
                        }
                    </form>
                </Form >
            </div>
        </div >
    )
}

