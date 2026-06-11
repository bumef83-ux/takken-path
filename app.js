const STORAGE_KEY = "takken-path-state-v1";

const SUBJECTS = {
  rights: { name: "権利関係", short: "権利", color: "#c99535", targetMinutes: 5400 },
  business: { name: "宅建業法", short: "業法", color: "#487c72", targetMinutes: 4500 },
  regulations: { name: "法令上の制限", short: "法令", color: "#d7745d", targetMinutes: 3600 },
  tax: { name: "税・その他", short: "税・他", color: "#71849d", targetMinutes: 2700 }
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
const PLAN_START = "2026-06-11";

const EXAM_EVENTS = [
  { id: "web-open", date: "2026-07-01", shortDate: "7/1", title: "インターネット申込開始", description: "9:30開始。顔写真データと受験手数料8,200円を準備。", calendarTitle: "宅建試験 インターネット申込開始" },
  { id: "safe-apply", date: "2026-07-14", shortDate: "7/14", title: "Web申込の推奨完了日", description: "公式案内が早めの申込を推奨。動作しない場合は翌日までに郵送申込へ。", calendarTitle: "宅建試験 Web申込を今日までに完了" },
  { id: "postal-close", date: "2026-07-15", shortDate: "7/15", title: "郵送申込締切", description: "簡易書留・期間内消印のみ有効。試験案内の配布もこの日まで。", calendarTitle: "宅建試験 郵送申込締切" },
  { id: "web-close", date: "2026-07-31", shortDate: "7/31", title: "インターネット申込締切", description: "23:59締切。最終日は混雑するため、ここまで待たないのが安全です。", calendarTitle: "宅建試験 インターネット申込締切" },
  { id: "ticket", date: "2026-10-02", shortDate: "10/2", title: "受験票発送予定", description: "10月9日になっても届かない場合は、協力機関または試験機構へ確認。", calendarTitle: "宅建試験 受験票発送予定" },
  { id: "exam", date: "2026-10-18", shortDate: "10/18", title: "宅建試験本番", description: "13:00〜15:00。一般受験者は12:30までに着席。", calendarTitle: "令和8年度 宅建試験" },
  { id: "results", date: "2026-11-25", shortDate: "11/25", title: "合格発表", description: "令和8年度宅地建物取引士資格試験の合格発表日。", calendarTitle: "宅建試験 合格発表" }
];

const STUDY_BLOCKS = [
  {
    start: "2026-06-11", end: "2026-06-21", stage: "foundation", subject: "rights",
    label: "権利関係I", summary: "民法の土台を先に理解。難問には深入りせず、基本パターンを押さえる。",
    units: ["制限行為能力者・意思表示", "代理", "時効", "債務不履行・解除", "売買・契約不適合責任", "連帯債務・保証"]
  },
  {
    start: "2026-06-22", end: "2026-06-28", stage: "foundation", subject: "rights",
    label: "権利関係II", summary: "不動産特有の頻出論点を一巡し、権利関係を終える。",
    units: ["物権変動・登記", "抵当権", "相続", "借地借家法", "区分所有法", "不動産登記法"]
  },
  {
    start: "2026-06-29", end: "2026-07-12", stage: "foundation", subject: "business",
    label: "宅建業法", summary: "20問の得点源。細かい違いを問題演習とセットで覚える。",
    units: ["宅建業・免許", "宅地建物取引士", "営業保証金・保証協会", "媒介・代理契約", "重要事項説明・35条書面", "37条書面", "8種制限", "報酬額・監督処分"]
  },
  {
    start: "2026-07-13", end: "2026-07-24", stage: "foundation", subject: "regulations",
    label: "法令上の制限", summary: "制度の全体像を理解した後、数字・許可・届出を整理する。",
    units: ["都市計画法", "開発許可", "建築基準法", "国土利用計画法", "農地法", "盛土規制法", "土地区画整理法・宅地造成"]
  },
  {
    start: "2026-07-25", end: "2026-07-31", stage: "foundation", subject: "tax",
    label: "税・その他", summary: "深入りせず頻出事項を一巡。7月末で基本テキスト1周を完了する。",
    units: ["不動産取得税・固定資産税", "所得税・印紙税・登録免許税", "地価公示", "不動産鑑定評価", "住宅金融支援機構・景品表示", "統計・免除科目の全体像"]
  },
  {
    start: "2026-08-01", end: "2026-08-16", stage: "practice",
    label: "過去問1周目", summary: "宅建業法を軸に、テキストと問題を往復。正解より根拠説明を重視。",
    entries: [
      { subject: "business", unit: "宅建業法の分野別過去問" }, { subject: "rights", unit: "権利関係の分野別過去問" },
      { subject: "business", unit: "35条・37条・8種制限の反復" }, { subject: "regulations", unit: "法令上の制限の分野別過去問" },
      { subject: "tax", unit: "税・その他の分野別過去問" }
    ]
  },
  {
    start: "2026-08-17", end: "2026-08-31", stage: "practice",
    label: "過去問2周目", summary: "誤答だけを高速反復し、8月末に初回50問模試で弱点を可視化。",
    entries: [
      { subject: "business", unit: "宅建業法の誤答反復" }, { subject: "rights", unit: "権利関係の誤答反復" },
      { subject: "regulations", unit: "法令上の制限の誤答反復" }, { subject: "tax", unit: "税・その他の誤答反復" },
      { subject: "business", unit: "50問模試・時間配分確認" }
    ]
  },
  {
    start: "2026-09-01", end: "2026-09-15", stage: "mock",
    label: "弱点補強", summary: "模試・過去問の誤答原因を分類。宅建業法18点を目標に安定させる。",
    entries: [
      { subject: "business", unit: "宅建業法 18/20点トレーニング" }, { subject: "rights", unit: "権利関係 頻出基本問題" },
      { subject: "regulations", unit: "法令の数字・許可届出整理" }, { subject: "tax", unit: "税・価格の頻出問題" }
    ]
  },
  {
    start: "2026-09-16", end: "2026-09-30", stage: "mock",
    label: "模試・横断整理", summary: "週1回の50問模試と復習。35点超を安定させ、時間配分を固定する。",
    entries: [
      { subject: "business", unit: "50問模試＋全肢復習" }, { subject: "rights", unit: "横断整理・誤答論点" },
      { subject: "business", unit: "個数問題・組合せ問題対策" }, { subject: "regulations", unit: "法令・税の暗記カード" }
    ]
  },
  {
    start: "2026-10-01", end: "2026-10-11", stage: "final",
    label: "直前仕上げ", summary: "法改正・統計・数字を更新し、模試は解きっぱなしにしない。",
    entries: [
      { subject: "tax", unit: "2026年統計・5問免除科目" }, { subject: "business", unit: "宅建業法の数字・書面総点検" },
      { subject: "regulations", unit: "法令制限の数字総点検" }, { subject: "rights", unit: "権利関係の頻出論点のみ" },
      { subject: "business", unit: "2時間の本番形式模試" }
    ]
  },
  {
    start: "2026-10-12", end: "2026-10-17", stage: "final",
    label: "本番調整", summary: "新しい教材は増やさず、間違いノートと得点源だけを軽く確認する。",
    entries: [
      { subject: "business", unit: "宅建業法の最終確認" }, { subject: "rights", unit: "権利関係の最終確認" },
      { subject: "regulations", unit: "法令・税の最終暗記" }, { subject: "business", unit: "持ち物・会場・時間配分確認" }
    ]
  }
];

const YOSHINO_RESOURCES = {
  roadmap: {
    title: "6ヵ月合格ロードマップ",
    description: "全体の進み方を確認。LECトリセツの計画が遅れていないか、月1回見直します。",
    url: "https://www.youtube.com/watch?v=IEGEZgMr4t8"
  },
  rights: {
    title: "権利関係｜抵当権の重要ポイント",
    description: "権利関係は深入りせず、頻出パターンの理解を補強します。",
    url: "https://www.youtube.com/watch?v=M25_CEfF9I4"
  },
  business: {
    title: "宅建業法 大攻略・過去問演習",
    description: "ミスが許されない宅建業法を安定した得点源にするための補強です。",
    url: "https://www.youtube.com/watch?v=NREDV65tWd4"
  },
  regulations: {
    title: "法令上の制限｜都市計画法",
    description: "制度の全体像と狙われるポイントを動画で整理します。",
    url: "https://www.youtube.com/watch?v=drBVdk2WqP0"
  },
  tax: {
    title: "法令・税等の出るところ集中",
    description: "税・価格・5問免除は重要ポイントを絞って補強します。",
    url: "https://www.youtube.com/watch?v=NREDV65tWd4"
  },
  amendments: {
    title: "2026年度の重要改正点",
    description: "10月の直前期に、令和8年度で狙われる改正点を最終確認します。",
    url: "https://www.youtube.com/watch?v=psjG2uxCU3w"
  }
};

const QUESTIONS = [
  {
    id: "q1", subject: "rights",
    question: "個人間の土地売買契約は、特別な定めがない限り、契約書を作成しなくても当事者の意思が合致すれば成立する。",
    options: ["正しい", "誤り"], answer: 0,
    explanation: "売買契約は原則として諾成契約です。書面は紛争防止に重要ですが、成立要件そのものではありません。"
  },
  {
    id: "q2", subject: "rights",
    question: "不動産登記には公信力があるため、登記名義人を真の所有者と信じて買った人は、常に所有権を取得できる。",
    options: ["正しい", "誤り"], answer: 1,
    explanation: "日本の不動産登記に公信力はありません。登記を信頼しただけで、常に権利取得が保護されるわけではありません。"
  },
  {
    id: "q3", subject: "rights",
    question: "2022年4月以降、民法上の成年年齢は18歳である。",
    options: ["正しい", "誤り"], answer: 0,
    explanation: "成年年齢は20歳から18歳へ引き下げられました。18歳になると原則として単独で契約できます。"
  },
  {
    id: "q4", subject: "business",
    question: "宅地建物取引業者は、重要事項の説明を売買契約が成立した後に行えばよい。",
    options: ["正しい", "誤り"], answer: 1,
    explanation: "重要事項説明は、契約を締結するか判断できるよう、契約成立前に行う必要があります。"
  },
  {
    id: "q5", subject: "business",
    question: "重要事項説明は、宅地建物取引士が行わなければならない。",
    options: ["正しい", "誤り"], answer: 0,
    explanation: "重要事項説明は宅地建物取引士の専権業務です。説明時には宅建士証の提示も必要です。"
  },
  {
    id: "q6", subject: "business",
    question: "宅建業者が自ら売主となる場合の8種制限は、買主も宅建業者である取引には原則として適用されない。",
    options: ["正しい", "誤り"], answer: 0,
    explanation: "8種制限は一般消費者である買主を保護するための規制です。業者間取引では原則として適用されません。"
  },
  {
    id: "q7", subject: "regulations",
    question: "市街化調整区域は、市街化を抑制すべき区域として定められる。",
    options: ["正しい", "誤り"], answer: 0,
    explanation: "市街化調整区域は、市街化を抑制する区域です。開発や建築には原則として厳しい制限があります。"
  },
  {
    id: "q8", subject: "regulations",
    question: "建ぺい率は、建築物の延べ面積を敷地面積で割って求める。",
    options: ["正しい", "誤り"], answer: 1,
    explanation: "建ぺい率は建築面積÷敷地面積です。延べ面積÷敷地面積で求めるのは容積率です。"
  },
  {
    id: "q9", subject: "regulations",
    question: "用途地域は、都市計画区域内のすべての土地に必ず定めなければならない。",
    options: ["正しい", "誤り"], answer: 1,
    explanation: "用途地域が定められていない区域もあります。都市計画区域内の全域に必須というわけではありません。"
  },
  {
    id: "q10", subject: "tax",
    question: "固定資産税は、原則として毎年1月1日現在の固定資産課税台帳上の所有者に課される。",
    options: ["正しい", "誤り"], answer: 0,
    explanation: "固定資産税の賦課期日は1月1日です。その時点の台帳上の所有者が原則として納税義務者です。"
  },
  {
    id: "q11", subject: "tax",
    question: "不動産取得税は、不動産を取得したことに対して都道府県が課す税である。",
    options: ["正しい", "誤り"], answer: 0,
    explanation: "不動産取得税は都道府県税です。不動産の取得に対して課税されます。"
  },
  {
    id: "q12", subject: "tax",
    question: "地価公示の標準地の正常な価格は、毎年1月1日時点を基準として判定される。",
    options: ["正しい", "誤り"], answer: 0,
    explanation: "地価公示は毎年1月1日時点の標準地の正常な価格を判定し、公示する制度です。"
  }
];

function localDateKey(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function parseLocalDate(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function startOfWeek(date = new Date()) {
  const result = new Date(date);
  const diff = (result.getDay() + 6) % 7;
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() - diff);
  return result;
}

function defaultState() {
  const today = localDateKey();
  return {
    settings: {
      examDate: "2026-10-18",
      weekdayMinutes: 120,
      weekendMinutes: 210,
      studyDays: [0, 1, 2, 3, 4, 5, 6],
      planAnchor: PLAN_START
    },
    completions: {},
    customTasks: [],
    quizHistory: [],
    focusSessions: [],
    textbookProgress: { rights: 0, business: 0, regulations: 0, tax: 0 },
    examReminders: true,
    selectedDate: today,
    quizFilter: "all",
    reviewOnly: false
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.settings?.dailyMinutes && !saved.settings.weekdayMinutes) {
      saved.settings.weekdayMinutes = saved.settings.dailyMinutes;
      saved.settings.weekendMinutes = Math.min(300, saved.settings.dailyMinutes * 2);
    }
    return saved ? {
      ...defaultState(),
      ...saved,
      settings: { ...defaultState().settings, ...saved.settings },
      textbookProgress: { ...defaultState().textbookProgress, ...saved.textbookProgress }
    } : defaultState();
  } catch (error) {
    return defaultState();
  }
}

let state = loadState();
let currentQuestion = null;
let currentQuestionIndex = 0;
let timerSeconds = 25 * 60;
let timerInterval = null;
let installPrompt = null;
let toastTimeout = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function daysUntilExam() {
  const today = parseLocalDate(localDateKey());
  const exam = parseLocalDate(state.settings.examDate);
  return Math.ceil((exam - today) / 86400000);
}

function currentPhase() {
  const today = localDateKey();
  if (today <= "2026-07-31") return { key: "foundation", name: "全範囲1周期", message: "7月末までにトリセツを一周。完璧を待たず、読んだ単元の問題をその日に解きます。" };
  if (today <= "2026-08-31") return { key: "practice", name: "過去問反復期", message: "8月は過去問中心。正解数より、すべての選択肢の根拠を説明できるかを重視します。" };
  if (today <= "2026-09-30") return { key: "mock", name: "模試・弱点補強期", message: "9月は週1回の模試と誤答分析。宅建業法を安定した得点源に仕上げます。" };
  return { key: "final", name: "直前仕上げ期", message: "新しい教材は増やさず、法改正・統計・数字と間違いノートに集中します。" };
}

function plannedMinutesForDate(dateKey) {
  const day = parseLocalDate(dateKey).getDay();
  return day === 0 || day === 6 ? state.settings.weekendMinutes : state.settings.weekdayMinutes;
}

function blockForDate(dateKey) {
  return STUDY_BLOCKS.find((block) => dateKey >= block.start && dateKey <= block.end) || null;
}

function studyIndexInBlock(block, dateKey) {
  let index = 0;
  let cursor = parseLocalDate(block.start);
  const end = parseLocalDate(dateKey);
  while (cursor < end) {
    if (state.settings.studyDays.includes(cursor.getDay()) && cursor.getDay() !== 0) index += 1;
    cursor = addDays(cursor, 1);
  }
  return index;
}

function assignmentForDate(dateKey) {
  const block = blockForDate(dateKey);
  if (!block) return null;
  const date = parseLocalDate(dateKey);
  const index = studyIndexInBlock(block, dateKey);
  const pool = block.entries || block.units.map((unit) => ({ subject: block.subject, unit }));
  const entry = pool[index % pool.length];
  if (date.getDay() === 0) {
    return { ...entry, unit: `週の復習・遅れ回収｜${block.label}`, reviewDay: true, block };
  }
  return { ...entry, block };
}

function yoshinoResourceForDate(dateKey) {
  if (dateKey >= "2026-10-01") return YOSHINO_RESOURCES.amendments;
  const assignment = assignmentForDate(dateKey);
  return YOSHINO_RESOURCES[assignment?.subject] || YOSHINO_RESOURCES.roadmap;
}

function phaseTask(assignment, dateKey, index) {
  const phase = assignment.block.stage;
  const subject = assignment.subject;
  const minutes = plannedMinutesForDate(dateKey);
  if (assignment.reviewDay) {
    const resource = yoshinoResourceForDate(dateKey);
    return [
      { title: assignment.unit, type: "週間レビュー", minutes: Math.max(30, Math.round(minutes * .45 / 5) * 5), questions: 0 },
      { title: "今週の誤答だけを解き直す", type: "誤答復習", minutes: Math.max(20, Math.round(minutes * .4 / 5) * 5), questions: Math.max(10, Math.round(minutes / 4)) },
      { title: `吉野塾｜${resource.title}`, type: "補強動画（任意）", minutes: Math.max(20, Math.round(minutes * .15 / 5) * 5), questions: 0, resourceUrl: resource.url }
    ].map((task, taskIndex) => ({ ...task, id: `auto-${dateKey}-${subject}-${index}-${taskIndex}`, date: dateKey, subject, automatic: true }));
  }
  const plans = {
    foundation: [
      { title: `トリセツ｜${assignment.unit}`, type: "基本テキスト", minutes: Math.max(30, Math.round(minutes * .55 / 5) * 5), questions: 0 },
      { title: `${assignment.unit}の基本問題・過去問`, type: "同日アウトプット", minutes: Math.max(25, Math.round(minutes * .45 / 5) * 5), questions: Math.max(10, Math.round(minutes / 4)) }
    ],
    practice: [
      { title: assignment.unit, type: "過去問演習", minutes: Math.max(40, Math.round(minutes * .68 / 5) * 5), questions: Math.max(15, Math.round(minutes / 3)) },
      { title: "トリセツで間違いの根拠を確認", type: "基本テキスト復習", minutes: Math.max(10, Math.round(minutes * .3 / 5) * 5), questions: 0 }
    ],
    mock: [
      { title: assignment.unit, type: assignment.unit.includes("模試") ? "本番形式" : "弱点演習", minutes: Math.max(45, Math.round(minutes * .7 / 5) * 5), questions: assignment.unit.includes("模試") ? 50 : Math.max(15, Math.round(minutes / 3)) },
      { title: "誤答原因を分類してトリセツに戻る", type: "誤答分析", minutes: Math.max(20, Math.round(minutes * .3 / 5) * 5), questions: 0 }
    ],
    final: [
      { title: assignment.unit, type: "直前確認", minutes: Math.max(40, Math.round(minutes * .65 / 5) * 5), questions: Math.max(10, Math.round(minutes / 4)) },
      { title: "間違いノート・重要数字だけ確認", type: "記憶維持", minutes: Math.max(20, Math.round(minutes * .35 / 5) * 5), questions: 0 }
    ]
  };
  return plans[phase].map((task, taskIndex) => ({
    ...task,
    id: `auto-${dateKey}-${subject}-${index}-${taskIndex}`,
    date: dateKey,
    subject,
    automatic: true
  }));
}

function generatedTasksForDate(dateKey) {
  const date = parseLocalDate(dateKey);
  const exam = parseLocalDate(state.settings.examDate);
  if (date < parseLocalDate(PLAN_START) || date >= exam || !state.settings.studyDays.includes(date.getDay())) return [];
  const assignment = assignmentForDate(dateKey);
  if (!assignment) return [];
  const dayDistance = Math.floor((date - parseLocalDate(PLAN_START)) / 86400000);
  return phaseTask(assignment, dateKey, dayDistance);
}

function tasksForDate(dateKey) {
  const custom = state.customTasks.filter((task) => task.date === dateKey);
  return [...generatedTasksForDate(dateKey), ...custom];
}

function isComplete(taskId) {
  return Boolean(state.completions[taskId]);
}

function toggleTask(task) {
  if (isComplete(task.id)) {
    delete state.completions[task.id];
    showToast("完了を取り消しました");
  } else {
    state.completions[task.id] = {
      date: localDateKey(),
      plannedDate: task.date,
      subject: task.subject,
      minutes: task.minutes,
      questions: task.questions || 0,
      title: task.title
    };
    showToast("学習を記録しました");
  }
  saveState();
  renderAll();
}

function getSubjectStats(subject) {
  const completed = Object.values(state.completions).filter((item) => item.subject === subject);
  const sessions = state.focusSessions.filter((item) => item.subject === subject);
  const quiz = state.quizHistory.filter((item) => item.subject === subject);
  return {
    minutes: completed.reduce((sum, item) => sum + item.minutes, 0) + sessions.reduce((sum, item) => sum + item.minutes, 0),
    answered: completed.reduce((sum, item) => sum + (item.questions || 0), 0) + quiz.length,
    correct: quiz.filter((item) => item.correct).length,
    quizTotal: quiz.length
  };
}

function minutesByDate(dateKey) {
  const taskMinutes = Object.values(state.completions).filter((item) => item.date === dateKey).reduce((sum, item) => sum + item.minutes, 0);
  const focusMinutes = state.focusSessions.filter((item) => item.date === dateKey).reduce((sum, item) => sum + item.minutes, 0);
  return taskMinutes + focusMinutes;
}

function calculateStreak() {
  let streak = 0;
  let cursor = parseLocalDate(localDateKey());
  if (minutesByDate(localDateKey()) === 0) cursor = addDays(cursor, -1);
  while (minutesByDate(localDateKey(cursor)) > 0) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

function quizAccuracy(history = state.quizHistory) {
  if (!history.length) return null;
  return Math.round(history.filter((item) => item.correct).length / history.length * 100);
}

function taskMarkup(task) {
  const subject = SUBJECTS[task.subject];
  const complete = isComplete(task.id);
  return `
    <article class="task-card ${complete ? "is-complete" : ""}" style="--subject-color:${subject.color}">
      <button class="task-check" type="button" data-task-id="${task.id}" aria-label="${complete ? "完了を取り消す" : "完了にする"}">
        ${complete ? '<svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>' : ""}
      </button>
      <div class="task-copy"><h3>${escapeHtml(task.title)}</h3><div class="task-meta"><span class="subject-dot"></span><span>${subject.name}</span><span>・</span><span>${task.type}</span>${task.questions ? `<span>・${task.questions}問</span>` : ""}${task.resourceUrl ? `<span>・</span><a class="task-resource-link" href="${task.resourceUrl}" target="_blank" rel="noreferrer">開く ↗</a>` : ""}</div></div>
      <span class="task-duration">${task.minutes} min</span>
    </article>`;
}

function bindTaskButtons(container, tasks) {
  container.querySelectorAll("[data-task-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const task = tasks.find((item) => item.id === button.dataset.taskId);
      if (task) toggleTask(task);
    });
  });
}

