// Everything the site says lives in this file: the CV content, and where
// each piece sits in the walkable world. Positions are in "art pixels".

export const WORLD = { width: 4920, start: 48, end: 4868 };
// How many CSS pixels of scrolling move the character one art pixel.
export const SCROLL_K = 2.2;
export const GROUND_H = 44;

export const PERSON = {
  name: 'Joanna Staszków, PhD',
  role: 'Data Scientist',
  tagline: 'Data Scientist · NLP researcher',
  location: 'Warsaw, Poland',
  email: 'asiaszw@gmail.com',
  github: 'https://github.com/podrozniasia',
  profile:
    'Experienced Data Scientist with a PhD in NLP, specialised in analytical dashboards, advanced data analyses and ETL pipelines, both in collaborative agile teams and as a one-person army. Strong intercultural communication skills and multilingual abilities (English, German, Japanese).',
};

const AUTHORS = 'Joanna Szwoch, Mateusz Staszkow, Rafal Rzepka, Kenji Araki';

/* ---------- CV content ---------- */

export const EXPERIENCE = [
  {
    id: 'orange',
    title: 'Data Scientist',
    org: 'Orange Polska',
    url: 'https://www.orange.pl/',
    dates: '05/2024 – present',
    place: 'Warsaw, Poland',
    current: true,
    bullets: [
      'Customer behaviour and KPI predictions',
      'Product and marketing campaign consulting',
      'Development and advisory in BI and advanced analytics tools',
    ],
  },
  {
    id: 'ta',
    title: 'Teaching Assistant',
    org: 'Hokkaido University, Nitobe College',
    url: 'https://nitobe-college.academic.hokudai.ac.jp/en/',
    dates: '04/2021 – 12/2021',
    place: 'Sapporo, Japan',
    bullets: [
      'Creation of interactive digital materials (Miro, Google Workspace)',
      'Methodological guidance, facilitation of student discussions',
      'Student performance assessment and individualised feedback',
    ],
  },
  {
    id: 'acn-de',
    title: 'Data Engineering Analyst',
    org: 'Accenture',
    url: 'https://www.accenture.com/pl-pl',
    dates: '06/2019 – 02/2020',
    place: 'Warsaw, Poland',
    bullets: [
      'ETL process architecture design and development for data marts in insurance analytics',
      'Test framework design',
    ],
  },
  {
    id: 'consulate',
    title: 'Intern, Promotion, Trade and Investment Department',
    org: 'Consulate General of the Republic of Poland',
    url: 'https://www.gov.pl/web/usa-en/consulate-general-new-york',
    dates: '08/2017 – 09/2017',
    place: 'New York, USA',
    bullets: [
      'Preparation of trade reports on the U.S. market',
      'Internal databases management',
      'Networking facilitation between Polish and U.S. entrepreneurs',
      'Promotional events organisation for Polish businesses in the U.S.',
    ],
  },
  {
    id: 'acn-intern',
    title: 'Intern in Data Analytics',
    org: 'Accenture',
    url: 'https://www.accenture.com/pl-pl',
    dates: '04/2016 – 04/2017',
    place: 'Warsaw, Poland',
    bullets: [
      'BI Team (Telecom): analytics, reporting, data warehouse development, client workshops',
      'Strategy Team (Petroleum): business analysis, requirements gathering, reporting, documentation',
    ],
    tags: ['SAS', 'SQL', 'Oracle', 'MS Office'],
  },
  {
    id: 'cm',
    title: 'Junior Community Manager',
    org: 'ASAP&ASAP Communication Consulting',
    url: 'https://asapasap.pl/',
    dates: '03/2014 – 12/2014',
    place: 'Warsaw, Poland',
    bullets: [
      'Social media management for 1M+ followers',
      'Copywriting and EN→PL translations',
      'Competitor and business performance analyses',
    ],
  },
];

