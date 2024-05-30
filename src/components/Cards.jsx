import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import axios from "axios"


export default function Cards({ quantity, price, spent, date, name, id }) {

    const deleteTransaction = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/transaction/${id}`)
            console.log(response.data.message);
        } catch (error) {
            console.error("Error deleting transaction", error)
        }
    }

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
                <Button onClick={() => deleteTransaction(id)} variant="destructive">Delete</Button>
            </CardFooter>
        </Card>
    )
}