import { NavLink, Link } from "react-router-dom";
import Ikon from "./Ikon.jsx";

const menu = [
  { to: "/", label: "Beranda", end: true },
  { to: "/buku", label: "Katalog" },
  { to: "/favorit", label: "Favorit" },
  { to: "/tambah", label: "Tambah" },
];

export default function AppBar() {
  return (
    <header className="appbar">
      <div className="appbar__inner">
        <Link to="/" className="appbar__brand">
          <Ikon nama="menu_book" terisi />
          <span>Rak Buku</span>
        </Link>
        <nav className="appbar__nav" aria-label="Navigasi utama">
          {menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              end={m.end}
              className={({ isActive }) =>
                `appbar__link ${isActive ? "appbar__link--aktif" : ""}`
              }
            >
              {m.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
