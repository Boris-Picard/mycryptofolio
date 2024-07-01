import mycryptofolio from "../../assets/mycryptofolio.png"
import { Button } from "@/components/ui/button"

export default function ErrorPage() {

    return <div className="container">
        <div className="flex justify-center items-center h-full flex-col space-y-3">
            <img src={mycryptofolio} alt="logo website myscryptofolio" className="invert-0 brightness-0" width={200} height={200} />
            <span className="font-semibold text-2xl">Oups cette page n'existe pas</span>
            <Button>Revenir a l'accueil</Button>
        </div>
    </div>
}