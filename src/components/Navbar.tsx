interface NavbarProps {
  onOpenBooksSearch: () => void;
}

export function Navbar({ onOpenBooksSearch }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#asosiy"
          className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 rounded"
        >
          71-Maktab
        </a>

        <nav
          aria-label="Asosiy navigatsiya"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600"
        >
          <a
            href="#asosiy"
            className="hover:text-slate-900 underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Asosiy
          </a>
          <a
            href="#kitoblar"
            className="hover:text-slate-900 underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Kitoblar
          </a>
          <a
            href="#fanlar"
            className="hover:text-slate-900 underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Fanlar
          </a>
          <a
            href="#kutubxona"
            className="hover:text-slate-900 underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
          >
            Kutubxona
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenBooksSearch}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
          >
            Kitob qidirish
          </button>
        </div>
      </div>
    </header>
  );
}
