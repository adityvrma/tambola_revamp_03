/* ============================================================================
   DIWALI TAMBOLA PRO ENGINE (CLOUD REALTIME DATABASE + 100 PLAYERS + 10 ROUNDS)
   ============================================================================ */

// 👇 BHAI APNA FIREBASE REALTIME DATABASE URL YAHAN DOUBLE QUOTES KE ANDAR PASTE KAR:
const FIREBASE_DB_URL = "https://tambola1-default-rtdb.firebaseio.com/";

/* ============================================================================
   DIWALI TAMBOLA PRO ENGINE (POINTS 1–7 COMPLETE: DANCING MASCOT, PARTY POPPER
   CONFETTI LIBRARY, VICTORY FANFARE SOUND & CROSS-DEVICE CELEBRATION SYNC)
   ============================================================================ */

// 👇 BHAI APNA FIREBASE REALTIME DATABASE URL YAHAN DOUBLE QUOTES KE ANDAR PASTE KARNA:

const STORAGE_KEY = 'DIWALI_TAMBOLA_PRO_V2';
const LOCAL_MARKS_KEY = 'TAMBOLA_PERMANENT_MARKS_V2';
const ADMIN_CREDENTIALS = { id: 'admin', pass: 'diwali123' };

const syncChannel = ('BroadcastChannel' in window)
  ? new BroadcastChannel('diwali_tambola_pro_channel')
  : null;

// MODULE 1: Strict Game Lifecycle States
const GAME_STATES = {
  SETUP: 'SETUP',
  LOBBY: 'LOBBY',
  LIVE_CALLING: 'LIVE_CALLING',
  CLAIM_PAUSED: 'CLAIM_PAUSED',
  MANUAL_PAUSED: 'MANUAL_PAUSED',
  COMPLETED: 'COMPLETED'
};

// Pure Desi Indian Tambola Lingo (Zero Emojis)
// Pure Desi Indian Tambola Lingo (Written for Natural Indian Human Pronunciation)
const TAMBOLA_LINGO = {
  1: "Apna Number One!",
2: "Jodi No. 1",
3: "Teen Tigada, Kaam Bigada",
4: "Darling, You're My Four-ever",
5: "Paanch Rupaye Ki Pepsi",
6: "Chhakka Maar Ke Dikha!",
7: "Saat Samundar Paar",
8: "Aathva Ajooba",
9: "Nau Do Gyarah",
10: "Dus Bahane Karke Le Gaye Dil",
11: "Ek Aur Ek Gyarah",
12: "Barah Baje Ki Party",
13: "Tera Lucky Number",
14: "Chaudahvi Ka Chaand",
15: "Pandrah Minute Mein Fame",
16: "Sweet Sixteen",
17: "Satrah Saal Ki Jawaani",
18: "Adulting Starts Here",
19: "Unnis Bees Ka Farak",
20: "Bees Saal Ka Experience",
21: "Ikkees Topi, Sir Pe Topi",
22: "Do Hanso Ka Joda",
23: "तेईस, Full on Tez",
24: "24 Ghante, Biwi Ke Naam",
25: "Silver Jubilee",
26: "Republic Day Special",
27: "Sattais, Wah Kya Baat Hai",
28: "Athais, Dil Garden Garden",
29: "Twenty-Nine, Looking Fine",
30: "Tees Maar Khan",
31: "Ikattis, Party Shuru",
32: "Battisi Dikhao, Smile Banao",
33: "Double Tiya, Double Masti",
34: "Chautis, Kya Scene Hai Boss?",
35: "Thirty-Five, Stay Alive",
36: "Chhattis Ka Aankda",
37: "Sattais Nahi, Saitis!",
38: "Athtees, Full on Tees",
39: "Almost Forty, Still Naughty",
40: "Naughty Forty",
41: "Ek Chalis, Full on Chaalis",
42: "Hitchhiker's Answer",
43: "Tera Mera Rishta Purana",
44: "Double Chaar, Full Tayyar",
45: "Paitalis, Abhi Picture Baaki Hai",
46: "Chhiyaalis, Kya Kamaal",
47: "Sainalis, Nacho Saari Raat",
48: "Four Dozen, No Reason",
49: "Unchaas, Full Class",
50: "Half Century!",
51: "Ikyavan, Shagun Ka Number",
52: "Taash Ke Patte, Baavan",
53: "Tirpan, Full on Fun",
54: "Chawwan, Dil Hai Jawaan",
55: "Double Paanch, Double Punch",
56: "Chhappan Bhog",
57: "Sattavan, Sabko Nachaavan",
58: "Athavan, Yaad Rakhna",
59: "Unsath, Bas Ek Aur Saath",
60: "Saath Saath, Zindagi Bhar",
61: "Iksath, Full Swag",
62: "Baasath, Kya Baat",
63: "Tera Kya Hoga Kaliya!",
64: "Chess Ka Board",
65: "Painsath, Ab Toh Karo Naach",
66: "Double Six, Double Tricks",
67: "Sadsath, Full Jashn",
68: "Adh-Saath, Full Thaat",
69: "Ulta Pulta, Sixty-Nine!",
70: "Sattar, Dil Hai Superstar",
71: "Ikhattar, Kya Zabardast Number",
72: "Bahattar, Full Taiyaar",
73: "Tihattar, Dil Maange More",
74: "Chauhattar, Karo Thoda Shor",
75: "Diamond Jubilee",
76: "Chhihattar, Party All Night",
77: "Double Lucky Seven",
78: "Athhattar, Sabki Nazar",
79: "Unasi, Almost Eighty",
80: "Assi, Bas Ab Kya Baaki",
81: "Ekasi, Nacho Zara Hansi Khushi",
82: "Bayaasi, Full Aish",
83: "Tirasi, Masti Hi Masti",
84: "Chaurasi, Kya Kismat Hai!",
85: "Pachasi, Ab Toh Nacho Ji",
86: "Chhiyaasi, Full on Crazy",
87: "Sattasi, Kahan Gayi Aunty Ji?",
88: "Two Fat Ladies",
89: "Nawasi, Bas Ek Baaki",
90: "Top of the House!"
};

function getNumberLingo(num) {
  if (!num) return "Waiting for Host to call number";
  if (TAMBOLA_LINGO[num]) return TAMBOLA_LINGO[num];
  const tens = Math.floor(num / 10);
  const units = num % 10;
  if (num < 10) return `Single Number ${num}`;
  if (units === 0) return `Round Figure Dhamaka ${num}`;
  return `${tens} and ${units}, Number ${num}`;
}

function getSpokenCalloutText(num) {
  if (!num) return "";
  const cleanLingo = (TAMBOLA_LINGO[num] || "").trim();
  if (cleanLingo) {
    return `Number ${num}! ${cleanLingo}.`;
  }
  return `Number ${num}!`;
}
/* ============================================================================
   PERMANENT LOCAL TAP CACHE
   ============================================================================ */

