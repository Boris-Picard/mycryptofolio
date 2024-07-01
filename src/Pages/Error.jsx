import mycryptofolio from "../../assets/mycryptofolio.png"
import { Link } from "react-router-dom"

export default function ErrorPage() {

    return <div className="container">
        <div className="flex justify-center items-center h-screen flex-col space-y-3">
            <img src={mycryptofolio} alt="logo website myscryptofolio" className="brightness-0 dark:brightness-100" width={200} height={200} />
            <span className="font-semibold text-2xl dark:text-white">Oups cette page n'existe pas</span>
            <Link className="dark:bg-white bg-black text-white dark:text-black py-2 px-3 rounded-md font-semibold hover:bg-slate-900/90 dark:bg:slate-50/90" to="/">Revenir a l'accueil</Link>
        </div>
    </div>
}