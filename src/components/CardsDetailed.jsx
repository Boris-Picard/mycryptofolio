import {
    Card,
    CardDescription,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"

import { useDeleteDetailedTransaction } from "@/stores/detailed-transactions.js";

import { DollarSign } from "lucide-react"

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
        const formattedValue = direction === "down"
            ? `-$${Math.abs(value).toLocaleString()}`
            : `+$${value.toLocaleString()}`;
        return (
            <span className={`font-semibold ${direction === "down" ? "text-red-500" : "text-green-500"}`}>{formattedValue}</span>
        );
    };

    return (<>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Holdings Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">${totalValue?.toLocaleString()}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Holdings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold flex gap-3">{totalCoins?.toLocaleString()}<span className="uppercase">{symbol}</span></div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">${totalSpent?.toLocaleString()}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Net Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">${averageBuyPrice?.toLocaleString()}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Profit / Loss</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{UpOrDown(totalGainOrLoss)}</div>
            </CardContent>
        </Card>
    </>)
}