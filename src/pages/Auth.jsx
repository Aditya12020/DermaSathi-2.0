import { useState } from "react";
import SkinShader from "../components/SkinShader";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Auth({ setPage }) {
  const [mode, setMode] = useState("login");

  return (
    <main className="auth">
      <div className="auth-art">
        <SkinShader className="shader" />

        <div className="auth-overlay">
          <span className="eyebrow">DERMASATHI</span>

          <h1>
            See your skin
            <br />
            <em>differently.</em>
          </h1>

          <p>
            A private, visual and human-centered way to
            explore AI-assisted skin insights.
          </p>
        </div>
      </div>

      <div className="auth-form">
        <button
          className="brand"
          onClick={() => setPage("home")}
        >
          <span className="brand-mark">D</span>
          DermaSathi
        </button>

        <div className="tabs">
          <button
            className={mode === "login" ? "selected" : ""}
            onClick={() => setMode("login")}
          >
            Sign in
          </button>

          <button
            className={mode === "signup" ? "selected" : ""}
            onClick={() => setMode("signup")}
          >
            Create account
          </button>
        </div>

        <span className="tiny">
          {mode === "login"
            ? "WELCOME BACK"
            : "YOUR SKIN JOURNEY STARTS HERE"}
        </span>

        <h2>
          {mode === "login"
            ? "Access your skin workspace."
            : "Create your private skin profile."}
        </h2>

        <label>
          Email
          <input
            type="email"
            placeholder="you@example.com"
          />
        </label>

        {mode === "signup" && (
          <label>
            Name
            <input placeholder="Your name" />
          </label>
        )}

        <label>
          Password
          <input
            type="password"
            placeholder="••••••••"
          />
        </label>

        {mode === "signup" && (
          <label>
            Confirm password
            <input
              type="password"
              placeholder="••••••••"
            />
          </label>
        )}

        <button
          className="btn primary full"
          onClick={() => setPage("dashboard")}
        >
          {mode === "login"
            ? "Sign in"
            : "Create account"}

          <ArrowRight size={16} />
        </button>

        <p className="auth-note">
          <ShieldCheck size={15} />
          Your skin data stays under your control.
        </p>
      </div>
    </main>
  );
}