function renderHome() {
  const now = new Date();
  const today = localDateKey(now);
  const phase = currentPhase();
  $("#todayLabel").textContent = `${now.getMonth() + 1}月${now.getDate()}日 ${WEEKDAYS[now.getDay()]}曜日`;
  $("#daysRemaining").textContent = Math.max(0, daysUntilExam());
  $("#phaseMessage").textContent = phase.message;
  $("#streakValue").innerHTML = `${calculateStreak()}<small>日</small>`;

  const weekStart = startOfWeek(now);
  const weekDates = Array.from({ length: 7 }, (_, index) => localDateKey(addDays(weekStart, index)));
  const weekMinutes = weekDates.reduce((sum, date) => sum + minutesByDate(date), 0);
  const accuracy = quizAccuracy();
  $("#weeklyMinutesValue").innerHTML = `${weekMinutes}<small>分</small>`;
  $("#accuracyValue").innerHTML = `${accuracy === null ? "--" : accuracy}<small>%</small>`;
  $("#weeklyRate").textContent = `${Math.min(100, Math.round(weekMinutes / weeklyGoalMinutes() * 100))}%`;

  const tasks = tasksForDate(today);
  const todayTasks = $("#todayTasks");
  todayTasks.innerHTML = tasks.length ? tasks.map(taskMarkup).join("") : '<div class="empty-state"><strong>今日は休息日です</strong><p>余裕があれば復習を1問。休むことも計画の一部です。</p></div>';
  bindTaskButtons(todayTasks, tasks);
  renderBars("#weeklyBars", weekDates, weekMinutes);
  renderTextbookProgress();
  renderExamReminder();
}

