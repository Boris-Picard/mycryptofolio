import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"

import { useDeleteDetailedTransaction } from "@/stores/detailed-transactions.js";

export default function CardsDetailed() {
    const { transactions } = useDeleteDetailedTransaction()

    const [totalValue, setTotalValue] = useState(0)
    const [totalCoins, setTotalCoins] = useState(0)
    const [totalSpent, setTotalSpent] = useState(0)
    const [totalGainOrLoss, setTotalGainOrLoss] = useState(0)
    const [averageBuyPrice, setAverageBuyPrice] = useState(0)
    const [symbol, setSymbol] = useState([])

    useEffect(() => {
        transactions.map(value => setSymbol(value.symbol))
        const allValue = transactions.reduce((acc, value) => acc + value.actualValue, 0)
        const allCoins = transactions.reduce((acc, value) => acc + value.quantity, 0)
        const spent = transactions.reduce((acc, value) => acc + value.spent, 0)
        const gainOrLoss = transactions.reduce((acc, value) => acc + value.actualPrice, 0)
        const averagePrice = spent / allCoins
        setTotalValue(allValue)
        setTotalCoins(allCoins)
        setTotalSpent(spent)
        setTotalGainOrLoss(gainOrLoss)
        setAverageBuyPrice(averagePrice)
    }, [transactions])

    const UpOrDown = (value) => {
        if (!value) {
            return
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        return (
            <span className={`font-semibold ${direction === "down" ? "text-red-500" : "text-green-500"}`}>{value.toLocaleString()} $US</span>
        );
    };

    return (<>
        <Card>
            <CardHeader>
                <CardTitle>{totalValue?.toLocaleString()} $US</CardTitle>
                <CardDescription>Valeur des participations</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{totalCoins?.toLocaleString()} <span className="uppercase">{symbol}</span></CardTitle>
                <CardDescription>Participations</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{totalSpent?.toLocaleString()} $US</CardTitle>
                <CardDescription>Coût total</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{averageBuyPrice?.toLocaleString()} $US</CardTitle>
                <CardDescription>Coût net moyen</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{UpOrDown(totalGainOrLoss)}</CardTitle>
                <CardDescription>Total des profits et pertes</CardDescription>
            </CardHeader>
        </Card>
    </>)
}