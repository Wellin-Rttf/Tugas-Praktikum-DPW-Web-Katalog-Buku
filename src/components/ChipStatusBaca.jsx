import Ikon from "./Ikon.jsx";
import { STATUS } from "../data/status.js";

export default function ChipStatusBaca({ nilai, onPilih }) {
  return (
    <div className="chips" role="group" aria-label="Status baca">
      {STATUS.map((s) => (
        <button
          key={s.id}
          type="button"
          className="chip"
          aria-pressed={nilai === s.id}
          onClick={() => onPilih(nilai === s.id ? null : s.id)}
        >
          <Ikon nama={s.ikon} />
          {s.label}
        </button>
      ))}
    </div>
  );
}
