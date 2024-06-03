import Cards from "@/components/Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import Error from "@/components/ui/error";

export default function SeeCoins() {
    const [transactions, setTransactions] = useState([])
    const [transactionsName, setTransactionsName] = useState()
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/transaction")
                setTransactions(response.data)
                const coinNames = response.data.map((coin) => coin.coin.name)
                setTransactionsName(coinNames)
            } catch (error) {
                setError(error.response.data.error)
                console.error("Error fetching transactions:", error)
            }
        }
        fetchTransactions()
    }, [])

    console.log(transactionsName);

    useEffect(() => {
        const fetchCryptoCoin = async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${transactionsName}&x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R`)
                console.log(response.data);
            } catch (error) {
                console.error(error)
            }
        }
        fetchCryptoCoin()
    }, [transactions])

    console.log(transactions);

    return (<div className="container h-screen p-10">
        <Error message={error} />
        <div className="grid md:grid-cols-4 gap-3">
            {transactions.map((coin) => {
                return <Cards key={coin._id} className="col-span-1" quantity={coin.quantity} price={coin.price} spent={coin.spent} date={new Date(coin.date).toLocaleDateString()} name={coin.coin.name} id={coin._id} />
            })}
        </div>
    </div>)
}