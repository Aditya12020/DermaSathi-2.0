import { useState } from "react";
import SkinShader from "../components/SkinShader";

import {
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export default function Auth({
  mode: initialMode = "login",
  setPage,
  onLogin,
  onSignup,
}) {
  const [mode, setMode] = useState(initialMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [age, setAge] = useState("");
  const [skinType, setSkinType] = useState("");
  const [skinConcern, setSkinConcern] = useState("");
  const [skinGoal, setSkinGoal] = useState("");

  const [error, setError] = useState("");

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setPage(nextMode);
  };

  const goHome = () => {
    setError("");
    setPage("home");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter email and password.");
      return;
    }

    /* ---------------- LOGIN ---------------- */

    if (mode === "login") {
      const savedUsers =
        JSON.parse(
          localStorage.getItem("dermasathi_users")
        ) || [];

      const existingUser = savedUsers.find(
        (user) =>
          user.email === normalizedEmail &&
          user.password === password
      );

      if (!existingUser) {
        setError(
          "Invalid email or password. Please sign up first."
        );
        return;
      }

      onLogin(existingUser);
      return;
    }

    /* ---------------- SIGNUP ---------------- */

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!age) {
      setError("Please enter your age.");
      return;
    }

    if (!skinType) {
      setError("Please select your skin type.");
      return;
    }

    if (!skinConcern) {
      setError(
        "Please select your primary skin concern."
      );
      return;
    }

    const savedUsers =
      JSON.parse(
        localStorage.getItem("dermasathi_users")
      ) || [];

    const alreadyExists = savedUsers.some(
      (user) => user.email === normalizedEmail
    );

    if (alreadyExists) {
      setError(
        "An account with this email already exists."
      );
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      age,
      skinType,
      skinConcern,
      skinGoal,
      analyses: 0,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "dermasathi_users",
      JSON.stringify([
        ...savedUsers,
        newUser,
      ])
    );

    onSignup(newUser);
  };

  return (
    <main className="auth">

      {/* ================= LEFT SIDE ================= */}

      <div className="auth-art">
        <SkinShader className="shader" />

        <div className="auth-overlay">
          <span className="eyebrow">
            DERMASATHI
          </span>

          <h1>
            See your skin
            <br />
            <em>differently.</em>
          </h1>

          <p>
            A private, visual and human-centered way
            to explore AI-assisted skin insights.
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div className="auth-form">

        {/* BRAND */}

        <button
          type="button"
          className="brand"
          onClick={goHome}
        >
          <span className="brand-mark">
            D
          </span>

          DermaSathi
        </button>

        {/* BACK TO HOME */}

        <button
          type="button"
          className="auth-home-btn"
          onClick={goHome}
        >
          <ArrowLeft size={15} />
          Back to Explore
        </button>

        {/* TABS */}

        <div className="tabs">
          <button
            type="button"
            className={
              mode === "login"
                ? "selected"
                : ""
            }
            onClick={() => switchMode("login")}
          >
            Sign in
          </button>

          <button
            type="button"
            className={
              mode === "signup"
                ? "selected"
                : ""
            }
            onClick={() => switchMode("signup")}
          >
            Create account
          </button>
        </div>

        {/* HEADING */}

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

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          {mode === "signup" && (
            <label>
              Name

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Your name"
              />
            </label>
          )}

          {/* EMAIL */}

          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
            />
          </label>

          {/* PASSWORD */}

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
            />
          </label>

          {/* SIGNUP QUESTIONS */}

          {mode === "signup" && (
            <>

              {/* CONFIRM PASSWORD */}

              <label>
                Confirm password

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="••••••••"
                />
              </label>

              {/* AGE */}

              <label>
                Age

                <input
                  type="number"
                  min="13"
                  max="100"
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                  placeholder="Your age"
                />
              </label>

              {/* SKIN TYPE */}

              <label>
                Skin type

                <select
                  value={skinType}
                  onChange={(e) =>
                    setSkinType(e.target.value)
                  }
                >
                  <option value="">
                    Select skin type
                  </option>

                  <option value="Normal">
                    Normal
                  </option>

                  <option value="Dry">
                    Dry
                  </option>

                  <option value="Oily">
                    Oily
                  </option>

                  <option value="Combination">
                    Combination
                  </option>

                  <option value="Sensitive">
                    Sensitive
                  </option>
                </select>
              </label>

              {/* SKIN CONCERN */}

              <label>
                Primary skin concern

                <select
                  value={skinConcern}
                  onChange={(e) =>
                    setSkinConcern(e.target.value)
                  }
                >
                  <option value="">
                    Select primary concern
                  </option>

                  <option value="Acne">
                    Acne
                  </option>

                  <option value="Texture">
                    Texture
                  </option>

                  <option value="Pigmentation">
                    Pigmentation
                  </option>

                  <option value="Redness">
                    Redness
                  </option>

                  <option value="Dryness">
                    Dryness
                  </option>

                  <option value="Oiliness">
                    Oiliness
                  </option>

                  <option value="Uneven tone">
                    Uneven tone
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </label>

              {/* SKIN GOAL */}

              <label>
                Main skin goal

                <select
                  value={skinGoal}
                  onChange={(e) =>
                    setSkinGoal(e.target.value)
                  }
                >
                  <option value="">
                    Select your goal
                  </option>

                  <option value="Clearer skin">
                    Clearer skin
                  </option>

                  <option value="Better hydration">
                    Better hydration
                  </option>

                  <option value="Even skin tone">
                    Even skin tone
                  </option>

                  <option value="Reduce texture">
                    Reduce texture
                  </option>

                  <option value="Reduce oiliness">
                    Reduce oiliness
                  </option>

                  <option value="General skin health">
                    General skin health
                  </option>
                </select>
              </label>

            </>
          )}

          {/* ERROR */}

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            className="btn primary full"
          >
            {mode === "login"
              ? "Sign in"
              : "Create account"}

            <ArrowRight size={16} />
          </button>

        </form>

        {/* SECURITY NOTE */}

        <p className="auth-note">
          <ShieldCheck size={15} />

          Your skin data stays under your control.
        </p>

      </div>
    </main>
  );
}