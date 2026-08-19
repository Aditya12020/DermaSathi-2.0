import { useState } from "react";

import Nav from "./components/Nav";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Report from "./pages/Report";
import Resources from "./pages/Resources";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export default function App() {
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("dermasathi_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [preview, setPreview] = useState(null);

  const protectedPages = [
    "dashboard",
    "analysis",
    "report",
    "resources",
    "profile",
    "settings",
  ];

  const go = (nextPage) => {
    if (protectedPages.includes(nextPage) && !user) {
      setPage("login");
      return;
    }

    setPage(nextPage);
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem(
      "dermasathi_user",
      JSON.stringify(loggedInUser)
    );

    setPage("dashboard");
  };

  const handleSignup = (newUser) => {
    setUser(newUser);

    localStorage.setItem(
      "dermasathi_user",
      JSON.stringify(newUser)
    );

    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPreview(null);

    localStorage.removeItem("dermasathi_user");

    setPage("home");
  };

  let content;

  if (page === "home") {
    content = <Home setPage={go} />;
  } else if (page === "login" || page === "signup") {
    content = (
      <Auth
        mode={page}
        setPage={go}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    );
  } else if (page === "dashboard") {
    content = <Dashboard setPage={go} />;
  } else if (page === "analysis") {
    content = (
      <Analysis
        setPage={go}
        setPreview={setPreview}
      />
    );
  } else if (page === "report") {
    content = <Report preview={preview} />;
  } else if (page === "resources") {
    content = <Resources />;
  } else if (page === "profile") {
    content = (
      <Profile
        setPage={go}
        user={user}
        onLogout={handleLogout}
      />
    );
  } else if (page === "settings") {
    content = (
      <Settings
        dark={dark}
        setDark={setDark}
      />
    );
  } else {
    content = <Home setPage={go} />;
  }

  const isAuthPage =
    page === "login" || page === "signup";

  return (
    <div className={dark ? "app dark" : "app"}>
      {isAuthPage ? (
        content
      ) : (
        <>
          <Nav
            page={page}
            setPage={go}
            dark={dark}
            setDark={setDark}
            user={user}
            onLogout={handleLogout}
          />

          {content}
        </>
      )}
    </div>
  );
}