function renderTextbookProgress() {
  const entries = Object.entries(state.textbookProgress);
  const overall = Math.round(entries.reduce((sum, [, value]) => sum + Number(value), 0) / entries.length);
  $("#bookOverallFill").style.width = `${overall}%`;
  $("#bookOverallLabel").textContent = `${overall}%`;
  const next = entries.slice().sort((a, b) => a[1] - b[1])[0];
  $("#bookNextSubject").textContent = next[1] >= 100 ? "基本テキストを一周しました。次は弱点箇所を見直しましょう。" : `次は${SUBJECTS[next[0]].name}を進めるのがおすすめです。`;
  $("#textbookMap").innerHTML = entries.map(([key, value]) => `<article class="textbook-map-item" style="--subject-color:${SUBJECTS[key].color}"><header><h3>${SUBJECTS[key].name}</h3><strong>${value}%</strong></header><div class="progress-track"><div class="progress-fill" style="width:${value}%"></div></div></article>`).join("");
}

function weeklyGoalMinutes() {
  return state.settings.studyDays.reduce((sum, day) => sum + (day === 0 || day === 6 ? state.settings.weekendMinutes : state.settings.weekdayMinutes), 0);
}

function renderBars(selector, dateKeys) {
  const max = Math.max(state.settings.weekendMinutes, ...dateKeys.map(minutesByDate));
  const today = localDateKey();
  $(selector).innerHTML = dateKeys.map((dateKey) => {
    const date = parseLocalDate(dateKey);
    const minutes = minutesByDate(dateKey);
    const height = Math.min(100, Math.round(minutes / max * 100));
    return `<div class="bar-column ${dateKey === today ? "is-today" : ""}"><div class="bar-track" title="${minutes}分"><div class="bar-fill" style="height:${height}%"></div></div><span>${WEEKDAYS[date.getDay()]}</span></div>`;
  }).join("");
}

