import { useState } from "react";
import {
  ChevronDown,
  Info,
  SlidersHorizontal,
} from "lucide-react";

export default function Report() {
  const [layer, setLayer] = useState("Texture");

  const layers = [
    "Texture",
    "Tone",
    "Hydration",
    "Redness",
    "Oiliness",
    "Pigmentation",
  ];

  return (
    <main className="app-page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            ANALYSIS / 17 AUG 2026
          </span>

          <h1>
            Your <em>skin report.</em>
          </h1>

          <p>
            An informational visual summary generated from your
            uploaded image.
          </p>
        </div>

        <button className="btn ghost">
          Export report
        </button>
      </div>

      <div className="report-grid">
        <section className="skin-map">
          <div className="map-toolbar">
            <span>SKIN MAP</span>

            <button>
              <SlidersHorizontal size={15} />
              Layers
            </button>
          </div>

          <div className="map-art">
            <div className="face-shape" />

            <div className="map-point p1">A</div>

            <div className="map-point p2">B</div>
          </div>

          <div className="layer-controls">
            {layers.map((x) => (
              <button
                className={layer === x ? "selected" : ""}
                onClick={() => setLayer(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
        </section>

        <section className="report-side">
          <div className="score">
            <span>OVERALL INSIGHT</span>

            <b>82</b>

            <small>
              Based on visible image patterns
            </small>
          </div>

          <article className="report-block">
            <span className="tiny">
              SIGNAL / 01
            </span>

            <h3>Surface texture</h3>

            <p>
              A moderate visible surface pattern was mapped.
              Image conditions can influence this observation.
            </p>

            <div className="confidence">
              <span>Confidence</span>

              <div>
                <i style={{ width: "76%" }} />
              </div>

              <b>Moderate</b>
            </div>
          </article>

          <article className="report-block">
            <span className="tiny">
              WHY DID DERMASATHI NOTICE THIS?
            </span>

            <h3>Explainable insight</h3>

            <p>
              The system compares visible image features
              against patterns it can measure. This is not a
              medical diagnosis.
            </p>

            <button className="text-btn">
              View explanation
              <ChevronDown size={15} />
            </button>
          </article>

          <div className="notice">
            <Info size={17} />

            <span>
              AI-generated insights are informational and should
              not replace professional medical advice.
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}