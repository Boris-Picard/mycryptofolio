import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function Cards({ quantity, price, spent, date, name }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>Quantité : {quantity}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Prix : {price}</p>
                <p>Total dépensé : {spent}</p>
            </CardContent>
            <CardFooter>
                <p>Date : {date}</p>
            </CardFooter>
        </Card>
    )
}