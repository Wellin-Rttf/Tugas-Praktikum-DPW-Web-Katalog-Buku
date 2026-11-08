import { Link, useParams } from "react-router-dom";
import CoverBuku from "../components/CoverBuku.jsx";
import TombolFavorit from "../components/TombolFavorit.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Ikon from "../components/Ikon.jsx";

export default function DetailBuku({ daftarBuku, favorit, onToggleFavorit }) {
  const { id } = useParams();
  const buku = daftarBuku.find((b) => b.id === id);

  if (!buku) {
    return (
      <div className="halaman">
        <EmptyState
          ikon="menu_book"
          judul="Buku tidak ditemukan"
          deskripsi="Buku dengan alamat ini tidak ada di katalog."
          aksi={
            <Link to="/buku" className="btn btn--filled">
              Jelajahi Katalog
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="halaman">
      <Link to="/buku" className="btn btn--text kembali">
        <Ikon nama="arrow_back" />
        Kembali
      </Link>

      <div className="detail">
        <CoverBuku buku={buku} ukuran="detail" />
        <div className="detail__info">
          <h1 className="detail__judul">{buku.judul}</h1>
          <p className="detail__meta">
            {buku.penulis} · {buku.tahun}
          </p>
          <span className="chip chip--statis">{buku.genre}</span>
          <div className="detail__aksi">
            <TombolFavorit
              varian="tombol"
              aktif={favorit.includes(buku.id)}
              onKlik={() => onToggleFavorit(buku.id)}
            />
          </div>
          <h2 className="detail__sub">Sinopsis</h2>
          <p className="detail__sinopsis">{buku.sinopsis}</p>
        </div>
      </div>
    </div>
  );
}
