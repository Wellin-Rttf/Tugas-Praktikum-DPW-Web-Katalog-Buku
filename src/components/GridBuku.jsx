import BukuCard from "./BukuCard.jsx";

export default function GridBuku({ daftar, favorit, onToggleFavorit }) {
  return (
    <div className="grid-buku">
      {daftar.map((buku) => (
        <BukuCard
          key={buku.id}
          buku={buku}
          isFavorit={favorit.includes(buku.id)}
          onToggleFavorit={onToggleFavorit}
        />
      ))}
    </div>
  );
}
