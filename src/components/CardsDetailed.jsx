import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"

import { useLocation } from "react-router-dom"

export default function CardsDetailed() {
    const location = useLocation()
    const { coinData } = location.state
    
    const [totalValue, setTotalValue] = useState(0)
    const [totalCoins, setTotalCoins] = useState(0)
    const [totalSpent, setTotalSpent] = useState(0)
    const [totalGainOrLoss, setTotalGainOrLoss] = useState(0)
    const [averageBuyPrice, setAverageBuyPrice] = useState(0)
    const [symbol, setSymbol] = useState([])

    useEffect(() => {
        coinData.map(value => setSymbol(value.symbol))
        const allValue = coinData.reduce((acc, value) => acc + value.actualValue, 0)
        const allCoins = coinData.reduce((acc, value) => acc + value.quantity, 0)
        const spent = coinData.reduce((acc, value) => acc + value.spent, 0)
        const gainOrLoss = coinData.reduce((acc, value) => acc + value.actualPrice, 0)
        const averagePrice = spent / allCoins
        setTotalValue(allValue)
        setTotalCoins(allCoins)
        setTotalSpent(spent)
        setTotalGainOrLoss(gainOrLoss)
        setAverageBuyPrice(averagePrice)
    }, [coinData])

    const UpOrDown = (value) => {
        if (!value) {
            return
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        return (
            <span className={`font-semibold ${direction === "down" ? "text-red-500" : "text-green-500"}`}>{value.toFixed(2)} $US</span>
        );
    };

    return (<>
        <Card>
            <CardHeader>
                <CardTitle>{totalValue?.toFixed(2)} $US</CardTitle>
                <CardDescription>Valeur des participations</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{totalCoins} <span className="uppercase">{symbol}</span></CardTitle>
                <CardDescription>Participations</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{totalSpent} $US</CardTitle>
                <CardDescription>Coût total</CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{averageBuyPrice?.toFixed(2)} $US</CardTitle>
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