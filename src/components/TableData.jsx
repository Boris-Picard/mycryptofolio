import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

import axios from "axios"
import { useNavigate } from "react-router-dom"
import { EllipsisVertical, Plus } from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { useDeleteTransaction } from "@/stores/delete-transaction"

export default function TableData({ data }) {
    const navigate = useNavigate()

    const { transactions, addTransaction, removeTransaction } = useDeleteTransaction()

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/transaction/${id}`, {
                withCredentials: true
            })
            removeTransaction(id)
        } catch (error) {
            console.error("Error deleting transaction", error)
        }
    }
    const addTransactionPage = (coinDataName) => {
        navigate(`/name/${coinDataName}`);
    }

    const seeTransactions = async (coin) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/coin/detailed/${coin.coin._id}`, {
                withCredentials: true,
            })
            if (response.status !== 200) {
                navigate("/")
            }
            const [coinResponse] = response.data

            let coinData = data.filter(coinId => coinId.coin._id === coinResponse._id)
            navigate(`/detailed/${coinResponse._id}`, { state: { coinData } })
        } catch (error) {
            console.log(error);
        }
    }

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
                <span>{value.toLocaleString()} %</span>
            </div>
        );
    };

    useEffect(() => {
        // Utilisation de reduce pour agréger les données par coin._id
        const aggregated = data.reduce((acc, curr) => {
            const coinId = curr.coin._id; // Récupération de l'ID du coin actuel
            // Si l'ID du coin n'existe pas encore dans l'accumulateur, initialiser avec les valeurs de curr
            if (!acc[coinId]) {
                acc[coinId] = {
                    ...curr,
                };
            } else {
                // Si l'ID du coin existe déjà, additionner les valeurs pertinentes
                acc[coinId] = {
                    ...acc[coinId],
                    quantity: acc[coinId].quantity + curr.quantity,
                    spent: acc[coinId].spent + curr.spent,
                    actualPrice: acc[coinId].actualPrice + curr.actualPrice,
                    actualValue: acc[coinId].actualValue + curr.actualValue,
                    gainOrLossPercentage: acc[coinId].gainOrLossPercentage + curr.gainOrLossPercentage,
                };
            }
            return acc; // Retourner l'accumulateur pour la prochaine itération
        }, {});
        // Mettre à jour l'état aggregatedData avec les valeurs agrégées
        addTransaction(Object.values(aggregated))
    }, [data, addTransaction]); // Exécuter l'effet à chaque fois que data change

    return (
        <>
            {transactions.map((coin, i) => {
                return <TableRow key={i} className="font-medium h-20">
                    <TableCell>{coin.rank}</TableCell>
                    <TableCell><div className="flex gap-2 items-center"><img src={coin.image} alt={coin.name} width={34} height={34} className="aspect-square rounded-md object-cover" />{coin.name}</div></TableCell>
                    <TableCell>${coin.currentPrice?.toLocaleString()}</TableCell>
                    <TableCell>{arrowUpOrDown(coin.price_change_24h)}</TableCell>
                    <TableCell>${coin.market_cap?.toLocaleString()}</TableCell>
                    <TableCell>${coin.ath?.toLocaleString()}</TableCell>
                    <TableCell>
                        <div className="flex flex-col">
                            ${coin.actualValue?.toLocaleString()}<span className="uppercase text-slate-500 font-normal">{coin.quantity?.toLocaleString()} {coin.symbol}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex flex-col">
                            {coin.actualPrice?.toString().startsWith("-")
                                ? `-$${Math.abs(coin?.actualPrice).toLocaleString()}`
                                : `+$${coin.actualPrice?.toLocaleString()}`}
                            <span>{arrowUpOrDown(coin.gainOrLossPercentage)}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-3 items-center">
                            <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <div className="cursor-pointer" onClick={() => addTransactionPage(coin.coin.name)} > <Plus /></div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Ajouter une transaction</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <TooltipProvider>
                                        <Tooltip delayDuration={0}>
                                            <TooltipTrigger asChild>
                                                <div className="cursor-pointer">
                                                    <EllipsisVertical />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Plus d'actions</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <div className="font-semibold p-4 cursor-pointer relative flex w-full  select-none items-center rounded-sm pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50" onClick={() => deleteTransaction(coin.coin._id)}>
                                            Supprimer la monnaie
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="font-semibold p-4 cursor-pointer relative flex w-full  select-none items-center rounded-sm pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50" onClick={() => seeTransactions(coin)}>
                                            Voir les transactions
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </TableCell>
                </TableRow>
            })}
        </>
    )
}
