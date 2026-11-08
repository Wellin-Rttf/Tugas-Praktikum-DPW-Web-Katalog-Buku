import { NavLink } from "react-router-dom";
import Ikon from "./Ikon.jsx";

const menu = [
  { to: "/", label: "Beranda", ikon: "home", end: true },
  { to: "/buku", label: "Katalog", ikon: "menu_book" },
  { to: "/favorit", label: "Favorit", ikon: "favorite" },
  { to: "/tambah", label: "Tambah", ikon: "add_circle" },
];

export default function BottomNav({ jumlahFavorit = 0 }) {
  return (
    <nav className="bottomnav" aria-label="Navigasi bawah">
      {menu.map((m) => (
        <NavLink
          key={m.to}
          to={m.to}
          end={m.end}
          className={({ isActive }) =>
            `bottomnav__item ${isActive ? "bottomnav__item--aktif" : ""}`
          }
        >
          <span className="bottomnav__pil">
            <Ikon nama={m.ikon} />
            {m.to === "/favorit" && jumlahFavorit > 0 && (
              <span className="bottomnav__badge">{jumlahFavorit}</span>
            )}
          </span>
          <span className="bottomnav__label">{m.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
