import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
export default function VerifyEmail() {
    const location = useLocation()
    const { toast } = useToast()

    const [isVerified, setIsVerified] = useState(false)
    console.log(location);
    useEffect(() => {
        const mailVerification = async () => {
            const query = new URLSearchParams(location.search);
            const token = query.get('token');
            try {
                const response = await axios.get(`http://localhost:3001/api/auth/verify-email?token=${token}`)
                console.log(response);
                setIsVerified(response.data.verified)
                toast({
                    variant: "success",
                    title: response.data.message,
                })
            } catch (error) {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: error.response.data.error || error.response.data,
                })
            }
        }
        mailVerification()
    }, [])
    return <></>
}