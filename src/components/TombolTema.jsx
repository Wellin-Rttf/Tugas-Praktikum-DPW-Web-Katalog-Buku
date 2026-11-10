import Ikon from "./Ikon.jsx";

export default function TombolTema({ gelap, onToggle }) {
  const label = gelap ? "Ganti ke mode terang" : "Ganti ke mode gelap";
  return (
    <button
      type="button"
      className="btn-ikon"
      aria-label={label}
      title={label}
      onClick={onToggle}
    >
      <Ikon nama={gelap ? "light_mode" : "dark_mode"} />
    </button>
  );
}