function renderSchedule() {
  const phase = currentPhase();
  $("#schedulePhase").textContent = phase.name;
  $("#weeklyGoalLabel").textContent = `${weeklyGoalMinutes()}分`;
  const selected = parseLocalDate(state.selectedDate);
  const weekStart = startOfWeek(selected);
  const dates = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  $("#weekSelector").innerHTML = dates.map((date) => {
    const key = localDateKey(date);
    return `<button class="day-button ${key === state.selectedDate ? "is-selected" : ""} ${tasksForDate(key).length ? "has-task" : ""}" type="button" data-date="${key}"><span>${WEEKDAYS[date.getDay()]}</span><strong>${date.getDate()}</strong><i></i></button>`;
  }).join("");
  $$("#weekSelector [data-date]").forEach((button) => button.addEventListener("click", () => {
    state.selectedDate = button.dataset.date;
    saveState();
    renderSchedule();
  }));

  $("#selectedDateEyebrow").textContent = state.selectedDate === localDateKey() ? "TODAY" : "SELECTED DAY";
  $("#selectedDateTitle").textContent = `${selected.getMonth() + 1}月${selected.getDate()}日（${WEEKDAYS[selected.getDay()]}）`;
  const tasks = tasksForDate(state.selectedDate);
  const container = $("#scheduleTasks");
  container.innerHTML = tasks.length ? tasks.map(taskMarkup).join("") : '<div class="empty-state"><strong>予定はありません</strong><p>休息日にするか、右上の＋から予定を追加できます。</p></div>';
  bindTaskButtons(container, tasks);
  renderRoadmap();
  renderTextbookProgress();
  renderUnitPlan();
  renderImportantDates();
  renderYoshinoSupplement();
}

