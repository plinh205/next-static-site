import Link from "next/link";
import { getAllConcepts } from "../lib/content";

export default function HomePage({ concepts }) {
  return (
    <main className="page">
      <div className="container">
        <h1 className="page-title">Concepts</h1>

        {concepts.length === 0 ? (
          <p className="text-block muted">No concepts found.</p>
        ) : (
          <ul className="content-list content-list--plain">
            {concepts.map((concept) => (
              <li key={concept.slug}>
                <h2 className="item-title">
                  <Link href={`/concept/${concept.slug}`}>
                    {concept.title || concept.slug}
                  </Link>
                </h2>
                <p className="item-summary muted">
                  {concept.slug}
                </p>
                <p className="item-summary">
                  {concept.summary || "No summary available."}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export function getStaticProps() {
  return {
    props: {
      concepts: getAllConcepts()
    }
  };
}
