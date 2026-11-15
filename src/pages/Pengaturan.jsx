import { useRef, useState } from "react";
import Ikon from "../components/Ikon.jsx";
import DialogKonfirmasi from "../components/DialogKonfirmasi.jsx";
import { AKSEN } from "../data/aksen.js";
import { bersihkanBackup } from "../data/backup.js";
import { OPSI_URUT } from "../data/urut.js";

const OPSI_TEMA = [
  { id: "sistem", label: "Sistem", ikon: "brightness_auto" },
  { id: "terang", label: "Terang", ikon: "light_mode" },
  { id: "gelap", label: "Gelap", ikon: "dark_mode" },
];

const formatAngka = (n) => n.toLocaleString("id-ID", { maximumFractionDigits: 1 });

export default function Pengaturan({
  tema,
  aksen,
  dataSimpan,
  urutBawaan,
  onUrutBawaan,
  statistik,
  onImpor,
  onReset,
  notif,
}) {
  const inputRef = useRef(null);
  const [dialog, setDialog] = useState(null); // "impor" | "reset" | null
  const [tertunda, setTertunda] = useState(null);

  const ekspor = () => {
    const isi = {
      aplikasi: "katalog-buku",
      versi: 1,
      diekspor: new Date().toISOString(),
      data: { ...dataSimpan, tema: tema.preferensi, aksen: aksen.aksen, urut: urutBawaan },
    };
    const blob = new Blob([JSON.stringify(isi, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `katalog-buku-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notif("Data diekspor");
  };

  const onPilihBerkas = async (e) => {
    const berkas = e.target.files?.[0];
    e.target.value = "";
    if (!berkas) return;
    try {
      if (berkas.size > 5 * 1024 * 1024) throw new Error("terlalu besar");
      const data = bersihkanBackup(JSON.parse(await berkas.text()));
      if (!data) throw new Error("bentuk salah");
      setTertunda(data);
      setDialog("impor");
    } catch {
      notif("Berkas cadangan tidak valid");
    }
  };

  const impor = (mode) => {
    onImpor(tertunda, mode);
    setDialog(null);
    setTertunda(null);
    notif(mode === "ganti" ? "Data diganti" : "Data digabungkan");
  };

  const reset = () => {
    onReset();
    setDialog(null);
    notif("Semua data direset");
  };

  return (
    <div className="halaman halaman--sempit">
      <h1 className="page-judul">Pengaturan</h1>

      <section className="panel" aria-labelledby="pengaturan-tampilan">
        <h2 id="pengaturan-tampilan" className="panel__judul">Tampilan</h2>

        <div className="panel__grup">
          <p className="panel__sub" id="label-tema">Tema</p>
          <div className="segmen" role="radiogroup" aria-labelledby="label-tema">
            {OPSI_TEMA.map((o) => (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={tema.preferensi === o.id}
                className="segmen__item"
                onClick={() => tema.setPreferensi(o.id)}
              >
                <Ikon nama={tema.preferensi === o.id ? "check" : o.ikon} />
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel__grup">
          <p className="panel__sub" id="label-aksen">Warna aksen</p>
          <div className="aksen" role="radiogroup" aria-labelledby="label-aksen">
            {AKSEN.map((a) => (
              <button
                key={a.id}
                type="button"
                role="radio"
                aria-checked={aksen.aksen === a.id}
                className="aksen__item"
                onClick={() => aksen.setAksen(a.id)}
              >
                <span className="aksen__swatch" style={{ background: a.swatch }}>
                  <Ikon nama="check" />
                </span>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="panel" aria-labelledby="pengaturan-katalog">
        <h2 id="pengaturan-katalog" className="panel__judul">Katalog</h2>
        <div className="field">
          <label htmlFor="urut-bawaan">Urutan bawaan</label>
          <select
            id="urut-bawaan"
            value={urutBawaan}
            onChange={(e) => onUrutBawaan(e.target.value)}
          >
            {OPSI_URUT.map((o) => (
              <option key={o.id} value={o.id}>{o.label}</option>
            ))}
          </select>
          <p className="caption">Dipakai saat halaman Katalog dan Favorit dibuka.</p>
        </div>
      </section>

      <section className="panel" aria-labelledby="pengaturan-ringkasan">
        <h2 id="pengaturan-ringkasan" className="panel__judul">Ringkasan koleksi</h2>
        <dl className="statistik">
          {[
            ["Total buku", statistik.total],
            ["Favorit", statistik.favorit],
            ["Catatan", statistik.catatan],
            ["Sedang dibaca", statistik.sedang],
            ["Selesai", statistik.selesai],
            ["Rata-rata rating", statistik.rataRating === null ? "–" : `${formatAngka(statistik.rataRating)} ★`],
          ].map(([label, nilai]) => (
            <div key={label} className="statistik__item">
              <dd className="statistik__nilai">{nilai}</dd>
              <dt className="statistik__label">{label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="panel" aria-labelledby="pengaturan-data">
        <h2 id="pengaturan-data" className="panel__judul">Data</h2>
        <p className="caption">
          Data tersimpan di browser ini saja. Ekspor untuk membuat cadangan atau memindahkannya ke perangkat lain.
        </p>
        <div className="panel__aksi">
          <button type="button" className="btn btn--tonal" onClick={ekspor}>
            <Ikon nama="download" />
            Ekspor JSON
          </button>
          <button type="button" className="btn btn--tonal" onClick={() => inputRef.current?.click()}>
            <Ikon nama="upload" />
            Impor JSON
          </button>
          <button type="button" className="btn btn--text btn--bahaya" onClick={() => setDialog("reset")}>
            <Ikon nama="delete_forever" />
            Reset semua data
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          tabIndex={-1}
          onChange={onPilihBerkas}
        />
      </section>

      <DialogKonfirmasi
        buka={dialog === "impor"}
        judul="Impor data"
        teks={`Berkas berisi ${tertunda?.bukuTambahan.length ?? 0} buku tambahan, ${tertunda?.favorit.length ?? 0} favorit. Gabungkan dengan data sekarang, atau ganti semuanya (termasuk tema dan aksen)?`}
        onTutup={() => setDialog(null)}
      >
        <button type="button" className="btn btn--text" onClick={() => setDialog(null)}>Batal</button>
        <button type="button" className="btn btn--text" onClick={() => impor("gabung")}>Gabungkan</button>
        <button type="button" className="btn btn--filled" onClick={() => impor("ganti")}>Ganti</button>
      </DialogKonfirmasi>

      <DialogKonfirmasi
        buka={dialog === "reset"}
        judul="Reset semua data?"
        teks="Buku tambahan, favorit, catatan, status baca, rating, tema, aksen, dan urutan bawaan akan dikembalikan ke awal. Tindakan ini tidak bisa dibatalkan."
        onTutup={() => setDialog(null)}
      >
        <button type="button" className="btn btn--text" onClick={() => setDialog(null)}>Batal</button>
        <button type="button" className="btn btn--text btn--bahaya" onClick={reset}>Reset</button>
      </DialogKonfirmasi>
    </div>
  );
}
