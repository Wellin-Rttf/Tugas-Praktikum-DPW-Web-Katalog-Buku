import { useState } from "react";
import { Link } from "react-router-dom";
import { GENRE } from "../data/buku.js";
import ChipFilter from "../components/ChipFilter.jsx";
import GridBuku from "../components/GridBuku.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Ikon from "../components/Ikon.jsx";

export default function Katalog({ daftarBuku, favorit, onToggleFavorit }) {
  const [query, setQuery] = useState("");
  const [genreAktif, setGenreAktif] = useState("Semua");

  const onPilihGenre = (genre) => setGenreAktif(genre);

  const kata = query.trim().toLowerCase();
  const hasil = daftarBuku
    .filter((b) => genreAktif === "Semua" || b.genre === genreAktif)
    .filter(
      (b) =>
        b.judul.toLowerCase().includes(kata) ||
        b.penulis.toLowerCase().includes(kata)
    );

  const resetFilter = () => {
    setQuery("");
    setGenreAktif("Semua");
  };

  return (
    <div className="halaman">
      <h1 className="page-judul">Katalog Buku</h1>

      <div className="search">
        <Ikon nama="search" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari judul atau penulis..."
          aria-label="Cari judul atau penulis"
        />
      </div>

      <div className="chips" role="tablist" aria-label="Filter genre">
        {["Semua", ...GENRE].map((g) => (
          <ChipFilter
            key={g}
            label={g}
            aktif={genreAktif === g}
            onKlik={() => onPilihGenre(g)}
          />
        ))}
      </div>

      <p className="hasil-info" aria-live="polite">
        {hasil.length} buku ditemukan
      </p>

      {hasil.length > 0 ? (
        <GridBuku
          daftar={hasil}
          favorit={favorit}
          onToggleFavorit={onToggleFavorit}
        />
      ) : (
        <EmptyState
          ikon="search"
          judul="Buku tidak ditemukan"
          deskripsi="Coba kata kunci lain atau pilih genre yang berbeda."
          aksi={
            <button type="button" className="btn btn--tonal" onClick={resetFilter}>
              Reset pencarian
            </button>
          }
        />
      )}

      <Link to="/tambah" className="fab">
        <Ikon nama="add" />
        Tambah Buku
      </Link>
    </div>
  );
}