export const EDUCATION = [
  {
    id: 'phd',
    title: 'PhD, Language Media Laboratory',
    org: 'Hokkaido University, Graduate School of Information Science and Technology',
    url: 'https://www.ist.hokudai.ac.jp/labo/lml/',
    dates: '04/2020 – 03/2025',
    place: 'Sapporo, Japan',
    bullets: [
      'Japanese Government MEXT Scholarship awardee',
      'NLP research on Polish online news: political polarisation, sentiment and propaganda detection with LLMs',
    ],
  },
  {
    id: 'msc-finance',
    title: 'Master in Finance and Accounting',
    org: 'Warsaw School of Economics',
    url: 'https://www.sgh.waw.pl/en',
    dates: '10/2017 – 03/2020',
    place: 'Warsaw, Poland',
    bullets: [
      'Specialisation: International Financial Markets',
      'Thesis (in English): Exchange rate policy history in Japan in the context of yen importance in the 21st century',
    ],
  },
  {
    id: 'msc-bigdata',
    title: 'Master in Advanced Analytics – Big Data',
    org: 'Warsaw School of Economics',
    url: 'https://www.sgh.waw.pl/en',
    dates: '10/2016 – 04/2019',
    place: 'Warsaw, Poland',
    bullets: [
      'Specialisation: SAS Statistical Analyst',
      'Thesis: Determinants of e-banking adoption in Poland',
      'Student exchange at Hokkaido University, Graduate School of Economics and Business (04–08/2018)',
    ],
  },
  {
    id: 'bsc',
    title: 'Bachelor in Quantitative Methods in Economics and Information Systems',
    org: 'Warsaw School of Economics',
    url: 'https://www.sgh.waw.pl/en',
    dates: '10/2013 – 07/2016',
    place: 'Warsaw, Poland',
    bullets: [
      'Specialisations: Methods of Decision Analysis, Introduction to Actuarial Methods',
      'Thesis: Determinants of life insurance demand in Poland',
    ],
  },
];

export const PUBLICATIONS = [
  {
    id: 'pub1',
    title: 'Creation of Polish Online News Corpus for Political Polarization Studies',
    venue: 'PoliticalNLP @ LREC 2022, Marseille, France',
    date: '06/2022',
    authors: AUTHORS,
    url: 'https://aclanthology.org/2022.politicalnlp-1.12.pdf',
  },
  {
    id: 'pub2',
    title:
      'Sentiment Analysis of Polish Online News Covering Controversial Topics: Comparison Between Lexicon and Statistical Approaches',
    venue: 'EDO 2023 Workshop, LTC 2023, Poznań, Poland',
    date: '04/2023',
    authors: AUTHORS,
    award: 'Best Paper Award',
  },
  {
    id: 'pub3',
    title: 'Can LLMs Determine Political Leaning of Polish News Articles?',
    venue: '10th IEEE Asia-Pacific Conference on Computer Science and Data Engineering (CSDE’23), Yanuca Island, Fiji',
    date: '12/2023',
    authors: AUTHORS,
    url: 'https://ieeexplore.ieee.org/document/10487682',
  },
  {
    id: 'pub4',
    title: 'Limitations of Large Language Models in Propaganda Detection Task',
    venue: 'MDPI Applied Sciences',
    date: '05/2024',
    authors: AUTHORS,
    url: 'https://www.mdpi.com/2076-3417/14/10/4330',
  },
];

export const SKILLS = [
  { name: 'Python', detail: 'pandas, scikit-learn, spaCy, nltk, matplotlib, BeautifulSoup, Dash' },
  { name: 'R', detail: 'ggplot2, shiny, caret' },
  { name: 'SQL', detail: 'Oracle, SQL Server, Teradata' },
  { name: 'SAS', detail: 'Enterprise Guide, Enterprise Miner, Data Integration Studio' },
  { name: 'Power BI', detail: 'DAX' },
  { name: 'Cloud', detail: 'GCP (BigQuery, Google Cloud Storage)' },
];

export const OTHER_SKILLS = [
  'git',
  'Team working',
  'Competitor analysis',
  'Business communication',
  'Requirements acquisition',
  'SCRUM',
  'JIRA',
  'Kanban',
  'Miro',
  'Trello',
  'Microsoft Office',
];

export const LANGUAGES = [
  { name: 'Polish', detail: 'native', level: 5 },
  { name: 'English', detail: 'CAE (Grade A), LCCI Level 4 (Pass with Distinction)', level: 4 },
  { name: 'German', detail: 'German Language Certificate, Level B2', level: 3 },
  { name: 'Japanese', detail: 'JLPT N3', level: 3 },
  { name: 'French', detail: 'basic', level: 1 },
  { name: 'Spanish', detail: 'basic', level: 1 },
];

export const INTERESTS = ['Backpacking', '19th & 20th century art', 'Linguistics and foreign languages'];

const byId = (list, id) => list.find((e) => e.id === id);

/* ---------- the walk: what appears where ---------- */