function getLocalLockedMarks() {
  try {
    const raw = localStorage.getItem(LOCAL_MARKS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function addLocalLockedMark(round, ticketId, num) {
  const store = getLocalLockedMarks();
  const key = `R${round}_${ticketId}`;
  if (!Array.isArray(store[key])) {
    store[key] = [];
  }
  const n = Number(num);
  if (!store[key].includes(n)) {
    store[key].push(n);
    localStorage.setItem(LOCAL_MARKS_KEY, JSON.stringify(store));
  }
}

function clearLocalLockedMarks() {
  localStorage.removeItem(LOCAL_MARKS_KEY);
}

// MODULE 3: Exhaustive 20 Winning Dividends Catalog
const MASTER_DIVIDENDS_CATALOG = [
  { id: 'EARLY_5', name: 'Early 5 (Jaldi 5)', icon: '🎆', desc: 'First 5 numbers marked on ticket', defaultSlots: 1, defaultPoints: 100, defaultChecked: true },
  { id: 'EARLY_7', name: 'Early 7 (Jaldi 7)', icon: '🎇', desc: 'First 7 numbers marked on ticket', defaultSlots: 1, defaultPoints: 100, defaultChecked: false },
  { id: 'TOP_LINE', name: 'Top Line', icon: '🪔', desc: 'All 5 numbers of Row 1', defaultSlots: 1, defaultPoints: 150, defaultChecked: true },
  { id: 'MIDDLE_LINE', name: 'Middle Line', icon: '🍬', desc: 'All 5 numbers of Row 2', defaultSlots: 1, defaultPoints: 150, defaultChecked: true },
  { id: 'BOTTOM_LINE', name: 'Bottom Line', icon: '🟠', desc: 'All 5 numbers of Row 3', defaultSlots: 1, defaultPoints: 150, defaultChecked: true },
  { id: 'FOUR_CORNERS', name: 'Four Corners', icon: '✨', desc: '1st & last of Top Row + 1st & last of Bottom Row', defaultSlots: 1, defaultPoints: 150, defaultChecked: true },
  { id: 'LADDU', name: 'Center / Laddu', icon: '🟡', desc: 'Exact 3rd (middle) number of Row 2', defaultSlots: 1, defaultPoints: 100, defaultChecked: true },
  { id: 'KING_CORNERS', name: 'King Corners (Star)', icon: '👑', desc: '4 Corners + Center Laddu (5 numbers)', defaultSlots: 1, defaultPoints: 200, defaultChecked: false },
  { id: 'BAMBOO', name: 'Bamboo (Center Column)', icon: '🎋', desc: '3rd number of Row 1, Row 2, and Row 3', defaultSlots: 1, defaultPoints: 150, defaultChecked: false },
  { id: 'BREAKFAST', name: 'Breakfast (1–29)', icon: '☕', desc: 'All numbers in Cols 1, 2, 3 (1 to 29)', defaultSlots: 1, defaultPoints: 150, defaultChecked: false },
  { id: 'LUNCH', name: 'Lunch (30–59)', icon: '🍛', desc: 'All numbers in Cols 4, 5, 6 (30 to 59)', defaultSlots: 1, defaultPoints: 150, defaultChecked: false },
  { id: 'DINNER', name: 'Dinner (60–90)', icon: '🍽️', desc: 'All numbers in Cols 7, 8, 9 (60 to 90)', defaultSlots: 1, defaultPoints: 150, defaultChecked: false },
  { id: 'TEMPERATURE', name: 'Temperature / BP', icon: '🌡️', desc: 'Smallest number + Largest number on ticket', defaultSlots: 1, defaultPoints: 120, defaultChecked: true },
  { id: 'JAWAANI', name: 'Jawaani (Young 1–45)', icon: '💃', desc: 'All ticket numbers between 1 and 45', defaultSlots: 1, defaultPoints: 200, defaultChecked: false },
  { id: 'BUDHAPA', name: 'Budhapa (Old 46–90)', icon: '👴', desc: 'All ticket numbers between 46 and 90', defaultSlots: 1, defaultPoints: 200, defaultChecked: false },
  { id: 'PYRAMID', name: 'Pyramid Pattern', icon: '🔺', desc: 'Row1(3rd) + Row2(2nd,4th) + Row3(1st,3rd,5th)', defaultSlots: 1, defaultPoints: 200, defaultChecked: false },
  { id: 'UNLUCKY_ONE', name: 'Unlucky One (0 After 12 Calls)', icon: '😅', desc: '0 numbers called on ticket after 12+ draws', defaultSlots: 1, defaultPoints: 100, defaultChecked: false },
  { id: 'HALF_SHEET', name: 'Half Sheet Bonus (3 Tickets)', icon: '📑', desc: 'At least 2 numbers marked on 3 tickets', defaultSlots: 1, defaultPoints: 250, defaultChecked: false },
  { id: 'FULL_SHEET', name: 'Full Sheet Bonus (6 Tickets)', icon: '📚', desc: 'At least 2 numbers marked on all 6 tickets', defaultSlots: 1, defaultPoints: 400, defaultChecked: false },
  { id: 'FULL_HOUSE', name: 'Full House (All 15)', icon: '🏆', desc: 'All 15 numbers on a ticket', defaultSlots: 2, defaultPoints: 500, defaultChecked: true }
];

function getTimeStr() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function generateShuffledPool90() {
  const arr = Array.from({ length: 90 }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ============================================================================
   MODULE 2: EXACT FULL-SHEET (6-TICKET STRIP) MATHEMATICAL GENERATOR
   ============================================================================ */

const COL_RANGES = [
  [1, 9], [10, 19], [20, 29], [30, 39], [40, 49],
  [50, 59], [60, 69], [70, 79], [80, 90]
];

function computeTicketHash(grid) {
  const nums = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] !== null && grid[r][c] > 0) {
        nums.push(String(grid[r][c]).padStart(2, '0'));
      }
    }
  }
  return nums.sort().join('-');
}

function generateFullSheetStrip(existingHashes = new Set()) {
  for (let attempt = 0; attempt < 50; attempt++) {
    const colPools = COL_RANGES.map(([min, max]) => {
      const p = [];
      for (let n = min; n <= max; n++) p.push(n);
      p.sort(() => Math.random() - 0.5);
      return p;
    });

    const colCounts = Array.from({ length: 6 }, () => Array(9).fill(1));
    const colRemaining = [3, 4, 4, 4, 4, 4, 4, 4, 5];
    const ticketRemaining = [6, 6, 6, 6, 6, 6];

    let allocationSuccess = true;
    for (let c = 0; c < 9; c++) {
      let rem = colRemaining[c];
      while (rem > 0) {
        const candidates = [0, 1, 2, 3, 4, 5].filter(
          t => ticketRemaining[t] > 0 && colCounts[t][c] < 3
        );
        if (candidates.length === 0) {
          allocationSuccess = false;
          break;
        }
        candidates.sort((a, b) => (ticketRemaining[b] - ticketRemaining[a]) || (Math.random() - 0.5));
        const chosenT = candidates[0];
        colCounts[chosenT][c]++;
        ticketRemaining[chosenT]--;
        rem--;
      }
      if (!allocationSuccess) break;
    }

    if (!allocationSuccess || ticketRemaining.some(r => r !== 0)) continue;

    const stripGrids = [];
    let stripValid = true;

    for (let t = 0; t < 6; t++) {
      const counts = colCounts[t];
      const gridMask = Array.from({ length: 3 }, () => Array(9).fill(0));
      const rowSums = [0, 0, 0];

      for (let c = 0; c < 9; c++) {
        if (counts[c] === 3) {
          gridMask[0][c] = 1; gridMask[1][c] = 1; gridMask[2][c] = 1;
          rowSums[0]++; rowSums[1]++; rowSums[2]++;
        }
      }
      for (let c = 0; c < 9; c++) {
        if (counts[c] === 2) {
          const rowsOrder = [0, 1, 2].sort((a, b) => (rowSums[a] - rowSums[b]) || (Math.random() - 0.5));
          gridMask[rowsOrder[0]][c] = 1;
          gridMask[rowsOrder[1]][c] = 1;
          rowSums[rowsOrder[0]]++;
          rowSums[rowsOrder[1]]++;
        }
      }
      for (let c = 0; c < 9; c++) {
        if (counts[c] === 1) {
          const rowsOrder = [0, 1, 2].sort((a, b) => (rowSums[a] - rowSums[b]) || (Math.random() - 0.5));
          gridMask[rowsOrder[0]][c] = 1;
          rowSums[rowsOrder[0]]++;
        }
      }

      if (rowSums[0] !== 5 || rowSums[1] !== 5 || rowSums[2] !== 5) {
        stripValid = false;
        break;
      }

      const finalGrid = Array.from({ length: 3 }, () => Array(9).fill(null));
      for (let c = 0; c < 9; c++) {
        const k = counts[c];
        const drawn = colPools[c].splice(0, k).sort((a, b) => a - b);
        let idx = 0;
        for (let r = 0; r < 3; r++) {
          if (gridMask[r][c] === 1) {
            finalGrid[r][c] = drawn[idx++];
          }
        }
      }

      const hash = computeTicketHash(finalGrid);
      if (existingHashes.has(hash)) {
        stripValid = false;
        break;
      }
      stripGrids.push({ grid: finalGrid, hash });
    }

    if (stripValid && stripGrids.length === 6) {
      return stripGrids;
    }
  }
  return [];
}

/* ============================================================================
   FIREBASE DATA NORMALIZER + PERMANENT MARK MERGER + CELEBRATION STATE
   ============================================================================ */

function normalizeRoomState(state) {
  if (!state || typeof state !== 'object') return createDefaultRoomState();

  state.calledNumbers = Array.isArray(state.calledNumbers) ? state.calledNumbers.map(Number) : [];
  state.numberPool = Array.isArray(state.numberPool) ? state.numberPool.map(Number) : [];
  state.currentNumber = state.currentNumber !== undefined && state.currentNumber !== null ? Number(state.currentNumber) : null;
  state.players = state.players && typeof state.players === 'object' ? state.players : {};
  state.tickets = state.tickets && typeof state.tickets === 'object' ? state.tickets : {};
  state.liveJoinRequests = state.liveJoinRequests && typeof state.liveJoinRequests === 'object' ? state.liveJoinRequests : {};
  state.lastCelebration = state.lastCelebration && typeof state.lastCelebration === 'object' ? state.lastCelebration : null;
  state.ticketHashes = Array.isArray(state.ticketHashes) ? state.ticketHashes : [];
  state.activity = Array.isArray(state.activity) ? state.activity : [];
  state.pastRounds = Array.isArray(state.pastRounds) ? state.pastRounds.slice(0, 10) : [];

  state.settings = Object.assign({
    ticketDistributionMode: 'SELF_PICK',
    maxTicketsPerPlayer: 6,
    callingMode: 'MANUAL',
    autoCallIntervalSec: 8,
    claimVerificationMode: 'AUTO',
    tappingMode: 'HARDCORE',
    strictLastNumberRule: true,
    allowJointWinners: true,
    claimWindowSec: 5,
    maxBogeysPerTicket: 2
  }, state.settings || {});

  Object.keys(state.players).forEach(pid => {
    const p = state.players[pid];
    if (p) {
      p.ticketIds = Array.isArray(p.ticketIds) ? p.ticketIds : [];
      p.requestedTickets = p.requestedTickets || 0;
    }
  });

  const localMarksStore = getLocalLockedMarks();
  const calledSet = new Set(state.calledNumbers);

  Object.keys(state.tickets).forEach(tid => {
    const t = state.tickets[tid];
    if (t) {
      const serverMarks = Array.isArray(t.markedNumbers) ? t.markedNumbers.map(Number) : [];
      const localKey = `R${state.round}_${tid}`;
      const localMarks = Array.isArray(localMarksStore[localKey]) ? localMarksStore[localKey].map(Number) : [];

      const mergedSet = new Set([...serverMarks, ...localMarks]);
      t.markedNumbers = Array.from(mergedSet).filter(n => calledSet.has(n));

      t.bogeyCount = t.bogeyCount || 0;
      t.isDisqualified = Boolean(t.isDisqualified);
      const normGrid = [];
      for (let r = 0; r < 3; r++) {
        const row = (t.grid && t.grid[r]) ? t.grid[r] : [];
        const normRow = [];
        for (let c = 0; c < 9; c++) {
          const val = row[c];
          normRow.push(val !== undefined && val !== null && Number(val) > 0 ? Number(val) : null);
        }
        normGrid.push(normRow);
      }
      t.grid = normGrid;
    }
  });

  state.dividends = Array.isArray(state.dividends) ? state.dividends : [];
  state.dividends.forEach(d => {
    d.winners = Array.isArray(d.winners) ? d.winners : [];
  });

  state.pastRounds.forEach(r => {
    r.calledNumbers = Array.isArray(r.calledNumbers) ? r.calledNumbers : [];
    r.dividends = Array.isArray(r.dividends) ? r.dividends : [];
    r.dividends.forEach(d => {
      d.winners = Array.isArray(d.winners) ? d.winners : [];
    });
  });

  return state;
}

/* ============================================================================
   CLOUD REALTIME DATABASE ENGINE + CONFETTI LIBRARY LOADER
   ============================================================================ */

let firebaseDbRef = null;
let isCloudConnected = false;

function isFirebaseConfigured() {
  return (
    FIREBASE_DB_URL &&
    FIREBASE_DB_URL.trim().startsWith('https://') &&
    !FIREBASE_DB_URL.includes('PASTE_YOUR_FIREBASE_URL_HERE')
  );
}

function updateCloudStatusBadge(text, colorHex) {
  let badge = document.getElementById('cloudSyncStatusBadge');
  if (!badge) {
    const topBar = document.querySelector('.control-title');
    if (topBar) {
      badge = document.createElement('span');
      badge.id = 'cloudSyncStatusBadge';
      badge.style.cssText = 'font-size:0.72rem; padding:3px 10px; border-radius:999px; font-weight:700; margin-left:6px; border:1px solid currentColor;';
      topBar.appendChild(badge);
    }
  }
  if (badge) {
    badge.textContent = text;
    badge.style.color = colorHex;
  }
}

function loadScriptAsync(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// Automatically load canvas-confetti Party Popper library in background
function initConfettiLibrary() {
  if (!window.confetti) {
    loadScriptAsync('https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js').catch(() => {});
  }
}

async function initCloudDatabaseSync() {
  initConfettiLibrary();

  if (!isFirebaseConfigured()) {
    updateCloudStatusBadge('🔴 Local Mode (Add Firebase URL in js/game.js)', '#fca5a5');
    return;
  }

  updateCloudStatusBadge('🟡 Connecting Cloud DB...', '#fde68a');
  const cleanUrl = FIREBASE_DB_URL.trim().replace(/\/+$/, '');

  try {
    if (!window.firebase) {
      await loadScriptAsync('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
      await loadScriptAsync('https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js');
    }

    if (!firebase.apps.length) {
      firebase.initializeApp({ databaseURL: cleanUrl });
    }

    firebaseDbRef = firebase.database().ref('diwaliTambolaRoom_v2');

    firebase.database().ref('.info/connected').on('value', (snap) => {
      if (snap.val() === true) {
        isCloudConnected = true;
        updateCloudStatusBadge('🟢 Cloud DB Live (100+ Players)', '#6ee7b7');
      } else {
        isCloudConnected = false;
        updateCloudStatusBadge('🟡 Reconnecting Cloud...', '#fde68a');
      }
    });

    firebaseDbRef.on('value', (snapshot) => {
      const cloudVal = snapshot.val();
      if (!cloudVal) {
        const localState = getRoomState();
        firebaseDbRef.set(localState);
        return;
      }

      const normalized = normalizeRoomState(cloudVal);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));

      // Trigger Dancing Mascot & Party Popper on Admin + All Players if a new prize was won!
      checkAndTriggerCelebration(normalized);

      const joinCodeEl = document.getElementById('joinRoomCode');
      if (joinCodeEl) joinCodeEl.value = normalized.roomCode;

      if (typeof renderAdminFullState === 'function') {
        renderAdminFullState();
      }
      if (typeof renderPlayerApp === 'function') {
        renderPlayerApp();
      }
    });
  } catch (err) {
    console.error('Firebase connection error:', err);
    updateCloudStatusBadge('🔴 Cloud DB Error (Check URL)', '#fca5a5');
  }
}

/* ============================================================================
   ROOM STATE GETTER & ATOMIC MULTI-PLAYER SAVER
   ============================================================================ */

function createDefaultRoomState() {
  const roomCode = 'TMB' + Math.floor(100 + Math.random() * 900);
  const hostSecretToken = 'adm_sec_' + Math.floor(100000 + Math.random() * 900000);

  const defaultDividends = MASTER_DIVIDENDS_CATALOG
    .filter(d => d.defaultChecked)
    .map(d => ({
      id: d.id,
      name: d.name,
      icon: d.icon,
      desc: d.desc,
      totalSlots: d.defaultSlots,
      prizePoints: d.defaultPoints,
      status: 'OPEN',
      claimWindowEndsAt: null,
      claimWindowNumber: null,
      winners: []
    }));

  return {
    roomCode,
    round: 1,
    title: 'Diwali Royal Family Tambola',
    hostSecretToken,
    status: GAME_STATES.SETUP,
    settings: {
      ticketDistributionMode: 'SELF_PICK',
      maxTicketsPerPlayer: 6,
      callingMode: 'MANUAL',
      autoCallIntervalSec: 8,
      claimVerificationMode: 'AUTO',
      tappingMode: 'HARDCORE',
      strictLastNumberRule: true,
      allowJointWinners: true,
      claimWindowSec: 5,
      maxBogeysPerTicket: 2
    },
    numberPool: generateShuffledPool90(),
    calledNumbers: [],
    currentNumber: null,
    dividends: defaultDividends,
    players: {},
    tickets: {},
    liveJoinRequests: {},
    ticketHashes: [],
    nextTicketCounter: 101,
    pendingManualClaim: null,
    lastCelebration: null,
    lastToast: null,
    lastReaction: null,
    activity: [
      { text: `Room ${roomCode} initialized in SETUP state.`, time: getTimeStr() }
    ],
    pastRounds: []
  };
}

function getRoomState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = createDefaultRoomState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  const parsed = normalizeRoomState(JSON.parse(raw));
  checkAndFinalizeGraceWindows(parsed);
  checkAndTriggerCelebration(parsed);
  return parsed;
}

