import { Link } from "react-router-dom";
import GridBuku from "../components/GridBuku.jsx";
import EmptyState from "../components/EmptyState.jsx";

export default function Favorit({ daftarBuku, favorit, onToggleFavorit }) {
  const daftarFavorit = daftarBuku.filter((b) => favorit.includes(b.id));

  return (
    <div className="halaman">
      <h1 className="page-judul">Favorit</h1>
      {daftarFavorit.length > 0 ? (
        <>
          <p className="hasil-info">{daftarFavorit.length} buku favorit</p>
          <GridBuku
            daftar={daftarFavorit}
            favorit={favorit}
            onToggleFavorit={onToggleFavorit}
          />
        </>
      ) : (
        <EmptyState
          ikon="favorite_border"
          judul="Belum ada buku favorit"
          deskripsi="Tekan ikon hati pada buku untuk menyimpannya di sini."
          aksi={
            <Link to="/buku" className="btn btn--filled">
              Jelajahi Katalog
            </Link>
          }
        />
      )}
    </div>
  );
}
