import { useState } from "react";
import { Link } from "react-router-dom";
import GridBuku from "../components/GridBuku.jsx";
import EmptyState from "../components/EmptyState.jsx";
import KontrolDaftar from "../components/KontrolDaftar.jsx";
import { cari, urutkan } from "../data/urut.js";

export default function Favorit({ daftarBuku, favorit, onToggleFavorit, statusBaca = {}, rating = {}, urutAwal = "bawaan" }) {
  const [query, setQuery] = useState("");
  const [urut, setUrut] = useState(urutAwal);

  const daftarFavorit = daftarBuku.filter((b) => favorit.includes(b.id));
  const hasil = urutkan(cari(daftarFavorit, query), urut);

  return (
    <div className="halaman">
      <h1 className="page-judul">Favorit</h1>
      {daftarFavorit.length === 0 ? (
        <EmptyState
          ikon="favorite_border"
          judul="Belum ada buku favorit"
          deskripsi="Tekan ikon hati pada buku untuk menyimpannya di sini."
          aksi={<Link to="/buku" className="btn btn--filled">Jelajahi Katalog</Link>}
        />
      ) : (
        <>
          <KontrolDaftar query={query} onQuery={setQuery} urut={urut} onUrut={setUrut} />
          <p className="hasil-info" aria-live="polite">
            {query.trim() ? `${hasil.length} dari ${daftarFavorit.length} buku favorit` : `${daftarFavorit.length} buku favorit`}
          </p>
          {hasil.length > 0 ? (
            <GridBuku daftar={hasil} favorit={favorit} onToggleFavorit={onToggleFavorit} statusBaca={statusBaca} rating={rating} />
          ) : (
            <EmptyState
              ikon="search"
              judul="Tidak ada yang cocok"
              deskripsi="Coba kata kunci lain."
              aksi={
                <button type="button" className="btn btn--tonal" onClick={() => setQuery("")}>
                  Reset pencarian
                </button>
              }
            />
          )}
        </>
      )}
    </div>
  );
}