// kind: intro | chapter | note | entry | pub | skills | languages | finale
export const STATIONS = [
  { id: 'intro', kind: 'intro', from: 0, to: 175 },
  {
    id: 'ch-spring',
    kind: 'chapter',
    from: 195,
    to: 275,
    season: 'spring',
    title: 'Spring',
    sub: 'Warsaw, 2013',
    text: 'Every harvest starts with good soil: numbers, economics and a lot of curiosity.',
  },
  { id: 'bsc', kind: 'entry', from: 292, to: 440, label: 'Education', entry: byId(EDUCATION, 'bsc') },
  {
    id: 'cm',
    kind: 'entry',
    from: 500,
    to: 660,
    label: 'First job',
    entry: byId(EXPERIENCE, 'cm'),
    aside: 'Look behind you. The followers came along.',
  },
  { id: 'acn-intern', kind: 'entry', from: 740, to: 905, label: 'Experience', entry: byId(EXPERIENCE, 'acn-intern') },
  { id: 'sail', kind: 'note', from: 968, to: 1092, title: 'Summer 2017', text: 'Sailing west. Next stop: New York.' },
  { id: 'consulate', kind: 'entry', from: 1150, to: 1345, label: 'Experience abroad', entry: byId(EXPERIENCE, 'consulate') },
  { id: 'sail-back', kind: 'note', from: 1388, to: 1512, title: 'Back to Warsaw', text: 'Two master’s degrees are already growing at home.' },
  {
    id: 'ch-summer',
    kind: 'chapter',
    from: 1530,
    to: 1612,
    season: 'summer',
    title: 'Summer',
    sub: 'Warsaw, 2016 – 2020',
    text: 'Two fields tended at once, and a first full-time job in data engineering.',
  },
  { id: 'msc-bigdata', kind: 'entry', from: 1630, to: 1795, label: 'Education', entry: byId(EDUCATION, 'msc-bigdata') },
  { id: 'msc-finance', kind: 'entry', from: 1840, to: 2015, label: 'Education', entry: byId(EDUCATION, 'msc-finance') },
  {
    id: 'acn-de',
    kind: 'entry',
    from: 2070,
    to: 2268,
    label: 'Experience',
    entry: byId(EXPERIENCE, 'acn-de'),
    aside: 'Irrigation, but for data: extract, transform, load.',
  },
  {
    id: 'mext',
    kind: 'chapter',
    from: 2312,
    to: 2548,
    season: 'autumn',
    title: 'Autumn',
    sub: 'Sapporo, 2020',
    text: 'Awarded the Japanese Government MEXT Scholarship. Up, up and away to Hokkaido.',
  },
  { id: 'phd', kind: 'entry', from: 2590, to: 2810, label: 'Doctorate', entry: byId(EDUCATION, 'phd') },
  { id: 'ta', kind: 'entry', from: 2850, to: 2995, label: 'Experience', entry: byId(EXPERIENCE, 'ta') },
  { id: 'pub1', kind: 'pub', from: 3040, to: 3145, n: 1, pub: PUBLICATIONS[0] },
  { id: 'pub2', kind: 'pub', from: 3180, to: 3285, n: 2, pub: PUBLICATIONS[1] },
  { id: 'pub3', kind: 'pub', from: 3320, to: 3425, n: 3, pub: PUBLICATIONS[2] },
  { id: 'pub4', kind: 'pub', from: 3460, to: 3565, n: 4, pub: PUBLICATIONS[3] },
  {
    id: 'grad',
    kind: 'chapter',
    from: 3600,
    to: 3735,
    season: 'winter',
    title: 'Dr. Staszków',
    sub: 'Sapporo, March 2025',
    text: 'Five winters, four papers, one Best Paper Award. The doctorate is in the bag, and there is a new hat.',
  },
  {
    id: 'fly-home',
    kind: 'note',
    from: 3772,
    to: 4008,
    title: 'Homeward',
    text: 'Back over the sea to Warsaw, where a new field was already being tended alongside the thesis.',
  },
  {
    id: 'orange',
    kind: 'entry',
    from: 4060,
    to: 4318,
    label: 'Now',
    entry: byId(EXPERIENCE, 'orange'),
    aside: 'The current season. Still growing.',
  },
  { id: 'skills', kind: 'skills', from: 4345, to: 4515 },
  { id: 'languages', kind: 'languages', from: 4535, to: 4675 },
  { id: 'finale', kind: 'finale', from: 4715, to: 4920 },
];

