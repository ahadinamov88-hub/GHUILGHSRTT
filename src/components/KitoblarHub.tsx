import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  BookOpen,
  History,
  Play,
  Search,
  X,
} from 'lucide-react';
import {
  BOOK_CATEGORIES_ORDER,
  KITOBLAR_IMAGE_PATH,
} from './kitoblarConstants';
import {
  buildYoutubeSearchUrl,
  QUICK_SEARCH_TOPICS,
  SCHOOL_BOOKS,
  type BookCategory,
} from '../data/schoolData';
import { ResilientImage } from './ResilientImage';

interface KitoblarHubProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  externalQuerySignal: { text: string; nonce: number } | null;
}

const STORAGE_KEY = 'maktab71_recent_youtube_searches';

export function KitoblarHub({
  isOpen,
  onOpen,
  onClose,
  externalQuerySignal,
}: KitoblarHubProps) {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const [activeCategory, setActiveCategory] = useState<BookCategory>('Barchasi');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((item): item is string => typeof item === 'string').slice(0, 6);
        }
      }
    } catch {
      // Ignore storage access errors
    }
    return [];
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (externalQuerySignal && externalQuerySignal.text) {
      setQuery(externalQuerySignal.text);
      setValidationError('');
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
    }
  }, [externalQuerySignal]);

  const saveRecentSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setRecentSearches((prev) => {
      const next = [clean, ...prev.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage write errors
      }
      return next;
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    const clean = query.trim();
    if (!clean) {
      e.preventDefault();
      setValidationError("Iltimos, avval biror kitob yoki mavzu nomini yozing.");
      inputRef.current?.focus();
      return;
    }

    setValidationError('');
    setLastSearched(clean);
    saveRecentSearch(clean);
    // Form submits natively to https://www.youtube.com/results?search_query=... in target="_blank"
  };

  const handleQuickTopicSelect = (topic: string) => {
    setQuery(topic);
    setValidationError('');
    inputRef.current?.focus();
  };

  const filteredBooks =
    activeCategory === 'Barchasi'
      ? SCHOOL_BOOKS
      : SCHOOL_BOOKS.filter((book) => book.category === activeCategory);

  const trimmedQuery = query.trim();

  return (
    <section id="kitoblar" className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-medium text-blue-900 mb-2">
              71-Maktab · Raqamli kutubxona va video darslar
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight text-balance">
              Kitoblar bo&apos;limi
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Kitob, muallif yoki dars mavzusini kiriting va YouTube orqali video darslar hamda audio
            kitoblarni bir zumda toping.
          </p>
        </div>

        {/* Big Focal "Kitoblar" Interactive Area */}
        {!isOpen ? (
          <div
            role="button"
            tabIndex={0}
            onClick={onOpen}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen();
              }
            }}
            aria-label="Kitoblar bo'limini ochish va YouTube'dan qidirish"
            className="group w-full text-left bg-white border border-slate-200 hover:border-blue-900/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-[400px] overflow-hidden bg-slate-100">
                <ResilientImage
                  src={KITOBLAR_IMAGE_PATH}
                  alt="71-Maktab kutubxonasidagi kitob javonlari va o'quv zali"
                  fallbackTitle="71-Maktab Kutubxonasi"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-mono tracking-wide text-slate-200">
                    AXBOROT-RESURS MARKAZI · 12 400+ KITOB
                  </p>
                  <p className="text-sm text-slate-100 mt-1">
                    Darsliklar, audio kitoblar va video darslar qidiruvi
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                    <BookOpen className="w-5 h-5 text-blue-900" aria-hidden="true" />
                    <span>71-Maktab kutubxonasi</span>
                    <span aria-hidden="true">·</span>
                    <span>YouTube integratsiyasi</span>
                  </div>

                  <h3 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                    Kitoblar
                  </h3>

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg mb-8">
                    Bu yerni bosing — istagan kitobingiz yoki mavzu nomini yozing va{' '}
                    <strong className="font-semibold text-slate-900">YouTube</strong> tugmasini
                    bosing. Yozgan narsangiz to&apos;g&apos;ridan-to&apos;g&apos;ri YouTube&apos;dan chiqadi.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-100">
                  <span className="inline-flex items-center gap-3 px-6 py-3.5 bg-blue-900 group-hover:bg-blue-800 text-white text-base font-medium rounded-xl transition-colors whitespace-nowrap shrink-0">
                    <Search className="w-5 h-5" aria-hidden="true" />
                    <span>Kitoblarni ochish va yozish</span>
                  </span>
                  <span className="text-sm text-slate-500 whitespace-nowrap">
                    Bosing va yozishni boshlang
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Opened Kitoblar Header Strip */}
            <div className="px-6 sm:px-10 py-6 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight">
                    Kitoblar
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Nimadir yozing va YouTube tugmasini bosing — natijalar YouTube&apos;dan chiqadi
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
              >
                Yopish
              </button>
            </div>

            {/* Search Input & YouTube Action Form */}
            <div className="p-6 sm:p-10">
              <form
                action="https://www.youtube.com/results"
                method="get"
                target="_blank"
                onSubmit={handleFormSubmit}
                className="space-y-4"
                noValidate
              >
                <label
                  htmlFor="kitoblar-youtube-input"
                  className="block text-sm font-medium text-slate-700"
                >
                  Kitob nomi, muallif yoki dars mavzusini yozing
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search
                      className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      ref={inputRef}
                      id="kitoblar-youtube-input"
                      name="search_query"
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        if (validationError) setValidationError('');
                      }}
                      placeholder="Masalan: O'tkan kunlar, Matematika 8-sinf, Alisher Navoiy..."
                      autoComplete="off"
                      className="w-full h-14 pl-12 pr-12 text-base sm:text-lg text-slate-900 placeholder:text-slate-400 bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 rounded-xl outline-none transition-colors"
                    />
                    {query.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery('');
                          setValidationError('');
                          inputRef.current?.focus();
                        }}
                        aria-label="Matnni tozalash"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="h-14 px-8 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-base font-semibold rounded-xl inline-flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                  >
                    <Play className="w-5 h-5 fill-current" aria-hidden="true" />
                    <span>YouTube</span>
                  </button>
                </div>

                {validationError && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Direct YouTube Link Bar for Guaranteed Access */}
                {(trimmedQuery || lastSearched) && (
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-sm text-slate-600">
                    {lastSearched ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <span>
                          So&apos;rov:{' '}
                          <strong className="font-semibold text-slate-900">
                            &laquo;{lastSearched}&raquo;
                          </strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <a
                          href={buildYoutubeSearchUrl(lastSearched)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-red-700 hover:text-red-800 underline underline-offset-4"
                        >
                          <span>YouTube&apos;da ochish</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        <span>Tayyor havola:</span>
                        <a
                          href={buildYoutubeSearchUrl(trimmedQuery)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => saveRecentSearch(trimmedQuery)}
                          className="inline-flex items-center gap-1 font-medium text-blue-900 hover:text-blue-800 underline underline-offset-4"
                        >
                          <span>&laquo;{trimmedQuery}&raquo; ni YouTube&apos;da ko&apos;rish</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </form>

              {/* Quick Suggested Topics */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-xs font-medium text-slate-500 mb-3">
                  Tezkor tanlovlar (bosing va YouTube&apos;dan izlang):
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_SEARCH_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => handleQuickTopicSelect(topic)}
                      className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <History className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>So&apos;nggi qidiruvlaringiz</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setRecentSearches([]);
                        try {
                          localStorage.removeItem(STORAGE_KEY);
                        } catch {
                          // Ignore
                        }
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2 cursor-pointer"
                    >
                      Tarixni tozalash
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item) => (
                      <a
                        key={item}
                        href={buildYoutubeSearchUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-700 hover:text-red-700 bg-white border border-slate-200 hover:border-red-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>{item}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Curated 71-Maktab Recommended Books Shelf */}
        <div className="mt-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-slate-900">
                Tavsiya etilgan maktab kitoblari
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Kitobni qidiruvga yozing yoki darhol YouTube&apos;da video darsini oching
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Kitob toifalari"
              className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg"
            >
              {BOOK_CATEGORIES_ORDER.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {filteredBooks.map((book) => (
              <article
                key={book.id}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between transition-colors hover:border-slate-300"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span className="font-mono tabular-nums text-slate-700">{book.code}</span>
                    <span aria-hidden="true">·</span>
                    <span>{book.category}</span>
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-slate-900 leading-snug">
                    {book.title}
                  </h4>

                  <p className="text-xs text-slate-500 mt-1">
                    {book.author} <span aria-hidden="true">·</span> {book.gradeOrType}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mt-3">
                    {book.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 mt-5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      onOpen();
                      setQuery(book.title);
                      setValidationError('');
                      document.getElementById('kitoblar')?.scrollIntoView({ behavior: 'smooth' });
                      window.setTimeout(() => inputRef.current?.focus(), 200);
                    }}
                    className="text-xs font-medium text-blue-900 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Qidiruvga yozish
                  </button>

                  <a
                    href={buildYoutubeSearchUrl(book.youtubeQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => saveRecentSearch(book.youtubeQuery)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <Play className="w-3 h-3 fill-current" aria-hidden="true" />
                    <span>YouTube</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
