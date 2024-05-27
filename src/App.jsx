import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import SeeCoins from "./Pages/SeeCoins"

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seecoins" element={<SeeCoins />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
