import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectTriggerFolio,
} from "@/components/ui/select"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { EllipsisVertical } from "lucide-react"


export default function TableData({ quantity, price, spent, date, name, id, gainOrLoss, image, rank, priceChange, marketCap, ath, symbol, percent }) {
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

    const arrowUpOrDown = (value) => {
        if (!value) {
            return
        }
        const direction = value.toString().startsWith("-") ? "down" : "up";
        return (
            <div className={`flex ${direction === "down" ? "text-red-500" : "text-green-500"}`}>
                <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        d={direction === "up" ? "M7 14l5-5 5 5H7z" : " M7 10l5 5 5-5H7z"}
                    />
                </svg>
                <span>{value.toFixed(1)} %</span>
            </div>
        );
    };


    return (
        <TableRow className="font-semibold">
            <TableCell className="font-medium">{rank}</TableCell>
            <TableCell><div className="flex gap-2 items-center"><img src={image} alt={name} width={24} height={24} />{name}</div></TableCell>
            <TableCell>{price} $US</TableCell>
            <TableCell>{arrowUpOrDown(priceChange)}</TableCell>
            <TableCell>{marketCap} $US</TableCell>
            <TableCell>{ath} $US</TableCell>
            <TableCell><div className="flex flex-col">
                {spent} $US<span className="uppercase text-slate-500 font-normal">{quantity} {symbol}</span>
            </div></TableCell>
            <TableCell><div className="flex flex-col">
                {gainOrLoss} $US
                <span>{arrowUpOrDown(percent)}</span>
            </div></TableCell>
            <TableCell>
                <Select>
                    <SelectTriggerFolio>
                        <EllipsisVertical className="w-5 h-5 cursor-pointer" />
                    </SelectTriggerFolio>
                    <SelectContent className="p-1">
                        <SelectGroup className="font-semibold">
                            <div className="p-4 cursor-pointer relative flex w-full  select-none items-center rounded-sm pl-8 pr-2 text-sm outline-none hover:bg-slate-100  focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50" onClick={() => updateTransaction(id)}>
                                Mettre a jour la transaction
                            </div>
                            <div className="p-4 cursor-pointer relative flex w-full  select-none items-center rounded-sm pl-8 pr-2 text-sm outline-none hover:bg-slate-100  focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50" onClick={() => deleteTransaction(id)}>
                                Supprimer la monnaie
                            </div>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </TableCell>
        </TableRow>
    )
}