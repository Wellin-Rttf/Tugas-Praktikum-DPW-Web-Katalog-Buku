import { Link } from "react-router-dom";
import Ikon from "./Ikon.jsx";

// Top app bar: hanya tampil di layar Compact (< 600px)
export default function AppBar() {
  return (
    <header className="appbar">
      <div className="appbar__inner">
        <Link to="/" className="appbar__brand">
          <Ikon nama="menu_book" terisi />
          <span>Rak Buku</span>
        </Link>
      </div>
    </header>
  );
}