// The little date widget in the corner, by position.
export const TIMELINE = [
  { from: 0, season: 'spring', when: 'Spring 2013', where: 'Warsaw' },
  { from: 500, season: 'spring', when: '2014', where: 'Warsaw' },
  { from: 740, season: 'spring', when: '2016 – 2017', where: 'Warsaw' },
  { from: 960, season: 'summer', when: 'Summer 2017', where: 'At sea' },
  { from: 1100, season: 'summer', when: 'Summer 2017', where: 'New York' },
  { from: 1380, season: 'summer', when: '2017', where: 'At sea' },
  { from: 1520, season: 'summer', when: '2016 – 2019', where: 'Warsaw' },
  { from: 1840, season: 'summer', when: '2017 – 2020', where: 'Warsaw' },
  { from: 2070, season: 'summer', when: '2019 – 2020', where: 'Warsaw' },
  { from: 2300, season: 'autumn', when: '2020', where: 'In the air' },
  { from: 2560, season: 'autumn', when: '2020', where: 'Sapporo' },
  { from: 2850, season: 'autumn', when: '2021', where: 'Sapporo' },
  { from: 3040, season: 'autumn', when: '2022', where: 'Sapporo' },
  { from: 3180, season: 'autumn', when: '2023', where: 'Sapporo' },
  { from: 3460, season: 'winter', when: '2024', where: 'Sapporo' },
  { from: 3600, season: 'winter', when: 'March 2025', where: 'Sapporo' },
  { from: 3760, season: 'winter', when: '2025', where: 'In the air' },
  { from: 4030, season: 'spring', when: 'Today', where: 'Warsaw' },
  { from: 4715, season: 'dusk', when: 'Tomorrow', where: 'Your team?' },
];

// Jump points for the map.
export const CHAPTERS = [
  { label: 'Start', sub: 'Hello', x: 48, season: 'spring' },
  { label: 'Spring', sub: 'Warsaw 2013 – 2017: first seeds', x: 300, season: 'spring' },
  { label: 'New York', sub: 'Summer 2017: trade internship', x: 1200, season: 'summer' },
  { label: 'Summer', sub: 'Warsaw 2016 – 2020: two master’s, Accenture', x: 1640, season: 'summer' },
  { label: 'Autumn', sub: 'Sapporo 2020 – 2025: PhD and research', x: 2600, season: 'autumn' },
  { label: 'Winter', sub: 'Sapporo 2025: the doctorate', x: 3640, season: 'winter' },
  { label: 'Today', sub: 'Orange Polska, Warsaw', x: 4130, season: 'spring' },
  { label: 'Toolshed', sub: 'Skills and languages', x: 4400, season: 'spring' },
  { label: 'Harvest', sub: 'Summary and contact', x: 4800, season: 'dusk' },
];

/* ---------- collectibles ---------- */

// kind: skill | language | milestone. y lifts an item into the sky.
export const ITEMS = [
  { id: 'polish', label: 'Polish', kind: 'language', x: 150 },
  { id: 'bsc', label: 'BSc', kind: 'milestone', x: 455 },
  { id: 'english', label: 'English', kind: 'language', x: 480 },
  { id: 'competitor', label: 'Competitor analysis', kind: 'skill', x: 690 },
  { id: 'sas', label: 'SAS', kind: 'skill', x: 915 },
  { id: 'sql', label: 'SQL', kind: 'skill', x: 940 },
  { id: 'bizcomm', label: 'Business communication', kind: 'skill', x: 1360 },
  { id: 'german', label: 'German', kind: 'language', x: 1622 },
  { id: 'r', label: 'R', kind: 'skill', x: 1805 },
  { id: 'msc1', label: 'MSc Big Data', kind: 'milestone', x: 1825 },
  { id: 'msc2', label: 'MSc Finance', kind: 'milestone', x: 2030 },
  { id: 'etl', label: 'ETL', kind: 'skill', x: 2278 },
  { id: 'mext', label: 'MEXT Scholarship', kind: 'milestone', x: 2430, sky: true },
  { id: 'japanese', label: 'Japanese', kind: 'language', x: 2825 },
  { id: 'python', label: 'Python', kind: 'skill', x: 3015 },
  { id: 'nlp', label: 'NLP', kind: 'skill', x: 3162 },
  { id: 'best', label: 'Best Paper Award', kind: 'milestone', x: 3302 },
  { id: 'llm', label: 'LLMs', kind: 'skill', x: 3442 },
  { id: 'phd', label: 'PhD', kind: 'milestone', x: 3745 },
  { id: 'gcp', label: 'GCP', kind: 'skill', x: 3890, sky: true },
  { id: 'powerbi', label: 'Power BI', kind: 'skill', x: 4328 },
  { id: 'git', label: 'git', kind: 'skill', x: 4522 },
  { id: 'french', label: 'French', kind: 'language', x: 4685 },
  { id: 'spanish', label: 'Spanish', kind: 'language', x: 4702 },
];

