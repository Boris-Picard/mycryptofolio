import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import SeeCoins from "./Pages/SeeCoins"
import Detailed from "./Pages/Detailed"
import Loading from './components/Loading';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { useTheme } from "@/context/ThemeProvider.tsx"

import { useAuthStore } from './stores/useAuthStore';
import { useCookies } from 'react-cookie';

import { useEffect } from 'react';


function App() {
  const { theme } = useTheme()
  const { user, setUser, setCookies } = useAuthStore()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  useEffect(() => {
    // Initialisation des cookies dans Zustand
    setCookies({ set: setCookie, get: cookies, remove: removeCookie });

    // Si un token existe déjà dans les cookies, le mettre dans Zustand
    if (cookies.token && !user) {
      setUser(cookies.token);
    }
  }, [cookies, setCookies, setUser, user]);

  console.log(cookies);
  console.log(user);

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
          </Routes>
        </BrowserRouter>
      </Loading>
    </div> : <div className={`${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
      <Loading page={"loading"}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            Z
          </Routes>
        </BrowserRouter>
      </Loading>
    </div>
  );
}

export default App;
