import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import SeeCoins from "./Pages/SeeCoins"
import Detailed from "./Pages/Detailed"

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/id/:id" element={<HomePage />} />
          <Route path="/name/:name" element={<HomePage />} />
          <Route path="/detailed/:name" element={<Detailed />} />
          <Route path="/seecoins" element={<SeeCoins />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
