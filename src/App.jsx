import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { dataBuku } from "./data/buku.js";
import AppBar from "./components/AppBar.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Beranda from "./pages/Beranda.jsx";
import Katalog from "./pages/Katalog.jsx";
import DetailBuku from "./pages/DetailBuku.jsx";
import Favorit from "./pages/Favorit.jsx";
import TambahBuku from "./pages/TambahBuku.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const [daftarBuku, setDaftarBuku] = useState(dataBuku);
  const [favorit, setFavorit] = useState([]); // array id buku

  const onToggleFavorit = (id) => {
    setFavorit((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onTambahBuku = (bukuBaru) => {
    setDaftarBuku((prev) => [...prev, bukuBaru]);
  };

  const shared = { daftarBuku, favorit, onToggleFavorit };

  return (
    <div className="app">
      <AppBar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Beranda {...shared} />} />
          <Route path="/buku" element={<Katalog {...shared} />} />
          <Route path="/buku/:id" element={<DetailBuku {...shared} />} />
          <Route path="/favorit" element={<Favorit {...shared} />} />
          <Route
            path="/tambah"
            element={<TambahBuku onTambahBuku={onTambahBuku} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BottomNav jumlahFavorit={favorit.length} />
    </div>
  );
}
