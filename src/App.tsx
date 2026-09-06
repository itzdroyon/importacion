import { Route, Routes } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import Navbar from "./components/layout/Navbar";
import Cursor from "./components/layout/Cursor";
import Home from "./pages/Home";
import CarDetail from "./pages/CarDetail";

export default function App() {
  // Smooth scroll is wired once at the app root so every ScrollTrigger
  // instance in every section reads the same Lenis-driven scroll value.
  useLenis();

  return (
    <>
      <Cursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coches/:slug" element={<CarDetail />} />
      </Routes>
    </>
  );
}