/* ---------- terrain ---------- */

export const GROUND = [
  { from: 0, to: 960, kind: 'Spring' },
  { from: 960, to: 1100, kind: 'water' },
  { from: 1100, to: 1380, kind: 'Summer' },
  { from: 1380, to: 1520, kind: 'water' },
  { from: 1520, to: 2340, kind: 'Summer' },
  { from: 2340, to: 2520, kind: 'water' },
  { from: 2520, to: 3300, kind: 'Autumn' },
  { from: 3300, to: 3800, kind: 'Winter' },
  { from: 3800, to: 3980, kind: 'water' },
  { from: 3980, to: 4920, kind: 'Spring' },
];

export const BOAT_ZONES = [
  [960, 1100],
  [1380, 1520],
];
export const FLIGHT_ZONES = [
  [2290, 2570],
  [3750, 4030],
];
export const PHD_X = 3640; // from here on, the straw hat becomes a doctoral cap
export const CHICKS = { from: 505, to: 770, home: 512 };

// Sky and season blending along the walk. Index into SEASONS.
export const SEASONS = ['spring', 'summer', 'autumn', 'winter', 'dusk'];
export const SKY_KEYS = [
  [0, 0],
  [900, 0],
  [1100, 1],
  [2300, 1],
  [2540, 2],
  [3240, 2],
  [3440, 3],
  [3800, 3],
  [4010, 0],
  [4560, 0],
  [4760, 4],
  [4920, 4],
];

/* ---------- scenery ---------- */

const row = (sp, from, to, step, extra = {}) => {
  const out = [];
  for (let x = from; x <= to; x += step) out.push({ sp, x, ...extra });
  return out;
};

