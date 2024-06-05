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
import { useNavigate } from "react-router-dom"


export default function Cards({ quantity, price, spent, date, name, id, gainOrLoss, image }) {
    const navigate = useNavigate()

    const deleteTransaction = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/transaction/${id}`)
            console.log(response.data.message);
        } catch (error) {
            console.error("Error deleting transaction", error)
        }
    }

    const updateTransaction = (id) => {
        navigate(`/${id}`);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="uppercase flex gap-2"><img src={image} alt={name} width={24} height={24} />{name}</CardTitle>
                <CardDescription>Quantité : {quantity}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Prix : {price}</p>
                <p>Total dépensé : {spent}</p>
                <p>Pertes et profits : {gainOrLoss}</p>
            </CardContent>
            <CardFooter>
                <p>Date : {date}</p>
                <Button onClick={() => updateTransaction(id)} variant="secondary">Update</Button>
                <Button onClick={() => deleteTransaction(id)} variant="destructive">Delete</Button>
            </CardFooter>
        </Card>
    )
}