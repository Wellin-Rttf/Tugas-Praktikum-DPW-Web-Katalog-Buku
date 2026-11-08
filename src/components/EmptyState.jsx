import Ikon from "./Ikon.jsx";

export default function EmptyState({ ikon = "menu_book", judul, deskripsi, aksi }) {
  return (
    <div className="empty">
      <div className="empty__ikon">
        <Ikon nama={ikon} />
      </div>
      <h2 className="empty__judul">{judul}</h2>
      {deskripsi && <p className="empty__teks">{deskripsi}</p>}
      {aksi && <div className="empty__aksi">{aksi}</div>}
    </div>
  );
}