// Objects stand on the ground; y lifts them, behind:true draws them further back.
export const OBJECTS = [
  // home
  { sp: 'house', x: 4 },
  ...row('fence', 74, 186, 16),
  { sp: 'treeCherry', x: 196 },
  { sp: 'flowerPink', x: 82 },
  { sp: 'flowerYellow', x: 124 },
  { sp: 'flowerWhite', x: 168 },
  // bachelor
  { sp: 'academyPL', x: 292 },
  ...row('plot', 404, 468, 16, { y: -2 }),
  ...row('sprout', 408, 472, 16, { y: 2 }),
  // community manager
  { sp: 'board', x: 538 },
  { sp: 'treeCherry', x: 600 },
  { sp: 'flowerRed', x: 650 },
  { sp: 'treeSpring', x: 690 },
  { sp: 'rock', x: 735 },
  // accenture intern
  { sp: 'office', x: 772 },
  { sp: 'treeSpring', x: 878 },
  { sp: 'flowerBlue', x: 926 },
  { sp: 'dock', x: 938, y: -9 },
  // new york
  { sp: 'dock', x: 1094, y: -9 },
  { sp: 'treeSummer', x: 1150 },
  { sp: 'flagPL', x: 1196 },
  { sp: 'stall', x: 1214 },
  { sp: 'crate', x: 1274 },
  { sp: 'treeApple', x: 1306 },
  { sp: 'dock', x: 1358, y: -9 },
  // summer in warsaw
  { sp: 'dock', x: 1514, y: -9 },
  { sp: 'treeSummer', x: 1566 },
  { sp: 'academyPL', x: 1640 },
  ...row('plot', 1748, 1796, 16, { y: -2 }),
  ...row('cropMid', 1751, 1799, 16, { y: 2 }),
  { sp: 'treeApple', x: 1832 },
  { sp: 'scarecrow', x: 1892 },
  ...row('plot', 1920, 1984, 16, { y: -2 }),
  { sp: 'cropYellow', x: 1922, y: 2 },
  { sp: 'cropRed', x: 1938, y: 2 },
  { sp: 'cropYellow', x: 1954, y: 2 },
  { sp: 'cropRed', x: 1970, y: 2 },
  { sp: 'cropYellow', x: 1986, y: 2 },
  { sp: 'haybale', x: 2014 },
  { sp: 'treeSummer', x: 2046 },
  // accenture data engineering: barrels -> pipe -> silo
  { sp: 'office', x: 2090 },
  { sp: 'barrel', x: 2156 },
  { sp: 'barrel', x: 2168 },
  { sp: 'silo', x: 2236 },
  // japan
  { sp: 'gate', x: 2602 },
  { sp: 'academyJP', x: 2674 },
  { sp: 'treeMaple', x: 2776 },
  { sp: 'pumpkin', x: 2822 },
  { sp: 'chalkboard', x: 2886 },
  { sp: 'treeGinkgo', x: 2944 },
  { sp: 'haybale', x: 2996 },
  // research field: four prize crops
  { sp: 'pedestal', x: 3074 },
  { sp: 'vegCabbage', x: 3076, y: 8 },
  { sp: 'treeMaple', x: 3128 },
  { sp: 'pedestal', x: 3214 },
  { sp: 'vegPumpkin', x: 3216, y: 8 },
  { sp: 'ribbon', x: 3240, y: 12 },
  { sp: 'treeGinkgo', x: 3262 },
  { sp: 'pine', x: 3312 },
  { sp: 'pedestal', x: 3354 },
  { sp: 'vegTomato', x: 3356, y: 8 },
  { sp: 'pine', x: 3410 },
  { sp: 'pedestal', x: 3494 },
  { sp: 'vegTurnip', x: 3496, y: 8 },
  { sp: 'pine', x: 3548 },
  { sp: 'snowman', x: 3588 },
  { sp: 'academySnow', x: 3618 },
  { sp: 'pine', x: 3722 },
  // today: the orange grove
  { sp: 'treeOrange', x: 4064 },
  { sp: 'treeOrange', x: 4108 },
  { sp: 'crate', x: 4156 },
  { sp: 'crate', x: 4176 },
  { sp: 'crate', x: 4166, y: 12 },
  { sp: 'treeOrange', x: 4206 },
  { sp: 'treeOrange', x: 4250 },
  // toolshed
  { sp: 'barn', x: 4362 },
  ...row('plot', 4444, 4508, 16, { y: -2 }),
  { sp: 'cropBlue', x: 4446, y: 2 },
  { sp: 'cropYellow', x: 4462, y: 2 },
  { sp: 'cropRed', x: 4478, y: 2 },
  { sp: 'cropPurple', x: 4494, y: 2 },
  { sp: 'cropBlue', x: 4510, y: 2 },
  // language garden
  { sp: 'flowerRed', x: 4548 },
  { sp: 'flowerWhite', x: 4558 },
  { sp: 'flowerBlue', x: 4574 },
  { sp: 'flowerYellow', x: 4590 },
  { sp: 'flowerPink', x: 4606 },
  { sp: 'flowerPurple', x: 4622 },
  { sp: 'flowerWhite', x: 4638 },
  { sp: 'flowerRed', x: 4652 },
  { sp: 'treeCherry', x: 4664 },
  // home again, evening
  { sp: 'pole', x: 4712 },
  { sp: 'haybale', x: 4734 },
  { sp: 'pole', x: 4808 },
  { sp: 'mailbox', x: 4822 },
  { sp: 'houseLit', x: 4850 },
];

// Wooden signposts along the way.
export const SIGNS = [
  { x: 96, text: 'DATA FARM · EST. 2013' },
  { x: 248, text: 'WARSAW' },
  { x: 840, text: 'ACCENTURE' },
  { x: 1110, text: 'NEW YORK' },
  { x: 1540, text: 'WARSAW' },
  { x: 2237, text: 'DATA MART', y: 64, float: true },
  { x: 2576, text: 'SAPPORO' },
  { x: 3026, text: 'RESEARCH FIELD' },
  { x: 4038, text: 'WARSAW' },
  { x: 4150, text: 'ORANGE GROVE', y: 30 },
  { x: 4580, text: 'LANGUAGE GARDEN', y: 18 },
];

// Far-away silhouettes: x is the spot where they line up with the walker.
export const FAR = [
  { sp: 'skylineWarsaw', x: 520 },
  { sp: 'skylineNYC', x: 1240 },
  { sp: 'skylineWarsaw', x: 1860 },
  { sp: 'mount', x: 2760 },
  { sp: 'mount', x: 3520 },
  { sp: 'skylineWarsaw', x: 4240 },
];

export const STATS = [
  { n: '2016', label: 'working with data since' },
  { n: '3', label: 'countries lived and worked in' },
  { n: '4', label: 'degrees, including a PhD' },
  { n: '4', label: 'peer-reviewed publications' },
  { n: '1', label: 'Best Paper Award' },
  { n: '6', label: 'languages' },
];
