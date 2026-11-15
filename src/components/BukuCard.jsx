import { Link } from "react-router-dom";
import CoverBuku from "./CoverBuku.jsx";
import TombolFavorit from "./TombolFavorit.jsx";
import Ikon from "./Ikon.jsx";
import { pecahGenre } from "../data/genre.js";
import { labelStatus } from "../data/status.js";

export default function BukuCard({ buku, isFavorit, onToggleFavorit, status, rating = 0 }) {
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
          {(rating > 0 || status) && (
            <div className="buku-card__meta">
              {rating > 0 && (
                <span className="meta-rating" aria-label={`Rating ${rating} dari 5`}>
                  <Ikon nama="star" terisi />
                  {rating}
                </span>
              )}
              {status && <span className="badge-status">{labelStatus(status)}</span>}
            </div>
          )}
        </div>
      </Link>
      {buku.milikSaya && <span className="badge-saya">Buku Saya</span>}
      <div className="buku-card__fav">
        <TombolFavorit aktif={isFavorit} onKlik={() => onToggleFavorit(buku.id)} />
      </div>
    </article>
  );
}
