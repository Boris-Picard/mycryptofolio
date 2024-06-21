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

import { useNavigate } from "react-router-dom";

import { useDeleteDetailedTransaction } from "@/stores/detailed-transactions.js";

export default function TableDetailed() {
    const { transactions, removeTransaction } = useDeleteDetailedTransaction()
    const navigate = useNavigate()
    const updateTransaction = async (id) => {
        navigate(`/id/${id}`)
    }

    const deleteTransaction = async (id) => {
        try {
            if (id) {
                await axios.delete(`http://localhost:3001/api/transaction/id/delete/${id}`)
                removeTransaction(id)
                if (transactions.length === 1) {
                    navigate("/seecoins");
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const UpOrDown = (value) => {
        if (!value) {
            return null
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        const formattedValue = direction === "down"
            ? `-$${Math.abs(value).toLocaleString()}`
            : `+$${value.toLocaleString()}`;
        return (
            <span className={`font-semibold ${direction === "down" ? "text-red-500" : "text-green-500"}`}>{formattedValue}</span>
        );
    };

    return (
        <>
            {transactions.map((coin, i) => {
                return <TableRow key={i} className="font-semibold h-20">
                    <TableCell className="font-medium">${coin.currentPrice?.toLocaleString()}</TableCell>
                    <TableCell>
                        <span>{coin.quantity?.toLocaleString()}</span> <span className="uppercase font-semibold text-slate-500">{coin.symbol}</span>
                    </TableCell>
                    <TableCell>{new Date(coin.date).toLocaleDateString()}</TableCell>
                    <TableCell>${coin.spent?.toLocaleString()}</TableCell>
                    <TableCell>${coin.price}</TableCell>
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