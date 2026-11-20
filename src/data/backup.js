import { dataBuku } from "./buku.js";
import { normalisasiGenre } from "./genre.js";
import { urlValid } from "./gambar.js";
import { AKSEN } from "./aksen.js";
import { STATUS } from "./status.js";
import { urutValid } from "./urut.js";

const str = (v, maks) => String(v ?? "").slice(0, maks);
const idBawaan = new Set(dataBuku.map((b) => b.id));

export const bersihkanBackup = (mentah) => {
  if (!mentah || mentah.aplikasi !== "katalog-buku" || typeof mentah.data !== "object" || !mentah.data) {
    return null;
  }
  const d = mentah.data;

  const bukuTambahan = (Array.isArray(d.bukuTambahan) ? d.bukuTambahan : [])
    .filter((b) => b && typeof b.id === "string" && b.id && !idBawaan.has(b.id) && b.judul && b.penulis)
    .map((b) => ({
      id: str(b.id, 40),
      judul: str(b.judul, 200).trim(),
      penulis: str(b.penulis, 200).trim(),
      genre: normalisasiGenre(str(b.genre, 200)) || "Lainnya",
      tahun: Number(b.tahun) || new Date().getFullYear(),
      sinopsis: str(b.sinopsis, 5000) || "Belum ada sinopsis untuk buku ini.",
      gambar: typeof b.gambar === "string" && urlValid(b.gambar) ? b.gambar : "",
      warna: b.warna === "tertiary" ? "tertiary" : "primary",
    }));

  const favorit = (Array.isArray(d.favorit) ? d.favorit : []).filter((x) => typeof x === "string");

  const catatan = Object.fromEntries(
    Object.entries(d.catatan && typeof d.catatan === "object" ? d.catatan : {})
      .filter(([, v]) => Array.isArray(v))
      .map(([k, v]) => [
        k,
        v
          .filter((c) => c && typeof c.id === "string" && typeof c.teks === "string")
          .map((c) => ({ id: c.id, teks: str(c.teks, 500), waktu: str(c.waktu, 40) })),
      ])
  );

  const entri = (o) => Object.entries(o && typeof o === "object" && !Array.isArray(o) ? o : {});
  const statusBaca = Object.fromEntries(
    entri(d.statusBaca).filter(([, v]) => STATUS.some((s) => s.id === v))
  );
  const rating = Object.fromEntries(
    entri(d.rating).filter(([, v]) => Number.isInteger(v) && v >= 1 && v <= 5)
  );

  return {
    statusBaca,
    rating,
    bukuTambahan,
    favorit,
    catatan,
    tema: ["sistem", "terang", "gelap"].includes(d.tema) ? d.tema : null,
    aksen: AKSEN.some((a) => a.id === d.aksen) ? d.aksen : null,
    urut: urutValid(d.urut) ? d.urut : null,
  };
};
