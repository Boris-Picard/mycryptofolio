import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function TableData({ quantity, price, spent, date, name, id, gainOrLoss, image, rank, priceChange, marketCap, ath, symbol }) {
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
        <TableRow>
            <TableCell className="font-medium">{rank}</TableCell>
            <TableCell className="flex gap-2 items-center font-semibold"><img src={image} alt={name} width={24} height={24} />{name}</TableCell>
            <TableCell>{price} $US</TableCell>
            <TableCell>{priceChange}</TableCell>
            <TableCell>{marketCap} $US</TableCell>
            <TableCell>{ath} $US</TableCell>
            <TableCell><div className="flex flex-col">
                {spent} $US<span className="uppercase">{quantity} {symbol}</span>
            </div></TableCell>
            <TableCell>{gainOrLoss} $US</TableCell>
            <TableCell>
                <Button onClick={() => updateTransaction(id)} variant="secondary">Update</Button>
                <Button onClick={() => deleteTransaction(id)} variant="destructive">Delete</Button>
            </TableCell>
        </TableRow>
    )
}