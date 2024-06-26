import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

export const Logout = () => {
  const { clearUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      const response = await axios.delete('http://localhost:3001/api/auth/logout', {
        withCredentials: true,
      })
      if (response.status === 200) {
        clearUser();
      }
      if (response.status !== 200) {
        console.error('logout failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleLogout}>Se déconnecter</Button>;
};
