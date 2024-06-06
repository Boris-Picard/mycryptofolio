import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function CardsData() {
    return (<><Card>
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
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Solde actuel</CardDescription>
            </CardHeader>
        </Card>
    </>
    )
}