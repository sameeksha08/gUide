// ===== USER DATA STORE =====
const USER = {
  name: '',
  goals: [],
  gender: '',
  cycleTracking: '',
  cycleDay: null,
  cyclePhase: '',
  conditions: [],
  culturalFood: '',
  cuisines: [],        // NEW: which cuisines they like to eat
  dietStyle: '',
  proteinScore: null,
  fitnessGoals: [],    // CHANGED: now multi-select array
  activityLevel: '',
  sleepQuality: null,
  stressLevel: null,
  cookingFrequency: '',
  hydration: null,
  connectedApps: [],
  communityRole: '',
  today: {
    steps: null,
    sleepHours: null,
    mood: null,
    cycleDay: null,
    phase: null,
    caloriesLogged: null,
    activeMinutes: null,
    waterGlasses: null,
    heartRateAvg: null,
  },
  journalEntries: [],
  myTips: [],
  journalStreak: 0,
  tipsPosted: 0,
  resonancesReceived: 0,
  trustScore: 0,
};

function populateTodayData() {
  const apps = USER.connectedApps;
  if (!apps.length) return;
  if (apps.includes('apple_health') || apps.includes('samsung_health') || apps.includes('garmin')) {
    USER.today.steps = 6842;
    USER.today.activeMinutes = 38;
    USER.today.heartRateAvg = 72;
  }
  if (apps.includes('apple_health') || apps.includes('garmin')) {
    USER.today.sleepHours = 6.2;
  }
  if (apps.includes('myfitnesspal')) {
    USER.today.caloriesLogged = 1380;
    USER.today.waterGlasses = 5;
  }
  if (apps.includes('flo') && USER.cycleTracking === 'yes') {
    USER.today.cycleDay = 14;
    USER.today.phase = 'ovulation';
  }
  if (apps.includes('dayonejournal')) {
    USER.today.mood = 3;
  }
}
