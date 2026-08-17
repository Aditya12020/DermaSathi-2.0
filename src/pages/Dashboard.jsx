import {
  Activity,
  CalendarDays,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function Dashboard({ setPage }) {
  return (
    <main className="app-page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            DERMASATHI / COMMAND CENTER
          </span>

          <h1>
            Your skin story, <em>today.</em>
          </h1>

          <p>
            Welcome back. Here is the latest view of your skin
            journey.
          </p>
        </div>

        <button
          className="btn primary"
          onClick={() => setPage("analysis")}
        >
          New analysis
        </button>
      </div>

      <div className="dash-grid">
        <section className="skin-overview">
          <div className="card-head">
            <span>SKIN OVERVIEW</span>
            <span className="status-dot">LIVE</span>
          </div>

          <div className="overview-art">
            <div className="orb">
              <div className="orb-line" />
              <div className="orb-line two" />
            </div>

            <div className="metric m-a">
              <b>82</b>
              <span>Insight score</span>
            </div>

            <div className="metric m-b">
              <b>Good</b>
              <span>Image quality</span>
            </div>
          </div>

          <div className="layer-row">
            {["Texture", "Tone", "Hydration", "Redness"].map(
              (x) => (
                <button key={x}>{x}</button>
              )
            )}
          </div>
        </section>

        <section className="signals">
          <div className="card-head">
            <span>SKIN SIGNALS</span>
            <Activity size={17} />
          </div>

          {[
            [
              "Surface texture",
              "Moderate",
              "A visible pattern was observed in the image.",
            ],
            [
              "Tone variation",
              "Low",
              "A mild variation in visible tone was mapped.",
            ],
            [
              "Hydration pattern",
              "Moderate",
              "Explore hydration-focused education.",
            ],
          ].map((x) => (
            <div className="signal" key={x[0]}>
              <div>
                <b>{x[0]}</b>
                <span>{x[2]}</span>
              </div>

              <strong>{x[1]}</strong>
            </div>
          ))}
        </section>

        <section className="journey">
          <div className="card-head">
            <span>SKIN JOURNEY</span>
            <CalendarDays size={17} />
          </div>

          {[
            "AUG 17 · Analysis completed",
            "AUG 12 · Insight recorded",
            "AUG 05 · First profile created",
          ].map((x, i) => (
            <div className="timeline" key={x}>
              <i />

              <div>
                <b>{x}</b>

                <span>
                  {i === 0
                    ? "Latest skin scan is ready to explore."
                    : "Your skin timeline keeps a visual record of your activity."}
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="recommend">
          <div className="card-head">
            <span>RECOMMENDED FOR YOU</span>
            <TrendingUp size={17} />
          </div>

          <h3>Understand hydration patterns</h3>

          <p>
            Explore how lighting, environment and visible skin
            texture can affect what an image shows.
          </p>

          <button onClick={() => setPage("resources")}>
            Open knowledge base
            <ChevronRight size={15} />
          </button>
        </section>
      </div>
    </main>
  );
}