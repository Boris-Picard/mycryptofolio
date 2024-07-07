import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchCoins() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc?x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`)
                setData(response.data)
            } catch (error) {
                console.log("Error fetching CoinGecko list :", error)
            }
        }
        fetchList()
    }, [])

    return { data }
}