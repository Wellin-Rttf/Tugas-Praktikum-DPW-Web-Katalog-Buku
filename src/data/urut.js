export const OPSI_URUT = [
  { id: "bawaan", label: "Urutan rak" },
  { id: "terbaru", label: "Terbaru" },
  { id: "terlama", label: "Terlama" },
  { id: "judul", label: "Judul A–Z" },
  { id: "penulis", label: "Penulis A–Z" },
];

const teks = (a, b) => a.localeCompare(b, "id", { sensitivity: "base" });

export const urutkan = (daftar, mode) => {
  const s = [...daftar];
  if (mode === "terbaru") return s.sort((a, b) => b.tahun - a.tahun);
  if (mode === "terlama") return s.sort((a, b) => a.tahun - b.tahun);
  if (mode === "judul") return s.sort((a, b) => teks(a.judul, b.judul));
  if (mode === "penulis") return s.sort((a, b) => teks(a.penulis, b.penulis));
  return s;
};

export const cari = (daftar, query) => {
  const k = query.trim().toLowerCase();
  if (!k) return daftar;
  return daftar.filter(
    (b) => b.judul.toLowerCase().includes(k) || b.penulis.toLowerCase().includes(k)
  );
};

export const urutValid = (id) => OPSI_URUT.some((o) => o.id === id);