function renderRoadmap() {
  const today = localDateKey();
  const steps = [
    { start: "2026-06-11", end: "2026-07-31", number: "01", title: "全範囲1周", description: "トリセツ＋同日演習", timing: "6/11〜7/31" },
    { start: "2026-08-01", end: "2026-08-31", number: "02", title: "過去問反復", description: "分野別に2周", timing: "8/1〜8/31" },
    { start: "2026-09-01", end: "2026-09-30", number: "03", title: "弱点補強", description: "模試＋誤答分析", timing: "9/1〜9/30" },
    { start: "2026-10-01", end: "2026-10-11", number: "04", title: "直前仕上げ", description: "統計・法改正・数字", timing: "10/1〜10/11" },
    { start: "2026-10-12", end: "2026-10-17", number: "05", title: "本番調整", description: "新しい教材は増やさない", timing: "10/12〜10/17" }
  ];
  $("#roadmap").innerHTML = steps.map((step) => {
    const isCurrent = today >= step.start && today <= step.end;
    return `<article class="roadmap-step ${isCurrent ? "is-current" : ""}"><span class="roadmap-number">${step.number}</span><div><h3>${step.title}</h3><p>${step.description}</p></div><span>${isCurrent ? "現在地" : step.timing}</span></article>`;
  }).join("");
}

