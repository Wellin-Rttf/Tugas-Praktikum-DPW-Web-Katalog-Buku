import { NavLink, Link } from "react-router-dom";
import Ikon from "./Ikon.jsx";
import TombolTema from "./TombolTema.jsx";
import { menu } from "../data/menu.js";

export default function SideNav({ jumlahFavorit = 0, gelap, onToggleTema }) {
  return (
    <aside className="sidenav">
      <Link to="/" className="sidenav__brand" aria-label="Rak Buku, ke Beranda">
        <Ikon nama="menu_book" terisi />
        <span className="sidenav__brand-teks">Rak Buku</span>
      </Link>
      <nav className="sidenav__nav" aria-label="Navigasi utama">
        {menu.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            end={m.end}
            className={({ isActive }) =>
              `sidenav__item ${isActive ? "sidenav__item--aktif" : ""}`
            }
          >
            <span className="sidenav__pil">
              <Ikon nama={m.ikon} />
            </span>
            <span className="sidenav__label">{m.label}</span>
            {m.to === "/favorit" && jumlahFavorit > 0 && (
              <span className="sidenav__badge">{jumlahFavorit}</span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="sidenav__tema">
        <TombolTema gelap={gelap} onToggle={onToggleTema} />
      </div>
    </aside>
  );
}
