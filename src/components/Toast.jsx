import { useEffect } from "react";
import Ikon from "./Ikon.jsx";

export default function Toast({ notif, onTutup }) {
  useEffect(() => {
    if (!notif) return undefined;
    const t = setTimeout(onTutup, notif.aksi ? 6000 : 3000);
    return () => clearTimeout(t);
  }, [notif, onTutup]);

  return (
    <div className="toast-wadah" role="status" aria-live="polite">
      {notif && (
        <div key={notif.id} className="toast">
          <Ikon nama="check_circle" terisi />
          <span>{notif.pesan}</span>
          {notif.aksi && (
            <button
              type="button"
              className="btn btn--text"
              onClick={() => {
                notif.aksi.onKlik();
                onTutup();
              }}
            >
              {notif.aksi.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
