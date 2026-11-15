import Ikon from "./Ikon.jsx";
import { OPSI_URUT } from "../data/urut.js";

export default function KontrolDaftar({ query, onQuery, urut, onUrut }) {
  return (
    <div className="kontrol">
      <div className="search">
        <Ikon nama="search" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Cari judul atau penulis..."
          aria-label="Cari judul atau penulis"
        />
      </div>
      <label className="urut">
        <Ikon nama="sort" />
        <span className="sr-only">Urutkan</span>
        <select value={urut} onChange={(e) => onUrut(e.target.value)}>
          {OPSI_URUT.map((o) => (
            <option key={o.id} value={o.id}>{o.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
