import { Search, Bookmark, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function Resources() {
  const [q, setQ] = useState("");

  const data = [
    [
      "Acne",
      "Understanding visible acne patterns",
      "acne",
    ],
    [
      "Sun protection",
      "Why consistent sun protection matters",
      "sun",
    ],
    [
      "Dry skin",
      "The science of skin hydration",
      "dry",
    ],
    [
      "Pigmentation",
      "Learning about uneven skin tone",
      "tone",
    ],
    [
      "Skincare basics",
      "A calmer way to build a routine",
      "care",
    ],
    [
      "Skin health",
      "What an image can—and cannot—tell you",
      "health",
    ],
  ];

  const list = data.filter(
    (x) =>
      x[0].toLowerCase().includes(q.toLowerCase()) ||
      x[1].toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main className="app-page">
      <div className="page-head">
        <div>
          <span className="eyebrow">
            DERMASATHI / KNOWLEDGE BASE
          </span>

          <h1>
            Learn about <em>your skin.</em>
          </h1>

          <p>
            Clear, educational resources designed to help you
            understand skin health.
          </p>
        </div>
      </div>

      <div className="resource-tools">
        <div className="search">
          <Search size={18} />

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the knowledge base"
          />
        </div>

        <div className="chips">
          {[
            "All",
            "Acne",
            "Dry skin",
            "Pigmentation",
          ].map((x) => (
            <button key={x}>{x}</button>
          ))}
        </div>
      </div>

      <div className="resource-grid">
        {list.map((x, i) => (
          <article
            className="resource"
            key={x[1]}
          >
            <div className={`resource-img r${i}`}>
              <span>{x[0]}</span>
            </div>

            <div className="resource-body">
              <span className="tiny">
                {x[0].toUpperCase()}
              </span>

              <h3>{x[1]}</h3>

              <p>
                Explore an approachable explanation with visual
                examples and practical context.
              </p>

              <div>
                <button>
                  <Bookmark size={15} />
                  Save
                </button>

                <button>
                  Read
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}