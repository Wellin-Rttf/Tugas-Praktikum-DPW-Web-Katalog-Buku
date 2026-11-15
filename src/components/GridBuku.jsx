import BukuCard from "./BukuCard.jsx";

export default function GridBuku({ daftar, favorit, onToggleFavorit, statusBaca = {}, rating = {}, baris = false, empat = false }) {
  return (
    <div className={`grid-buku ${baris ? "grid-buku--baris" : ""} ${empat ? "grid-buku--empat" : ""}`}>
      {daftar.map((buku) => (
        <BukuCard
          key={buku.id}
          buku={buku}
          isFavorit={favorit.includes(buku.id)}
          onToggleFavorit={onToggleFavorit}
          status={statusBaca[buku.id]}
          rating={rating[buku.id]}
        />
      ))}
    </div>
  );
}
