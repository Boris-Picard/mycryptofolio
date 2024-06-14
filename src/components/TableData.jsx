import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectTriggerFolio,
} from "@/components/ui/select"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { EllipsisVertical, Plus } from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect} from "react"

import { useDeleteTransaction } from "@/stores/delete-transaction"

export default function TableData({ data }) {
    const navigate = useNavigate()

    const { transactions, addTransaction, removeTransaction } = useDeleteTransaction()


    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/transaction/${id}`)
            removeTransaction(id)
        } catch (error) {
            console.error("Error deleting transaction", error)
        }
    }

    const addTransactionPage = (coinDataName) => {
        navigate(`/name/${coinDataName}`);
    }

    const seeTransactions = (coin) => {
        let coinData = data.filter(coinId => coinId.coin._id === coin.coin._id);
        navigate(`/detailed/${coin.coin._id}`, { state: { coinData } })
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
                <span>{value.toFixed(1)} %</span>
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
                return <TableRow key={i} className="font-semibold">
                    <TableCell className="font-medium">{coin.rank}</TableCell>
                    <TableCell><div className="flex gap-2 items-center"><img src={coin.image} alt={coin.name} width={24} height={24} />{coin.name}</div></TableCell>
                    <TableCell>{coin.price} $US</TableCell>
                    <TableCell>{arrowUpOrDown(coin.price_change_24h)}</TableCell>
                    <TableCell>{coin.market_cap} $US</TableCell>
                    <TableCell>{coin.ath} $US</TableCell>
                    <TableCell>
                        <div className="flex flex-col">
                            {coin.actualValue?.toFixed(2)} $US<span className="uppercase text-slate-500 font-normal">{coin.quantity} {coin.symbol}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex flex-col">
                            {coin.actualPrice?.toFixed(2)} $US
                            <span>{arrowUpOrDown(coin.gainOrLossPercentage)}</span>
                        </div>
                    </TableCell>
                    <TableCell className="flex gap-3">
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger><Plus onClick={() => addTransactionPage(coin.coin.name)} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Ajouter une transaction</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Select>
                            <SelectTriggerFolio>
                                <TooltipProvider>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger><EllipsisVertical className="w-5 h-5 cursor-pointer" /></TooltipTrigger>
                                        <TooltipContent>
                                            <p>Plus d'actions</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </SelectTriggerFolio>
                            <SelectContent className="p-1">
                                <SelectGroup className="font-semibold">
                                    <div className="p-4 cursor-pointer relative flex w-full  select-none items-center rounded-sm pl-8 pr-2 text-sm outline-none hover:bg-slate-100  focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50" onClick={() => deleteTransaction(coin.coin._id)}>
                                        Supprimer la monnaie
                                    </div>
                                    <div className="p-4 cursor-pointer relative flex w-full  select-none items-center rounded-sm pl-8 pr-2 text-sm outline-none hover:bg-slate-100  focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50" onClick={() => seeTransactions(coin)}>
                                        Voir les transactions
                                    </div>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </TableCell>
                </TableRow>
            })}
        </>
    )
}