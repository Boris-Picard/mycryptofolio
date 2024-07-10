import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"

import { useDeleteTransaction } from "@/stores/delete-transaction";

import { DollarSign } from "lucide-react"

export default function CardsData() {
    const [totalInvested, setTotalInvested] = useState(0);
    const [totalGain, setTotalGain] = useState(0)
    const [maxTransaction, setMaxTransaction] = useState(0)
    const [bestWinnerValue, setBestWinnerValue] = useState(0)
    const [totalWinOrLoss, setTotalWinOrLoss] = useState(0)
    const [valueInDollars, setValueInDollars] = useState(0)
    const [valueInPercent, setValueInPercent] = useState(0)

    const { transactions } = useDeleteTransaction()
    useEffect(() => {
        const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.actualValue, 0)
        const totalWinOrLoss = transactions.reduce((acc, transaction) => acc + transaction.actualPrice, 0)
        const totalPercentWinOrLoss = transactions.reduce((acc, transaction) => acc + transaction.gainOrLossPercentage, 0)
        const percentageWinOrLoss = transactions.reduce((max, transaction) => transaction.gainOrLossPercentage > max.gainOrLossPercentage ? transaction : max, transactions[0])
        const priceChange24h = transactions.reduce((acc, transaction) => acc + transaction.price_change_24h, 0)
        const totalQuantity = transactions.reduce((acc, transaction) => acc + transaction.quantity, 0)

        const actualPricePerCoin = totalAmount / totalQuantity;
        // Calcul du prix il y a 24 heures
        const price24hAgo = actualPricePerCoin / (1 + priceChange24h / 100);
        
        // Calcul de la valeur du portefeuille il y a 24 heures
        const value24hAgo = totalQuantity * price24hAgo;
        
        // Calcul de la différence en dollars
        const differenceInDollars = totalAmount - value24hAgo;

        // Calcul de la fluctuation en pourcentage
        const fluctuationPercentage = ((totalAmount - value24hAgo) / value24hAgo) * 100;

        if (percentageWinOrLoss) {
            const bestWinner = percentageWinOrLoss.actualValue - percentageWinOrLoss.spent
            setBestWinnerValue(bestWinner)
        }
        setTotalInvested(totalAmount)
        setTotalGain(totalWinOrLoss)
        setMaxTransaction(percentageWinOrLoss)
        setTotalWinOrLoss(totalPercentWinOrLoss)

        setValueInDollars(differenceInDollars)
        setValueInPercent(fluctuationPercentage)
    }, [transactions])

    const UpOrDown = (value) => {
        if (!value) {
            return
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        const formattedValue = direction === "down"
            ? `-$${Math.abs(value).toLocaleString()}`
            : `+$${value.toLocaleString()}`;
        return (
            <span className={`font-semibold ${direction === "down" ? "text-red-500" : "text-green-500"}`}>{formattedValue}</span>
        );
    };

    const arrowUpOrDown = (value) => {
        if (!value) {
            return
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        return (
            <div className="flex">
                <div className={`flex rounded-lg p-1 ${direction === "up" ? "dark:bg-[#111E13] bg-[#EAF7EC]" : "dark:bg-[#241011] bg-[#FDE9EA]"}`}>
                    <svg fill="currentColor" className={`w-5 h-5 ${direction === "down" ? "text-red-500" : "text-green-500"}`} viewBox="0 0 24 24">
                        <path
                            d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
                        />
                    </svg>
                    <span className={`font-semibold text-xs ${direction === "down" ? "text-red-500" : "text-green-500"}`}>{value.toLocaleString()} %</span>
                </div>
            </div>
        );
    };

    return (<>
        {transactions.length > 0 ? <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">24h Portfolio Change</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{UpOrDown(valueInDollars)}</div>
                    <div className="flex items-center space-x-2">
                        <p className="text-xs text-muted-foreground">Last 24h </p>{arrowUpOrDown(valueInPercent)}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">PNL</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{UpOrDown(totalGain)}</div>
                    <div className="flex items-center space-x-2">
                        <p className="text-xs text-muted-foreground">Total Profit / Loss </p>{arrowUpOrDown(totalWinOrLoss)}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"><div className="flex gap-3">{maxTransaction?.name}<span className="uppercase text-slate-500 font-normal">{maxTransaction?.symbol}</span></div></CardTitle>
                    <img src={maxTransaction?.image} alt={maxTransaction?.name} width={24} height={24} className="object-contain" />
                </CardHeader>
                <CardContent>
                    <div className="flex">
                        <p className="text-xs text-muted-foreground">Top Gainer {UpOrDown(bestWinnerValue)}</p>
                    </div>
                </CardContent>
            </Card>
        </> : ""
        }
    </>
    )
}