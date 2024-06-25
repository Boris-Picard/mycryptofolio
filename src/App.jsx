import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import SeeCoins from "./Pages/SeeCoins"
import Detailed from "./Pages/Detailed"
import Loading from './components/Loading';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { useTheme } from "@/context/ThemeProvider.tsx"

import { useEffect } from 'react';

import { useCookies } from 'react-cookie';
import { useAuthStore } from './stores/useAuthStore';

import axios from 'axios';

function App() {
  const { theme } = useTheme()

  const [cookies, removeCookie] = useCookies(['token']);
  const { user, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (cookies.token) {
        try {
          // Vérifiez le token avec votre backend
          const response = await axios.get("http://localhost:3001/api/auth/getUser", {
            headers: { Authorization: `Bearer ${cookies.token}` }
          });
          setUser(response.data.user);
        } catch (error) {
          // Gérez l'erreur (token invalide, expiré, etc.)
          clearUser();
          removeCookie('token');
        }
      }
    };

    checkAuth();
  }, [cookies.token, setUser, clearUser, removeCookie]);
  return (
    user ? <div className={`${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
      <Loading page={"loading"}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/id/:id" element={<HomePage />} />
            <Route path="/name/:name" element={<HomePage />} />
            <Route path="/detailed/:id" element={<Detailed />} />
            <Route path="/seecoins" element={<SeeCoins />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </Loading>
    </div> : <div className={`${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
      <Loading page={"loading"}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </Loading>
    </div>
  );
}

export default App;
