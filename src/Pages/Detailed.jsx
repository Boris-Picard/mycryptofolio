import { useLocation } from "react-router-dom";

export default function Detailed() {
    const location = useLocation()
    const { coin } = location.state // Récupère les données du coin passées via navigate

    console.log(coin);
    return (<div></div>)
}