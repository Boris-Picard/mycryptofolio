import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"
import { Button } from "./ui/button";

const CookieHandler = () => {
    const { toast, dismiss } = useToast()

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", 'accepted')
        dismiss()
    }

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", 'declined')
        dismiss()
    }

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent === null) {
            toast({
                title: "This website uses cookies to ensure you get the best experience on our website.",
                description: (
                    <div className="flex flex-col items-center">
                        <div className="mt-4">
                            <Button className="mr-2" onClick={handleAccept}>
                                Accept
                            </Button>
                            <Button variant='destructive' onClick={handleDecline}>
                                Decline
                            </Button>
                        </div>
                    </div>
                ), 
                duration: null,
            })
        }
    }, [toast]);

    return null;
};

export default CookieHandler;