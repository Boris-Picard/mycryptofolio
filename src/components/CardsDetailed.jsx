import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function CardsDetailed() {
    return (<>
        <Card>
            <CardHeader>
                <CardTitle></CardTitle>
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
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>Meilleur Gagnant </CardDescription>
            </CardHeader>
        </Card></>)
}