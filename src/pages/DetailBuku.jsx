import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CoverBuku from "../components/CoverBuku.jsx";
import TombolFavorit from "../components/TombolFavorit.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Ikon from "../components/Ikon.jsx";
import CatatanBuku from "../components/CatatanBuku.jsx";
import ChipStatusBaca from "../components/ChipStatusBaca.jsx";
import RatingBintang from "../components/RatingBintang.jsx";
import DialogKonfirmasi from "../components/DialogKonfirmasi.jsx";
import { pecahGenre } from "../data/genre.js";

export default function DetailBuku({
  daftarBuku,
  favorit,
  onToggleFavorit,
  catatan = {},
  onTambahCatatan,
  onHapusCatatan,
  onHapusBuku,
  statusBaca = {},
  rating = {},
  onSetStatus,
  onSetRating,
  notif,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dialogHapus, setDialogHapus] = useState(false);
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

  const hapus = () => {
    setDialogHapus(false);
    onHapusBuku(buku.id);
    notif("Buku dihapus");
    navigate("/buku");
  };

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
          <div className="chips">
            {buku.milikSaya && <span className="badge-saya badge-saya--inline">Buku Saya</span>}
            {pecahGenre(buku.genre).map((g) => (
              <span key={g} className="chip chip--statis">{g}</span>
            ))}
          </div>
          <div className="detail__aksi">
            <TombolFavorit
              varian="tombol"
              aktif={favorit.includes(buku.id)}
              onKlik={() => onToggleFavorit(buku.id)}
            />
            {buku.milikSaya && (
              <>
                <Link to={`/buku/${buku.id}/ubah`} className="btn btn--tonal">
                  <Ikon nama="edit" />
                  Edit
                </Link>
                <button type="button" className="btn btn--text btn--bahaya" onClick={() => setDialogHapus(true)}>
                  <Ikon nama="delete" />
                  Hapus
                </button>
              </>
            )}
          </div>
          <div className="detail__atur">
            <span className="panel__sub">Status baca</span>
            <ChipStatusBaca nilai={statusBaca[buku.id]} onPilih={(s) => onSetStatus(buku.id, s)} />
          </div>
          <div className="detail__atur">
            <span className="panel__sub">Rating</span>
            <RatingBintang nilai={rating[buku.id] ?? 0} onPilih={(n) => onSetRating(buku.id, n)} />
          </div>
          <h2 className="detail__sub">Sinopsis</h2>
          <p className="detail__sinopsis">{buku.sinopsis}</p>

          <CatatanBuku
            daftar={catatan[buku.id] ?? []}
            onTambah={(teks) => onTambahCatatan(buku.id, teks)}
            onHapus={(idCatatan) => onHapusCatatan(buku.id, idCatatan)}
          />
        </div>
      </div>

      {buku.milikSaya && (
        <DialogKonfirmasi
          buka={dialogHapus}
          judul="Hapus buku ini?"
          teks={`“${buku.judul}” akan dihapus beserta catatannya dan statusnya di favorit. Tindakan ini tidak bisa dibatalkan.`}
          onTutup={() => setDialogHapus(false)}
        >
          <button type="button" className="btn btn--text" onClick={() => setDialogHapus(false)}>Batal</button>
          <button type="button" className="btn btn--text btn--bahaya" onClick={hapus}>Hapus</button>
        </DialogKonfirmasi>
      )}
    </div>
  );
}
