import { Link, useNavigate, useParams } from "react-router-dom";
import FormBuku from "../components/FormBuku.jsx";
import EmptyState from "../components/EmptyState.jsx";

export default function UbahBuku({ daftarBuku, onEditBuku, notif }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const buku = daftarBuku.find((b) => b.id === id && b.milikSaya);

  if (!buku) {
    return (
      <div className="halaman">
        <EmptyState
          ikon="edit_off"
          judul="Buku tidak bisa diubah"
          deskripsi="Hanya buku yang kamu tambahkan sendiri yang bisa diubah."
          aksi={<Link to="/buku" className="btn btn--filled">Jelajahi Katalog</Link>}
        />
      </div>
    );
  }

  return (
    <FormBuku
      judulHalaman="Ubah Buku"
      labelSimpan="Simpan Perubahan"
      nilaiAwal={buku}
      onBatal={() => navigate(`/buku/${id}`)}
      onSimpan={(data) => {
        onEditBuku(id, data);
        notif("Perubahan disimpan");
        navigate(`/buku/${id}`);
      }}
    />
  );
}
