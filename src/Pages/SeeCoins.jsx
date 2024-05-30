import Cards from "@/components/Cards";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SeeCoins() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/transaction")
                setTransactions(response.data)
            } catch (error) {
                console.error("Error fetching transactions:", error)
            }
        }
        fetchTransactions()
    }, [])

    console.log(transactions);

    return (<div className="container h-screen p-10">
        <div className="grid grid-cols-4 gap-3">
            {transactions.map((coin) => {
                return <Cards key={coin._id} className="col-span-1" quantity={coin.quantity} price={coin.price} spent={coin.spent} date={new Date(coin.date).toLocaleDateString()} name={coin.coin.name} id={coin._id} />
            })}
        </div>
    </div>)
}