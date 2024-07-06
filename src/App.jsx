import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import Portfolio from "./Pages/Portfolio"
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
import CookieHandler from './components/CookieHandler';
import VerifyEmail from './Pages/VerifyEmail';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Footer from './components/Footer';
import { useToast } from './components/ui/use-toast';

function App() {
  const { theme } = useTheme()

  const { user, setUser, clearUser } = useAuthStore();

  const { toast } = useToast()

  useEffect(() => {
    let intervalId
    const checkAuth = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/auth/user`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Somethings went wrong:",
          description: error.response?.data || error.response?.message || "Unknown error occurred",
        })
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
        toast({
          variant: "destructive",
          title: "Somethings went wrong:",
          description: error.response?.data || error.response?.message || "Unknown error occurred",
        })
        clearUser();
      }
    };

    const startTokenRefreshInterval = () => {
      intervalId = setInterval(() => {
        refreshToken();
      }, 30 * 60 * 1000); // Rafraîchir toutes les 30 minutes
      return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
    };

    startTokenRefreshInterval()

    // Vérifier le token existant
    const initalize = async () => {
      if (!user) {
        await refreshToken();
      } else {
        await checkAuth();
      }
    }
    initalize()

  }, []);

  return (
    <div className={`overflow-auto h-screen ${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
      <Loading page={"loading"}>
        <BrowserRouter>
          <CookieHandler />
          <ErrorBoundary>
            {user ? (
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/id/:id" element={<HomePage />} />
                  <Route path="/name/:name" element={<HomePage />} />
                  <Route path="/detailed/:id" element={<Detailed />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </>
            ) : (
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<SignIn />} />
              </Routes>
            )}
            <Footer />
          </ErrorBoundary>
        </BrowserRouter>
      </Loading>
    </div>
  );
}

export default App;
