import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { CampusShowcase } from './components/CampusShowcase';
import { HERO_CAMPUS_IMAGE_PATH } from './components/kitoblarConstants';
import { KitoblarHub } from './components/KitoblarHub';
import { Navbar } from './components/Navbar';
import { ResilientImage } from './components/ResilientImage';
import { SubjectsSection } from './components/SubjectsSection';
import { SCHOOL_METRICS } from './data/schoolData';

export default function App() {
  const [isBooksSearchOpen, setIsBooksSearchOpen] = useState(false);
  const [externalQuerySignal, setExternalQuerySignal] = useState<{
    text: string;
    nonce: number;
  } | null>(null);

  const openAndScrollToBooks = (prefillTopic?: string) => {
    setIsBooksSearchOpen(true);
    if (prefillTopic) {
      setExternalQuerySignal({ text: prefillTopic, nonce: Date.now() });
    }
    const target = document.getElementById('kitoblar');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenBooksSearch={() => openAndScrollToBooks()} />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="asosiy" className="bg-white pt-10 pb-14 lg:pt-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Hero Left Column */}
              <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6">
                <p className="text-sm text-slate-500 mb-4">
                  71-sonli umumiy o&apos;rta ta&apos;lim maktabi <span aria-hidden="true">·</span>{' '}
                  Bilim va ma&apos;rifat markazi
                </p>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] text-balance">
                  71-Maktab: Kitob, bilim va kelajak poydevori
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mt-6 max-w-xl">
                  O&apos;quvchilar va ustozlar uchun yaratilgan zamonaviy ta&apos;lim portali.
                  Pastdagi katta <strong className="font-semibold text-slate-900">Kitoblar</strong>{' '}
                  bo&apos;limini bosing, istalgan asar yoki dars mavzusini yozing va YouTube orqali
                  darhol toping.
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => openAndScrollToBooks()}
                    className="px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white text-sm sm:text-base font-medium rounded-xl inline-flex items-center gap-2.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
                  >
                    <BookOpen className="w-5 h-5" aria-hidden="true" />
                    <span>Kitoblar bo&apos;limini ochish</span>
                  </button>

                  <a
                    href="#fanlar"
                    className="px-5 py-3.5 text-sm sm:text-base font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Search className="w-4 h-4" aria-hidden="true" />
                    <span>Fanlar bilan tanishish</span>
                  </a>
                </div>
              </div>

              {/* Hero Right Column - Full-height Architectural Campus Visual */}
              <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <ResilientImage
                  src={HERO_CAMPUS_IMAGE_PATH}
                  alt="71-Maktabning zamonaviy binosi va obod hovlisi"
                  fallbackTitle="71-Maktab Binosi"
                  className="w-full h-full lg:h-full object-cover object-left"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-5 left-6 right-6 text-white flex flex-wrap items-end justify-between gap-2">
                  <div>
                    <p className="font-serif text-lg sm:text-xl font-semibold">
                      71-Maktab asosiy o&apos;quv majmuasi
                    </p>
                    <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
                      Zamonaviy sinfxonalar <span aria-hidden="true">·</span> Axborot-resurs markazi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column School Metrics Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-8 border-t border-slate-200">
              {SCHOOL_METRICS.map((metric) => (
                <div key={metric.label} className="py-2">
                  <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-slate-900">
                    {metric.value}
                  </p>
                  <p className="text-sm font-medium text-slate-800 mt-1">{metric.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Focal Centerpiece: Big Interactive "Kitoblar" Section with YouTube Search */}
        <KitoblarHub
          isOpen={isBooksSearchOpen}
          onOpen={() => setIsBooksSearchOpen(true)}
          onClose={() => setIsBooksSearchOpen(false)}
          externalQuerySignal={externalQuerySignal}
        />

        {/* Academic Streams & Subjects */}
        <SubjectsSection
          onSelectTopicForSearch={(topic) => openAndScrollToBooks(topic)}
        />

        {/* Campus Reading Hall & Library Culture */}
        <CampusShowcase onOpenBooksSearch={() => openAndScrollToBooks()} />
      </main>

      {/* Clean Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-lg font-bold text-slate-900">71-Maktab</p>
            <p className="text-xs text-slate-500 mt-1">
              71-sonli umumiy o&apos;rta ta&apos;lim maktabi <span aria-hidden="true">·</span> Raqamli
              kutubxona portali
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <a href="#asosiy" className="hover:text-slate-900 transition-colors">
              Asosiy
            </a>
            <a href="#kitoblar" className="hover:text-slate-900 transition-colors">
              Kitoblar
            </a>
            <a href="#fanlar" className="hover:text-slate-900 transition-colors">
              Fanlar
            </a>
            <a href="#kutubxona" className="hover:text-slate-900 transition-colors">
              Kutubxona
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
