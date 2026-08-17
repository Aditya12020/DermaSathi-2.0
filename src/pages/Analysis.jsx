import { useState } from "react";
import {
  Check,
  Upload,
  ScanLine,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";

export default function Analysis({ setPage }) {
  const [file, setFile] = useState(null);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    "Image quality check",
    "Image processing",
    "Feature detection",
    "Skin mapping",
    "Insight generation",
  ];

  const start = () => {
    if (!file) return;

    setRunning(true);

    let i = 0;

    const id = setInterval(() => {
      i++;
      setStep(i);

      if (i >= steps.length) {
        clearInterval(id);

        setTimeout(() => {
          setPage("report");
        }, 600);
      }
    }, 700);
  };

  return (
    <main className="analysis-page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            DERMASATHI / SKIN SCAN
          </span>

          <h1>
            Turn an image into a <em>skin map.</em>
          </h1>

          <p>
            Use a clear image for the most useful AI-assisted
            informational insights.
          </p>
        </div>
      </div>

      <div className="scan-layout">
        <section className="scan-stage">
          <div className="scan-grid" />

          {file ? (
            <>
              <img
                className="uploaded"
                src={URL.createObjectURL(file)}
              />

              {running && <div className="scan-line" />}
            </>
          ) : (
            <div className="drop-content">
              <ScanLine size={48} />

              <h2>Place your skin image here</h2>

              <p>JPG, PNG · up to 10MB</p>

              <label className="btn primary">
                <Upload size={17} />

                Choose image

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setFile(e.target.files?.[0])
                  }
                />
              </label>
            </div>
          )}

          <span className="scan-corner tl" />
          <span className="scan-corner br" />
        </section>

        <aside className="scan-panel">
          <span className="tiny">
            ANALYSIS PIPELINE
          </span>

          {steps.map((x, i) => (
            <div
              className={
                "scan-step " +
                (step > i
                  ? "done"
                  : step === i && running
                    ? "current"
                    : "")
              }
              key={x}
            >
              <span>
                {step > i ? (
                  <Check size={13} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>

              <div>
                <b>{x}</b>

                <small>
                  {step > i
                    ? "Complete"
                    : step === i && running
                      ? "Processing"
                      : "Waiting"}
                </small>
              </div>
            </div>
          ))}

          <button
            className="btn primary full"
            disabled={!file || running}
            onClick={start}
          >
            {running ? "Analyzing…" : "Begin analysis"}

            <ArrowRight size={16} />
          </button>

          <p className="disclaimer">
            AI-generated insights are informational and
            should not replace professional medical advice.
          </p>
        </aside>
      </div>
    </main>
  );
}