import { useState } from "react";

export default function CoverBuku({ buku, ukuran = "card" }) {
  const [gagal, setGagal] = useState(false);
  const adaGambar = Boolean(buku.gambar) && !gagal;

  return (
    <div className={`cover cover--${ukuran} cover--${buku.warna}`}>
      {adaGambar ? (
        <img
          src={buku.gambar}
          alt={`Cover buku ${buku.judul}`}
          loading={ukuran === "detail" ? "eager" : "lazy"}
          onError={() => setGagal(true)}
        />
      ) : (
        <span className="cover__inisial" role="img" aria-label={`Cover buku ${buku.judul}`}>
          {buku.judul.charAt(0)}
        </span>
      )}
    </div>
  );
}
