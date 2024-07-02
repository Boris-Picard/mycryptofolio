import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"
import { Button } from "./ui/button";

const CookieHandler = () => {
    const { toast } = useToast()

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", 'accepted')
    }

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", 'declined')
    }

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
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
                duration: Infinity,
            })
        }
    }, [toast]);

    return null;
};

export default CookieHandler;