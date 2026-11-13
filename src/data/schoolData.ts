export type BookCategory = 'Barchasi' | 'Darsliklar' | 'Badiiy adabiyot' | 'Aniq fanlar' | 'Xorijiy tillar';

export interface SchoolBook {
  id: string;
  code: string;
  title: string;
  author: string;
  category: Exclude<BookCategory, 'Barchasi'>;
  gradeOrType: string;
  description: string;
  youtubeQuery: string;
}

export interface SubjectStream {
  index: string;
  title: string;
  room: string;
  summary: string;
  subjects: {
    name: string;
    youtubeQuery: string;
  }[];
}

export interface SchoolMetric {
  value: string;
  label: string;
  detail: string;
}

export const SCHOOL_METRICS: SchoolMetric[] = [
  {
    value: '1–11',
    label: "Ta'lim sinflari",
    detail: "Boshlang'ich va yuqori sinf yo'nalishlari",
  },
  {
    value: '12 400+',
    label: 'Kutubxona fondi',
    detail: 'Darsliklar va jahon adabiyoti namunalari',
  },
  {
    value: '48 nafar',
    label: 'Ustoz va murabbiylar',
    detail: 'Oliy toifali pedagoglar jamoasi',
  },
  {
    value: '08:00–18:00',
    label: 'Kutubxona vaqti',
    detail: 'Dushanbadan shanbagacha ochiq',
  },
];

export const QUICK_SEARCH_TOPICS: string[] = [
  "O'tkan kunlar audio kitob",
  '7-sinf Algebra darslari',
  "Alisher Navoiy g'azallari",
  'Fizika tajribalari',
  'Ingliz tili grammatika',
  "O'zbekiston tarixi darslari",
];

export const SCHOOL_BOOKS: SchoolBook[] = [
  {
    id: 'book-1',
    code: 'K-101',
    title: "O'tkan kunlar",
    author: 'Abdulla Qodiriy',
    category: 'Badiiy adabiyot',
    gradeOrType: '9–11 sinflar',
    description: "O'zbek romanchiligi maktabining shoh asari. Audio kitob va adabiy tahlil darslari.",
    youtubeQuery: "O'tkan kunlar Abdulla Qodiriy audio kitob",
  },
  {
    id: 'book-2',
    code: 'K-104',
    title: 'Algebra va matematik analiz',
    author: 'M. Mirzahmedov',
    category: 'Aniq fanlar',
    gradeOrType: '8–9 sinf darsligi',
    description: 'Kvadrat tenglamalar, funksiyalar va olimpiada masalalari video yechimlari bilan.',
    youtubeQuery: 'Algebra 8-sinf darslari video',
  },
  {
    id: 'book-3',
    code: 'K-109',
    title: 'Xamsa (Hayrat ul-abror)',
    author: 'Alisher Navoiy',
    category: 'Badiiy adabiyot',
    gradeOrType: 'Adabiyot fondi',
    description: "Buyuk mutafakkir g'azallari va dostonlarining sharhi hamda badiiy o'qilishi.",
    youtubeQuery: 'Alisher Navoiy Xamsa dostonlari',
  },
  {
    id: 'book-4',
    code: 'K-112',
    title: 'Fizika: Mexanika va optika',
    author: 'P. Habibullayev',
    category: 'Aniq fanlar',
    gradeOrType: '7–9 sinf darsligi',
    description: "Nyuton qonunlari, elektr toki va yorug'lik hodisalarini ko'rgazmali o'rganish.",
    youtubeQuery: 'Fizika 7-sinf mexanika video dars',
  },
  {
    id: 'book-5',
    code: 'K-118',
    title: 'Sariq devni minib',
    author: "Xudoyberdi To'xtaboyev",
    category: 'Badiiy adabiyot',
    gradeOrType: '5–7 sinflar',
    description: "Bolalar va o'smirlar adabiyotining eng sevimli sarguzasht qissasi.",
    youtubeQuery: "Sariq devni minib audio kitob Xudoyberdi To'xtaboyev",
  },
  {
    id: 'book-6',
    code: 'K-124',
    title: 'English Grammar & Reading',
    author: 'Cambridge OUP',
    category: 'Xorijiy tillar',
    gradeOrType: 'B1–B2 bosqich',
    description: "Zamonlar, so'z boyligi va tinglab tushunish mashqlari to'plami.",
    youtubeQuery: "Ingliz tili grammatika o'rganish",
  },
  {
    id: 'book-7',
    code: 'K-131',
    title: "O'zbekiston tarixi",
    author: 'A. Sagdullayev',
    category: 'Darsliklar',
    gradeOrType: '7–8 sinf darsligi',
    description: 'Markaziy Osiyo tamadduni, buyuk allomalar va davlatchilik tarixi.',
    youtubeQuery: "O'zbekiston tarixi video darslar",
  },
  {
    id: 'book-8',
    code: 'K-136',
    title: 'Informatika va Python',
    author: 'B. Boltayev',
    category: 'Darsliklar',
    gradeOrType: '8–10 sinf darsligi',
    description: "Algoritmlar, ma'lumotlar tuzilmasi va Python dasturlash tili asoslari.",
    youtubeQuery: "Python dasturlash tili darslari o'zbek tilida",
  },
];

export const SUBJECT_STREAMS: SubjectStream[] = [
  {
    index: '01',
    title: 'Aniq va tabiiy fanlar',
    room: '201–214 xonalar',
    summary:
      "Mantiqiy fikrlash, laboratoriya tajribalari va fan olimpiadalariga tizimli tayyorgarlik yo'nalishi.",
    subjects: [
      { name: 'Matematika va geometriya', youtubeQuery: 'Matematika video darslar' },
      { name: 'Fizika va astronomiya', youtubeQuery: 'Fizika darslari' },
      { name: 'Kimyo va biologiya', youtubeQuery: 'Kimyo darslari video' },
    ],
  },
  {
    index: '02',
    title: 'Adabiyot va ijtimoiy fanlar',
    room: '104–118 xonalar',
    summary:
      "So'z san'ati, nutq madaniyati, tarixiy meros va huquqiy savodxonlikni chuqur o'rgatuvchi kafedra.",
    subjects: [
      { name: 'Ona tili va adabiyot', youtubeQuery: "O'zbek adabiyoti audio kitoblar" },
      { name: "O'zbekiston va jahon tarixi", youtubeQuery: "O'zbekiston tarixi darslari" },
      { name: 'Geografiya va iqtisod', youtubeQuery: 'Geografiya video darslar' },
    ],
  },
  {
    index: '03',
    title: 'Xorijiy tillar va axborot texnologiyalari',
    room: '302–312 xonalar',
    summary:
      'Xalqaro sertifikatlar (IELTS, CEFR) hamda zamonaviy dasturlash ko‘nikmalarini shakllantirish.',
    subjects: [
      { name: 'Ingliz tili (IELTS / CEFR)', youtubeQuery: "Ingliz tili darslari o'zbek tilida" },
      { name: 'Informatika va dasturlash', youtubeQuery: 'Informatika Python darslari' },
      { name: 'Rus va nemis tillari', youtubeQuery: "Rus tili o'rganish darslari" },
    ],
  },
];

export function buildYoutubeSearchUrl(query: string): string {
  const clean = query.trim();
  if (!clean) return 'https://www.youtube.com';
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(clean)}`;
}
