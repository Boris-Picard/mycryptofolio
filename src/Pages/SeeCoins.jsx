import Cards from "@/components/Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import Error from "@/components/ui/error";

export default function SeeCoins() {
    const [transactions, setTransactions] = useState([])
    const [transactionsName, setTransactionsName] = useState([])
    const [dataTransactionApi, setDataTransactionApi] = useState([])
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

    useEffect(() => {
        const fetchCryptoCoin = async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${transactionsName}&x_cg_demo_api_key=CG-1t8kdBZJMA1YUmpjF5nypF6R`)
                setDataTransactionApi(response.data)
            } catch (error) {
                setError(error)
            }
        }
        fetchCryptoCoin()
    }, [transactionsName])

    useEffect(() => {
        const getCoinsValue = () => {
            // Itère sur les transactions
            const coinValues = transactions.map(transaction => {
                // Cherche la donnée du coin qui a le même nom que celui de la transaction
                const coinData = dataTransactionApi.find(coin => coin.id === transaction.coin.name);
                if (coinData) {
                    // Si coinData est trouvé, enrichit transaction avec actualPrice
                    return {
                        ...transaction,
                        actualPrice: transaction.quantity * coinData.current_price - transaction.spent,
                        image: coinData.image,
                        name: coinData.name,
                    };
                }
                // Si coinData n'est pas trouvé, retourne l'objet transaction original
                return transaction;
            });
            // Met à jour l'état transactions avec les nouvelles valeurs
            setTransactions(coinValues);
        };
        getCoinsValue();
    }, [dataTransactionApi]); // S'exécute lorsque dataTransactionApi change

    console.log(dataTransactionApi);
    console.log(transactions);

    return (<div className="container h-screen p-10">
        <Error message={error} />
        <div className="grid md:grid-cols-4 gap-3">
            {transactions.map((coin) => {
                return <Cards key={coin._id} image={coin.image} gainOrLoss={coin.actualPrice} className="col-span-1" quantity={coin.quantity} price={coin.price} spent={coin.spent} date={new Date(coin.date).toLocaleDateString()} name={coin.name} id={coin._id} />
            })}
        </div>
    </div>)
}