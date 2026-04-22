import { Link } from "react-router-dom";
import { getConceptDisplayData } from "@/lib/knowledge";
import type { Concept } from "@/lib/mockData";
import LearningTimeline from "./LearningTimeline";
import RelationList from "./RelationList";

interface ConceptDetailProps {
  concept: Concept;
}

export default function ConceptDetail({ concept }: ConceptDetailProps) {
  const content = getConceptDisplayData(concept);
  const coreMechanismItems =
    content.coreMechanism.length > 0
      ? content.coreMechanism
      : ["No core mechanism has been added yet."];
  const whenToUseItems =
    content.whenToUse.length > 0
      ? content.whenToUse
      : ["No usage guidance has been added yet."];
  const compareRows =
    content.compare.length > 0
      ? content.compare
      : [
          {
            target: "No comparison available",
            difference: "Add compare data to explain how this concept differs from related concepts.",
          },
        ];

  return (
    <>
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        {concept.breadcrumb?.length ? (
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb__link">
              Knowledge Base
            </Link>

            {concept.breadcrumb.map((item) => (
              <div key={item} className="breadcrumb__item">
                <span className="breadcrumb__separator">/</span>
                <span>{item}</span>
              </div>
            ))}
          </nav>
        ) : null}

        <h1 className="page-title">{content.title}</h1>
      </header>

      <div className="section-stack">
        <section className="section-block">
          <h2 className="section-label">Summary</h2>
          <p className="section-text section-text--lead">{content.summary}</p>
        </section>

        <section className="section-block">
          <h2 className="section-label">Mental Model</h2>
          <div className="section-panel section-panel--info">
            <p className="section-text section-text--strong">
              {content.mentalModel}
            </p>
          </div>
        </section>

        <section className="section-block">
          <h2 className="section-label">Core Mechanism</h2>
          <ul className="bullet-list">
            {coreMechanismItems.map((item) => (
              <li key={item} className="bullet-list__item">
                <span className="bullet-list__marker">•</span>
                <span className="section-text">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section-block section-panel section-panel--warm">
          <h2 className="section-label section-label--warm">When to Use</h2>
          <ul className="bullet-list">
            {whenToUseItems.map((item) => (
              <li key={item} className="bullet-list__item">
                <span className="bullet-list__marker bullet-list__marker--warm">
                  ✓
                </span>
                <span className="section-text section-text--strong">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section-block section-panel section-panel--compare">
          <h2 className="section-label section-label--compare">Compare</h2>
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Target</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={`${row.target}-${row.difference}`}>
                    <td>{row.target}</td>
                    <td>{row.difference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <RelationList relations={concept.relations} />

        {concept.learningLogs?.length ? (
          <LearningTimeline
            logs={concept.learningLogs}
            fallbackTopic={content.title}
          />
        ) : null}
      </div>
    </>
  );
}