function saveRoomState(state, eventType = 'STATE_UPDATED', payload = null) {
  state.pastRounds = Array.isArray(state.pastRounds) ? state.pastRounds.slice(0, 10) : [];
  state.activity = Array.isArray(state.activity) ? state.activity.slice(0, 60) : [];

  if (eventType === 'NEW_ROUND_RESET' || eventType === 'PLAYERS_CLEARED') {
    clearLocalLockedMarks();
    state.lastCelebration = null;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  checkAndTriggerCelebration(state);

  if (syncChannel) {
    syncChannel.postMessage({ type: eventType, payload });
  }

  if (!firebaseDbRef) return;

  const isPlayerPage = window.location.pathname.toLowerCase().includes('player');
  const myPid = localStorage.getItem('TAMBOLA_PLAYER_TOKEN');

  if (isPlayerPage) {
    const updates = {};

    if (eventType === 'LIVE_JOIN_REQUEST' && payload && payload.playerId) {
      const reqPid = payload.playerId;
      updates[`liveJoinRequests/${reqPid}`] = state.liveJoinRequests[reqPid] || null;
      updates['lastToast'] = state.lastToast || null;
      updates['activity'] = state.activity;
      firebaseDbRef.update(updates);
      return;
    }

    if (eventType === 'PLAYER_MARKED' && myPid && state.players[myPid]) {
      state.players[myPid].ticketIds.forEach(tid => {
        if (state.tickets[tid]) {
          updates[`tickets/${tid}/markedNumbers`] = state.tickets[tid].markedNumbers;
        }
      });
      firebaseDbRef.update(updates);
      return;
    }

    if (
      eventType === 'CLAIM_SUBMITTED' ||
      eventType === 'CLAIM_APPROVED' ||
      eventType === 'CLAIM_REJECTED'
    ) {
      updates['status'] = state.status;
      updates['dividends'] = state.dividends;
      updates['pendingManualClaim'] = state.pendingManualClaim || null;
      updates['lastCelebration'] = state.lastCelebration || null;
      updates['lastToast'] = state.lastToast || null;
      updates['activity'] = state.activity;
      updates['pastRounds'] = state.pastRounds;
      if (myPid && state.players[myPid]) {
        state.players[myPid].ticketIds.forEach(tid => {
          if (state.tickets[tid]) {
            updates[`tickets/${tid}`] = state.tickets[tid];
          }
        });
      }
      firebaseDbRef.update(updates);
      return;
    }

    if (myPid && state.players[myPid]) {
      updates[`players/${myPid}`] = state.players[myPid];
      state.players[myPid].ticketIds.forEach(tid => {
        if (state.tickets[tid]) {
          updates[`tickets/${tid}`] = state.tickets[tid];
        }
      });
      updates['ticketHashes'] = state.ticketHashes;
      updates['activity'] = state.activity;
      firebaseDbRef.update(updates);
    }
    return;
  }

  if (eventType === 'LIVE_JOIN_RESOLVED' && payload && payload.playerId) {
    const targetPid = payload.playerId;
    const adminUpdates = {
      [`liveJoinRequests/${targetPid}`]: state.liveJoinRequests[targetPid] || null,
      lastToast: state.lastToast || null,
      activity: state.activity,
      ticketHashes: state.ticketHashes
    };
    if (state.players[targetPid]) {
      adminUpdates[`players/${targetPid}`] = state.players[targetPid];
      state.players[targetPid].ticketIds.forEach(tid => {
        if (state.tickets[tid]) {
          adminUpdates[`tickets/${tid}`] = state.tickets[tid];
        }
      });
    }
    firebaseDbRef.update(adminUpdates);
    return;
  }

  if (eventType === 'NUMBER_DRAWN') {
    firebaseDbRef.update({
      status: state.status,
      numberPool: state.numberPool,
      calledNumbers: state.calledNumbers,
      currentNumber: state.currentNumber,
      dividends: state.dividends,
      lastToast: state.lastToast || null,
      activity: state.activity,
      pastRounds: state.pastRounds
    });
    return;
  }

  firebaseDbRef.set(state);
}

function addRoomActivity(state, text) {
  state.activity.unshift({ text, time: getTimeStr() });
  if (state.activity.length > 60) state.activity.pop();
}

function triggerGlobalToast(state, message) {
  state.lastToast = { id: Date.now() + Math.random(), message };
}

function issueTicketsToPlayer(state, playerId, count) {
  const player = state.players[playerId];
  if (!player) return [];

  if (firebaseDbRef && Array.isArray(player.ticketIds)) {
    player.ticketIds.forEach(oldId => {
      if (!state.tickets[oldId]) {
        firebaseDbRef.child(`tickets/${oldId}`).remove();
      }
    });
  }

  const existingHashes = new Set(state.ticketHashes || []);
  const issuedIds = [];
  const sheetId = 'sheet_' + Date.now();

  let poolOfGrids = [];
  while (poolOfGrids.length < count) {
    const strip = generateFullSheetStrip(existingHashes);
    strip.forEach(item => existingHashes.add(item.hash));
    poolOfGrids.push(...strip);
  }

  for (let i = 0; i < count; i++) {
    let tId = 'T' + Math.floor(1000 + Math.random() * 9000);
    while (state.tickets[tId]) {
      tId = 'T' + Math.floor(1000 + Math.random() * 9000);
    }

    const { grid, hash } = poolOfGrids[i];
    state.tickets[tId] = {
      ticketId: tId,
      roomCode: state.roomCode,
      playerId: playerId,
      playerName: player.name,
      sheetId: sheetId,
      grid: grid,
      hash: hash,
      markedNumbers: [],
      bogeyCount: 0,
      isDisqualified: false
    };
    state.ticketHashes.push(hash);
    player.ticketIds.push(tId);
    issuedIds.push(tId);
  }
  return issuedIds;
}

/* ============================================================================
   MODULE 6: ZERO-FLAW MATHEMATICAL VALIDATION & ANTI-CHEAT ENGINE
   ============================================================================ */

function getPatternNumbersForTicket(ticket, dividendId) {
  const grid = ticket.grid;
  const rowNums = (r) => grid[r].filter(n => n !== null && n > 0);
  const r0 = rowNums(0);
  const r1 = rowNums(1);
  const r2 = rowNums(2);
  const all15 = [...r0, ...r1, ...r2];

  switch (dividendId) {
    case 'TOP_LINE':
      return r0;
    case 'MIDDLE_LINE':
      return r1;
    case 'BOTTOM_LINE':
      return r2;
    case 'FOUR_CORNERS':
      return [r0[0], r0[r0.length - 1], r2[0], r2[r2.length - 1]];
    case 'LADDU':
      return [r1[2]];
    case 'KING_CORNERS':
      return [r0[0], r0[r0.length - 1], r2[0], r2[r2.length - 1], r1[2]];
    case 'BAMBOO':
      return [r0[2], r1[2], r2[2]];
    case 'BREAKFAST':
      return all15.filter(n => n >= 1 && n <= 29);
    case 'LUNCH':
      return all15.filter(n => n >= 30 && n <= 59);
    case 'DINNER':
      return all15.filter(n => n >= 60 && n <= 90);
    case 'TEMPERATURE': {
      const sorted = [...all15].sort((a, b) => a - b);
      return [sorted[0], sorted[sorted.length - 1]];
    }
    case 'JAWAANI':
      return all15.filter(n => n >= 1 && n <= 45);
    case 'BUDHAPA':
      return all15.filter(n => n >= 46 && n <= 90);
    case 'PYRAMID':
      return [r0[2], r1[1], r1[3], r2[0], r2[2], r2[4]];
    case 'FULL_HOUSE':
      return all15;
    default:
      return all15;
  }
}

function evaluateClaimValidity(state, playerId, ticketId, dividendId) {
  const player = state.players[playerId];
  const ticket = state.tickets[ticketId];
  const dividend = state.dividends.find(d => d.id === dividendId);

  if (!player || !ticket || !dividend) {
    return { valid: false, isBogey: false, reason: 'Invalid ticket or dividend.' };
  }
  if (ticket.isDisqualified) {
    return { valid: false, isBogey: false, reason: `Ticket #${ticketId} is DISQUALIFIED due to Bogeys!` };
  }
  if (dividend.status === 'CLAIMED') {
    return { valid: false, isBogey: false, reason: `${dividend.name} is already closed!` };
  }
  if (dividend.winners.some(w => w.playerId === playerId && w.ticketId === ticketId)) {
    return { valid: false, isBogey: false, reason: 'You already won this dividend on this ticket!' };
  }

  const calledSet = new Set(state.calledNumbers);
  const markedSet = new Set(ticket.markedNumbers);

  if (dividendId === 'HALF_SHEET' || dividendId === 'FULL_SHEET') {
    const reqTickets = dividendId === 'HALF_SHEET' ? 3 : 6;
    const activePlayerTickets = player.ticketIds
      .map(id => state.tickets[id])
      .filter(t => t && !t.isDisqualified);

    if (activePlayerTickets.length < reqTickets) {
      return {
        valid: false,
        isBogey: false,
        reason: `${dividend.name} requires at least ${reqTickets} active tickets!`
      };
    }

    const qualifyingTickets = activePlayerTickets.filter(t => {
      const validMarks = t.markedNumbers.filter(n => calledSet.has(n));
      return validMarks.length >= 2;
    });

    if (qualifyingTickets.length < reqTickets) {
      return {
        valid: false,
        isBogey: true,
        reason: `Bogey! You need at least 2 valid called numbers marked on ${reqTickets} tickets.`
      };
    }
    return { valid: true, isBogey: false, reason: 'Valid Sheet Bonus Claim!', patternNumbers: [] };
  }

  if (dividendId === 'UNLUCKY_ONE') {
    if (state.calledNumbers.length < 12) {
      return { valid: false, isBogey: false, reason: 'Unlucky One can only be claimed after at least 12 numbers are called!' };
    }
    const all15 = getPatternNumbersForTicket(ticket, 'FULL_HOUSE');
    const anyCalled = all15.some(n => calledSet.has(n));
    if (anyCalled) {
      return { valid: false, isBogey: true, reason: 'Bogey! One or more numbers on your ticket have already been called!' };
    }
    return { valid: true, isBogey: false, reason: 'Valid Unlucky One Claim!', patternNumbers: [] };
  }

  if (dividendId === 'EARLY_5' || dividendId === 'EARLY_7') {
    const targetCount = dividendId === 'EARLY_5' ? 5 : 7;
    const all15 = getPatternNumbersForTicket(ticket, 'FULL_HOUSE');
    const markedOnTicket = all15.filter(n => markedSet.has(n) && calledSet.has(n));

    if (markedOnTicket.length < targetCount) {
      return {
        valid: false,
        isBogey: true,
        reason: `Bogey! You have only marked ${markedOnTicket.length}/${targetCount} valid numbers on Ticket #${ticketId}.`
      };
    }

    if (state.settings.strictLastNumberRule) {
      const calledOnTicket = all15.filter(n => calledSet.has(n));
      calledOnTicket.sort((a, b) => state.calledNumbers.indexOf(a) - state.calledNumbers.indexOf(b));
      const completionNumber = calledOnTicket[targetCount - 1];
      if (completionNumber !== state.currentNumber) {
        return {
          valid: false,
          isBogey: false,
          reason: `Late Claim! Your ${dividend.name} completed on number ${completionNumber}, but current number is ${state.currentNumber}!`
        };
      }
    }

    return { valid: true, isBogey: false, reason: `Valid ${dividend.name} Claim!`, patternNumbers: markedOnTicket };
  }

  const patternNums = getPatternNumbersForTicket(ticket, dividendId);
  if (patternNums.length === 0) {
    return { valid: false, isBogey: true, reason: 'Your ticket has no numbers in this range!' };
  }

  const uncalledInPattern = patternNums.filter(n => !calledSet.has(n));
  if (uncalledInPattern.length > 0) {
    return {
      valid: false,
      isBogey: true,
      reason: `BOGEY! Numbers [${uncalledInPattern.join(', ')}] in ${dividend.name} have NOT been called yet!`
    };
  }

  const unmarkedInPattern = patternNums.filter(n => !markedSet.has(n));
  if (unmarkedInPattern.length > 0) {
    return {
      valid: false,
      isBogey: true,
      reason: `BOGEY! You forgot to mark [${unmarkedInPattern.join(', ')}] on your ticket before claiming!`
    };
  }

  if (state.settings.strictLastNumberRule) {
    let maxIdx = -1;
    let lastPatternNum = null;
    patternNums.forEach(n => {
      const idx = state.calledNumbers.indexOf(n);
      if (idx > maxIdx) {
        maxIdx = idx;
        lastPatternNum = n;
      }
    });

    if (maxIdx !== state.calledNumbers.length - 1) {
      return {
        valid: false,
        isBogey: false,
        reason: `Late Claim! Your ${dividend.name} completed on number ${lastPatternNum}, but current number is ${state.currentNumber}!`
      };
    }
  }

  return { valid: true, isBogey: false, reason: `Valid ${dividend.name} Claim!`, patternNumbers: patternNums };
}

function applyBogeyStrike(state, ticket, dividendName, reasonText) {
  ticket.bogeyCount = (ticket.bogeyCount || 0) + 1;
  const maxAllowed = state.settings.maxBogeysPerTicket || 2;

  if (ticket.bogeyCount >= maxAllowed) {
    ticket.isDisqualified = true;
    addRoomActivity(state, `🚨 BOGEY DISQUALIFIED! ${ticket.playerName}'s Ticket #${ticket.ticketId} locked (${ticket.bogeyCount}/${maxAllowed} strikes) on ${dividendName}.`);
    triggerGlobalToast(state, `❌ ${ticket.playerName} got a BOGEY! Ticket #${ticket.ticketId} Disqualified!`);
  } else {
    addRoomActivity(state, `⚠️ BOGEY WARNING (${ticket.bogeyCount}/${maxAllowed}) for ${ticket.playerName} on Ticket #${ticket.ticketId} (${dividendName}).`);
    triggerGlobalToast(state, `⚠️ Bogey Strike (${ticket.bogeyCount}/${maxAllowed}) on ${ticket.playerName}!`);
  }
}

// POINT 7: Records Celebration Payload for ANY Prize Win so Admin + All Players see Mascot & Party Poppers!
function approveDividendWinner(state, playerId, ticketId, dividendId) {
  const player = state.players[playerId];
  const dividend = state.dividends.find(d => d.id === dividendId);
  if (!player || !dividend) return;

  const winEntry = {
    playerId,
    playerName: player.name,
    ticketId,
    wonOnNumber: state.currentNumber,
    pointsAwarded: dividend.prizePoints
  };
  dividend.winners.push(winEntry);

  let isJointWin = false;

  if (state.settings.allowJointWinners && dividend.status === 'OPEN' && dividend.winners.length >= dividend.totalSlots) {
    dividend.status = 'CLAIM_WINDOW';
    dividend.claimWindowNumber = state.currentNumber;
    dividend.claimWindowEndsAt = Date.now() + (state.settings.claimWindowSec * 1000);
    addRoomActivity(state, `⏳ ${player.name} claimed ${dividend.name}! ${state.settings.claimWindowSec}s Grace Window open for Joint Winners on #${state.currentNumber}!`);
    triggerGlobalToast(state, `🔥 ${player.name} claimed ${dividend.name}! Anyone else on #${state.currentNumber}? Claim within ${state.settings.claimWindowSec}s!`);
  } else {
    if (dividend.status === 'CLAIM_WINDOW') {
      isJointWin = true;
      const jointCount = dividend.winners.length;
      const splitPts = Math.round(dividend.prizePoints / jointCount);
      dividend.winners.forEach(w => { w.pointsAwarded = splitPts; });
      addRoomActivity(state, `🤝 JOINT WINNER! ${player.name} (#${ticketId}) joined ${dividend.name}! Prize split (${splitPts} pts each).`);
      triggerGlobalToast(state, `🤝 Joint Winner! ${player.name} also claimed ${dividend.name}!`);
    } else {
      if (dividend.winners.length >= dividend.totalSlots) {
        dividend.status = 'CLAIMED';
      }
      addRoomActivity(state, `🏆 ${player.name} (Ticket #${ticketId}) WON ${dividend.name} (${dividend.prizePoints} pts)!`);
      triggerGlobalToast(state, `🏆 ${player.name} won ${dividend.name}!`);
    }
  }

  // Broadcast Celebration Event for Admin + All Players!
  state.lastCelebration = {
    id: Date.now() + Math.random(),
    timestamp: Date.now(),
    playerName: player.name,
    avatar: player.avatar || '🦁',
    ticketId: ticketId,
    dividendId: dividend.id,
    dividendName: dividend.name,
    dividendIcon: dividend.icon || '🏆',
    points: dividend.prizePoints,
    isJoint: isJointWin
  };

  checkAutoGameOver(state);
}

function checkAndFinalizeGraceWindows(state) {
  let changed = false;
  const now = Date.now();
  state.dividends.forEach(d => {
    if (d.status === 'CLAIM_WINDOW' && d.claimWindowEndsAt && now >= d.claimWindowEndsAt) {
      d.status = 'CLAIMED';
      d.claimWindowEndsAt = null;
      changed = true;
    }
  });
  if (changed) {
    checkAutoGameOver(state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

function checkAutoGameOver(state) {
  const allClaimed = state.dividends.length > 0 && state.dividends.every(d => d.status === 'CLAIMED');
  if (allClaimed && state.status !== GAME_STATES.COMPLETED) {
    state.status = GAME_STATES.COMPLETED;
    archiveCurrentRound(state, 'All Dividends Claimed');
    addRoomActivity(state, `🎉 GAME OVER! All dividends claimed in Round ${state.round}!`);
    triggerGlobalToast(state, `🎉 GAME OVER! All prizes claimed! Check Winner Podium!`);
  }
}

function archiveCurrentRound(state, reason) {
  const existingIdx = state.pastRounds.findIndex(r => r.round === state.round);
  const summary = {
    round: state.round,
    roomCode: state.roomCode,
    title: state.title,
    endedAt: getTimeStr(),
    reason,
    calledNumbers: [...state.calledNumbers],
    dividends: JSON.parse(JSON.stringify(state.dividends))
  };
  if (existingIdx >= 0) {
    state.pastRounds[existingIdx] = summary;
  } else {
    state.pastRounds.unshift(summary);
  }
  if (state.pastRounds.length > 10) {
    state.pastRounds = state.pastRounds.slice(0, 10);
  }
}

/* ============================================================================
   SOOTHING FESTIVE AMBIENT BGM SYNTHESIZER + AUTO VOICE DUCKING
   ============================================================================ */

let bgmAudioCtx = null;
let bgmMasterGain = null;
let bgmNoteTimer = null;
let isBgmPlaying = false;
const BGM_NORMAL_VOL = 0.12;
const BGM_DUCKED_VOL = 0.015;

const FESTIVE_PENTATONIC_NOTES = [
  261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25
];

function startSoothingBackgroundMusic() {
  if (isBgmPlaying) return true;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!bgmAudioCtx) {
      bgmAudioCtx = new AudioContextClass();
    }
    if (bgmAudioCtx.state === 'suspended') {
      bgmAudioCtx.resume();
    }

    bgmMasterGain = bgmAudioCtx.createGain();
    bgmMasterGain.gain.setValueAtTime(0.001, bgmAudioCtx.currentTime);
    bgmMasterGain.gain.exponentialRampToValueAtTime(BGM_NORMAL_VOL, bgmAudioCtx.currentTime + 1.2);
    bgmMasterGain.connect(bgmAudioCtx.destination);

    const droneFreqs = [130.81, 196.00];
    droneFreqs.forEach(freq => {
      const osc = bgmAudioCtx.createOscillator();
      const droneGain = bgmAudioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, bgmAudioCtx.currentTime);
      droneGain.gain.setValueAtTime(0.18, bgmAudioCtx.currentTime);
      osc.connect(droneGain);
      droneGain.connect(bgmMasterGain);
      osc.start();
    });

    let stepIndex = 0;
    const playSoftPluck = () => {
      if (!isBgmPlaying || !bgmAudioCtx || bgmAudioCtx.state !== 'running') return;

      const now = bgmAudioCtx.currentTime;
      const noteFreq = FESTIVE_PENTATONIC_NOTES[stepIndex % FESTIVE_PENTATONIC_NOTES.length];
      stepIndex = (stepIndex + Math.floor(1 + Math.random() * 2)) % FESTIVE_PENTATONIC_NOTES.length;

      const osc = bgmAudioCtx.createOscillator();
      const noteGain = bgmAudioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(noteFreq, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.32, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.1);

      osc.connect(noteGain);
      noteGain.connect(bgmMasterGain);

      osc.start(now);
      osc.stop(now + 2.15);
    };

    isBgmPlaying = true;
    playSoftPluck();
    bgmNoteTimer = setInterval(playSoftPluck, 2200);
    return true;
  } catch (e) {
    console.warn('BGM init error:', e);
    return false;
  }
}

function stopSoothingBackgroundMusic() {
  isBgmPlaying = false;
  if (bgmNoteTimer) {
    clearInterval(bgmNoteTimer);
    bgmNoteTimer = null;
  }
  if (bgmAudioCtx) {
    try {
      bgmAudioCtx.close();
    } catch (e) {}
    bgmAudioCtx = null;
    bgmMasterGain = null;
  }
}

function toggleSoothingBackgroundMusic() {
  if (isBgmPlaying) {
    stopSoothingBackgroundMusic();
    return false;
  } else {
    return startSoothingBackgroundMusic();
  }
}

function duckBackgroundMusic(shouldDuck) {
  if (!isBgmPlaying || !bgmAudioCtx || !bgmMasterGain) return;
  const now = bgmAudioCtx.currentTime;
  const target = shouldDuck ? BGM_DUCKED_VOL : BGM_NORMAL_VOL;
  bgmMasterGain.gain.setTargetAtTime(target, now, 0.15);
}

/* ============================================================================
   POINT 7: GAME-SHOW VICTORY FANFARE SOUND + PARTY POPPER + DANCING MASCOT
   ============================================================================ */

let lastCelebrationIdShown = null;
let mascotHideTimeout = null;

// Plays an energetic Game-Show Brass Victory Fanfare ("Ta-da-da-DAAA!") + Party Popper Pop!
function playVictoryCelebrationSound() {
  try {
    duckBackgroundMusic(true);
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // 1. Party Popper "POP!" Burst Effect
    const bufferSize = ctx.sampleRate * 0.12;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.03));
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    const popGain = ctx.createGain();
    popGain.gain.setValueAtTime(0.45, now);
    whiteNoise.connect(popGain);
    popGain.connect(ctx.destination);
    whiteNoise.start(now);

    // 2. Game-Show Brass Trumpet Victory Fanfare (C5 -> E5 -> G5 -> C6 + Harmony!)
    const fanfareNotes = [
      { freq: 523.25, harmony: 392.00, start: 0.06, dur: 0.14 }, // Ta (C5)
      { freq: 659.25, harmony: 523.25, start: 0.22, dur: 0.14 }, // da (E5)
      { freq: 783.99, harmony: 659.25, start: 0.38, dur: 0.14 }, // da (G5)
      { freq: 1046.50, harmony: 783.99, start: 0.55, dur: 0.65 } // DAAAA! (C6 High Triumph)
    ];

    fanfareNotes.forEach(n => {
      [n.freq, n.harmony].forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(f, now + n.start);

        const peakVol = idx === 0 ? 0.22 : 0.15;
        gain.gain.setValueAtTime(0.001, now + n.start);
        gain.gain.linearRampToValueAtTime(peakVol, now + n.start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.start);
        osc.stop(now + n.start + n.dur + 0.05);
      });
    });

    setTimeout(() => {
      try { ctx.close(); } catch (e) {}
      duckBackgroundMusic(false);
    }, 1500);
  } catch (e) {
    duckBackgroundMusic(false);
  }
}

