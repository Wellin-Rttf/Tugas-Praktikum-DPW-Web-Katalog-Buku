import { Link } from "react-router-dom";
import GridBuku from "../components/GridBuku.jsx";
import Ikon from "../components/Ikon.jsx";

export default function Beranda({ daftarBuku, favorit, onToggleFavorit }) {
  const pilihan = daftarBuku.slice(0, 3);

  return (
    <div className="halaman">
      <section className="hero">
        <h1 className="hero__judul">Temukan bacaan berikutnya</h1>
        <p className="hero__teks">
          Jelajahi koleksi buku fiksi, sejarah, sains, dan biografi. Simpan yang
          kamu suka, atau tambahkan buku sendiri ke rak.
        </p>
        <div className="hero__aksi">
          <Link to="/buku" className="btn btn--filled">
            <Ikon nama="menu_book" />
            Jelajahi Katalog
          </Link>
          <Link to="/tambah" className="btn btn--tonal">
            <Ikon nama="add" />
            Tambah Buku
          </Link>
        </div>
      </section>

      <section>
        <h2 className="section-judul">Buku Pilihan</h2>
        <GridBuku
          daftar={pilihan}
          favorit={favorit}
          onToggleFavorit={onToggleFavorit}
        />
      </section>
    </div>
  );
}
