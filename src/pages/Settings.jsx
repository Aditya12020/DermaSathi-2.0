import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function Settings({ dark, setDark }) {
  const [not, setNot] = useState(true);

  return (
    <main className="app-page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            DERMASATHI / SETTINGS
          </span>

          <h1>
            Make it <em>yours.</em>
          </h1>

          <p>
            Appearance, notifications and privacy controls.
          </p>
        </div>
      </div>

      <div className="settings-list">
        <div className="setting">
          <div>
            <b>Appearance</b>
            <span>Choose how DermaSathi looks.</span>
          </div>

          <button
            className="toggle-row"
            onClick={() => setDark(!dark)}
          >
            <i className={dark ? "on" : ""} />

            {dark ? "Dark" : "Light"}
          </button>
        </div>

        <div className="setting">
          <div>
            <b>Analysis notifications</b>
            <span>
              Receive updates when a report is ready.
            </span>
          </div>

          <button
            className="toggle-row"
            onClick={() => setNot(!not)}
          >
            <i className={not ? "on" : ""} />

            {not ? "On" : "Off"}
          </button>
        </div>

        {[
          "Privacy & data",
          "Security",
          "Account preferences",
        ].map((x) => (
          <button
            className="setting link"
            key={x}
          >
            <div>
              <b>{x}</b>

              <span>
                Review your DermaSathi controls.
              </span>
            </div>

            <ChevronRight />
          </button>
        ))}
      </div>
    </main>
  );
}