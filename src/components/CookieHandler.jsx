import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"

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
        if (!consent) {
            toast({
                description: (
                    <div className="flex flex-col items-center">
                        <p>This website uses cookies to ensure you get the best experience on our website.</p>
                        <div className="mt-4">
                            <button className="mr-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAccept}>
                                Accept
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDecline}>
                                Decline
                            </button>
                        </div>
                    </div>
                ),
                duration: null,
            });
        }
    }, [toast]);

    return null;
};

export default CookieHandler;