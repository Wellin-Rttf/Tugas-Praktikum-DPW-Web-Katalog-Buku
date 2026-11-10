import { Link } from "react-router-dom";
import CoverBuku from "./CoverBuku.jsx";
import TombolFavorit from "./TombolFavorit.jsx";
import { pecahGenre } from "../data/genre.js";

export default function BukuCard({ buku, isFavorit, onToggleFavorit }) {
  return (
    <article className="buku-card">
      <Link to={`/buku/${buku.id}`} className="buku-card__link">
        <CoverBuku buku={buku} ukuran="card" />
        <div className="buku-card__info">
          <h3 className="judul-buku">{buku.judul}</h3>
          <p className="buku-card__penulis">{buku.penulis}</p>
          <p className="caption">
            {pecahGenre(buku.genre).join(", ")} · {buku.tahun}
          </p>
        </div>
      </Link>
      <div className="buku-card__fav">
        <TombolFavorit aktif={isFavorit} onKlik={() => onToggleFavorit(buku.id)} />
      </div>
    </article>
  );
}