function renderUnitPlan() {
  const today = localDateKey();
  $("#unitPlan").innerHTML = STUDY_BLOCKS.map((block) => {
    const current = today >= block.start && today <= block.end;
    const start = parseLocalDate(block.start);
    const end = parseLocalDate(block.end);
    const subjects = block.entries ? [...new Set(block.entries.map((item) => SUBJECTS[item.subject].short))].join("・") : SUBJECTS[block.subject].name;
    return `<article class="unit-plan-item ${current ? "is-current" : ""}"><div class="unit-plan-date">${start.getMonth() + 1}/${start.getDate()}<br>〜 ${end.getMonth() + 1}/${end.getDate()}</div><div><h3>${block.label}｜${subjects}${current ? "（現在地）" : ""}</h3><p>${block.summary}</p></div></article>`;
  }).join("");
}

function nextExamEvent() {
  const today = localDateKey();
  return EXAM_EVENTS.find((event) => event.date >= today) || EXAM_EVENTS[EXAM_EVENTS.length - 1];
}

function daysUntil(dateKey) {
  return Math.ceil((parseLocalDate(dateKey) - parseLocalDate(localDateKey())) / 86400000);
}

function renderExamReminder() {
  const event = nextExamEvent();
  const date = parseLocalDate(event.date);
  const remaining = daysUntil(event.date);
  $("#nextEventDay").textContent = date.getDate();
  $("#nextEventMonth").textContent = `${date.getMonth() + 1}月`;
  $("#nextEventTitle").textContent = event.title;
  $("#nextEventDescription").textContent = `${remaining === 0 ? "今日" : `あと${remaining}日`}｜${event.description}`;
}

function renderImportantDates() {
  const nextId = nextExamEvent().id;
  $("#importantDates").innerHTML = EXAM_EVENTS.map((event) => {
    const past = event.date < localDateKey();
    return `<article class="date-row ${event.id === nextId ? "is-next" : ""}"><time>${event.shortDate}</time><div><h3>${event.title}</h3><p>${event.description}</p></div><span>${past ? "完了" : event.id === nextId ? "次の予定" : ""}</span></article>`;
  }).join("");
}

function renderYoshinoSupplement() {
  const resource = yoshinoResourceForDate(state.selectedDate);
  $("#yoshinoTitle").textContent = resource.title;
  $("#yoshinoDescription").textContent = `${resource.description} 主教材はLECトリセツのままです。`;
  $("#yoshinoLink").href = resource.url;
}

function filteredQuestions() {
  let questions = state.quizFilter === "all" ? QUESTIONS : QUESTIONS.filter((item) => item.subject === state.quizFilter);
  if (state.reviewOnly) {
    const wrongIds = new Set(state.quizHistory.filter((item) => !item.correct).map((item) => item.questionId));
    questions = questions.filter((item) => wrongIds.has(item.id));
  }
  return questions;
}

function pickQuestion(forceNext = false) {
  const questions = filteredQuestions();
  if (!questions.length) {
    state.reviewOnly = false;
    showToast("復習待ちの問題はありません");
    return pickQuestion(true);
  }
  if (forceNext || !currentQuestion || !questions.some((item) => item.id === currentQuestion.id)) {
    currentQuestionIndex = (currentQuestionIndex + (forceNext ? 1 : 0)) % questions.length;
    currentQuestion = questions[currentQuestionIndex];
  }
  renderQuizQuestion();
}

function renderQuizQuestion() {
  if (!currentQuestion) return pickQuestion();
  const questions = filteredQuestions();
  $("#quizSubjectBadge").textContent = SUBJECTS[currentQuestion.subject].name;
  $("#quizCounter").textContent = `${Math.max(1, questions.findIndex((item) => item.id === currentQuestion.id) + 1)} / ${questions.length}`;
  $("#quizQuestion").textContent = currentQuestion.question;
  $("#answerGrid").innerHTML = currentQuestion.options.map((option, index) => `<button class="answer-button" type="button" data-answer="${index}"><span>${index === 0 ? "○" : "×"}</span>${option}</button>`).join("");
  $("#quizFeedback").className = "quiz-feedback";
  $("#quizFeedback").innerHTML = "";
  $("#nextQuestionButton").classList.add("is-hidden");
  $$("#answerGrid [data-answer]").forEach((button) => button.addEventListener("click", () => answerQuestion(Number(button.dataset.answer))));
}

function answerQuestion(selected) {
  const correct = selected === currentQuestion.answer;
  $$("#answerGrid [data-answer]").forEach((button) => {
    const index = Number(button.dataset.answer);
    button.disabled = true;
    if (index === currentQuestion.answer) button.classList.add("is-correct");
    if (index === selected && !correct) button.classList.add("is-wrong");
  });
  state.quizHistory.push({
    questionId: currentQuestion.id,
    subject: currentQuestion.subject,
    correct,
    selected,
    date: localDateKey(),
    timestamp: Date.now()
  });
  saveState();
  const feedback = $("#quizFeedback");
  feedback.innerHTML = `<strong>${correct ? "正解です" : "ここは復習ポイント"}</strong>${currentQuestion.explanation}`;
  feedback.classList.add("is-visible");
  $("#nextQuestionButton").classList.remove("is-hidden");
  renderTodayQuizScore();
  renderProgress();
}

function renderTodayQuizScore() {
  const todayHistory = state.quizHistory.filter((item) => item.date === localDateKey());
  $("#todayQuizScore").textContent = `${todayHistory.filter((item) => item.correct).length} / ${todayHistory.length}`;
}

