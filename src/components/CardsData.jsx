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
    useEffect(() => {
        const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.actualValue, 0)
        setTotalInvested(totalAmount)
    }, [transactions])
    return (<>
        <Card>
            <CardHeader>
                <CardTitle>{totalInvested} $US</CardTitle>
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
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Solde actuel</CardDescription>
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