import {
  ArrowRight,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import SkinShader from "../components/SkinShader";

export default function Home({ setPage }) {
  const bg = [
    "/assets/dermasathi_see_your_skin_differently/screen.png",
    "/assets/skin_analysis_scanning_environment/screen.png",
    "/assets/dashboard_skin_overview/screen.png",
  ];

  return (
    <main>
      <section className="hero">
        <div className="hero-bg">
          {bg.map((x, i) => (
            <img
              key={x}
              src={x}
              style={{
                animationDelay: `${i * 4}s`,
              }}
            />
          ))}

          <div className="hero-shade" />
        </div>

        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            DERMASATHI / SKIN INTELLIGENCE
          </div>

          <h1>
            See your skin
            <br />
            <em>differently.</em>
          </h1>

          <p>
            AI-assisted skin analysis that turns a simple image
            into understandable skin signals, visual maps and a
            story you can track over time.
          </p>

          <div className="hero-buttons">
            <button
              className="btn primary"
              onClick={() => setPage("analysis")}
            >
              Start Skin Analysis
              <ArrowRight size={17} />
            </button>

            <button
              className="btn ghost"
              onClick={() =>
                document
                  .getElementById("story")
                  .scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore the system
            </button>
          </div>

          <div className="trust">
            <span>
              <ShieldCheck size={15} />
              Private by design
            </span>

            <span>
              <ScanLine size={15} />
              AI-assisted
            </span>

            <span>
              <Sparkles size={15} />
              Informational
            </span>
          </div>
        </div>

        <div className="hero-visual">
          <SkinShader className="shader" />

          <div className="scan-ring" />

          <div className="marker m1">
            TEXTURE <b>mapped</b>
          </div>

          <div className="marker m2">
            TONE <b>observed</b>
          </div>

          <div className="hero-caption">
            INTERACTIVE SKIN SURFACE <span>01</span>
          </div>
        </div>
      </section>

      <section id="story" className="story">
        <div className="section-label">
          01 / THE SKIN EXPLORER
        </div>

        <h2>From surface to signal.</h2>

        <p className="lead">
          Explore the visual language behind an analysis instead
          of staring at another dashboard full of numbers.
        </p>

        <div className="explorer">
          <div className="explorer-surface">
            <SkinShader className="shader" />
            <div className="crosshair" />
          </div>

          <div className="explorer-copy">
            <span className="tiny">
              INTERACTIVE LAYER
            </span>

            <h3>Skin Explorer</h3>

            <p>
              Hover, move and inspect. The interface is designed
              around skin texture, contour and scientific
              imaging—not generic AI decoration.
            </p>

            <div className="signal-list">
              {[
                "Texture",
                "Tone",
                "Hydration",
                "Redness",
              ].map((x, i) => (
                <div key={x}>
                  <i>{String(i + 1).padStart(2, "0")}</i>
                  <span>{x}</span>
                  <b>Explore</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="process">
        <div>
          <div className="section-label">
            02 / HOW IT WORKS
          </div>

          <h2>
            Capture. Analyze.
            <br />
            <em>Understand. Track.</em>
          </h2>
        </div>

        <div className="process-grid">
          {[
            [
              "01",
              "Capture",
              "Upload a clear image and let DermaSathi check image quality first.",
            ],
            [
              "02",
              "Analyze",
              "A visual pipeline maps features and patterns step by step.",
            ],
            [
              "03",
              "Understand",
              "Explore signals with explanations and confidence—not black-box claims.",
            ],
            [
              "04",
              "Track",
              "Compare analyses and build your personal skin journey over time.",
            ],
          ].map((x) => (
            <article key={x[0]}>
              <span>{x[0]}</span>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <span className="eyebrow">
            YOUR SKIN / YOUR STORY
          </span>

          <h2>
            Start your first
            <br />
            <em>skin scan.</em>
          </h2>
        </div>

        <button
          className="btn primary"
          onClick={() => setPage("analysis")}
        >
          Begin analysis
          <ArrowRight size={17} />
        </button>
      </section>
    </main>
  );
}
