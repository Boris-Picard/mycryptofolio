import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

export const Logout = () => {
  const { clearUser } = useAuthStore();

  const {toast} = useToast()

  const handleLogout = async () => {
    try {
      const response = await axios.delete('http://localhost:3001/api/auth/logout', {
        withCredentials: true,
      })
      if (response.status === 200) {
        toast({
          variant: "success",
          description: "Logout successfully",
        })
        clearUser();
      } else {
        toast({
          variant: "destructive",
          title: "Somethings went wrong:",
          description: "logout failed",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Somethings went wrong:",
        description: error.response?.data || error.message || "Unknow error occured",
      })
    }
  };

  return <Button onClick={handleLogout}>Se déconnecter</Button>;
};
