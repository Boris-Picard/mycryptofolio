import axios from "axios"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
export default function VerifyEmail() {
    const location = useLocation()
    console.log(location);
    useEffect(() => {
        const mailVerification = async () => {
            const query = new URLSearchParams(location.search);
            const token = query.get('token');
            try {
                const response = await axios.get(`http://localhost:3001/api/auth/verify-email?token=${token}`)
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        mailVerification()
    }, [])
    return <><p>Verification email</p></>
}