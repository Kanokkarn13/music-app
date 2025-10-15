// src/components/Navbar.tsx
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `btn btn-ghost ${isActive ? "text-primary font-semibold" : ""}`;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Music App</Link>
      </div>

      <div className="flex-none gap-2">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/songs" className={linkClass}> Top Songs</NavLink>
        <NavLink to="/albums" className={linkClass}>Top Albums</NavLink>
        <NavLink to="/favorites" className={linkClass}>Favorites</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
        
        
        <label className="swap swap-rotate ml-2">
          <input type="checkbox" className="theme-controller" value="dark" />
          <svg className="swap-on h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M5.64 17..."/></svg>
          <svg className="swap-off h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M6.76 4.84..."/></svg>
        </label>
      </div>
    </div>
  );
}
