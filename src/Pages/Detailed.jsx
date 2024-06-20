import TableDetailed from "@/components/TableDetailed"
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useLocation } from "react-router-dom"

import CardsDetailed from "@/components/CardsDetailed"
import { useEffect, useState } from "react"

import { useDeleteDetailedTransaction } from "@/stores/detailed-transactions.js";

export default function Detailed() {
    const location = useLocation()
    const { coinData } = location.state

    const { transactions, setTransactions } = useDeleteDetailedTransaction()

    const [data, setData] = useState([])
    
    useEffect(() => {
        setTransactions(coinData)
    }, [coinData, setTransactions])

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
                <svg fill="currentColor" className="w-8 h-8" viewBox="0 0 24 24">
                    <path
                        d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
                    />
                </svg>
                <span>{value.toFixed(1)} %</span>
            </div>
        );
    };
    
    return (<div className="container h-screen p-10">
        <div className="flex mb-3 gap-3 items-center">
            <img src={data.image} alt={data.name} width={24} height={24} /><h1 className="text-white capitalize text-2xl font-semibold">{data.name}</h1><span className="text-slate-500 font-semibold uppercase self-end">{data.symbol}</span>
        </div>
        <div className="flex mb-5 ">
            <h2 className="text-white text-3xl font-semibold">{data.actual_price} $US</h2>{arrowUpOrDown(data.price_change_24h)}
        </div>
        <div className="grid grid-cols-5 mb-3 gap-3">
            <CardsDetailed />
        </div>
        <Table className="bg-white rounded-xl">
            <TableCaption>A list of your recent trade</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Cours</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Date & Heure</TableHead>
                    <TableHead>Coût</TableHead>
                    <TableHead>Prix par coin</TableHead>
                    <TableHead>Pertes et profits</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableDetailed />
            </TableBody>
        </Table>
    </div>)
}