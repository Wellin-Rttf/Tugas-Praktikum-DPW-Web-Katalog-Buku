import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="halaman notfound">
      <p className="notfound__kode">404</p>
      <h1 className="notfound__teks">Buku tidak ditemukan di rak ini.</h1>
      <Link to="/" className="btn btn--filled">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
