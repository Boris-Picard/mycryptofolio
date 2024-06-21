import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import SeeCoins from "./Pages/SeeCoins"
import Detailed from "./Pages/Detailed"
import Loading from './components/Loading';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { useTheme } from "@/context/ThemeProvider.tsx"


function App() {
  const { theme } = useTheme()

  return (
    <div className={`${theme === "dark" ? "bg-zinc-950" : "bg-white"}`}>
      <Loading page={"loading"}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/id/:id" element={<HomePage />} />
            <Route path="/name/:name" element={<HomePage />} />
            <Route path="/detailed/:id" element={<Detailed />} />
            <Route path="/seecoins" element={<SeeCoins />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Loading>
    </div>
  );
}

export default App;
