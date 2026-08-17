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

  const auth = ["login", "signup"];

  const go = (p) => setPage(p);

  let content;

  if (page === "home") {
    content = <Home setPage={go} />;
  } else if (page === "dashboard") {
    content = <Dashboard setPage={go} />;
  } else if (page === "analysis") {
    content = <Analysis setPage={go} />;
  } else if (page === "report") {
    content = <Report />;
  } else if (page === "resources") {
    content = <Resources />;
  } else if (page === "profile") {
    content = <Profile setPage={go} />;
  } else if (page === "settings") {
    content = (
      <Settings
        dark={dark}
        setDark={setDark}
      />
    );
  } else {
    content = <Auth setPage={go} />;
  }

  return (
    <div className={dark ? "app dark" : "app"}>
      {auth.includes(page) ? (
        content
      ) : (
        <>
          <Nav
            page={page}
            setPage={go}
            dark={dark}
            setDark={setDark}
          />

          {content}
        </>
      )}
    </div>
  );
}