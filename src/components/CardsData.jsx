import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"

import { useDeleteTransaction } from "@/stores/delete-transaction";


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
                <svg fill="currentColor" className={`w-5 h-5 ${direction === "down" ? "text-red-500" : "text-green-500"}`} viewBox="0 0 24 24">
                    <path
                        d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
                    />
                </svg>
                <span className={`font-semibold ${direction === "down" ? "text-red-500" : "text-green-500"}`}>{value.toLocaleString()} %</span>
            </div>
        );
    };

    return (<>
        {transactions.length > 0 ? <><Card>
            <CardHeader>
                <CardTitle>{totalInvested.toLocaleString()} $US</CardTitle>
                <CardDescription>Solde actuel</CardDescription>
            </CardHeader>
        </Card>
            <Card>
                <CardHeader>
                    <CardTitle>{UpOrDown(valueInDollars)}</CardTitle>
                    <CardDescription>
                        <div className="flex">
                            <span>
                                Portefeuille sur 24h
                            </span>
                            {arrowUpOrDown(valueInPercent)}
                        </div>
                    </CardDescription>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>{UpOrDown(totalGain)}</CardTitle>
                    <CardDescription>
                        <div className="flex">
                            <span>Total des profits et pertes</span>
                            {arrowUpOrDown(totalWinOrLoss)}
                        </div>
                    </CardDescription>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-2"><img src={maxTransaction?.image} alt={maxTransaction?.name} width={24} height={24} />{maxTransaction?.name} <span className="text-slate-500 uppercase font-normal">{maxTransaction?.symbol}</span></CardTitle>
                    <CardDescription>Meilleur Gagnant {UpOrDown(bestWinnerValue)}</CardDescription>
                </CardHeader>
            </Card></> : ""}
    </>
    )
}