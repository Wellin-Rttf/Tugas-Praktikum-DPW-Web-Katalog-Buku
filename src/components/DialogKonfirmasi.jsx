import { useEffect, useId, useRef } from "react";

export default function DialogKonfirmasi({ buka, judul, teks, onTutup, children }) {
  const ref = useRef(null);
  const idJudul = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (buka && !d.open) d.showModal();
    if (!buka && d.open) d.close();
  }, [buka]);

  return (
    <dialog ref={ref} className="dialog" aria-labelledby={idJudul} onClose={onTutup}>
      <h2 id={idJudul} className="dialog__judul">{judul}</h2>
      <p className="dialog__teks">{teks}</p>
      <div className="dialog__aksi">{children}</div>
    </dialog>
  );
}
