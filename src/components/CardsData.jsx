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

    useEffect(() => {
        const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.actualValue, 0)
        const totalWinOrLoss = transactions.reduce((acc, transaction) => acc + transaction.actualPrice, 0)
        // const totalWinOrLossPercent = 
        // console.log(totalWinOrLossPercent);
        setTotalInvested(totalAmount)
        setTotalGain(totalWinOrLoss)
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
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Solde actuel</CardDescription>
            </CardHeader>
        </Card>
    </>
    )
}