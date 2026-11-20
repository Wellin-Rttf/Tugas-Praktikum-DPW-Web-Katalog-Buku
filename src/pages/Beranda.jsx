import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import GridBuku from "../components/GridBuku.jsx";
import Ikon from "../components/Ikon.jsx";

const JUMLAH_PILIHAN = 4;

const acak = (daftar) => {
  const a = [...daftar];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Beranda({
  daftarBuku,
  favorit,
  onToggleFavorit,
  catatan = {},
  statusBaca = {},
  rating = {},
}) {
  const [putaran, setPutaran] = useState(0);

  const ada = new Set(daftarBuku.map((b) => b.id));
  const jumlahFavorit = favorit.filter((id) => ada.has(id)).length;
  const jumlahCatatan = Object.entries(catatan).reduce(
    (n, [id, daftar]) => (ada.has(id) ? n + daftar.length : n),
    0
  );
  const jumlahSelesai = daftarBuku.filter((b) => statusBaca[b.id] === "selesai").length;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const idPilihan = useMemo(
    () => acak(daftarBuku.map((b) => b.id)).slice(0, JUMLAH_PILIHAN),
    [daftarBuku.length, putaran]
  );
  const pilihan = idPilihan.map((id) => daftarBuku.find((b) => b.id === id)).filter(Boolean);

  const sedangDibaca = daftarBuku.filter((b) => statusBaca[b.id] === "sedang");
  const props = { favorit, onToggleFavorit, statusBaca, rating };

  return (
    <div className="halaman">
      <section className="hero">
        <h1 className="hero__judul">Temukan bacaan berikutnya</h1>
        <p className="hero__teks">
          Jelajahi koleksi buku fiksi, sejarah, sains, dan biografi. Simpan yang
          kamu suka, atau tambahkan buku sendiri ke rak.
        </p>
        <p className="hero__statistik">
          {daftarBuku.length} buku · {jumlahFavorit} favorit · {jumlahCatatan} catatan · {jumlahSelesai} selesai
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

      {sedangDibaca.length > 0 && (
        <section>
          <h2 className="section-judul">Lanjutkan membaca</h2>
          <GridBuku daftar={sedangDibaca} baris {...props} />
        </section>
      )}

      <section>
        <div className="section-kepala">
          <h2 className="section-judul">Saatnya Baca Buku!</h2>
          {daftarBuku.length > JUMLAH_PILIHAN && (
            <button type="button" className="btn btn--text" onClick={() => setPutaran((n) => n + 1)}>
              <Ikon nama="shuffle" />
              Acak ulang
            </button>
          )}
        </div>
        <GridBuku daftar={pilihan} empat {...props} />
      </section>
    </div>
  );
}
