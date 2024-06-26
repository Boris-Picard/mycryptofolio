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

import { CookiesProvider, useCookies } from 'react-cookie';
import { useAuthStore } from './stores/useAuthStore';

import axios from 'axios';

import { Navigate } from 'react-router-dom';

function App() {
  const { theme } = useTheme()

  const [cookies, removeCookie] = useCookies(['token']);
  const { user, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (cookies.token) {
        try {
          const response = await axios.get(`http://localhost:3001/api/auth/user/${user?._id}`, {
            headers: { Authorization: `Bearer ${cookies.token}` }
          });
          console.log(cookies.token);
          console.log(response.data);
          setUser(response.data);
        } catch (error) {
          // Gérez l'erreur (token invalide, expiré, etc.)
          console.log(error);
          clearUser();
          removeCookie('token');
        }
      }
    };

    checkAuth();
  }, []);

  console.log(user);
  return (
    <CookiesProvider>
      {cookies.token ? <div className={`${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
        <Loading page={"loading"}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/id/:id" element={<HomePage />} />
              <Route path="/name/:name" element={<HomePage />} />
              <Route path="/detailed/:id" element={<Detailed />} />
              <Route path="/seecoins" element={<SeeCoins />} />
              <Route path="/signin" element={<Navigate to="/" replace />} />
              <Route path="/signup" element={<Navigate to="/" replace />} />
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
      </div>}
    </CookiesProvider>
  );
}

export default App;
