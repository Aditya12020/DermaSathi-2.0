import {
  Moon,
  Sun,
  UserRound,
  LogOut,
} from "lucide-react";

export default function Nav({
  page,
  setPage,
  dark,
  setDark,
  user,
  onLogout,
}) {
  const links = [
    ["home", "Explore"],
    ["dashboard", "Dashboard"],
    ["analysis", "Skin Scan"],
    ["report", "Reports"],
    ["resources", "Resources"],
  ];

  return (
    <header className="nav">
      <button
        className="brand"
        onClick={() => setPage("home")}
      >
        <span className="brand-mark">D</span>

        <span>
          Derma<span>Sathi</span>
        </span>
      </button>

      <nav>
        {links.map(([id, label]) => (
          <button
            key={id}
            className={
              page === id ? "active" : ""
            }
            onClick={() => setPage(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="nav-actions">
        <button
          className="icon-btn"
          onClick={() => setDark(!dark)}
        >
          {dark ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        <button
          className="profile-mini"
          onClick={() => setPage("profile")}
        >
          <UserRound size={16} />

          {user?.name || "Profile"}
        </button>

        <button
          className="icon-btn"
          onClick={onLogout}
          title="Logout"
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}