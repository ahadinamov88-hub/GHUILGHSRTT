import { STUDY_DESK_IMAGE_PATH, STUDY_HALL_IMAGE_PATH } from './kitoblarConstants';
import { ResilientImage } from './ResilientImage';

interface CampusShowcaseProps {
  onOpenBooksSearch: () => void;
}

export function CampusShowcase({ onOpenBooksSearch }: CampusShowcaseProps) {
  return (
    <section id="kutubxona" className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-[16/9]">
              <ResilientImage
                src={STUDY_HALL_IMAGE_PATH}
                alt="71-Maktab zamonaviy o'quv zali va raqamli axborot markazi"
                fallbackTitle="71-Maktab O'quv Zali"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div>
                <p className="font-mono tabular-nums text-lg font-medium text-slate-900">
                  240 o&apos;rin
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Yorug&apos; va tinch o&apos;quv zali sig&apos;imi
                </p>
              </div>
              <div>
                <p className="font-mono tabular-nums text-lg font-medium text-slate-900">
                  18 ta to&apos;garak
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Olimpiada, robototexnika va kitobxonlik klublari
                </p>
              </div>
              <div>
                <p className="font-mono tabular-nums text-lg font-medium text-slate-900">
                  100% bepul
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Barcha o&apos;quvchilar uchun darslik va resurslar
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 mb-6">
                <ResilientImage
                  src={STUDY_DESK_IMAGE_PATH}
                  alt="Ochiq badiiy kitob, daftar va darsliklar"
                  fallbackTitle="Mutolaa madaniyati"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs font-medium text-blue-900 mb-2">
                71-Maktab · Kitobxonlik madaniyati
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight text-balance">
                Mutolaa va mustaqil izlanish maskani
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">
                Maktabimiz kutubxonasida har bir o&apos;quvchi ham bosma kitoblardan, ham
                YouTube&apos;dagi ishonchli video ma&apos;ruzalardan foydalanib darslarga puxta
                tayyorlanishi mumkin.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={onOpenBooksSearch}
                className="w-full py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                Kitoblar bo&apos;limiga qaytish
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
