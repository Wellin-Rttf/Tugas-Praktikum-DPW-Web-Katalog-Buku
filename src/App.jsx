import { Routes, Route } from "react-router-dom";
import { dataBuku } from "./data/buku.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import useTema from "./hooks/useTema.js";
import AppBar from "./components/AppBar.jsx";
import BottomNav from "./components/BottomNav.jsx";
import SideNav from "./components/SideNav.jsx";
import Beranda from "./pages/Beranda.jsx";
import Katalog from "./pages/Katalog.jsx";
import DetailBuku from "./pages/DetailBuku.jsx";
import Favorit from "./pages/Favorit.jsx";
import TambahBuku from "./pages/TambahBuku.jsx";
import NotFound from "./pages/NotFound.jsx";

const buatId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export default function App() {
  const { gelap, toggle: onToggleTema } = useTema();
  const [bukuTambahan, setBukuTambahan] = useLocalStorage("katalog-buku:tambahan", []);
  const [favorit, setFavorit] = useLocalStorage("katalog-buku:favorit", []);
  const [catatan, setCatatan] = useLocalStorage("katalog-buku:catatan", {});

  const daftarBuku = [...dataBuku, ...bukuTambahan];

  const onToggleFavorit = (id) => {
    setFavorit((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onTambahBuku = (bukuBaru) => {
    setBukuTambahan((prev) => [...prev, bukuBaru]);
  };

  const onTambahCatatan = (idBuku, teks) => {
    const baru = { id: buatId(), teks, waktu: new Date().toISOString() };
    setCatatan((prev) => ({ ...prev, [idBuku]: [baru, ...(prev[idBuku] ?? [])] }));
  };

  const onHapusCatatan = (idBuku, idCatatan) => {
    setCatatan((prev) => ({
      ...prev,
      [idBuku]: (prev[idBuku] ?? []).filter((c) => c.id !== idCatatan),
    }));
  };

  const shared = { daftarBuku, favorit, onToggleFavorit };

  return (
    <div className="app">
      <AppBar gelap={gelap} onToggleTema={onToggleTema} />
      <SideNav jumlahFavorit={favorit.length} gelap={gelap} onToggleTema={onToggleTema} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Beranda {...shared} />} />
          <Route path="/buku" element={<Katalog {...shared} />} />
          <Route
            path="/buku/:id"
            element={
              <DetailBuku
                {...shared}
                catatan={catatan}
                onTambahCatatan={onTambahCatatan}
                onHapusCatatan={onHapusCatatan}
              />
            }
          />
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
