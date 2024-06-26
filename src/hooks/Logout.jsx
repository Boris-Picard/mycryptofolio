import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

export const Logout = () => {
  const { clearUser } = useAuthStore();

  const handleLogout = () => {
    clearUser();
  };

  return <Button onClick={handleLogout}>Se déconnecter</Button>;
};