function renderQuiz() {
  $$("#quizFilters button").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === state.quizFilter && !state.reviewOnly));
  renderTodayQuizScore();
  if (!currentQuestion || !filteredQuestions().some((item) => item.id === currentQuestion.id)) pickQuestion();
}

function renderProgress() {
  const totals = Object.keys(SUBJECTS).map((key) => ({ key, ...getSubjectStats(key) }));
  const totalMinutes = totals.reduce((sum, item) => sum + item.minutes, 0);
  const targetMinutes = Object.values(SUBJECTS).reduce((sum, item) => sum + item.targetMinutes, 0);
  const overall = Math.min(100, Math.round(totalMinutes / targetMinutes * 100));
  $("#overallProgress").textContent = `${overall}%`;
  $("#overallRing").style.setProperty("--percent", overall);
  $("#subjectProgressGrid").innerHTML = totals.map((stats) => {
    const subject = SUBJECTS[stats.key];
    const percent = Math.min(100, Math.round(stats.minutes / subject.targetMinutes * 100));
    const accuracy = stats.quizTotal ? Math.round(stats.correct / stats.quizTotal * 100) : null;
    return `<article class="subject-progress-card" style="--subject-color:${subject.color}"><header><h3>${subject.name}</h3><strong>${percent}%</strong></header><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div><p><span>${stats.minutes}分・${stats.answered}問</span><span>正答 ${accuracy === null ? "--" : `${accuracy}%`}</span></p></article>`;
  }).join("");

  const weakest = totals.slice().sort((a, b) => {
    const aRate = a.quizTotal ? a.correct / a.quizTotal : 1;
    const bRate = b.quizTotal ? b.correct / b.quizTotal : 1;
    return aRate - bRate || a.minutes - b.minutes;
  })[0];
  const weakName = SUBJECTS[weakest.key].name;
  $("#insightCard").innerHTML = `<span class="insight-label">NEXT BEST ACTION</span><h2>次は「${weakName}」を20分。</h2><p>${weakest.quizTotal ? "正答率が相対的に低い科目です。間違えた問題を解き直し、答えの根拠を1行で説明してみましょう。" : "まだ演習記録が少ない科目です。まず一問一答で現在地を確かめましょう。"}</p>`;

  const weekDates = Array.from({ length: 7 }, (_, index) => localDateKey(addDays(new Date(), index - 6)));
  renderBars("#activityChart", weekDates);
  renderReviewList();
}

function latestWrongQuestionIds() {
  const latest = new Map();
  state.quizHistory.forEach((item) => latest.set(item.questionId, item));
  return [...latest.values()].filter((item) => !item.correct).map((item) => item.questionId);
}

function renderReviewList() {
  const ids = latestWrongQuestionIds();
  $("#reviewCount").textContent = `${ids.length}問`;
  const questions = ids.map((id) => QUESTIONS.find((item) => item.id === id)).filter(Boolean);
  $("#reviewList").innerHTML = questions.length ? questions.slice(0, 5).map((question) => `<article class="review-item"><div><h3>${escapeHtml(question.question)}</h3><span>${SUBJECTS[question.subject].name}</span></div><button type="button" data-review-id="${question.id}">解く</button></article>`).join("") : '<div class="empty-state"><strong>復習待ちはありません</strong><p>間違えた問題がここに自動で追加されます。</p></div>';
  $$("[data-review-id]").forEach((button) => button.addEventListener("click", () => {
    currentQuestion = QUESTIONS.find((item) => item.id === button.dataset.reviewId);
    state.quizFilter = currentQuestion.subject;
    state.reviewOnly = false;
    activateView("quiz");
    renderQuizQuestion();
  }));
}

function renderAll() {
  renderHome();
  renderSchedule();
  renderQuiz();
  renderProgress();
}

function activateView(viewName) {
  $$(".view").forEach((view) => view.classList.toggle("is-active", view.dataset.view === viewName));
  $$(".bottom-nav [data-view-target]").forEach((button) => button.classList.toggle("is-active", button.dataset.viewTarget === viewName));
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (viewName === "schedule") renderSchedule();
  if (viewName === "progress") renderProgress();
}

function openSettings() {
  $("#examDateInput").value = state.settings.examDate;
  $("#weekdayMinutesInput").value = state.settings.weekdayMinutes;
  $("#weekdayMinutesOutput").textContent = `${state.settings.weekdayMinutes}分`;
  $("#weekendMinutesInput").value = state.settings.weekendMinutes;
  $("#weekendMinutesOutput").textContent = `${state.settings.weekendMinutes}分`;
  $("#weekdayChecks").innerHTML = WEEKDAYS.map((day, index) => `<label><input type="checkbox" value="${index}" ${state.settings.studyDays.includes(index) ? "checked" : ""}><span>${day}</span></label>`).join("");
  $("#settingsDialog").showModal();
}

function openBookProgress() {
  $("#bookRangeList").innerHTML = Object.entries(SUBJECTS).map(([key, subject]) => {
    const value = state.textbookProgress[key] || 0;
    return `<div class="book-range-row"><label for="book-${key}">${subject.name}</label><output id="book-${key}-output">${value}%</output><input id="book-${key}" data-book-subject="${key}" type="range" min="0" max="100" step="5" value="${value}"></div>`;
  }).join("");
  $$("[data-book-subject]").forEach((input) => input.addEventListener("input", () => {
    $(`#book-${input.dataset.bookSubject}-output`).textContent = `${input.value}%`;
  }));
  $("#bookProgressDialog").showModal();
}

function saveBookProgress(event) {
  event.preventDefault();
  $$("[data-book-subject]").forEach((input) => {
    state.textbookProgress[input.dataset.bookSubject] = Number(input.value);
  });
  saveState();
  $("#bookProgressDialog").close();
  renderAll();
  showToast("基本テキストの進捗を更新しました");
}

