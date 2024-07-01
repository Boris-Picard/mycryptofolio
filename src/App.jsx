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

import { useAuthStore } from './stores/useAuthStore';

import axios from 'axios';
import ErrorPage from './Pages/Error';
import ErrorBoundary from './components/ErrorBoundary.jsx'

function App() {
  const { theme } = useTheme()

  const { user, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/auth/user`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
        clearUser();
      }
    };

    const refreshToken = async () => {
      try {
        await axios.post(`http://localhost:3001/api/auth/refresh-token`, {}, {
          withCredentials: true,
        });
        await checkAuth();
      } catch (error) {
        console.log("Failed to refresh token", error);
        clearUser();
      }
    };

    const startTokenRefreshInterval = () => {
      const intervalId = setInterval(() => {
        refreshToken();
      }, 30 * 60 * 1000); // Rafraîchir toutes les 30 minutes
      return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
    };

    startTokenRefreshInterval()

    // Vérifier le token existant
    if (!user) {
      refreshToken();
    } else {
      checkAuth();
    }

  }, []);

  return (
    <div className={`${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
      <Loading page={"loading"}>
        <BrowserRouter>
          <ErrorBoundary>
            {user ? (
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/id/:id" element={<HomePage />} />
                  <Route path="/name/:name" element={<HomePage />} />
                  <Route path="/detailed/:id" element={<Detailed />} />
                  <Route path="/seecoins" element={<SeeCoins />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </>
            ) : (
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<SignIn />} />
              </Routes>
            )}
          </ErrorBoundary>
        </BrowserRouter>
      </Loading>
    </div>
  );
}

export default App;
