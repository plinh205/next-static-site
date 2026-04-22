import type { Concept } from "@/lib/mockData";
import LearningLog from "./LearningLog";

type LearningLogEntry = NonNullable<Concept["learningLogs"]>[number];

interface LearningTimelineProps {
  logs: LearningLogEntry[];
  fallbackTopic: string;
}

export default function LearningTimeline({
  logs,
  fallbackTopic,
}: LearningTimelineProps) {
  if (!logs.length) {
    return null;
  }

  return (
    <section className="section-block">
      <h2 className="section-label">Learning Logs</h2>

      <ol className="learning-timeline">
        {logs.map((log, index) => (
          <LearningLog
            key={`${log.date || "log"}-${log.trigger || index}`}
            log={log}
            fallbackTopic={fallbackTopic}
            isLast={index === logs.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}