function saveSettings(event) {
  event.preventDefault();
  const studyDays = $$("#weekdayChecks input:checked").map((input) => Number(input.value));
  if (!studyDays.length) {
    showToast("学習する曜日を1日以上選んでください");
    return;
  }
  state.settings.examDate = $("#examDateInput").value;
  state.settings.weekdayMinutes = Number($("#weekdayMinutesInput").value);
  state.settings.weekendMinutes = Number($("#weekendMinutesInput").value);
  state.settings.studyDays = studyDays;
  state.settings.planAnchor = localDateKey();
  saveState();
  $("#settingsDialog").close();
  renderAll();
  showToast("学習計画を更新しました");
}

function escapeIcs(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

function calendarDate(dateKey) {
  return dateKey.replaceAll("-", "");
}

function downloadExamCalendar() {
  const events = EXAM_EVENTS.map((event) => [
    "BEGIN:VEVENT",
    `UID:${event.id}-2026-takken@takken-path.local`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART;VALUE=DATE:${calendarDate(event.date)}`,
    `DTEND;VALUE=DATE:${calendarDate(localDateKey(addDays(parseLocalDate(event.date), 1)))}`,
    `SUMMARY:${escapeIcs(event.calendarTitle)}`,
    `DESCRIPTION:${escapeIcs(event.description)}\n公式: https://www.retio.or.jp/exam/schedule/`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs(event.calendarTitle)}`,
    "END:VALARM",
    "END:VEVENT"
  ].join("\r\n")).join("\r\n");
  const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//TAKKEN PATH//Exam Schedule 2026//JA", "CALSCALE:GREGORIAN", events, "END:VCALENDAR"].join("\r\n");
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "takken-exam-2026-important-dates.ics";
  link.click();
  URL.revokeObjectURL(url);
  showToast("重要日程をカレンダーファイルにしました");
}

function addCustomTask(event) {
  event.preventDefault();
  const subject = $("#taskSubjectInput").value;
  state.customTasks.push({
    id: `custom-${Date.now()}`,
    date: state.selectedDate,
    subject,
    title: $("#taskTitleInput").value.trim(),
    type: "追加予定",
    minutes: Number($("#taskMinutesInput").value),
    questions: 0,
    automatic: false
  });
  saveState();
  $("#taskDialog").close();
  $("#taskForm").reset();
  $("#taskMinutesInput").value = 30;
  renderAll();
  showToast("予定を追加しました");
}

function updateTimer() {
  const minutes = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const seconds = String(timerSeconds % 60).padStart(2, "0");
  $("#timerDisplay").textContent = `${minutes}:${seconds}`;
}

function toggleTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    $("#timerToggle").textContent = "再開";
    return;
  }
  $("#timerToggle").textContent = "一時停止";
  timerInterval = setInterval(() => {
    timerSeconds -= 1;
    updateTimer();
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      state.focusSessions.push({ date: localDateKey(), subject: $("#focusSubject").value, minutes: 25, timestamp: Date.now() });
      saveState();
      timerSeconds = 25 * 60;
      updateTimer();
      $("#timerToggle").textContent = "開始";
      renderAll();
      showToast("25分の集中セッションを記録しました");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 25 * 60;
  $("#timerToggle").textContent = "開始";
  updateTimer();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `takken-path-${localDateKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("学習データを書き出しました");
}

function showToast(message) {
  clearTimeout(toastTimeout);
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 2300);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function registerEvents() {
  $$('[data-view-target]').forEach((button) => button.addEventListener("click", () => activateView(button.dataset.viewTarget)));
  $("#settingsButton").addEventListener("click", openSettings);
  $("#openSettingsMenu").addEventListener("click", openSettings);
  $("#settingsForm").addEventListener("submit", saveSettings);
  $("#updateBookProgress").addEventListener("click", openBookProgress);
  $("#updateBookProgressSchedule").addEventListener("click", openBookProgress);
  $("#bookProgressForm").addEventListener("submit", saveBookProgress);
  $("#weekdayMinutesInput").addEventListener("input", (event) => $("#weekdayMinutesOutput").textContent = `${event.target.value}分`);
  $("#weekendMinutesInput").addEventListener("input", (event) => $("#weekendMinutesOutput").textContent = `${event.target.value}分`);
  $("#calendarButtonHome").addEventListener("click", downloadExamCalendar);
  $("#calendarButtonSchedule").addEventListener("click", downloadExamCalendar);
  $("#calendarButtonMore").addEventListener("click", downloadExamCalendar);
  $("#addTaskButton").addEventListener("click", () => $("#taskDialog").showModal());
  $("#taskForm").addEventListener("submit", addCustomTask);
  $("#replanButton").addEventListener("click", () => {
    state.settings.examDate = "2026-10-18";
    state.settings.weekdayMinutes = 120;
    state.settings.weekendMinutes = 210;
    state.settings.studyDays = [0, 1, 2, 3, 4, 5, 6];
    state.settings.planAnchor = PLAN_START;
    state.selectedDate = localDateKey();
    saveState();
    renderAll();
    showToast("6月11日開始の推奨プランに戻しました");
  });
  $("#timerToggle").addEventListener("click", toggleTimer);
  $("#timerReset").addEventListener("click", resetTimer);
  $("#nextQuestionButton").addEventListener("click", () => pickQuestion(true));
  $$("#quizFilters button").forEach((button) => button.addEventListener("click", () => {
    state.quizFilter = button.dataset.filter;
    state.reviewOnly = false;
    currentQuestion = null;
    saveState();
    renderQuiz();
    pickQuestion();
  }));
  $("#exportButton").addEventListener("click", exportData);
  $("#resetDataButton").addEventListener("click", () => {
    if (!window.confirm("この端末の学習記録をすべて削除します。よろしいですか？")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = defaultState();
    currentQuestion = null;
    renderAll();
    showToast("学習データをリセットしました");
  });
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    $("#installButton").classList.remove("is-hidden");
  });
  $("#installButton").addEventListener("click", async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    $("#installButton").classList.add("is-hidden");
  });
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

registerEvents();
renderAll();
pickQuestion();
