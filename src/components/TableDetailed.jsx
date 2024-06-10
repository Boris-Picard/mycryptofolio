import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react";

import { useLocation } from "react-router-dom";

export default function TableDetailed() {
    const location = useLocation()
    const { coinData } = location.state // Récupère les données du coin passées via navigate
    console.log(coinData);
    return (
        <>
            {coinData.map((coin, i) => {
                return <TableRow key={i} className="font-semibold">
                    <TableCell className="font-medium">{coin.rank}</TableCell>
                    <TableCell><div className="flex gap-2 items-center"><img src={coin.image} alt={coin.name} width={24} height={24} />{coin.name}</div></TableCell>
                    <TableCell>{coin.price} $US</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{coin.market_cap} $US</TableCell>
                    <TableCell>{coin.ath} $US</TableCell>
                    <TableCell>
                        <div className="flex flex-col">
                            {coin.actualValue?.toFixed(2)} $US<span className="uppercase text-slate-500 font-normal">{coin.quantity} {coin.symbol}</span>
                        </div>
                    </TableCell>
                </TableRow>
            })}
        </>
    )
}