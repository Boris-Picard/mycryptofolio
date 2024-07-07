import TableDetailed from "@/components/TableDetailed"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import { useLocation } from "react-router-dom"

import CardsDetailed from "@/components/CardsDetailed"
import { useEffect, useState } from "react"

import { useDeleteDetailedTransaction } from "@/stores/detailed-transactions.js";

import axios from "axios"
import { useNavigate } from "react-router-dom"

import CsvButton from "@/components/CsvButton"

export default function Detailed() {
    const location = useLocation()
    const { coinData } = location.state
    const navigate = useNavigate()
    const { transactions, setTransactions } = useDeleteDetailedTransaction()

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const [coinResponse] = coinData
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/api/coin/detailed/${coinResponse.coin._id}`, {
                    withCredentials: true,
                })
                if (response.status !== 200) {
                    navigate("/")
                } else {
                    setTransactions(coinData)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCoinData()
    }, [coinData, setTransactions, navigate])

    useEffect(() => {
        transactions.map(value => setData({ image: value.image, name: value.coin.name, actual_price: value.currentPrice, price_change_24h: value.price_change_24h, symbol: value.symbol }))
    }, [transactions])

    const arrowUpOrDown = (value) => {
        if (!value) {
            return
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        return (
            <div className={`flex font-semibold items-center ${direction === "down" ? "text-red-500" : "text-green-500"}`}>
                <div className={`flex rounded-lg items-center p-1 ${direction === "up" ? "dark:bg-[#111E13] bg-[#EAF7EC]" : "dark:bg-[#241011] bg-[#FDE9EA]"}`}>
                    <svg fill="currentColor" className="w-8 h-8" viewBox="0 0 24 24">
                        <path
                            d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
                        />
                    </svg>
                    <span>{value.toFixed(1)} %</span>
                </div>
            </div>
        );
    };

    return (<div className="container min-h-full p-10">
        <div className="flex mb-3">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/portfolio">Porfolio</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="capitalize">{data.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div className="flex mb-3 gap-3 items-center dark:text-white">
            <img src={data.image} alt={data.name} width={24} height={24} /><h1 className=" capitalize text-2xl font-semibold">{data.name}</h1><span className="text-slate-500 font-semibold uppercase self-end">{data.symbol}</span>
        </div>
        <div className="flex mb-5 dark:text-white space-x-2">
            <h2 className="text-3xl font-semibold">${data.actual_price}</h2>{arrowUpOrDown(data.price_change_24h)}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 grid-cols-1 mb-3 gap-3">
            <CardsDetailed />
        </div>
        <div>
            <div className="mt-10">
                <div className="flex justify-end mb-3">
                    <CsvButton csvdata={transactions} />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Cost</TableHead>
                            <TableHead>Price per tokens</TableHead>
                            <TableHead >PNL</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        <TableDetailed />
                    </TableBody>
                </Table>
            </div>
        </div>
    </div>)
}