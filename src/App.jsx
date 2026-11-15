import { useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { dataBuku } from "./data/buku.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import useTema from "./hooks/useTema.js";
import useAksen from "./hooks/useAksen.js";
import { urutValid } from "./data/urut.js";
import AppBar from "./components/AppBar.jsx";
import BottomNav from "./components/BottomNav.jsx";
import SideNav from "./components/SideNav.jsx";
import Toast from "./components/Toast.jsx";
import Beranda from "./pages/Beranda.jsx";
import Katalog from "./pages/Katalog.jsx";
import DetailBuku from "./pages/DetailBuku.jsx";
import Favorit from "./pages/Favorit.jsx";
import TambahBuku from "./pages/TambahBuku.jsx";
import UbahBuku from "./pages/UbahBuku.jsx";
import Pengaturan from "./pages/Pengaturan.jsx";
import NotFound from "./pages/NotFound.jsx";

const buatId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export default function App() {
  const tema = useTema();
  const aksen = useAksen();
  const [bukuTambahan, setBukuTambahan] = useLocalStorage("katalog-buku:tambahan", []);
  const [favorit, setFavorit] = useLocalStorage("katalog-buku:favorit", []);
  const [catatan, setCatatan] = useLocalStorage("katalog-buku:catatan", {});
  const [statusBaca, setStatusBaca] = useLocalStorage("katalog-buku:status", {});
  const [rating, setRating] = useLocalStorage("katalog-buku:rating", {});
  const [urutSimpan, setUrutBawaan] = useLocalStorage("katalog-buku:urut", "bawaan");
  const urutBawaan = urutValid(urutSimpan) ? urutSimpan : "bawaan";
  const [notifAktif, setNotifAktif] = useState(null);

  const notif = useCallback((pesan, aksi) => setNotifAktif({ id: Date.now(), pesan, aksi }), []);
  const tutupNotif = useCallback(() => setNotifAktif(null), []);

  // Penanda milikSaya hanya ada di memori, tidak ikut tersimpan ke localStorage.
  const daftarBuku = [
    ...dataBuku,
    ...bukuTambahan.map((b) => ({ ...b, milikSaya: true })),
  ];

  const onToggleFavorit = (id) => {
    setFavorit((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onTambahBuku = (data) => {
    const id = `b${Date.now()}`;
    setBukuTambahan((prev) => [...prev, { ...data, id }]);
    return id;
  };

  const onEditBuku = (id, data) => {
    setBukuTambahan((prev) => prev.map((b) => (b.id === id ? { ...b, ...data, id } : b)));
  };

  const onHapusBuku = (id) => {
    setBukuTambahan((prev) => prev.filter((b) => b.id !== id));
    setFavorit((prev) => prev.filter((x) => x !== id));
    setCatatan((prev) => {
      const salinan = { ...prev };
      delete salinan[id];
      return salinan;
    });
    const buang = (prev) => {
      const s = { ...prev };
      delete s[id];
      return s;
    };
    setStatusBaca(buang);
    setRating(buang);
  };

  const onSetStatus = (id, status) => {
    setStatusBaca((prev) => {
      const s = { ...prev };
      if (status) s[id] = status;
      else delete s[id];
      return s;
    });
  };

  const onSetRating = (id, nilai) => {
    setRating((prev) => {
      const s = { ...prev };
      if (nilai) s[id] = nilai;
      else delete s[id];
      return s;
    });
  };

  const onTambahCatatan = (idBuku, teks) => {
    const baru = { id: buatId(), teks, waktu: new Date().toISOString() };
    setCatatan((prev) => ({ ...prev, [idBuku]: [baru, ...(prev[idBuku] ?? [])] }));
  };

  const onHapusCatatan = (idBuku, idCatatan) => {
    const idx = (catatan[idBuku] ?? []).findIndex((c) => c.id === idCatatan);
    if (idx < 0) return;
    const dihapus = catatan[idBuku][idx];
    setCatatan((prev) => ({
      ...prev,
      [idBuku]: (prev[idBuku] ?? []).filter((c) => c.id !== idCatatan),
    }));
    notif("Catatan dihapus", {
      label: "Urungkan",
      onKlik: () =>
        setCatatan((prev) => {
          const daftar = [...(prev[idBuku] ?? [])];
          if (daftar.some((c) => c.id === dihapus.id)) return prev;
          daftar.splice(Math.min(idx, daftar.length), 0, dihapus);
          return { ...prev, [idBuku]: daftar };
        }),
    });
  };

  const onImpor = (data, mode) => {
    if (mode === "ganti") {
      setBukuTambahan(data.bukuTambahan);
      setFavorit(data.favorit);
      setCatatan(data.catatan);
      setStatusBaca(data.statusBaca);
      setRating(data.rating);
      if (data.tema) tema.setPreferensi(data.tema);
      if (data.aksen) aksen.setAksen(data.aksen);
      if (data.urut) setUrutBawaan(data.urut);
      return;
    }
    setBukuTambahan((prev) => {
      const ada = new Set(prev.map((b) => b.id));
      return [...prev, ...data.bukuTambahan.filter((b) => !ada.has(b.id))];
    });
    setFavorit((prev) => [...new Set([...prev, ...data.favorit])]);
    setStatusBaca((prev) => ({ ...data.statusBaca, ...prev }));
    setRating((prev) => ({ ...data.rating, ...prev }));
    setCatatan((prev) => {
      const hasil = { ...prev };
      Object.entries(data.catatan).forEach(([idBuku, daftar]) => {
        const lama = hasil[idBuku] ?? [];
        const ada = new Set(lama.map((c) => c.id));
        hasil[idBuku] = [...lama, ...daftar.filter((c) => !ada.has(c.id))];
      });
      return hasil;
    });
  };

  const onReset = () => {
    setBukuTambahan([]);
    setFavorit([]);
    setCatatan({});
    setStatusBaca({});
    setRating({});
    tema.setPreferensi("sistem");
    aksen.setAksen("biru");
    setUrutBawaan("bawaan");
  };

  // Ringkasan koleksi untuk halaman Pengaturan (hanya buku yang masih ada).
  const ada = new Set(daftarBuku.map((b) => b.id));
  const nilaiRating = Object.entries(rating)
    .filter(([id, v]) => ada.has(id) && v > 0)
    .map(([, v]) => v);
  const statistik = {
    total: daftarBuku.length,
    favorit: favorit.filter((id) => ada.has(id)).length,
    catatan: Object.entries(catatan).reduce((n, [id, d]) => (ada.has(id) ? n + d.length : n), 0),
    sedang: daftarBuku.filter((b) => statusBaca[b.id] === "sedang").length,
    selesai: daftarBuku.filter((b) => statusBaca[b.id] === "selesai").length,
    rataRating: nilaiRating.length ? nilaiRating.reduce((a, b) => a + b, 0) / nilaiRating.length : null,
  };

  const shared = { daftarBuku, favorit, onToggleFavorit, statusBaca, rating };

  return (
    <div className="app">
      <AppBar gelap={tema.gelap} onToggleTema={tema.toggle} />
      <SideNav jumlahFavorit={favorit.length} gelap={tema.gelap} onToggleTema={tema.toggle} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Beranda {...shared} catatan={catatan} />} />
          <Route path="/buku" element={<Katalog {...shared} urutAwal={urutBawaan} />} />
          <Route
            path="/buku/:id"
            element={
              <DetailBuku
                {...shared}
                catatan={catatan}
                onTambahCatatan={onTambahCatatan}
                onHapusCatatan={onHapusCatatan}
                onHapusBuku={onHapusBuku}
                onSetStatus={onSetStatus}
                onSetRating={onSetRating}
                notif={notif}
              />
            }
          />
          <Route
            path="/buku/:id/ubah"
            element={<UbahBuku daftarBuku={daftarBuku} onEditBuku={onEditBuku} notif={notif} />}
          />
          <Route path="/favorit" element={<Favorit {...shared} urutAwal={urutBawaan} />} />
          <Route
            path="/tambah"
            element={<TambahBuku onTambahBuku={onTambahBuku} notif={notif} />}
          />
          <Route
            path="/pengaturan"
            element={
              <Pengaturan
                tema={tema}
                aksen={aksen}
                dataSimpan={{ bukuTambahan, favorit, catatan, statusBaca, rating }}
                urutBawaan={urutBawaan}
                onUrutBawaan={setUrutBawaan}
                statistik={statistik}
                onImpor={onImpor}
                onReset={onReset}
                notif={notif}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BottomNav jumlahFavorit={favorit.length} />
      <Toast notif={notifAktif} onTutup={tutupNotif} />
    </div>
  );
}
