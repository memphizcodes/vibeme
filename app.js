/* ─────────────────────────────────────────────────────────────
   WORLD'S PRETTIEST PERSON — app.js
───────────────────────────────────────────────────────────── */

const $ = id => document.getElementById(id);
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ──────────────────────────────────────
// STATE CONTROLLER
// ──────────────────────────────────────
function showState(num) {
  document.querySelectorAll('.state').forEach(s => s.classList.remove('active'));
  const el = $(`state-${num}`);
  if (el) el.classList.add('active');
}

// ──────────────────────────────────────
// PRELOAD
// ──────────────────────────────────────
function preloadImages() {
  ['her.jpg', 'him.jpg', 'us.jpg', 'world_map.png'].forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// ──────────────────────────────────────
// LOG HELPERS
// ──────────────────────────────────────
function addLog(text, cls = '') {
  const box = $('log-content');
  if (!box) return;
  const e = document.createElement('span');
  e.className = 'log-entry' + (cls ? ` ${cls}` : '');
  e.textContent = `> ${text}`;
  box.appendChild(e);
  const t = document.querySelector('.log-terminal:not(.match-terminal)');
  if (t) t.scrollTop = t.scrollHeight;
}

function addMatchLog(text, cls = '') {
  const box = $('match-log-content');
  if (!box) return;
  const e = document.createElement('span');
  e.className = 'log-entry' + (cls ? ` ${cls}` : '');
  e.textContent = `> ${text}`;
  box.appendChild(e);
  const t = document.querySelector('.match-terminal');
  if (t) t.scrollTop = t.scrollHeight;
}

function setScan(text) {
  const el = $('scan-text');
  if (el) el.textContent = text;
}

// ══════════════════════════════════════
// STATE 1 → 2
// ══════════════════════════════════════
$('btn-launch').addEventListener('click', () => {
  showState(2);
  const b = $('log-content');
  if (b) b.innerHTML = '';
  runWorldScan();
});

// ══════════════════════════════════════
// STATE 2: AESTHETIC WORLD SCANNER HUD
// ══════════════════════════════════════
async function runWorldScan() {
  const headline = $('scan-headline');
  const reticle  = $('hud-reticle');
  const mapWrap  = $('map-wrapper');

  function moveReticle(topPct, leftPct) {
    if (!reticle) return;
    reticle.classList.add('active');
    reticle.style.top = `${topPct}%`;
    reticle.style.left = `${leftPct}%`;
  }

  setScan('Initialising scan...');
  if (headline) headline.textContent = 'Searching the World...';
  addLog('Initializing global search protocols...');
  await sleep(900);

  addLog('Connecting to satellite network...');
  setScan('Connecting to satellite...');
  await sleep(1000);

  // 1. North America
  setScan('Scanning North America...');
  moveReticle(30, 24);
  addLog('Scanning North America... [NEGATIVE]', 'log-negative');
  await sleep(1100);
  const stampNa = $('stamp-na');
  if (stampNa) stampNa.classList.add('visible');
  await sleep(350);

  // 2. South America
  setScan('Scanning South America...');
  moveReticle(66, 32);
  addLog('Scanning South America... [NEGATIVE]', 'log-negative');
  await sleep(1000);
  const stampSa = $('stamp-sa');
  if (stampSa) stampSa.classList.add('visible');
  await sleep(350);

  // 3. Europe
  setScan('Scanning Europe...');
  moveReticle(26, 51);
  addLog('Scanning Europe... [NEGATIVE]', 'log-negative');
  await sleep(1000);
  const stampEu = $('stamp-eu');
  if (stampEu) stampEu.classList.add('visible');
  await sleep(350);

  // 4. Africa
  setScan('Scanning Africa...');
  moveReticle(54, 52);
  addLog('Scanning Africa... [NEGATIVE]', 'log-negative');
  await sleep(950);
  const stampAf = $('stamp-af');
  if (stampAf) stampAf.classList.add('visible');
  await sleep(350);

  // 5. Australia
  setScan('Scanning Australia...');
  moveReticle(72, 83);
  addLog('Scanning Australia... [NEGATIVE]', 'log-negative');
  await sleep(950);
  const stampAu = $('stamp-au');
  if (stampAu) stampAu.classList.add('visible');
  await sleep(350);

  // 6. India — FOUND
  setScan('Scanning India...');
  moveReticle(48, 70);
  addLog('Scanning India... [SIGNAL DETECTED]', 'log-signal');
  if (mapWrap) mapWrap.classList.add('zoom-india');
  await sleep(1200);
  const stampIndia = $('stamp-india');
  if (stampIndia) stampIndia.classList.add('visible');
  await sleep(600);

  addLog('Match confirmed: India ✓', 'log-success');
  setScan('MATCH CONFIRMED ✓');
  if (headline) headline.textContent = 'Match Confirmed ✓';
  await sleep(1400);

  showState(3);
  runZoomSequence();
}

// ══════════════════════════════════════
// STATE 3: ZOOM DRILL DOWN
// ══════════════════════════════════════
async function runZoomSequence() {
  const trails = [
    { id: 'trail-asia',      delay: 200  },
    { id: 'trail-india',     delay: 900  },
    { id: 'trail-karnataka', delay: 1750 },
    { id: 'trail-bangalore', delay: 2650 },
  ];
  trails.forEach(({ id, delay }) => {
    setTimeout(() => {
      const el = $(id);
      if (el) el.classList.add('visible');
    }, delay);
  });

  await sleep(1200);
  await animateCoords();

  await sleep(500);
  const s = $('zoom-status');
  if (s) {
    s.textContent = 'Identity confirmed. Preparing profile...';
    s.style.animationPlayState = 'paused';
    s.style.opacity = '1';
  }

  await sleep(1600);
  showState(4);
  runRevealSequence();
}

async function animateCoords() {
  const latEl = $('coord-lat');
  const lonEl = $('coord-lon');
  if (!latEl || !lonEl) return;
  for (let i = 0; i <= 28; i++) {
    const t = i / 28;
    latEl.textContent = `${(28.5  + (12.991753 - 28.5)  * t).toFixed(6)}° N`;
    lonEl.textContent = `${(68.2  + (77.569641 - 68.2)  * t).toFixed(6)}° E`;
    await sleep(45);
  }
  latEl.textContent = '12.991753° N';
  lonEl.textContent = '77.569641° E';
}

// ══════════════════════════════════════
// STATE 4: HER PHOTO REVEAL
// ══════════════════════════════════════
async function runRevealSequence() {
  await sleep(350);
  const img = $('her-photo');
  if (img) {
    const reveal = () => img.classList.add('revealed');
    if (img.complete && img.naturalHeight !== 0) reveal();
    else img.onload = reveal;
  }
  await sleep(1500);
  const stamp = $('registry-stamp');
  if (stamp) stamp.classList.add('visible');
}

$('btn-find-match').addEventListener('click', () => {
  showState(5);
  initSurvey();
});

// ══════════════════════════════════════
// STATE 5: FUNNY SURVEY (? -> ✓ -> ✗ -> ?)
// ══════════════════════════════════════
const surveyItems = [
  { id: 'q1', text: 'Treat me as a queen' },
  { id: 'q2', text: 'Worship the ground I walk on (like, literally)' },
  { id: 'q3', text: 'I can get angry, he can\'t' },
  { id: 'q4', text: 'My money is my money. His money is also my money.' },
  { id: 'q5', text: 'Available 24/7' },
];

const surveyState = {}; // 'question', 'checked', 'crossed'

function initSurvey() {
  const list = $('survey-list');
  if (!list) return;
  list.innerHTML = '';

  surveyItems.forEach(item => {
    surveyState[item.id] = 'question'; // Starts as question mark like before!
    const row = document.createElement('div');
    row.className = 'survey-item';
    row.dataset.id = item.id;

    const toggle = document.createElement('div');
    toggle.className = 'survey-toggle';
    toggle.id = `toggle-${item.id}`;
    toggle.textContent = '?';

    const text = document.createElement('span');
    text.className = 'survey-text';
    text.textContent = item.text;

    row.appendChild(toggle);
    row.appendChild(text);
    list.appendChild(row);

    // Single click = tick (✓), next click = wrong (✗), next click = ?
    row.addEventListener('click', () => cycleSurveyItem(item.id));
  });

  $('btn-survey-submit').addEventListener('click', () => {
    showState(6);
  });
}

function cycleSurveyItem(id) {
  const current = surveyState[id] || 'question';
  let next = 'checked';
  if (current === 'question') next = 'checked';
  else if (current === 'checked') next = 'crossed';
  else next = 'question';

  surveyState[id] = next;

  const toggle = $(`toggle-${id}`);
  if (!toggle) return;
  toggle.classList.remove('checked', 'crossed');

  if (next === 'checked') {
    toggle.classList.add('checked');
    toggle.textContent = '✓';
  } else if (next === 'crossed') {
    toggle.classList.add('crossed');
    toggle.textContent = '✗';
  } else {
    toggle.textContent = '?';
  }
}

// ══════════════════════════════════════
// STATE 6: ERROR 404 SCREEN
// ══════════════════════════════════════
let errorNoClicks = 0;
let isReScanning = false;

$('btn-error-yes').addEventListener('click', () => {
  if (isReScanning) return;
  showState(7);
  buildGuessWhoBoard();
  runGuessWho();
});

$('btn-error-no').addEventListener('click', async () => {
  if (isReScanning) return;
  isReScanning = true;
  errorNoClicks++;

  const btnNo  = $('btn-error-no');
  const btnYes = $('btn-error-yes');
  const msg    = $('error-no-msg');

  btnNo.disabled = true;
  btnYes.style.pointerEvents = 'none';

  if (errorNoClicks === 1) {
    btnNo.textContent = 'Searching...';
    if (msg) msg.innerHTML = '<span class="scan-pulse" style="display:inline-block; vertical-align:middle; margin-right:6px;"></span> Re-scanning database of 8,000,000,000 profiles...';
    await sleep(1300);

    if (msg) msg.textContent = 'Recalculating exact criteria across 195 countries...';
    await sleep(1200);

    if (msg) msg.textContent = 'Search completed: Still 0 matches found. (We checked twice!)';
    btnNo.textContent = 'Search Again (0 Found)';
  } else if (errorNoClicks === 2) {
    btnNo.textContent = 'Searching...';
    if (msg) msg.innerHTML = '<span class="scan-pulse" style="display:inline-block; vertical-align:middle; margin-right:6px;"></span> Checking alternate corners of earth...';
    await sleep(1300);

    if (msg) msg.textContent = 'Recalculating... absolutely nobody matches all 5.';
    await sleep(1200);

    if (msg) msg.textContent = 'Result: Still 0. The only way forward is clicking Yes!';
    btnNo.textContent = 'Still No? (0 Found)';
  } else {
    btnNo.textContent = 'Searching...';
    if (msg) msg.innerHTML = '<span class="scan-pulse" style="display:inline-block; vertical-align:middle; margin-right:6px;"></span> Deep scan in progress...';
    await sleep(1200);

    if (msg) msg.textContent = '0 matches. Please click "Yes, find match" above!';
    btnNo.textContent = 'No More Candidates (0 Found)';
    btnNo.style.opacity = '0.6';
  }

  btnNo.disabled = false;
  btnYes.style.pointerEvents = 'all';
  isReScanning = false;
});

// ══════════════════════════════════════
// STATE 7: GUESS WHO BOARD GAME
// ══════════════════════════════════════

const silhouettes = {
  0: `<svg viewBox="0 0 60 80" fill="none"><ellipse cx="30" cy="22" rx="13" ry="15" fill="#8B6240" opacity="0.7"/><path d="M12,70 C12,50 48,50 48,70" fill="#8B6240" opacity="0.7"/></svg>`,
  1: `<svg viewBox="0 0 60 80" fill="none"><ellipse cx="30" cy="24" rx="12" ry="13" fill="#8B6240" opacity="0.7"/><rect x="18" y="12" width="24" height="6" rx="3" fill="#5C3D2E" opacity="0.75"/><path d="M14,70 C14,51 46,51 46,70" fill="#8B6240" opacity="0.7"/></svg>`,
  2: `<svg viewBox="0 0 60 80" fill="none"><ellipse cx="30" cy="21" rx="13" ry="14" fill="#8B6240" opacity="0.7"/><path d="M20,30 C18,42 42,42 40,30" fill="#5C3D2E" opacity="0.65"/><path d="M13,70 C13,50 47,50 47,70" fill="#8B6240" opacity="0.7"/></svg>`,
  3: `<svg viewBox="0 0 60 80" fill="none"><ellipse cx="30" cy="26" rx="11" ry="12" fill="#8B6240" opacity="0.7"/><path d="M14,70 C14,51 46,51 46,70" fill="#8B6240" opacity="0.7"/></svg>`,
  winner: `<svg viewBox="0 0 60 80" fill="none"><ellipse cx="30" cy="22" rx="13" ry="15" fill="#B06060" opacity="0.7"/><path d="M12,70 C12,50 48,50 48,70" fill="#B06060" opacity="0.7"/><path d="M30,52 C30,52 22,47 22,42 C22,39 24.5,37 27,38.5 C28.5,39.5 30,41 30,41 C30,41 31.5,39.5 33,38.5 C35.5,37 38,39 38,42 C38,47 30,52 30,52Z" fill="white" opacity="0.6"/></svg>`,
};

const candidates = [
  { id: 'c1',  name: 'Rahul',              sil: 0 },
  { id: 'c2',  name: 'Kyle',               sil: 1 },
  { id: 'c3',  name: 'Arjun',              sil: 2 },
  { id: 'c4',  name: 'Pierre',             sil: 3 },
  { id: 'c5',  name: 'Vikram',             sil: 0 },
  { id: 'c6',  name: 'Greg',               sil: 1 },
  { id: 'c7',  name: 'Karthik',            sil: 2 },
  { id: 'c8',  name: 'Rohan',              sil: 3 },
  { id: 'c9',  name: 'Aditya',             sil: 0 },
  { id: 'c10', name: 'Kevin',              sil: 1 },
  { id: 'c11', name: 'Chad',               sil: 2 },
  { id: 'c12', name: 'Manas',              sil: 'winner', isWinner: true },
];

const eliminationRounds = [
  {
    criteria: '😄 Filtering: Must be Kannadiga...',
    eliminate: ['c2', 'c4', 'c6'],
    targetCount: 3820400,
  },
  {
    criteria: '🍗 Filtering: Eats non-veg...',
    eliminate: ['c10', 'c11'],
    targetCount: 1910200,
  },
  {
    criteria: '👑 Filtering: Kempegowda family lineage...',
    eliminate: ['c1', 'c8'],
    targetCount: 680,
  },
  {
    criteria: 'Filtering: Must be a honest person',
    eliminate: ['c3', 'c5'],
    targetCount: 42,
  },
  {
    criteria: 'Filtering: Must be loyal & patient',
    eliminate: ['c9'],
    targetCount: 8,
  },
  {
    criteria: 'Filtering: Must be ambitious',
    eliminate: ['c7'],
    targetCount: 3,
  },
];

function animateNumber(element, start, end, duration) {
  if (!element) return Promise.resolve();
  const startTime = performance.now();
  return new Promise(resolve => {
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (end - start) * ease);
      element.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = end.toLocaleString();
        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}

function initRejectionTicker() {
  const container = $('profile-scroll-track');
  if (!container) return;
  const sampleRejected = [
    { name: 'Profile #981,204', loc: 'Disqualified' },
    { name: 'Kyle B.', loc: 'Austin, TX' },
    { name: 'Profile #3,104,892', loc: 'Disqualified' },
    { name: 'Pierre M.', loc: 'Paris, FR' },
    { name: 'Profile #812,044', loc: 'Disqualified' },
    { name: 'Vikram R.', loc: 'Mumbai, IN' },
    { name: 'Profile #4,902,118', loc: 'Disqualified' },
    { name: 'Greg T.', loc: 'London, UK' },
    { name: 'Profile #7,184,002', loc: 'Disqualified' },
    { name: 'Chad P.', loc: 'Miami, FL' },
    { name: 'Profile #2,490,119', loc: 'Disqualified' },
    { name: 'Kevin L.', loc: 'Sydney, AU' },
    { name: 'Arjun V.', loc: 'Delhi, IN' },
    { name: 'Rohan M.', loc: 'Pune, IN' },
    { name: 'Aditya S.', loc: 'Indore, IN' },
    { name: 'Rahul K.', loc: 'Kolkata, IN' },
  ];

  const avatarSvg = `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="14" r="8" fill="#8B6240"/><path d="M8,36 C8,26 32,26 32,36" fill="#8B6240"/></svg>`;

  function makeGroup() {
    return `<div class="profile-scroll-group">` +
      sampleRejected.map(p => `
        <div class="scroll-profile-card">
          <div class="scroll-profile-avatar">${avatarSvg}</div>
          <div class="scroll-profile-info">
            <span class="scroll-profile-name">${p.name}</span>
            <span class="scroll-profile-status">REJECTED ✕</span>
          </div>
        </div>
      `).join('') +
      `</div>`;
  }

  // Two identical groups for seamless infinite scrolling that never stops
  container.innerHTML = makeGroup() + makeGroup();
}

const randomProfiles = [
  { name: 'Alex M.', sil: 0 },
  { name: 'David K.', sil: 1 },
  { name: 'Mateo R.', sil: 2 },
  { name: 'Kenji T.', sil: 3 },
  { name: 'Liam P.', sil: 0 },
  { name: 'Gaurav S.', sil: 1 },
  { name: 'Lucas D.', sil: 2 },
  { name: 'Carlos V.', sil: 3 },
  { name: 'Tyler B.', sil: 0 },
  { name: 'Devendra J.', sil: 1 },
  { name: 'Marcus H.', sil: 2 },
  { name: 'Samir A.', sil: 3 },
  { name: 'Felix N.', sil: 0 },
  { name: 'Ishan B.', sil: 1 },
  { name: 'Nikolai V.', sil: 2 },
  { name: 'Ethan W.', sil: 3 },
  { name: 'Farhan Z.', sil: 0 },
  { name: 'Siddharth M.', sil: 1 },
  { name: 'Zane T.', sil: 2 },
  { name: 'Anand R.', sil: 3 },
];

const slotShufflers = {};

function startSlotShuffle(cid) {
  const card = $(`card-${cid}`);
  if (!card) return;
  card.classList.add('shuffling');
  const silEl = card.querySelector('.guess-card-sil');
  const nameEl = card.querySelector('.guess-card-name');

  const interval = setInterval(() => {
    const p = randomProfiles[Math.floor(Math.random() * randomProfiles.length)];
    if (silEl) silEl.innerHTML = silhouettes[p.sil];
    if (nameEl) nameEl.textContent = p.name;
  }, 75 + Math.floor(Math.random() * 30));

  slotShufflers[cid] = interval;
}

function stopSlotShuffle(cid, finalName, finalSil) {
  if (slotShufflers[cid]) {
    clearInterval(slotShufflers[cid]);
    delete slotShufflers[cid];
  }
  const card = $(`card-${cid}`);
  if (!card) return;
  card.classList.remove('shuffling');
  const silEl = card.querySelector('.guess-card-sil');
  const nameEl = card.querySelector('.guess-card-name');
  if (silEl && silhouettes[finalSil]) silEl.innerHTML = silhouettes[finalSil];
  if (nameEl) nameEl.textContent = finalName;
}

function startAllSlotShuffles() {
  candidates.forEach(c => {
    startSlotShuffle(c.id);
  });
}

function buildGuessWhoBoard() {
  const board = $('guess-board');
  if (!board) return;
  board.innerHTML = '';

  candidates.forEach(c => {
    const card = document.createElement('div');
    card.className = 'guess-card';
    card.id = `card-${c.id}`;

    const face = document.createElement('div');
    face.className = 'guess-card-face';

    const sil = document.createElement('div');
    sil.className = 'guess-card-sil';
    sil.innerHTML = silhouettes[c.sil];

    const name = document.createElement('div');
    name.className = 'guess-card-name';
    name.textContent = c.name;

    const xMark = document.createElement('div');
    xMark.className = 'guess-card-x-mark';
    xMark.textContent = '✗';

    face.appendChild(sil);
    face.appendChild(name);
    card.appendChild(face);
    card.appendChild(xMark);
    board.appendChild(card);
  });
}

async function runGuessWho() {
  initRejectionTicker();
  const criteriaEl = $('guess-criteria');
  const countEl    = $('guess-counter-num');
  let currentCount = 8000000;

  // Start ALL slots actively shuffling through random profiles!
  startAllSlotShuffles();

  if (criteriaEl) criteriaEl.textContent = 'Scanning 8,000,000 Bangalore profiles...';
  if (countEl) countEl.textContent = currentCount.toLocaleString();
  await sleep(1400);

  for (const round of eliminationRounds) {
    if (criteriaEl) criteriaEl.textContent = round.criteria;

    // Fast animated countdown
    animateNumber(countEl, currentCount, round.targetCount, 1300);
    currentCount = round.targetCount;

    await sleep(650);

    for (const cid of round.eliminate) {
      const cand = candidates.find(item => item.id === cid);
      if (cand) {
        stopSlotShuffle(cid, cand.name, cand.sil);
      }
      const card = $(`card-${cid}`);
      if (card) card.classList.add('eliminated');
      await sleep(280);
    }
    await sleep(650);
  }

  // Winner reveal: only c12 is still spinning! Decelerate dramatically to reveal Manas
  if (criteriaEl) criteriaEl.textContent = '✦ Match identified. Final candidate locking in...';

  if (slotShufflers['c12']) {
    clearInterval(slotShufflers['c12']);
    delete slotShufflers['c12'];
  }

  const card12 = $('card-c12');
  const sil12  = card12 ? card12.querySelector('.guess-card-sil') : null;
  const name12 = card12 ? card12.querySelector('.guess-card-name') : null;

  const decelProfiles = [
    { name: 'Siddharth R.', sil: 1 },
    { name: 'Vikram A.', sil: 2 },
    { name: 'Devendra K.', sil: 0 },
    { name: 'Manas', sil: 'winner' }
  ];
  const decelDelays = [140, 240, 380, 500];

  for (let i = 0; i < decelProfiles.length; i++) {
    const p = decelProfiles[i];
    if (sil12 && silhouettes[p.sil]) sil12.innerHTML = silhouettes[p.sil];
    if (name12) name12.textContent = p.name;
    await sleep(decelDelays[i]);
  }

  if (card12) card12.classList.remove('shuffling');

  // Final counter drop to 1
  await animateNumber(countEl, currentCount, 1, 600);
  if (countEl) countEl.textContent = '1 (100% Match Identified)';

  if (card12) card12.classList.add('winner-glow');

  await sleep(2200);
  showState(8);
  const b = $('match-log-content');
  if (b) b.innerHTML = '';
  runMatchScan();
}

// ══════════════════════════════════════
// STATE 8: MATCH SCAN TERMINAL
// ══════════════════════════════════════
async function runMatchScan() {
  const steps = [
    { text: 'Searching for the person most likely to adore her properly...', delay: 700,  cls: '' },
    { text: 'Cross-referencing over 8 billion profiles...', delay: 1100, cls: '' },
    { text: 'Rechecking if he is a Kannadiga...  ✓', delay: 850,  cls: 'log-check' },
    { text: 'Rechecking if he belongs to Kempegowda family...  ✓', delay: 900,  cls: 'log-check' },
    { text: 'Rechecking if he eats non-veg...  ✓', delay: 850,  cls: 'log-check' },
    { text: 'Rechecking honesty...  ✓', delay: 800,  cls: 'log-check' },
    { text: 'Rechecking loyalty...  ✓', delay: 800,  cls: 'log-check' },
    { text: 'Rechecking ambition...  ✓', delay: 800,  cls: 'log-check' },
    { text: 'Rechecking patience...  ✓', delay: 850,  cls: 'log-check' },
    { text: 'Rechecking emotional availability...  ✓', delay: 850,  cls: 'log-check' },
    { text: 'Rechecking ability to handle mood swings…  ✓', delay: 950, cls: 'log-check' },
    { text: 'Rechecking ability to handle her wonderfully relaxed side…  ✓', delay: 1000, cls: 'log-check' },
    { text: 'Perfect match found: Manas Kumar G A ♥', delay: 1100, cls: 'log-found' },
  ];

  for (const step of steps) {
    await sleep(step.delay);
    addMatchLog(step.text, step.cls);
  }

  await sleep(1600);
  showState(9);
  revealHim();
}

// ══════════════════════════════════════
// STATE 9: HIS REVEAL & PROPOSAL
// ══════════════════════════════════════
async function revealHim() {
  await sleep(300);
  const img = $('his-photo');
  if (img) {
    const reveal = () => img.classList.add('revealed');
    if (img.complete && img.naturalHeight !== 0) reveal();
    else img.onload = reveal;
  }

  await sleep(2000);
  const section = $('proposal-section');
  if (section) section.style.opacity = '1';
  wireProposal();
}

let proposalNoClicks = 0;

function wireProposal() {
  const btnNo  = $('btn-no');
  const btnYes = $('btn-yes');
  const banner = $('system-alert-banner');

  if (!btnNo || !btnYes) return;

  function runaway() {
    const parent = $('proposal-buttons');
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const btnRect    = btnNo.getBoundingClientRect();
    const maxX = parentRect.width - btnRect.width;
    const newX = Math.max(0, Math.min(Math.random() * maxX * 1.6 - 20, maxX));
    const newY = Math.max(-20, Math.min((Math.random() - 0.5) * 35, 20));
    btnNo.style.position = 'absolute';
    btnNo.style.left = `${newX}px`;
    btnNo.style.top  = `${newY}px`;
  }

  btnNo.addEventListener('click', () => {
    proposalNoClicks++;
    if (banner) banner.classList.add('visible');

    if (proposalNoClicks === 1) {
      btnNo.textContent = 'Error: Disabled';
      btnNo.style.opacity = '0.7';
    } else {
      runaway();
    }
  });

  btnNo.addEventListener('mouseover', () => {
    if (proposalNoClicks >= 1) runaway();
  });

  btnNo.addEventListener('touchstart', e => {
    if (proposalNoClicks >= 1) {
      e.preventDefault();
      runaway();
    }
  }, { passive: false });

  btnYes.addEventListener('click', async () => {
    showState(10);
    await sleep(350);
    launchConfetti();
  });
}

// ══════════════════════════════════════
// CONFETTI
// ══════════════════════════════════════
function launchConfetti() {
  const canvas = $('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const palette = ['#C4A882','#B06060','#E8C4C4','#8B6240','#FAD4A0','#D4A0A0','#F0D4B8','#C48080'];

  class Piece {
    constructor() { this.reset(true); }
    reset(init) {
      this.x     = Math.random() * canvas.width;
      this.y     = init ? Math.random() * canvas.height * 0.3 - canvas.height * 0.5 : -20;
      this.sz    = Math.random() * 9 + 5;
      this.color = palette[Math.floor(Math.random() * palette.length)];
      this.vx    = (Math.random() - 0.5) * 2.5;
      this.vy    = Math.random() * 3 + 1.5;
      this.g     = 0.06;
      this.rot   = Math.random() * 360;
      this.rs    = (Math.random() - 0.5) * 5;
      this.type  = Math.random() > 0.4 ? 'heart' : 'rect';
      this.wb    = Math.random() * Math.PI * 2;
      this.ws    = Math.random() * 0.08 + 0.02;
    }
    update() {
      this.vy += this.g;
      this.wb += this.ws;
      this.x  += this.vx + Math.sin(this.wb) * 0.6;
      this.y  += this.vy;
      this.rot += this.rs;
      if (this.y > canvas.height + 20) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot * Math.PI / 180);
      ctx.fillStyle = this.color;
      if (this.type === 'heart') {
        const d = this.sz;
        ctx.beginPath();
        ctx.moveTo(0, -d * .2);
        ctx.bezierCurveTo(-d*.5,-d*.9,-d,-d*.5,-d,0);
        ctx.bezierCurveTo(-d,d*.5,-d*.2,d,0,d*1.2);
        ctx.bezierCurveTo(d*.2,d,d,d*.5,d,0);
        ctx.bezierCurveTo(d,-d*.5,d*.5,-d*.9,0,-d*.2);
        ctx.fill();
      } else {
        ctx.fillRect(-this.sz/2, -this.sz/3, this.sz, this.sz*.6);
      }
      ctx.restore();
    }
  }

  const particles = Array.from({ length: 130 }, () => new Piece());
  let frame;
  (function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    frame = requestAnimationFrame(loop);
  })();

  setTimeout(() => {
    cancelAnimationFrame(frame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 6500);

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ──────────────────────────────────────
// INIT
// ──────────────────────────────────────
preloadImages();
