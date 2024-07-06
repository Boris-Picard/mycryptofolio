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
                const response = await axios.get(`http://localhost:3001/api/transaction/portfolio`, {
                    withCredentials: true
                })
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
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${transactionsName}&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`)
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
                        currentPrice: coinData.current_price,
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

    return (<div className="container p-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 mb-3 gap-3">
            <CardsData />
        </div>
        <Error message={error} />
        <Table className="rounded-xl overflow-auto">
            <TableCaption>A list of your recent trades</TableCaption>
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
                <TableData data={transactions} />
            </TableBody>
        </Table>
    </div>)
}