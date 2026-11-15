import { useState } from "react";
import { Link } from "react-router-dom";
import { STATUS } from "../data/status.js";
import { punyaGenre, semuaGenre } from "../data/genre.js";
import { cari, urutkan } from "../data/urut.js";
import ChipFilter from "../components/ChipFilter.jsx";
import GridBuku from "../components/GridBuku.jsx";
import EmptyState from "../components/EmptyState.jsx";
import KontrolDaftar from "../components/KontrolDaftar.jsx";
import Ikon from "../components/Ikon.jsx";

export default function Katalog({ daftarBuku, favorit, onToggleFavorit, statusBaca = {}, rating = {}, urutAwal = "bawaan" }) {
  const [query, setQuery] = useState("");
  const [genreAktif, setGenreAktif] = useState("Semua");
  const [urut, setUrut] = useState(urutAwal);
  const [statusAktif, setStatusAktif] = useState("semua");

  const hasil = urutkan(
    cari(
      daftarBuku
        .filter((b) => genreAktif === "Semua" || punyaGenre(b, genreAktif))
        .filter((b) => statusAktif === "semua" || statusBaca[b.id] === statusAktif),
      query
    ),
    urut
  );

  const resetFilter = () => {
    setQuery("");
    setGenreAktif("Semua");
    setStatusAktif("semua");
  };

  return (
    <div className="halaman">
      <h1 className="page-judul">Katalog Buku</h1>

      <KontrolDaftar query={query} onQuery={setQuery} urut={urut} onUrut={setUrut} />

      <div className="chips" role="tablist" aria-label="Filter genre">
        {["Semua", ...semuaGenre(daftarBuku)].map((g) => (
          <ChipFilter
            key={g}
            label={g}
            aktif={genreAktif === g}
            onKlik={() => setGenreAktif(g)}
          />
        ))}
      </div>

      <div className="chips" role="tablist" aria-label="Filter status baca">
        {[{ id: "semua", label: "Semua status" }, ...STATUS].map((s) => (
          <ChipFilter
            key={s.id}
            label={s.label}
            aktif={statusAktif === s.id}
            onKlik={() => setStatusAktif(s.id)}
          />
        ))}
      </div>

      <p className="hasil-info" aria-live="polite">
        {hasil.length} buku ditemukan
      </p>

      {hasil.length > 0 ? (
        <GridBuku daftar={hasil} favorit={favorit} onToggleFavorit={onToggleFavorit} statusBaca={statusBaca} rating={rating} />
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
