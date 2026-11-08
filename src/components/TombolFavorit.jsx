import Ikon from "./Ikon.jsx";

export default function TombolFavorit({ aktif, onKlik, varian = "ikon" }) {
  const label = aktif ? "Hapus dari favorit" : "Simpan ke favorit";
  const ikon = aktif ? "favorite" : "favorite_border";

  if (varian === "tombol") {
    return (
      <button
        type="button"
        className={`btn ${aktif ? "btn--tonal" : "btn--filled"}`}
        aria-pressed={aktif}
        onClick={onKlik}
      >
        <Ikon nama="favorite" terisi={aktif} />
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`fav-ikon ${aktif ? "fav-ikon--aktif" : ""}`}
      aria-pressed={aktif}
      aria-label={label}
      title={label}
      onClick={onKlik}
    >
      <Ikon nama={ikon} terisi={aktif} />
    </button>
  );
}
