import type { Concept } from "@/lib/mockData";

type LearningLogEntry = NonNullable<Concept["learningLogs"]>[number];

interface LearningLogProps {
  log: LearningLogEntry;
  fallbackTopic: string;
  isLast?: boolean;
}

export default function LearningLog({
  log,
  fallbackTopic,
  isLast = false,
}: LearningLogProps) {
  const topic = log.topic || fallbackTopic || "Untitled topic";
  const trigger = log.trigger || "No trigger recorded.";
  const updatedUnderstanding =
    log.updated_understanding ||
    log.updatedUnderstanding ||
    log.updatedModel ||
    "No updated understanding recorded.";

  return (
    <li
      className={`learning-timeline__item${
        isLast ? " learning-timeline__item--last" : ""
      }`}
    >
      <div className="learning-timeline__rail" aria-hidden="true">
        <span className="learning-timeline__dot" />
      </div>

      <article className="learning-timeline__card">
        {log.date ? <p className="learning-timeline__date">{log.date}</p> : null}

        <h3 className="learning-timeline__topic">{topic}</h3>

        <div className="learning-timeline__section">
          <p className="learning-timeline__label">Trigger</p>
          <p className="learning-timeline__text">{trigger}</p>
        </div>

        <div className="learning-timeline__section">
          <p className="learning-timeline__label">Updated understanding</p>
          <p className="learning-timeline__text">{updatedUnderstanding}</p>
        </div>
      </article>
    </li>
  );
}
