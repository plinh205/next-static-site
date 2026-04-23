import type { Concept } from "@/lib/mockData";

type LearningLogEntry = NonNullable<Concept["learningLogs"]>[number];

interface LearningLogProps {
  log: LearningLogEntry;
  fallbackTopic: string;
  isLast?: boolean;
}

export default function LearningLog({ log, fallbackTopic, isLast = false }: LearningLogProps) {
  const topic = log.topic || fallbackTopic || "Untitled topic";
  const trigger = log.trigger || "No trigger recorded.";
  const updatedUnderstanding =
    log.updated_understanding ||
    log.updatedUnderstanding ||
    log.updatedModel ||
    "No updated understanding recorded.";

  return (
    <li className={`grid grid-cols-[24px_1fr] gap-4 ${!isLast ? 'mb-6' : ''}`}>
      <div className="relative flex justify-center" aria-hidden="true">
        <span className="relative z-10 mt-1.5 h-2.5 w-2.5 rounded-full bg-slate-900 border-2 border-white ring-1 ring-slate-300" />
        {!isLast && <div className="absolute top-3 bottom-0 w-px bg-slate-300" />}
      </div>
      <article className={`pb-6 ${!isLast ? 'border-b border-slate-200' : ''}`}>
        {log.date && (
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{log.date}</p>
        )}
        <h3 className="font-bold text-slate-900 mb-3">{topic}</h3>
        <div className="mb-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Trigger</p>
          <p className="text-slate-700 leading-7">{trigger}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Updated understanding</p>
          <p className="text-slate-700 leading-7">{updatedUnderstanding}</p>
        </div>
      </article>
    </li>
  );
}
