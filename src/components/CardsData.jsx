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

    useEffect(() => {
        const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.actualValue, 0)
        const totalWinOrLoss = transactions.reduce((acc, transaction) => acc + transaction.actualPrice, 0)
        const percentageWinOrLoss = transactions.reduce((max, transaction) => transaction.gainOrLossPercentage > max.gainOrLossPercentage ? transaction : max, transactions[0])
        console.log(percentageWinOrLoss);
        if (percentageWinOrLoss) {
            const bestWinner = percentageWinOrLoss.actualValue - percentageWinOrLoss.spent
            setBestWinnerValue(bestWinner)
        }
        setTotalInvested(totalAmount)
        setTotalGain(totalWinOrLoss)
        setMaxTransaction(percentageWinOrLoss)
    }, [transactions])

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
                <CardTitle>{totalGain.toFixed(2)} $US</CardTitle>
                <CardDescription>Total des profits et pertes</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex gap-2"><img src={maxTransaction?.image} alt={maxTransaction?.name} width={24} height={24} />{maxTransaction?.name} <span className="text-slate-500 uppercase font-normal">{maxTransaction?.symbol}</span></CardTitle>
                <CardDescription>Meilleur Gagnant {bestWinnerValue.toFixed(2)} $US</CardDescription>
            </CardHeader>
        </Card>
    </>
    )
}