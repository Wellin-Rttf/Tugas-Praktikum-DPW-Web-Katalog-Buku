export default function Ikon({ nama, terisi = false, className = "" }) {
  return (
    <span
      className={`ikon ${terisi ? "ikon--terisi" : ""} ${className}`}
      aria-hidden="true"
    >
      {nama}
    </span>
  );
}
