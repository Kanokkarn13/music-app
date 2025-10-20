// src/components/Navbar.tsx
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `btn btn-ghost ${isActive ? "text-primary font-semibold" : ""}`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded ${isActive ? "text-primary font-semibold" : ""}`;

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left: Brand */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Music App</Link>
      </div>

      {/* Right: Desktop nav */}
      <div className="hidden md:flex items-center gap-2">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/songs" className={linkClass}>Top Songs</NavLink>
        <NavLink to="/albums" className={linkClass}>Top Albums</NavLink>
        <NavLink to="/favorites" className={linkClass}>Favorites</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
      </div>

      {/* Right: Mobile hamburger dropdown */}
      <div className="md:hidden flex items-center gap-2">
        <div className="dropdown dropdown-end">
          <button
            className="btn btn-ghost"
            tabIndex={0}
            aria-label="Open navigation menu"
          >
            {/* hamburger icon */}
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
          >
            <li><NavLink to="/" className={mobileLinkClass}>Home</NavLink></li>
            <li><NavLink to="/songs" className={mobileLinkClass}>Top Songs</NavLink></li>
            <li><NavLink to="/albums" className={mobileLinkClass}>Top Albums</NavLink></li>
            <li><NavLink to="/favorites" className={mobileLinkClass}>Favorites</NavLink></li>
            <li><NavLink to="/about" className={mobileLinkClass}>About</NavLink></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
