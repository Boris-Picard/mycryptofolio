import TableData from "@/components/TableData";
import { useEffect, useState } from "react";
import axios from "axios";
import Error from "@/components/ui/error";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CardsData from "@/components/CardsData";

import CsvButton from "@/components/CsvButton";
import { useToast } from "@/components/ui/use-toast";
import PieChartComponent from "@/components/PieChart";
import { AreaChartData } from "@/components/AreChart";

export default function Portfolio() {
    const [transactions, setTransactions] = useState([])
    const [transactionsName, setTransactionsName] = useState([])
    const [dataTransactionApi, setDataTransactionApi] = useState([])
    const [error, setError] = useState(null)

    const { toast } = useToast()

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/api/transaction/portfolio`, {
                    withCredentials: true
                })
                setTransactions(response.data)
                const coinNames = response.data.map((coin) => coin.coin.name)
                setTransactionsName(coinNames)
            } catch (error) {
                setError(error.response.data.error)
                toast({
                    variant: "destructive",
                    title: error?.message,
                    description: error?.response?.data?.message,
                })
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
                toast({
                    variant: "destructive",
                    title: error?.message,
                    description: error?.response?.data?.message,
                })
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

    return (<div className="container min-h-full p-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 mb-3 gap-3">
            <CardsData />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-3 mb-3">
            <PieChartComponent />
            <AreaChartData />
        </div>
        <Error message={error} />
        <div>
            <div className="flex justify-end mb-3">
                <CsvButton csvdata={transactions} />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Coin</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>24h</TableHead>
                        <TableHead>Market Cap</TableHead>
                        <TableHead>Ath</TableHead>
                        <TableHead>Holdings</TableHead>
                        <TableHead>PNL</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableData data={transactions} />
                </TableBody>
            </Table>
        </div>
    </div>)
}