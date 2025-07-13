import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Rules from "./pages/Rules";
import About from "./pages/About";
import Footer from "./pages/Footer";
import GameFiled from "./pages/GameFiled";

export default function App() {
  
  return (
 <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game-filed" element={<GameFiled />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about" element={<About />} />
      </Routes>
     {/* <Footer />  */}
 </>
  )
}