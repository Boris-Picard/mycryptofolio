import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { SquarePen, Trash2 } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";

import { useDeleteDetailedTransaction } from "@/stores/detailed-transactions.js";
import { useEffect } from "react";

export default function TableDetailed() {
    const location = useLocation()
    const { coinData } = location.state // Récupère les données du coin passées via navigate

    const { transactions, removeTransaction, setTransactions } = useDeleteDetailedTransaction()
    const navigate = useNavigate()

    useEffect(() => {
        setTransactions(coinData)
    }, [coinData, setTransactions])
    
    const updateTransaction = async (id) => {
        navigate(`/id/${id}`)
    }

    const deleteTransaction = async (id) => {
        try {
            if (id) {
                await axios.delete(`http://localhost:3001/api/transaction/id/delete/${id}`)
                removeTransaction(id)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const UpOrDown = (value) => {
        if (!value) {
            return
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        return (
            <span className={`font-semibold ${direction === "down" ? "text-red-500" : "text-green-500"}`}>{direction === "down" ? "-" : "+"}{value.toFixed(2)} $US</span>
        );
    };

    return (
        <>
            {transactions.map((coin, i) => {
                return <TableRow key={i} className="font-semibold">
                    <TableCell className="font-medium">{coin.price} $US</TableCell>
                    <TableCell>
                        <span>{coin.quantity}</span> <span className="uppercase font-semibold text-slate-500">{coin.symbol}</span>
                    </TableCell>
                    <TableCell>{new Date(coin.date).toLocaleDateString()}</TableCell>
                    <TableCell>{coin.spent} $US</TableCell>
                    <TableCell>{UpOrDown(coin.actualPrice)}</TableCell>
                    <TableCell>
                        <div className="flex gap-3">
                            <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger><SquarePen className="w-5 h-5 cursor-pointer" onClick={() => updateTransaction(coin._id)} /></TooltipTrigger>
                                    <TooltipContent>
                                        <p>Modifier la transaction</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger><Trash2 className="w-5 h-5 cursor-pointer" onClick={() => deleteTransaction(coin._id)} /></TooltipTrigger>
                                    <TooltipContent>
                                        <p>Supprimer la transaction</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </TableCell>
                </TableRow>
            })}
        </>
    )
}