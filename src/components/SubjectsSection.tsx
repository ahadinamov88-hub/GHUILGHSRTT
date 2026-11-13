import { ArrowUpRight } from 'lucide-react';
import { buildYoutubeSearchUrl, SUBJECT_STREAMS } from '../data/schoolData';

interface SubjectsSectionProps {
  onSelectTopicForSearch: (topic: string) => void;
}

export function SubjectsSection({ onSelectTopicForSearch }: SubjectsSectionProps) {
  return (
    <section id="fanlar" className="py-16 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-blue-900 mb-2">
            71-Maktab o&apos;quv dasturi
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight text-balance">
            Fanlar va ta&apos;lim yo&apos;nalishlari
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Har bir fan bo&apos;yicha qo&apos;shimcha video darslarni tanlang — mavzu nomi Kitoblar
            qidiruviga avtomatik yoziladi yoki YouTube&apos;da ochiladi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SUBJECT_STREAMS.map((stream) => (
            <div
              key={stream.index}
              className="border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-slate-50/50"
            >
              <div>
                <div className="flex items-center justify-between gap-4 text-xs text-slate-500 pb-4 border-b border-slate-200">
                  <span className="font-mono tabular-nums font-medium text-blue-900">
                    {stream.index}. Yo&apos;nalish
                  </span>
                  <span className="font-mono tabular-nums">{stream.room}</span>
                </div>

                <h3 className="font-serif text-2xl font-semibold text-slate-900 mt-5">
                  {stream.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mt-2.5">
                  {stream.summary}
                </p>

                <ul className="mt-6 divide-y divide-slate-200 border-t border-slate-200">
                  {stream.subjects.map((subject) => (
                    <li
                      key={subject.name}
                      className="py-3 flex items-center justify-between gap-3"
                    >
                      <button
                        type="button"
                        onClick={() => onSelectTopicForSearch(subject.youtubeQuery)}
                        className="text-sm font-medium text-slate-800 hover:text-blue-900 text-left transition-colors cursor-pointer"
                      >
                        {subject.name}
                      </button>

                      <a
                        href={buildYoutubeSearchUrl(subject.youtubeQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${subject.name} — YouTube'da ko'rish`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-600 transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>YouTube</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