// Fires real Party Popper Cannons using canvas-confetti library
function firePartyPopperCannons() {
  if (typeof window.confetti !== 'function') return;

  // Left Party Popper Cannon
  window.confetti({
    particleCount: 65,
    angle: 60,
    spread: 60,
    origin: { x: 0, y: 0.65 },
    colors: ['#f5b82e', '#ff6b00', '#10b981', '#ec4899', '#3b82f6']
  });

  // Right Party Popper Cannon
  window.confetti({
    particleCount: 65,
    angle: 120,
    spread: 60,
    origin: { x: 1, y: 0.65 },
    colors: ['#f5b82e', '#ff6b00', '#10b981', '#ec4899', '#3b82f6']
  });

  // Second Golden Star Burst after 350ms
  setTimeout(() => {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 55,
        spread: 90,
        origin: { x: 0.5, y: 0.45 },
        shapes: ['star', 'circle'],
        colors: ['#ffd15c', '#f5b82e', '#ffffff']
      });
    }
  }, 350);
}

function getFunnyMascotDialogue(dividendId) {
  switch (dividendId) {
    case 'EARLY_5':
    case 'EARLY_7':
      return { dancer: '🕺', side1: '🎉', side2: '🚀', tag: 'Sabse Tez Raftar! Khata Khul Gaya!' };
    case 'TOP_LINE':
    case 'MIDDLE_LINE':
    case 'BOTTOM_LINE':
      return { dancer: '💃', side1: '🥁', side2: '🎊', tag: 'Balle Balle! Puri Line Clear Hai Boss!' };
    case 'FOUR_CORNERS':
    case 'KING_CORNERS':
      return { dancer: '🕺', side1: '✨', side2: '👑', tag: 'Chaar Kone Chaar Dhamake! Party Time!' };
    case 'LADDU':
      return { dancer: '🤩', side1: '🍬', side2: '🎉', tag: 'Muh Meetha Karo! Center Laddu Foota!' };
    case 'FULL_HOUSE':
      return { dancer: '👑', side1: '🎆', side2: '🏆', tag: 'BAAP RE BAAP! FULL HOUSE DHAMAKA!' };
    default:
      return { dancer: '🕺', side1: '🎉', side2: '🥁', tag: 'Wah Bhai Wah! Kya Kismat Chamki Hai!' };
  }
}

