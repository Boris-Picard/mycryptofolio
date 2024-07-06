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

import axios from "axios"
import { useNavigate } from "react-router-dom"

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
                const response = await axios.get(`http://localhost:3001/api/coin/detailed/${coinResponse.coin._id}`, {
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
                <svg fill="currentColor" className="w-8 h-8" viewBox="0 0 24 24">
                    <path
                        d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
                    />
                </svg>
                <span>{value.toFixed(1)} %</span>
            </div>
        );
    };

    return (<div className="container md:p-10">
        <div className="flex mb-3 gap-3 items-center dark:text-white">
            <img src={data.image} alt={data.name} width={24} height={24} /><h1 className=" capitalize text-2xl font-semibold">{data.name}</h1><span className="text-slate-500 font-semibold uppercase self-end">{data.symbol}</span>
        </div>
        <div className="flex mb-5 dark:text-white">
            <h2 className="text-3xl font-semibold">${data.actual_price}</h2>{arrowUpOrDown(data.price_change_24h)}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 grid-cols-1 mb-3 gap-3">
            <CardsDetailed />
        </div>
        <div>
            <Table>
                <TableCaption>A list of your recent trades</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cours</TableHead>
                        <TableHead>Quantité</TableHead>
                        <TableHead>Date & Heure</TableHead>
                        <TableHead>Coût</TableHead>
                        <TableHead>Prix par coin</TableHead>
                        <TableHead >Pertes et profits</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    <TableDetailed />
                </TableBody>
            </Table>
        </div>
    </div>)
}