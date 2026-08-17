export default function Profile({ setPage }) {
  return (
    <main className="app-page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            DERMASATHI / PROFILE
          </span>

          <h1>
            Your skin <em>profile.</em>
          </h1>

          <p>
            A living profile built from what you choose to share.
          </p>
        </div>

        <button
          className="btn primary"
          onClick={() => setPage("settings")}
        >
          Edit profile
        </button>
      </div>

      <div className="profile-grid">
        <section className="profile-card">
          <div className="avatar">A</div>

          <h2>Aditya</h2>

          <p>Skin profile · active</p>

          <div className="profile-facts">
            <div>
              <span>SKIN TYPE</span>
              <b>Combination</b>
            </div>

            <div>
              <span>PRIMARY CONCERN</span>
              <b>Texture</b>
            </div>

            <div>
              <span>ANALYSES</span>
              <b>12</b>
            </div>
          </div>
        </section>

        <section className="profile-story">
          <span className="tiny">YOUR PATTERNS</span>

          <h2>
            A profile that changes with your journey.
          </h2>

          <div className="profile-bars">
            {[
              "Texture",
              "Tone",
              "Hydration",
              "Sun awareness",
            ].map((x, i) => (
              <div key={x}>
                <span>{x}</span>

                <div>
                  <i
                    style={{
                      width: [76, 54, 63, 82][i] + "%",
                    }}
                  />
                </div>

                <b>
                  {[
                    "Moderate",
                    "Low",
                    "Moderate",
                    "Good",
                  ][i]}
                </b>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}