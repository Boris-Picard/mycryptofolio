import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function VerifyEmail() {
    const location = useLocation()
    const { toast } = useToast()
    const navigate = useNavigate()

    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState("")
    console.log(location);
    useEffect(() => {
        const mailVerification = async () => {
            const query = new URLSearchParams(location.search);
            const token = query.get('token');
            console.log(query);
            console.log(token);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/api/auth/verify-email?token=${token}`)
                console.log(response);
                setIsVerified(response.data.verified)
                toast({
                    variant: "success",
                    title: response.data.message,
                })
                setTimeout(() => {
                    navigate("/signin")
                }, 4000)
            } catch (error) {
                setIsVerified(false);
                toast({
                    variant: "destructive",
                    title: error.response.data.error || error.response.data,
                })
                setError(error.response.data.error || error.response.data)
            }
        }
        mailVerification()
    }, [])

    return isVerified ? <div className="w-full">
        <div className="flex items-center justify-center py-12 h-screen bg-gray-100 dark:bg-zinc-950">
            <div className="flex flex-col space-y-6 items-center p-8 bg-white rounded-lg shadow-xl">
                <h1 className="font-bold text-4xl">Email Verified!</h1>
                <h2 className="text-lg text-gray-700">Thank you for verifying your email address.</h2>
                <div className="flex space-x-2 items-end leading-3">
                    <p className="text-slate-500">
                        You will be redirected to the login page shortly. Please wait a moment
                    </p>
                    <div className='h-1 w-1 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='h-1 w-1 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='h-1 w-1 bg-slate-500 rounded-full animate-bounce'></div>
                </div>
            </div>
        </div>
        <div className="hidden bg-muted lg:block"></div>
    </div> :
        <div className="w-full">
            <div className="flex flex-col space-y-6 items-center justify-center py-12 h-screen bg-gray-100 dark:bg-zinc-950">
                <h1 className="font-bold text-4xl text-red-500">{error}</h1>
                <Link className="text-white bg-red-500 py-2 px-3 rounded-md font-semibold hover:bg-red-400" to="/signup">Return to Sign Up</Link>
            </div>
            <div className="hidden bg-muted lg:block"></div>
        </div>
}