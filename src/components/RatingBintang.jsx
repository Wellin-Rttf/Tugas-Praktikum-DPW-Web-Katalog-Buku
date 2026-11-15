import Ikon from "./Ikon.jsx";

// Klik bintang yang sama dengan nilai sekarang untuk menghapus rating.
export default function RatingBintang({ nilai = 0, onPilih }) {
  return (
    <div className="bintang" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={nilai === n}
          aria-label={`${n} bintang`}
          title={`${n} bintang`}
          className={`btn-ikon btn-ikon--polos ${n <= nilai ? "btn-ikon--aktif" : ""}`}
          onClick={() => onPilih(nilai === n ? 0 : n)}
        >
          <Ikon nama="star" terisi={n <= nilai} />
        </button>
      ))}
    </div>
  );
}