function closeMascotCelebrationPopup() {
  const existing = document.getElementById('mascotCelebrationOverlay');
  if (existing) existing.remove();
  if (mascotHideTimeout) {
    clearTimeout(mascotHideTimeout);
    mascotHideTimeout = null;
  }
}

function showMascotCelebrationPopup(celeb) {
  if (!celeb) return;

  // 1. Fire Party Popper Confetti Cannons
  firePartyPopperCannons();

  // 2. Play Game-Show Victory Fanfare Sound
  playVictoryCelebrationSound();

  // 3. Speak Winner Announcement in Natural Indian Human Voice right after fanfare
  setTimeout(() => {
    const winnerLine = `Badhai ho! ${celeb.playerName} ne ${celeb.dividendName} jeet liya hai! Party toh banti hai!`;
    speakAnnouncement(winnerLine, true);
  }, 750);

  // 4. Show Funny Dancing Mascot Overlay on Screen
  closeMascotCelebrationPopup();
  const vibe = getFunnyMascotDialogue(celeb.dividendId);

  const wrap = document.createElement('div');
  wrap.id = 'mascotCelebrationOverlay';
  wrap.className = 'mascot-celebration-wrap';
  wrap.innerHTML = `
    <div class="mascot-celebration-card">
      <button class="modal-close" onclick="closeMascotCelebrationPopup()" title="Close">✕</button>
      <div class="mascot-funny-tag">${vibe.tag}</div>
      <div class="mascot-stage">
        <span class="mascot-dancer-side">${vibe.side1}</span>
        <span class="mascot-dancer-main">${vibe.dancer}</span>
        <span class="mascot-dancer-side">${vibe.side2}</span>
      </div>
      <div class="mascot-winner-name">
        ${celeb.avatar || '🦁'} ${celeb.playerName}
      </div>
      <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
        ${celeb.isJoint ? '🤝 Joint Winner Claimed Prize!' : `Claimed on Ticket #${celeb.ticketId}!`}
      </div>
      <div class="mascot-prize-badge">
        ${celeb.dividendIcon || '🏆'} ${celeb.dividendName} (+${celeb.points} pts)
      </div>
      <div class="mascot-progress-bar"></div>
    </div>
  `;

  document.body.appendChild(wrap);
  mascotHideTimeout = setTimeout(() => {
    closeMascotCelebrationPopup();
  }, 4500);
}

function checkAndTriggerCelebration(state) {
  if (!state || !state.lastCelebration || !state.lastCelebration.id) return;
  const celeb = state.lastCelebration;

  if (celeb.id === lastCelebrationIdShown) return;
  lastCelebrationIdShown = celeb.id;

  const ageMs = Date.now() - (celeb.timestamp || 0);
  if (ageMs >= 0 && ageMs < 12000) {
    showMascotCelebrationPopup(celeb);
  }
}

/* ============================================================================
   NATURAL INDIAN HUMAN VOICE ENGINE (ZERO API KEY, WAVENET + NEURAL PRIORITY)
   - Prioritizes Natural/Online Indian Human Voices (Google हिन्दी, Microsoft
     Swara/Neerja/Prabhat Natural, Apple Lekha/Rishi)
   - NEVER falls back to American Robotic 'voices[0]' (Microsoft David)!
   - Includes Cloud Indian Audio Stream fallback if OS has no Indian voices!
   ============================================================================ */

let audioUnlocked = false;
let cachedIndianVoice = null;
let silentKeepAliveCtx = null;
let activeTtsTimer = null;
let cloudFallbackAudioEl = null;

const TAB_VOICE_MUTE_KEY = 'TAMBOLA_TAB_VOICE_MUTED_V2';
const SPOKEN_NUMBER_LOCK_KEY = 'TAMBOLA_SPOKEN_NUM_LOCK_V5';
const SPOKEN_CELEB_LOCK_KEY = 'TAMBOLA_SPOKEN_CELEB_LOCK_V5';

function isGlobalVoiceMuted() {
  return sessionStorage.getItem(TAB_VOICE_MUTE_KEY) === 'true';
}

function setGlobalVoiceMuted(muted) {
  sessionStorage.setItem(TAB_VOICE_MUTE_KEY, muted ? 'true' : 'false');
  if (activeTtsTimer) {
    clearTimeout(activeTtsTimer);
    activeTtsTimer = null;
  }
  if (muted) {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (cloudFallbackAudioEl) {
      try { cloudFallbackAudioEl.pause(); } catch (e) {}
    }
  } else {
    ensureAudioDriverAwake();
  }
}

function ensureAudioDriverAwake() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!silentKeepAliveCtx) {
      silentKeepAliveCtx = new AudioContextClass();
    }
    if (silentKeepAliveCtx.state === 'suspended') {
      silentKeepAliveCtx.resume();
    }

    const now = silentKeepAliveCtx.currentTime;
    const osc = silentKeepAliveCtx.createOscillator();
    const gain = silentKeepAliveCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, now);
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc.connect(gain);
    gain.connect(silentKeepAliveCtx.destination);
    osc.start(now);
    osc.stop(now + 0.17);
  } catch (e) {}
}

function getSfxContext() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!silentKeepAliveCtx) {
      silentKeepAliveCtx = new AudioContextClass();
    }
    if (silentKeepAliveCtx.state === 'suspended') {
      silentKeepAliveCtx.resume();
    }
    return silentKeepAliveCtx;
  } catch (e) {
    return null;
  }
}

function playTicketMarkSound() {
  const ctx = getSfxContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const notes = [
      { freq: 587.33, start: 0, dur: 0.07 },
      { freq: 880.00, start: 0.055, dur: 0.13 }
    ];
    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.freq, now + n.start);
      gain.gain.setValueAtTime(0.001, now + n.start);
      gain.gain.linearRampToValueAtTime(0.28, now + n.start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + n.start);
      osc.stop(now + n.start + n.dur + 0.01);
    });
  } catch (e) {}
}

function playUncalledBogeySound() {
  const ctx = getSfxContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const pulses = [
      { fStart: 240, fEnd: 160, start: 0, dur: 0.11 },
      { fStart: 180, fEnd: 95, start: 0.12, dur: 0.22 }
    ];
    pulses.forEach(p => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(p.fStart, now + p.start);
      osc.frequency.linearRampToValueAtTime(p.fEnd, now + p.start + p.dur);
      gain.gain.setValueAtTime(0.001, now + p.start);
      gain.gain.linearRampToValueAtTime(0.22, now + p.start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + p.start + p.dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + p.start);
      osc.stop(now + p.start + p.dur + 0.01);
    });
  } catch (e) {}
}

function playAlreadyLockedSound() {
  const ctx = getSfxContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  } catch (e) {}
}

function playClaimTapSound() {
  const ctx = getSfxContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const chime = [
      { freq: 523.25, start: 0, dur: 0.06 },
      { freq: 659.25, start: 0.045, dur: 0.06 },
      { freq: 783.99, start: 0.09, dur: 0.14 }
    ];
    chime.forEach(c => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(c.freq, now + c.start);
      gain.gain.setValueAtTime(0.001, now + c.start);
      gain.gain.linearRampToValueAtTime(0.24, now + c.start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + c.start + c.dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + c.start);
      osc.stop(now + c.start + c.dur + 0.01);
    });
  } catch (e) {}
}

// Smart Ranking: Picks the most human-sounding Indian Neural/WaveNet voice available!
// NEVER returns voices[0] (US Robotic David)!
function selectBestIndianVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const isIndian = (v) => {
    const lang = (v.lang || '').toLowerCase();
    const name = (v.name || '').toLowerCase();
    return (
      lang.includes('hi-in') ||
      lang.includes('en-in') ||
      lang === 'hi' ||
      name.includes('india') ||
      name.includes('हिन्दी') ||
      name.includes('hindi') ||
      name.includes('swara') ||
      name.includes('neerja') ||
      name.includes('prabhat') ||
      name.includes('madhur') ||
      name.includes('lekha') ||
      name.includes('rishi') ||
      name.includes('kiyara') ||
      name.includes('veena')
    );
  };

  const indianVoices = voices.filter(isIndian);
  if (indianVoices.length === 0) {
    return null; // Do NOT return voices[0] (US Robotic)!
  }

  // Score each Indian voice so Natural/WaveNet/Online voices ALWAYS beat old offline SAPI voices!
  const scoreVoice = (v) => {
    const name = (v.name || '').toLowerCase();
    const lang = (v.lang || '').toLowerCase();
    let score = 0;

    // 1. Studio Neural Voices (Microsoft Edge Swara/Neerja/Prabhat Natural)
    if (name.includes('natural') || name.includes('neural')) score += 100;
    if (name.includes('swara') || name.includes('neerja') || name.includes('prabhat')) score += 80;

    // 2. Google Cloud WaveNet Indian Voices (Chrome's 'Google हिन्दी' & Android Google India)
    if (name.includes('google')) score += 90;

    // 3. Apple Premium Indian Voices (iPhone / Mac)
    if (name.includes('lekha') || name.includes('rishi') || name.includes('kiyara') || name.includes('siri')) score += 75;

    // 4. Online / Cloud voices sound much more human than offline localService SAPI voices
    if (v.localService === false) score += 50;

    // 5. Prefer 'hi-IN' for natural Desi pronunciation of both numbers and Hindi phrases
    if (lang.includes('hi-in') || name.includes('हिन्दी') || name.includes('hindi')) score += 25;

    return score;
  };

  indianVoices.sort((a, b) => scoreVoice(b) - scoreVoice(a));
  return indianVoices[0];
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedIndianVoice = selectBestIndianVoice();
  };
}

function unlockBrowserAudioAndWakeLock() {
  ensureAudioDriverAwake();
  if ('speechSynthesis' in window) {
    cachedIndianVoice = selectBestIndianVoice();
    audioUnlocked = true;
  }
  if (bgmAudioCtx && bgmAudioCtx.state === 'suspended') {
    bgmAudioCtx.resume();
  }
  if ('wakeLock' in navigator) {
    navigator.wakeLock.request('screen').catch(() => {});
  }
}

function stripEmojisFromText(str) {
  return String(str || '')
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Cloud Indian Human Voice Fallback (Used automatically if a PC has 0 Indian voices installed)
function playCloudIndianVoiceFallback(text, onStartCallback) {
  try {
    if (!cloudFallbackAudioEl) {
      cloudFallbackAudioEl = document.createElement('audio');
      cloudFallbackAudioEl.setAttribute('referrerpolicy', 'no-referrer');
      cloudFallbackAudioEl.style.display = 'none';
      document.body.appendChild(cloudFallbackAudioEl);
    }
    const encoded = encodeURIComponent(text);
    cloudFallbackAudioEl.src = `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=tw-ob&tl=hi&q=${encoded}`;

    cloudFallbackAudioEl.onplay = () => {
      duckBackgroundMusic(true);
      if (typeof onStartCallback === 'function') onStartCallback();
    };
    cloudFallbackAudioEl.onended = () => {
      duckBackgroundMusic(false);
    };
    cloudFallbackAudioEl.onerror = () => {
      duckBackgroundMusic(false);
      if (typeof onStartCallback === 'function') onStartCallback();
    };

    cloudFallbackAudioEl.play().catch(() => {
      if (typeof onStartCallback === 'function') onStartCallback();
    });
  } catch (e) {
    if (typeof onStartCallback === 'function') onStartCallback();
  }
}

function speakAnnouncement(text, enabled, onSpeechStartCallback = null) {
  let callbackFired = false;
  const fireVisualRevealAfterDelay = (delayMs = 2000) => {
    if (!callbackFired) {
      callbackFired = true;
      if (typeof onSpeechStartCallback === 'function') {
        setTimeout(onSpeechStartCallback, delayMs);
      }
    }
  };

  if (!enabled || isGlobalVoiceMuted()) {
    fireVisualRevealAfterDelay(500);
    return;
  }

  const rawClean = stripEmojisFromText(text);
  if (!rawClean) {
    fireVisualRevealAfterDelay(0);
    return;
  }

  const isPrizeCallout = rawClean.toLowerCase().startsWith('badhai');
  let finalPhraseToSpeak = rawClean;

  // Prevent duplicate speaking across multiple open tabs on the same laptop
  try {
    if (isPrizeCallout) {
      const existingCelebLock = localStorage.getItem(SPOKEN_CELEB_LOCK_KEY);
      if (existingCelebLock) {
        const parsed = JSON.parse(existingCelebLock);
        if (parsed.text === rawClean && (Date.now() - parsed.time) < 4000) {
          return;
        }
      }
      localStorage.setItem(SPOKEN_CELEB_LOCK_KEY, JSON.stringify({ text: rawClean, time: Date.now() }));
    } else {
      const rawState = localStorage.getItem(STORAGE_KEY);
      if (rawState) {
        const parsedState = JSON.parse(rawState);
        const curNum = parsedState.currentNumber;
        const curRound = parsedState.round || 1;
        const callLen = Array.isArray(parsedState.calledNumbers) ? parsedState.calledNumbers.length : 0;

        if (!curNum) {
          fireVisualRevealAfterDelay(0);
          return;
        }

        const uniqueDrawKey = `R${curRound}_N${curNum}_L${callLen}`;
        const existingLock = localStorage.getItem(SPOKEN_NUMBER_LOCK_KEY);
        if (existingLock) {
          const parsedLock = JSON.parse(existingLock);
          if (parsedLock.key === uniqueDrawKey && (Date.now() - parsedLock.time) < 4000) {
            fireVisualRevealAfterDelay(2000);
            return;
          }
        }
        localStorage.setItem(SPOKEN_NUMBER_LOCK_KEY, JSON.stringify({ key: uniqueDrawKey, time: Date.now() }));
        finalPhraseToSpeak = getSpokenCalloutText(curNum);
      }
    }
  } catch (e) {}

  ensureAudioDriverAwake();

  if (activeTtsTimer) {
    clearTimeout(activeTtsTimer);
    activeTtsTimer = null;
  }

  if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  activeTtsTimer = setTimeout(() => {
    activeTtsTimer = null;
    if (isGlobalVoiceMuted()) {
      fireVisualRevealAfterDelay(0);
      return;
    }

    // Re-select the best human Indian voice dynamically every time
    cachedIndianVoice = selectBestIndianVoice();

    // If this PC has ZERO Indian voices installed, use Cloud Indian Audio Stream instead of American Robotic!
    if (!cachedIndianVoice) {
      playCloudIndianVoiceFallback(finalPhraseToSpeak, () => {
        fireVisualRevealAfterDelay(2000);
      });
      return;
    }

    const utter = new SpeechSynthesisUtterance(finalPhraseToSpeak);
    window._activeTambolaUtterance = utter;

    utter.voice = cachedIndianVoice;
    utter.lang = cachedIndianVoice.lang || 'hi-IN';

    // Natural human conversational speed & pitch
    utter.rate = 0.95;
    utter.pitch = 1.02;

    utter.onstart = () => {
      duckBackgroundMusic(true);
      fireVisualRevealAfterDelay(2000);
    };

    utter.onend = () => {
      duckBackgroundMusic(false);
    };

    utter.onerror = () => {
      duckBackgroundMusic(false);
      fireVisualRevealAfterDelay(500);
    };

    window.speechSynthesis.speak(utter);
  }, 160);
}

function spawnFloatingReaction() {}
function launchVictoryConfetti() {
  firePartyPopperCannons();
}

window.addEventListener('DOMContentLoaded', () => {
  initCloudDatabaseSync();
});
