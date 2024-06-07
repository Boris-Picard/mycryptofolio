import TableData from "@/components/TableData";
import { useEffect, useState } from "react";
import axios from "axios";
import Error from "@/components/ui/error";
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CardsData from "@/components/CardsData";

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
                        actualValue: transaction.quantity * coinData.current_price,
                        gainOrLossPercentage: (transaction.quantity * coinData.current_price - transaction.spent) / transaction.spent * 100,
                        image: coinData.image,
                        name: coinData.name,
                        rank: coinData.market_cap_rank,
                        price: coinData.current_price,
                        price_change_24h: coinData.price_change_percentage_24h,
                        market_cap: coinData.market_cap,
                        ath: coinData.ath,
                        symbol: coinData.symbol,
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
        <div className="grid grid-cols-4 mb-3 gap-3">
            <CardsData transactions={transactions} />
        </div>
        <Error message={error} />
        <Table className="bg-white rounded-xl">
            <TableCaption>A list of your recent trade</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Monnaie</TableHead>
                    <TableHead>Cours</TableHead>
                    <TableHead>24h</TableHead>
                    <TableHead>Capitalisation boursière</TableHead>
                    <TableHead>Ath</TableHead>
                    <TableHead>Participations</TableHead>
                    <TableHead>Pertes et profits</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((coin) => {
                    return <TableData percent={coin.gainOrLossPercentage} actualValue={coin.actualValue} symbol={coin.symbol} ath={coin.ath} marketCap={coin.market_cap} priceChange={coin.price_change_24h} price={coin.price} key={coin._id} rank={coin.rank} image={coin.image} gainOrLoss={coin.actualPrice} className="col-span-1" quantity={coin.quantity} spent={coin.spent} date={new Date(coin.date).toLocaleDateString()} name={coin.name} id={coin._id} />
                })}
            </TableBody>
        </Table>
    </div>)
}