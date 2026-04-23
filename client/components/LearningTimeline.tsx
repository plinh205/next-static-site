import type { Concept } from "@/lib/mockData";
import LearningLog from "./LearningLog";

type LearningLogEntry = NonNullable<Concept["learningLogs"]>[number];

interface LearningTimelineProps {
  logs: LearningLogEntry[];
  fallbackTopic: string;
}

export default function LearningTimeline({ logs, fallbackTopic }: LearningTimelineProps) {
  if (!logs.length) return null;

  return (
    <section>
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Learning Logs</h2>
      <ol className="flex flex-col">
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
