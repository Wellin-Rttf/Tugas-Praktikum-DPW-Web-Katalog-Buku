import { useNavigate } from "react-router-dom";
import FormBuku from "../components/FormBuku.jsx";

export default function TambahBuku({ onTambahBuku, notif }) {
  const navigate = useNavigate();
  return (
    <FormBuku
      judulHalaman="Tambah Buku"
      labelSimpan="Simpan Buku"
      onBatal={() => navigate("/buku")}
      onSimpan={(data) => {
        const id = onTambahBuku(data);
        notif("Buku disimpan");
        navigate(`/buku/${id}`);
      }}
    />
  );
}
