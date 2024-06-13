import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import SeeCoins from "./Pages/SeeCoins"
import Detailed from "./Pages/Detailed"
import Loading from './components/Loading';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <>
      {isLoading ? (<div className='flex items-center h-full w-full'><Loading /></div>) : <BrowserRouter><div className="h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/id/:id" element={<HomePage />} />
          <Route path="/name/:name" element={<HomePage />} />
          <Route path="/detailed/:id" element={<Detailed />} />
          <Route path="/seecoins" element={<SeeCoins />} />
        </Routes>
      </div></BrowserRouter>}
    </>
  );
}

export default App;
