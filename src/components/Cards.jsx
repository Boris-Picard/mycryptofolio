import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function Cards() {
    return (
        <div className="grid grid-cols-4 h-full items-center gap-3">
            <Card>
                <CardHeader>
                    <CardTitle>Bitcoin</CardTitle>
                    <CardDescription>Quantité : 1000</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Prix : </p>
                    <p>Total dépensé :</p>
                </CardContent>
                <CardFooter>
                    <p>Date : </p>
                </CardFooter>
            </Card>
        </div>
    )
}