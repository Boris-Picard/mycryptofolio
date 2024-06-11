import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect } from "react"

import { useLocation } from "react-router-dom"

export default function CardsDetailed() {
    const location = useLocation()
    const { coinData } = location.state
    console.log(coinData)

    useEffect(() => {
        const allValue = coinData.reduce((acc, value) => value.actualValue, 0)
    }, [coinData])

    return (<>
        <Card>
            <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>Valeur des participations</CardDescription>
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
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>Meilleur Gagnant </CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>Meilleur Gagnant </CardDescription>
            </CardHeader>
        </Card>
    </>)
}