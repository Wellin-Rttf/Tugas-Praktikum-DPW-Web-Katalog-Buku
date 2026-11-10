import { Link } from "react-router-dom";
import Ikon from "./Ikon.jsx";
import TombolTema from "./TombolTema.jsx";

export default function AppBar({ gelap, onToggleTema }) {
  return (
    <header className="appbar">
      <div className="appbar__inner">
        <Link to="/" className="appbar__brand">
          <Ikon nama="menu_book" terisi />
          <span>Rak Buku</span>
        </Link>
        <TombolTema gelap={gelap} onToggle={onToggleTema} />
      </div>
    </header>
  );
}
