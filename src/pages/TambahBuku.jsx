import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GENRE } from "../data/buku.js";

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

  const validasi = () => {
    const e = {};
    if (!form.judul.trim()) e.judul = "Judul wajib diisi.";
    if (!form.penulis.trim()) e.penulis = "Penulis wajib diisi.";
    if (!form.genre) e.genre = "Pilih salah satu genre.";
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
      genre: form.genre,
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

        <div className="field-row">
          <div className="field">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={form.genre}
              onChange={onChange}
              aria-invalid={Boolean(error.genre)}
              aria-describedby={error.genre ? "err-genre" : undefined}
            >
              <option value="">Pilih genre</option>
              {GENRE.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            {error.genre && <p id="err-genre" className="field__error">{error.genre}</p>}
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
