import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"


export default function CardsData({ transactions }) {
    console.log(transactions);
    const [totalInvested, setTotalInvested] = useState(0);
    const [totalGain, setTotalGain] = useState(0)
    const [maxTransaction, setMaxTransaction] = useState(0)
    const [bestWinnerValue, setBestWinnerValue] = useState(0)
    const [totalWinOrLoss, setTotalWinOrLoss] = useState(0)

    useEffect(() => {
        const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.actualValue, 0)
        const totalWinOrLoss = transactions.reduce((acc, transaction) => acc + transaction.actualPrice, 0)
        const totalPercentWinOrLoss = transactions.reduce((acc, transaction) => acc + transaction.gainOrLossPercentage, 0)
        const percentageWinOrLoss = transactions.reduce((max, transaction) => transaction.gainOrLossPercentage > max.gainOrLossPercentage ? transaction : max, transactions[0])
        console.log(percentageWinOrLoss);
        if (percentageWinOrLoss) {
            const bestWinner = percentageWinOrLoss.actualValue - percentageWinOrLoss.spent
            setBestWinnerValue(bestWinner)
        }
        setTotalInvested(totalAmount)
        setTotalGain(totalWinOrLoss)
        setMaxTransaction(percentageWinOrLoss)
        setTotalWinOrLoss(totalPercentWinOrLoss)
    }, [transactions])

    const UpOrDown = (value) => {
        if (!value) {
            return
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        return (
            <span className={`font-semibold ${direction === "down" ? "text-red-500" : "text-green-500"}`}>{value.toFixed(2)} $US</span>
        );
    };

    const arrowUpOrDown = (value) => {
        if (!value) {
            return
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        return (
            <div className={`flex font-semibold ${direction === "down" ? "text-red-500" : "text-green-500"}`}>
                <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
                    />
                </svg>
                <span >{value.toFixed(1)} %</span>
            </div>
        );
    };

    return (<>
        <Card>
            <CardHeader>
                <CardTitle>{totalInvested.toFixed(2)} $US</CardTitle>
                <CardDescription>Solde actuel</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Solde actuel</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{UpOrDown(totalGain)}</CardTitle>
                <CardDescription>Total des profits et pertes {arrowUpOrDown(totalWinOrLoss)}</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex gap-2"><img src={maxTransaction?.image} alt={maxTransaction?.name} width={24} height={24} />{maxTransaction?.name} <span className="text-slate-500 uppercase font-normal">{maxTransaction?.symbol}</span></CardTitle>
                <CardDescription>Meilleur Gagnant {UpOrDown(bestWinnerValue)}</CardDescription>
            </CardHeader>
        </Card>
    </>
    )
}