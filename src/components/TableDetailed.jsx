import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

import { useLocation } from "react-router-dom";

export default function TableDetailed() {
    const location = useLocation()
    const { coinData } = location.state // Récupère les données du coin passées via navigate
    console.log(coinData);
    return (
        <>
            {coinData.map((coin, i) => {
                return <TableRow key={i} className="font-semibold">
                    <TableCell className="font-medium">{coin.price} $US</TableCell>
                    <TableCell><span>{coin.quantity}</span> <span className="uppercase font-semibold text-slate-500">{coin.symbol}</span></TableCell>
                    <TableCell>{new Date(coin.date).toLocaleDateString()}</TableCell>
                    <TableCell>{coin.spent} $US</TableCell>
                    <TableCell>{coin.actualPrice?.toFixed(2)} $US</TableCell>
                </TableRow>
            })}
        </>
    )
}