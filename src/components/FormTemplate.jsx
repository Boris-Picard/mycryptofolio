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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
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

import Loading from "./Loading"

import { MultiStepMotion } from "@/components/ui/multi-steps-motions";
import { useToast } from "./ui/use-toast"

import useFetchCoins from "@/hooks/useFetchCoins"

import TransactionService from "@/services/TransactionService"

export default function FormTemplate() {

    const [steps, setSteps] = useState(1)
    const [dataStep, setDataStep] = useState([])
    const [coinId, setCoinId] = useState(null)
    const [error, setError] = useState(null)
    const [transaction, setTransaction] = useState([])
    const [searchText, setSearchText] = useState("")
    const [queryData, setQueryData] = useState([])
    const [quantityPriceValue, setQuantityPriceValue] = useState([{ quantity: 0, price: 0 }])
    const [coinNameImage, setCoinNameImage] = useState([])

    const navigate = useNavigate()
    const { id, name } = useParams()
    const { toast } = useToast()

    const { data: data, error: errorList } = useFetchCoins()

    const transactionService = new TransactionService()

    useEffect(() => {
        const fetchTransaction = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/api/transaction/id/${id}`, {
                        withCredentials: true,
                    });
                    setTransaction(response.data.transaction);
                    setCoinId(response.data.transaction.coin._id)
                    setSteps(2)
                } catch (error) {
                    console.error("Error fetching transaction", error);
                }
            } else if (name) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/api/transaction/name/${name}`, {
                        withCredentials: true,
                    });
                    setTransaction(response.data.coin[0]);
                    setCoinId(response.data.coin[0]._id)
                    setDataStep({ step1: { coin: response.data.coin[0]._id } })
                    setSteps(2)
                } catch (error) {
                    console.error("Error fetching transaction", error);
                    toast({
                        variant: "destructive",
                        title: error?.message,
                        description: error?.response?.data?.error,
                    })
                }
            }
        };
        fetchTransaction();
    }, [id, name]);

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
            if (id !== undefined) {
                firstForm.setValue('coin', transaction.coin.name);
            }
            else if (name !== undefined) {
                firstForm.setValue('coin', transaction.name)
            } else {
                return
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
        try {
            // Validate the data according to the schema
            const parsedData = FormSchemaFirstStep.parse(data);
            // Store the parsed data
            setDataStep((prev) => ({ ...prev, step1: parsedData }));
            let response
            if (id && transaction && transaction.coin.name) {
                response = await axios.put(`${import.meta.env.VITE_API_SERVER}/api/coin/${transaction.coin._id}`, {
                    name: parsedData.coin
                }, {
                    withCredentials: true,
                })
                setCoinId(response.data._id)
            }
            setSteps(2);
        } catch (error) {
            setError(error.response.data.error)
            toast({
                variant: "destructive",
                title: error?.message,
                description: error?.response?.data?.error,
            })
        }
    };

    // Handle submission for the second step
    const handleSecondStepSubmit = async (data) => {
        try {
            const parsedData = FormSchemaSecondStep.parse(data);
            setDataStep((prev) => ({ ...prev, step2: parsedData }));
            if (id) {
                await axios.put(`${import.meta.env.VITE_API_SERVER}/api/transaction/id/${transaction._id}`, {
                    quantity: parsedData.quantity,
                    price: parsedData.price,
                    spent: parsedData.spent,
                    date: parsedData.date,
                }, {
                    withCredentials: true,
                })
            } else if (name) {
                transactionService.createTransactionName(transaction.name, coinId, parsedData)
            } else {
                transactionService.createCoin(dataStep.step1.coin, parsedData)
            }

            if (id) {
                toast({
                    variant: "success",
                    title: "Transaction updated successfully",
                })
            } else {
                toast({
                    variant: "success",
                    title: "Added transaction successfully",
                })
            }

            setTimeout(() => {
                navigate('/portfolio');
            }, 2000);

            setSteps(3);
        } catch (error) {

            toast({
                variant: "destructive",
                title: error?.message,
                description: error?.response?.data?.message,
            })

            setError(error.response.data.error)
        }
    };


    useEffect(() => {
        if (id || name) {
            setQuantityPriceValue({ quantity: transaction.quantity, price: transaction.price })
            const totalSpentValue = quantityPriceValue.quantity * quantityPriceValue.price
            secondForm.setValue('spent', totalSpentValue);
        }
    }, [transaction, id, name, secondForm])


    // permet de récuperer le prix actuel du coin 
    const getPriceCoin = async () => {
        const coinName = transaction?.name || transaction?.coin?.name || dataStep?.step1?.coin;
        if (!coinName) {
            console.log('No coin name provided.');
            return
        }
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinName}?x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`)
            const price = response.data.market_data.current_price.usd
            secondForm.setValue('price', price)
            setQuantityPriceValue((prev) => ({ ...prev, price: price }))
        } catch (error) {
            toast({
                variant: "destructive",
                title: error?.message,
                description: error?.response?.data?.message,
            })
        }
    }

    // fonction qui permet d'avoir le nom du coin et son image quand on passe au step 2
    useEffect(() => {
        const getCoinNameImage = async () => {
            const coinName = transaction?.name || transaction.coin?.name || dataStep?.step1?.coin;
            if (!coinName) {
                return
            }
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinName}?x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`)
                const nameData = response.data.name
                const imageData = response.data.image.small
                setCoinNameImage({ name: nameData, image: imageData })
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: error?.message,
                    description: error?.response?.data?.message,
                })
            }
        }
        getCoinNameImage()
    }, [transaction?.name, transaction?.coin?.name, dataStep?.step1?.coin])

    useEffect(() => {
        if (quantityPriceValue) {
            const totalSpentValue = quantityPriceValue.quantity * quantityPriceValue.price
            secondForm.setValue('spent', totalSpentValue);
        }
    }, [quantityPriceValue, secondForm]);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        if (searchText === "") {
            return true;
        }
    }

    useEffect(() => {
        const getQuery = async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${searchText}&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`)
                setQueryData(response.data.coins);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: error?.message,
                    description: error?.response?.data?.message,
                })
            }
        }
        getQuery()
    }, [searchText])

    const handleGoBack = () => {
        navigate(-1);
    };

    const arrowUpOrDown = (value) => {
        if (!value) {
            return
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        return (
            <div className={`flex ${direction === "down" ? "text-red-500" : "text-green-500"}`}>
                <div className={`flex rounded-lg items-center p-1 ${direction === "up" ? "dark:bg-[#111E13] bg-[#EAF7EC]" : "dark:bg-[#241011] bg-[#FDE9EA]"}`}>
                    <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
                        />
                    </svg>
                    <span>{value.toLocaleString()} %</span>
                </div>
            </div>
        );
    };

    if (errorList) {
        return <div>Error fetching data: {error.message}</div>;
    }

    return (<>
        <div className="flex h-full  items-center justify-center">
            <div className="flex w-full md:w-1/2 flex-col justify-center items-center shadow-lg p-6 rounded-xl dark:bg-zinc-900 dark:text-white bg-slate-50 border-slate-200 dark:border-slate-800 border">
                <div className="flex flex-col space-y-3 items-center">
                    {steps === 1 ? <><h1 className="font-bold text-5xl"> Welcome.</h1> <h2 className="font-bold text-3xl">
                        Select a Coin
                    </h2></> : ""}
                    {name ? <h2 className="font-bold text-5xl">Add transaction </h2> : id ? <h2 className="font-bold text-5xl">Edit transaction </h2> : ""}
                    {steps === 2 ? <div className="flex gap-2 w-full justify-center py-6">
                        <img src={coinNameImage.image} alt={coinNameImage.name} width={54} height={54} className="object-contain" />
                        <span className="font-bold text-5xl">{coinNameImage.name}</span>
                    </div> : ""}
                    {steps === 3 ? <Loading page={"form"} /> : ""}
                    <div className="p-6 flex space-x-10">
                        <MultiStepMotion step={1} currentStep={steps} />
                        <MultiStepMotion step={2} currentStep={steps} />
                    </div>
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
                                                        <Input placeholder="Search a token (CoinGecko data)" value={searchText} onChange={handleSearch} />
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
                                                        data.map((coin) => (
                                                            <SelectItem key={coin.symbol} value={coin.id}>
                                                                <div className="flex items-center">
                                                                    <span className="mr-3 font-semibold">{coin.market_cap_rank}</span>
                                                                    <img src={coin.image} className="mr-2" width={24} height={24} />
                                                                    <div className="flex gap-2 items-center">
                                                                        <span className="font-bold">{coin.name}</span>
                                                                        <span className="uppercase font-normal text-slate-500">{coin.symbol}</span>
                                                                        <span className="font-semibold">${coin.current_price.toLocaleString()}</span>
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
                                                <FormLabel>Quantity</FormLabel>
                                                <FormControl>
                                                    <Input disabled={steps === 3 ? true : false} onInput={(e) => setQuantityPriceValue((prev) => ({ ...prev, quantity: e.target.value }))} type="number" placeholder="1.00" {...field} />
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
                                                <div className="flex justify-between items-center">
                                                    <FormLabel>Price per coin</FormLabel>
                                                    <span onClick={getPriceCoin} className="underline cursor-pointer">Utiliser marché</span>
                                                </div>
                                                <FormControl>
                                                    <Input disabled={steps === 3 ? true : false} onInput={(e) => setQuantityPriceValue((prev) => ({ ...prev, price: e.target.value }))} type="number" placeholder="1.00" {...field} />
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
                                                <FormLabel>Total spent</FormLabel>
                                                <FormControl>
                                                    <Input disabled={steps === 3 ? true : false} type="number" placeholder="1.00" {...field} />
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
                                                                disabled={steps === 3 ? true : false}
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
                                    {steps === 2 && !id && !name ? <Button variant="outline" type="button" onClick={() => setSteps(steps - 1)} disabled={steps === 3} className="w-full">Back</Button> : ""}
                                    {steps === 2 && name ? <Button variant="outline" type="button" onClick={handleGoBack} disabled={steps === 3} className="w-full">Back</Button> : ""}
                                    {steps === 2 && id ? <Button variant="outline" type="button" onClick={handleGoBack} disabled={steps === 3} className="w-full">Back</Button> : ""}
                                </div>
                                <div className={`${steps === 2 && !id && !name ? "md:col-span-1 col-span-2" : "md:col-span-1 col-span-2"}`}>
                                    {steps === 2 &&
                                        <Button type="submit" className="w-full">
                                            Save
                                        </Button>}
                                </div>
                                <div className="col-span-2">
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
    </>
    )
}

