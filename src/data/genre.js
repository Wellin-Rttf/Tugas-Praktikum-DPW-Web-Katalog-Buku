import { GENRE } from "./buku.js";

export const pecahGenre = (nilai) => {
  const lihat = new Set();
  return String(nilai ?? "")
    .split(",")
    .map((g) => g.trim())
    .filter((g) => {
      const kunci = g.toLowerCase();
      if (!g || lihat.has(kunci)) return false;
      lihat.add(kunci);
      return true;
    });
};

const rapikan = (g) =>
  GENRE.find((x) => x.toLowerCase() === g.toLowerCase()) ??
  g.split(/\s+/).map((k) => k.charAt(0).toUpperCase() + k.slice(1)).join(" ");

export const normalisasiGenre = (teks) => pecahGenre(teks).map(rapikan).join(", ");

export const punyaGenre = (buku, genre) =>
  pecahGenre(buku.genre).some((g) => g.toLowerCase() === genre.toLowerCase());

export const semuaGenre = (daftarBuku) => {
  const hasil = [...GENRE];
  const lihat = new Set(hasil.map((g) => g.toLowerCase()));
  daftarBuku.forEach((b) =>
    pecahGenre(b.genre).forEach((g) => {
      if (!lihat.has(g.toLowerCase())) {
        lihat.add(g.toLowerCase());
        hasil.push(rapikan(g));
      }
    })
  );
  return hasil;
};
