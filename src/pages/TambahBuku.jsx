import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GENRE } from "../data/buku.js";
import { normalisasiGenre, pecahGenre } from "../data/genre.js";

const awal = { judul: "", penulis: "", genre: "", tahun: "", sinopsis: "" };

export default function TambahBuku({ onTambahBuku }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(awal);
  const [error, setError] = useState({});

  const tahunSekarang = new Date().getFullYear();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error[name]) setError((prev) => ({ ...prev, [name]: "" }));
  };

  const genreDipilih = pecahGenre(form.genre).map((g) => g.toLowerCase());

  const onToggleSaran = (g) => {
    const daftar = pecahGenre(form.genre);
    const ada = daftar.some((x) => x.toLowerCase() === g.toLowerCase());
    const baru = ada
      ? daftar.filter((x) => x.toLowerCase() !== g.toLowerCase())
      : [...daftar, g];
    setForm((prev) => ({ ...prev, genre: baru.join(", ") }));
    if (error.genre) setError((prev) => ({ ...prev, genre: "" }));
  };

  const validasi = () => {
    const e = {};
    if (!form.judul.trim()) e.judul = "Judul wajib diisi.";
    if (!form.penulis.trim()) e.penulis = "Penulis wajib diisi.";
    const daftarGenre = pecahGenre(form.genre);
    if (daftarGenre.length === 0) e.genre = "Isi minimal satu genre.";
    else if (daftarGenre.some((g) => g.length > 30)) e.genre = "Setiap genre maksimal 30 karakter.";
    const tahun = Number(form.tahun);
    if (!/^\d{4}$/.test(form.tahun.trim()) || tahun < 1900 || tahun > tahunSekarang) {
      e.tahun = `Tahun harus angka antara 1900 dan ${tahunSekarang}.`;
    }
    return e;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const e = validasi();
    setError(e);
    if (Object.keys(e).length > 0) return;

    const bukuBaru = {
      id: `b${Date.now()}`,
      judul: form.judul.trim(),
      penulis: form.penulis.trim(),
      genre: normalisasiGenre(form.genre),
      tahun: Number(form.tahun),
      sinopsis: form.sinopsis.trim() || "Belum ada sinopsis untuk buku ini.",
      gambar: "",
      warna: Math.random() < 0.5 ? "primary" : "tertiary",
    };
    onTambahBuku(bukuBaru);
    navigate(`/buku/${bukuBaru.id}`);
  };

  return (
    <div className="halaman halaman--sempit">
      <h1 className="page-judul">Tambah Buku</h1>
      <form className="form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="judul">Judul Buku</label>
          <input
            id="judul"
            name="judul"
            value={form.judul}
            onChange={onChange}
            aria-invalid={Boolean(error.judul)}
            aria-describedby={error.judul ? "err-judul" : undefined}
          />
          {error.judul && <p id="err-judul" className="field__error">{error.judul}</p>}
        </div>

        <div className="field">
          <label htmlFor="penulis">Penulis</label>
          <input
            id="penulis"
            name="penulis"
            value={form.penulis}
            onChange={onChange}
            aria-invalid={Boolean(error.penulis)}
            aria-describedby={error.penulis ? "err-penulis" : undefined}
          />
          {error.penulis && <p id="err-penulis" className="field__error">{error.penulis}</p>}
        </div>

        <div className="field">
          <label htmlFor="genre">Genre (pisahkan dengan koma)</label>
          <input
            id="genre"
            name="genre"
            value={form.genre}
            onChange={onChange}
            placeholder="Contoh: Fiksi, Sejarah"
            aria-invalid={Boolean(error.genre)}
            aria-describedby={error.genre ? "err-genre" : "bantu-genre"}
          />
          {error.genre ? (
            <p id="err-genre" className="field__error">{error.genre}</p>
          ) : (
            <p id="bantu-genre" className="caption">
              Boleh lebih dari satu. Ketik sendiri atau pilih saran di bawah.
            </p>
          )}
          <div className="chips" aria-label="Saran genre">
            {GENRE.map((g) => (
              <button
                key={g}
                type="button"
                className="chip"
                aria-pressed={genreDipilih.includes(g.toLowerCase())}
                onClick={() => onToggleSaran(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="tahun">Tahun Terbit</label>
          <input
            id="tahun"
            name="tahun"
            inputMode="numeric"
            maxLength={4}
            value={form.tahun}
            onChange={onChange}
            aria-invalid={Boolean(error.tahun)}
            aria-describedby={error.tahun ? "err-tahun" : undefined}
          />
          {error.tahun && <p id="err-tahun" className="field__error">{error.tahun}</p>}
        </div>

        <div className="field">
          <label htmlFor="sinopsis">Sinopsis (opsional)</label>
          <textarea
            id="sinopsis"
            name="sinopsis"
            rows={4}
            value={form.sinopsis}
            onChange={onChange}
          />
        </div>

        <div className="form__aksi">
          <button type="button" className="btn btn--text" onClick={() => navigate("/buku")}>
            Batal
          </button>
          <button type="submit" className="btn btn--filled">
            Simpan Buku
          </button>
        </div>
      </form>
    </div>
  );
}
