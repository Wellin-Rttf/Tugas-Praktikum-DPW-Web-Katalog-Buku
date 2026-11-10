import { useState } from "react";
import Ikon from "./Ikon.jsx";

const MAKS = 500;

const formatWaktu = (iso) =>
  new Date(iso).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

export default function CatatanBuku({ daftar, onTambah, onHapus }) {
  const [teks, setTeks] = useState("");
  const bersih = teks.trim();

  const simpan = (e) => {
    e.preventDefault();
    if (!bersih) return;
    onTambah(bersih);
    setTeks("");
  };

  const hapus = (id) => {
    if (window.confirm("Hapus catatan ini?")) onHapus(id);
  };

  return (
    <section className="catatan" aria-labelledby="catatan-judul">
      <h2 id="catatan-judul" className="detail__sub catatan__judul">
        Catatan <span className="caption">({daftar.length})</span>
      </h2>

      <form className="catatan__form" onSubmit={simpan}>
        <div className="field">
          <label htmlFor="catatan-teks">Tulis catatan atau komentar</label>
          <textarea
            id="catatan-teks"
            rows={3}
            maxLength={MAKS}
            value={teks}
            placeholder="Kesan, kutipan favorit, atau pengingat untuk buku ini"
            onChange={(e) => setTeks(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") simpan(e);
            }}
          />
        </div>
        <div className="catatan__aksi">
          <span className="caption">{teks.length}/{MAKS}</span>
          <button type="submit" className="btn btn--filled" disabled={!bersih}>
            <Ikon nama="edit_note" />
            Simpan catatan
          </button>
        </div>
      </form>

      {daftar.length === 0 ? (
        <p className="caption">Belum ada catatan untuk buku ini.</p>
      ) : (
        <ul className="catatan__daftar">
          {daftar.map((c) => (
            <li key={c.id} className="catatan__item">
              <p className="catatan__teks">{c.teks}</p>
              <div className="catatan__meta">
                <span className="caption">{formatWaktu(c.waktu)}</span>
                <button
                  type="button"
                  className="btn-ikon btn-ikon--polos"
                  aria-label="Hapus catatan"
                  title="Hapus catatan"
                  onClick={() => hapus(c.id)}
                >
                  <Ikon nama="delete" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
