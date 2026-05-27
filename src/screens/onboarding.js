let currentStep = 0;
const TOTAL_STEPS = 12; // added cuisine step

const STEPS = [
  stepName, stepGoals, stepGender, stepCycleTracking,
  stepCulturalFood, stepCuisines, stepDietStyle,
  stepFitnessProtein, stepSleepStressHydration,
  stepConditions, stepConnectApps, stepCommunityRole,
];

function renderOnboarding() {
  currentStep = 0;
  return buildOnboardingScreen();
}

function buildOnboardingScreen() {
  const step = STEPS[currentStep];
  const progress = (currentStep / TOTAL_STEPS) * 100;
  const showBack = currentStep > 0;
  return `
    <div class="screen onboarding-screen">
      <div class="onboarding-top">
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width:${progress}%"></div>
        </div>
        ${showBack ? `<button class="onboarding-back" onclick="onboardingBack()">← Back</button>` : ''}
      </div>
      <div class="onboarding-content" id="ob-content">${step()}</div>
      <div class="onboarding-footer">
        <button class="btn-continue" id="ob-continue" onclick="onboardingNext()">Continue</button>
      </div>
    </div>`;
}

function onboardingNext() {
  saveStepData(currentStep);
  currentStep++;
  if (currentStep >= STEPS.length) {
    populateTodayData();
    document.getElementById('app').innerHTML = renderDoneScreen();
    return;
  }
  document.getElementById('app').innerHTML = buildOnboardingScreen();
}

function onboardingBack() {
  if (currentStep > 0) {
    currentStep--;
    document.getElementById('app').innerHTML = buildOnboardingScreen();
  }
}

function saveStepData(step) {
  switch(step) {
    case 0: USER.name = document.getElementById('name-input')?.value?.trim() || ''; break;
    case 1: USER.goals = getSelectedValues('goals'); break;
    case 2: USER.gender = getSelectedSingle('gender'); break;
    case 3: USER.cycleTracking = getSelectedSingle('cycle'); break;
    case 4: USER.culturalFood = getSelectedSingle('cultural'); break;
    case 5: USER.cuisines = getSelectedValues('cuisines'); break;
    case 6: USER.dietStyle = getSelectedSingle('diet'); break;
    case 7:
      USER.fitnessGoals = getSelectedValues('fitness-goal');
      USER.activityLevel = getSelectedSingle('activity');
      USER.proteinScore = parseInt(document.querySelector('.scale-dot[data-group="protein"].selected')?.dataset.val || '0') || null;
      break;
    case 8:
      USER.sleepQuality = parseInt(document.querySelector('.scale-dot[data-group="sleep"].selected')?.dataset.val || '0') || null;
      USER.stressLevel = parseInt(document.querySelector('.scale-dot[data-group="stress"].selected')?.dataset.val || '0') || null;
      USER.hydration = parseInt(document.querySelector('.scale-dot[data-group="hydration"].selected')?.dataset.val || '0') || null;
      USER.cookingFrequency = getSelectedSingle('cooking');
      break;
    case 9: USER.conditions = getSelectedValues('conditions').filter(v => v !== 'none' && v !== 'private'); break;
    case 10: break; // apps saved on tap
    case 11: USER.communityRole = getSelectedSingle('community-role'); break;
  }
}

function getSelectedValues(name) {
  return Array.from(document.querySelectorAll(`.option-chip[data-group="${name}"].selected`)).map(el => el.dataset.value);
}
function getSelectedSingle(name) {
  return document.querySelector(`.option-chip[data-group="${name}"].selected`)?.dataset.value || '';
}
function selectSingle(el, group) {
  document.querySelectorAll(`.option-chip[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  setTimeout(() => onboardingNext(), 340);
}
function selectSingle2(el, group) {
  document.querySelectorAll(`.option-chip[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}
function toggleMulti(el) {
  el.classList.toggle('selected');
  const group = el.dataset.group;
  const count = document.querySelectorAll(`.option-chip[data-group="${group}"].selected`).length;
  const btn = document.getElementById('ob-continue');
  if (btn) btn.textContent = count > 0 ? `Continue (${count} selected)` : 'Continue';
}
function toggleExclusive(el, exclusives) {
  const val = el.dataset.value;
  const group = el.dataset.group;
  if (exclusives.includes(val)) {
    document.querySelectorAll(`.option-chip[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
  } else {
    exclusives.forEach(excl => {
      document.querySelectorAll(`.option-chip[data-group="${group}"][data-value="${excl}"]`).forEach(c => c.classList.remove('selected'));
    });
    el.classList.toggle('selected');
  }
  const count = document.querySelectorAll(`.option-chip[data-group="${group}"].selected`).length;
  const btn = document.getElementById('ob-continue');
  if (btn) btn.textContent = count > 0 ? `Continue (${count} selected)` : 'Continue';
}
function selectScale(el, group) {
  document.querySelectorAll(`.scale-dot[data-group="${group}"]`).forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
}

// ===== STEP RENDERERS =====
function stepName() {
  return `
    <div class="animate-in">
      <div class="onboarding-question">Hey! What should we call you?</div>
      <div class="onboarding-sub">This personalises everything in your gUide.</div>
      <input class="onboarding-input" id="name-input" type="text" placeholder="Your first name" value="${USER.name}" autocomplete="given-name" />
    </div>`;
}

function stepGoals() {
  const opts = [
    { value:'energy', emoji:'⚡', label:'More energy', hint:'Feel less tired throughout the day' },
    { value:'hormonal', emoji:'🌀', label:'Hormonal balance', hint:'Cycles, PMS, mood swings, perimenopause' },
    { value:'gut', emoji:'🌿', label:'Gut health', hint:'Digestion, bloating, IBS support' },
    { value:'mental', emoji:'🧠', label:'Mental wellbeing', hint:'Mood, anxiety, focus, clarity' },
    { value:'fitness', emoji:'💪', label:'Fitness performance', hint:'Build strength, endurance, or muscle' },
    { value:'weight', emoji:'⚖️', label:'Weight management', hint:'Sustainable, not crash dieting' },
    { value:'longevity', emoji:'🌱', label:'Long-term longevity', hint:'Habits that last decades' },
  ];
  return `
    <div class="animate-in">
      <div class="onboarding-question">What are your main health goals?</div>
      <div class="onboarding-sub">Choose everything that feels true — you can change these anytime.</div>
      <div class="option-list">
        ${opts.map(o => `
          <button class="option-chip ${USER.goals.includes(o.value)?'selected':''}" data-group="goals" data-value="${o.value}" onclick="toggleMulti(this)">
            <span class="option-emoji">${o.emoji}</span>
            <span class="option-text"><span class="option-label">${o.label}</span><span class="option-hint">${o.hint}</span></span>
            <span class="option-check">✓</span>
          </button>`).join('')}
      </div>
    </div>`;
}

function stepGender() {
  const opts = [
    { value:'woman', emoji:'👩', label:'Woman', hint:'Including trans women' },
    { value:'man', emoji:'👨', label:'Man', hint:'Including trans men' },
    { value:'nonbinary', emoji:'🧑', label:'Non-binary / gender diverse', hint:'' },
    { value:'private', emoji:'🔒', label:'Prefer not to say', hint:'You\'ll still get great recommendations' },
  ];
  return `
    <div class="animate-in">
      <div class="onboarding-question">How do you identify?</div>
      <div class="onboarding-sub">Gender affects hormones, nutrition, and health risks. This is private and never shared.</div>
      <div class="option-list">
        ${opts.map(o => `
          <button class="option-chip ${USER.gender===o.value?'selected':''}" data-group="gender" data-value="${o.value}" onclick="selectSingle(this,'gender')">
            <span class="option-emoji">${o.emoji}</span>
            <span class="option-text"><span class="option-label">${o.label}</span>${o.hint?`<span class="option-hint">${o.hint}</span>`:''}</span>
          </button>`).join('')}
      </div>
    </div>`;
}

function stepCycleTracking() {
  if (USER.gender === 'man') { setTimeout(() => onboardingNext(), 50); return `<div class="animate-in"><div class="onboarding-question">Almost there...</div></div>`; }
  const opts = [
    { value:'yes', emoji:'📅', label:'Yes, I track my cycle', hint:'We\'ll give phase-specific meal and energy tips' },
    { value:'want', emoji:'🌱', label:'I want to start tracking', hint:'gUide will help you understand your patterns' },
    { value:'no', emoji:'🚫', label:'No, not right now', hint:'No problem — you\'ll still get great recommendations' },
    { value:'na', emoji:'⭕', label:'Not applicable', hint:'Perimenopause, post-menopause, or other' },
  ];
  return `
    <div class="animate-in">
      <div class="onboarding-question">Do you track your menstrual cycle?</div>
      <div class="onboarding-sub">Your cycle phase affects energy, appetite, recovery, and mood. If you track it, we personalise much more deeply.</div>
      <div class="option-list">
        ${opts.map(o => `
          <button class="option-chip ${USER.cycleTracking===o.value?'selected':''}" data-group="cycle" data-value="${o.value}" onclick="selectSingle(this,'cycle')">
            <span class="option-emoji">${o.emoji}</span>
            <span class="option-text"><span class="option-label">${o.label}</span><span class="option-hint">${o.hint}</span></span>
          </button>`).join('')}
      </div>
    </div>`;
}

function stepCulturalFood() {
  const opts = [
    { value:'south_asian', emoji:'🍛', label:'South Asian', hint:'Indian, Pakistani, Bangladeshi, Sri Lankan' },
    { value:'east_asian', emoji:'🍜', label:'East & South-East Asian', hint:'Chinese, Japanese, Korean, Vietnamese, Thai' },
    { value:'middle_eastern', emoji:'🥙', label:'Middle Eastern', hint:'Lebanese, Turkish, Persian, Egyptian' },
    { value:'mediterranean', emoji:'🫒', label:'Mediterranean', hint:'Greek, Italian, Spanish' },
    { value:'indigenous', emoji:'🌿', label:'Indigenous Australian', hint:'Aboriginal and Torres Strait Islander' },
    { value:'pacific', emoji:'🥥', label:'Pacific Islander', hint:'Fijian, Samoan, Tongan, Māori' },
    { value:'african', emoji:'🌍', label:'African', hint:'West, East, Central or Southern African' },
    { value:'latin', emoji:'🌽', label:'Latin American', hint:'Mexican, Brazilian, Colombian, Peruvian' },
    { value:'none', emoji:'🍽️', label:'No strong food tradition', hint:'Or I eat a wide mix' },
  ];
  return `
    <div class="animate-in">
      <div class="onboarding-question">What's your cultural food background?</div>
      <div class="onboarding-sub">Your traditional foods are part of your health story. gUide will suggest meals that feel familiar — not foreign.</div>
      <div class="option-list">
        ${opts.map(o => `
          <button class="option-chip ${USER.culturalFood===o.value?'selected':''}" data-group="cultural" data-value="${o.value}" onclick="selectSingle(this,'cultural')">
            <span class="option-emoji">${o.emoji}</span>
            <span class="option-text"><span class="option-label">${o.label}</span><span class="option-hint">${o.hint}</span></span>
          </button>`).join('')}
      </div>
    </div>`;
}

function stepCuisines() {
  const opts = [
    { value:'south_asian', emoji:'🍛', label:'South Asian', hint:'Curries, dal, biriyani, roti' },
    { value:'east_asian', emoji:'🍜', label:'East & South-East Asian', hint:'Noodles, rice dishes, stir-fry, sushi' },
    { value:'middle_eastern', emoji:'🥙', label:'Middle Eastern', hint:'Falafel, hummus, shakshuka, tagine' },
    { value:'mediterranean', emoji:'🫒', label:'Mediterranean', hint:'Salads, grilled fish, pasta, mezze' },
    { value:'indigenous', emoji:'🌿', label:'Indigenous Australian', hint:'Bush tucker, native ingredients' },
    { value:'pacific', emoji:'🥥', label:'Pacific Islander', hint:'Coconut-based dishes, taro, seafood' },
    { value:'african', emoji:'🌍', label:'African', hint:'Stews, jollof, injera, tagines' },
    { value:'latin', emoji:'🌽', label:'Latin American', hint:'Tacos, rice & beans, ceviche' },
    { value:'modern_aus', emoji:'🥗', label:'Modern Australian', hint:'Café-style bowls, smashed avo, brunch' },
    { value:'any', emoji:'🌐', label:'All sorts — I eat everything', hint:'' },
  ];
  return `
    <div class="animate-in">
      <div class="onboarding-question">What cuisines do you actually eat and enjoy?</div>
      <div class="onboarding-sub">Select all that apply — meal suggestions will reflect the food you actually cook and eat at home, not just your background.</div>
      <div class="option-list">
        ${opts.map(o => `
          <button class="option-chip ${(USER.cuisines||[]).includes(o.value)?'selected':''}" data-group="cuisines" data-value="${o.value}" onclick="toggleMulti(this)">
            <span class="option-emoji">${o.emoji}</span>
            <span class="option-text"><span class="option-label">${o.label}</span>${o.hint?`<span class="option-hint">${o.hint}</span>`:''}</span>
            <span class="option-check">✓</span>
          </button>`).join('')}
      </div>
    </div>`;
}

function stepDietStyle() {
  const opts = [
    { value:'omnivore', emoji:'🍖', label:'Omnivore', hint:'I eat meat, dairy, and everything' },
    { value:'flexitarian', emoji:'🥗', label:'Flexitarian', hint:'Mostly plant-based, some meat' },
    { value:'vegetarian', emoji:'🥦', label:'Vegetarian', hint:'No meat — dairy and eggs fine' },
    { value:'vegan', emoji:'🌱', label:'Vegan', hint:'No animal products at all' },
    { value:'halal', emoji:'☪️', label:'Halal', hint:'Meat must be halal-certified' },
    { value:'kosher', emoji:'✡️', label:'Kosher', hint:'Following Jewish dietary laws' },
    { value:'glutenfree', emoji:'🌾', label:'Gluten-free', hint:'Coeliac or gluten intolerance' },
    { value:'other', emoji:'⚙️', label:'Other / it\'s complex', hint:'We\'ll figure it out from your conditions' },
  ];
  return `
    <div class="animate-in">
      <div class="onboarding-question">How would you describe your eating style?</div>
      <div class="onboarding-sub">Meal recommendations will only include things that fit. No surprises.</div>
      <div class="option-list">
        ${opts.map(o => `
          <button class="option-chip ${USER.dietStyle===o.value?'selected':''}" data-group="diet" data-value="${o.value}" onclick="selectSingle(this,'diet')">
            <span class="option-emoji">${o.emoji}</span>
            <span class="option-text"><span class="option-label">${o.label}</span><span class="option-hint">${o.hint}</span></span>
          </button>`).join('')}
      </div>
    </div>`;
}

function stepFitnessProtein() {
  const goals = [
    { value:'build_strength', emoji:'🏋️', label:'Build strength & muscle' },
    { value:'endurance', emoji:'🏃', label:'Improve endurance & cardio' },
    { value:'general_fitness', emoji:'🤸', label:'General fitness & health' },
    { value:'weight_loss', emoji:'⚖️', label:'Fat loss & body composition' },
    { value:'recovery', emoji:'🧘', label:'Active recovery & mobility' },
    { value:'not_focus', emoji:'😌', label:'Fitness isn\'t a focus right now' },
  ];
  const activity = [
    { value:'sedentary', emoji:'💼', label:'Mostly desk / low movement' },
    { value:'light', emoji:'🚶', label:'Light — walks, occasional exercise' },
    { value:'moderate', emoji:'🚴', label:'Moderate — 3–4x active per week' },
    { value:'active', emoji:'🏊', label:'Active — 5+ sessions a week' },
    { value:'very_active', emoji:'🔥', label:'Very active — training daily' },
  ];
  return `
    <div class="animate-in">
      <div class="onboarding-question">Fitness & protein goals</div>
      <div class="onboarding-sub">Be honest — this isn't judged. Where you actually are is what makes recommendations useful.</div>
      <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:10px">What are your fitness goals? <span style="font-size:11px;font-weight:400;color:var(--text-light)">(select all that apply)</span></div>
      <div class="option-list" style="margin-bottom:20px">
        ${goals.map(o => `
          <button class="option-chip ${(USER.fitnessGoals||[]).includes(o.value)?'selected':''}" data-group="fitness-goal" data-value="${o.value}" onclick="toggleMulti(this)">
            <span class="option-emoji">${o.emoji}</span>
            <span class="option-text"><span class="option-label">${o.label}</span></span>
            <span class="option-check">✓</span>
          </button>`).join('')}
      </div>
      <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:10px">How active are you right now?</div>
      <div class="option-list" style="margin-bottom:20px">
        ${activity.map(o => `
          <button class="option-chip ${USER.activityLevel===o.value?'selected':''}" data-group="activity" data-value="${o.value}" onclick="selectSingle2(this,'activity')">
            <span class="option-emoji">${o.emoji}</span>
            <span class="option-text"><span class="option-label">${o.label}</span></span>
          </button>`).join('')}
      </div>
      <div class="scale-wrapper">
        <div class="scale-label">Do you eat enough protein? (1 = not at all, 5 = always intentional)</div>
        <div class="scale-dots">
          ${[1,2,3,4,5].map(n => `<button class="scale-dot ${USER.proteinScore===n?'selected':''}" data-group="protein" data-val="${n}" onclick="selectScale(this,'protein')">${n}</button>`).join('')}
        </div>
        <div class="scale-extremes"><span>Barely any</span><span>Very intentional</span></div>
      </div>
    </div>`;
}

function stepSleepStressHydration() {
  const cooking = [
    { value:'daily', emoji:'👩‍🍳', label:'Every day' },
    { value:'most_days', emoji:'🍳', label:'Most days (4–5x)' },
    { value:'few_times', emoji:'🥘', label:'A few times a week' },
    { value:'rarely', emoji:'🥡', label:'Rarely — mostly takeaway' },
    { value:'other_cooks', emoji:'🏠', label:'Someone else cooks for me' },
  ];
  return `
    <div class="animate-in">
      <div class="onboarding-question">Sleep, stress & daily habits</div>
      <div class="onboarding-sub">These have a huge impact on nutrition and hormones. Honest answers = better insights.</div>
      <div class="scale-wrapper" style="margin-bottom:16px">
        <div class="scale-label">How is your sleep quality overall? (1 = terrible, 5 = great)</div>
        <div class="scale-dots">${[1,2,3,4,5].map(n=>`<button class="scale-dot ${USER.sleepQuality===n?'selected':''}" data-group="sleep" data-val="${n}" onclick="selectScale(this,'sleep')">${n}</button>`).join('')}</div>
        <div class="scale-extremes"><span>Terrible</span><span>Great</span></div>
      </div>
      <div class="scale-wrapper" style="margin-bottom:16px">
        <div class="scale-label">What's your stress level been lately? (1 = very low, 5 = very high)</div>
        <div class="scale-dots">${[1,2,3,4,5].map(n=>`<button class="scale-dot ${USER.stressLevel===n?'selected':''}" data-group="stress" data-val="${n}" onclick="selectScale(this,'stress')">${n}</button>`).join('')}</div>
        <div class="scale-extremes"><span>Very low</span><span>Very high</span></div>
      </div>
      <div class="scale-wrapper" style="margin-bottom:20px">
        <div class="scale-label">How well do you hydrate? (1 = rarely, 5 = always on top of it)</div>
        <div class="scale-dots">${[1,2,3,4,5].map(n=>`<button class="scale-dot ${USER.hydration===n?'selected':''}" data-group="hydration" data-val="${n}" onclick="selectScale(this,'hydration')">${n}</button>`).join('')}</div>
        <div class="scale-extremes"><span>Rarely</span><span>Always</span></div>
      </div>
      <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:10px">How often do you cook at home?</div>
      <div class="option-list">
        ${cooking.map(o=>`
          <button class="option-chip ${USER.cookingFrequency===o.value?'selected':''}" data-group="cooking" data-value="${o.value}" onclick="selectSingle2(this,'cooking')">
            <span class="option-emoji">${o.emoji}</span>
            <span class="option-text"><span class="option-label">${o.label}</span></span>
          </button>`).join('')}
      </div>
    </div>`;
}

function stepConditions() {
  const opts = [
    { value:'pcos', emoji:'🔄', label:'PCOS', hint:'Polycystic ovary syndrome' },
    { value:'endometriosis', emoji:'🩺', label:'Endometriosis', hint:'' },
    { value:'thyroid', emoji:'🦋', label:'Thyroid condition', hint:'Hypo/hyper, Hashimoto\'s' },
    { value:'ibs', emoji:'🌿', label:'IBS or IBD', hint:'Irritable bowel, Crohn\'s, colitis' },
    { value:'diabetes', emoji:'🩸', label:'Diabetes or pre-diabetes', hint:'' },
    { value:'celiac', emoji:'🌾', label:'Coeliac disease', hint:'' },
    { value:'fatigue', emoji:'😴', label:'Chronic fatigue', hint:'ME/CFS or persistent low energy' },
    { value:'heart', emoji:'❤️', label:'Heart or cholesterol concerns', hint:'' },
    { value:'anxiety', emoji:'🧠', label:'Anxiety or depression', hint:'' },
    { value:'none', emoji:'✅', label:'None of the above', hint:'', exclusive:true },
    { value:'private', emoji:'🔒', label:'Prefer not to share', hint:'', exclusive:true },
  ];
  return `
    <div class="animate-in">
      <div class="onboarding-question">Any health conditions we should know about?</div>
      <div class="onboarding-sub">Private and never shared. Helps ensure meal suggestions and tips are appropriate for your body.</div>
      <div class="option-list">
        ${opts.map(o => `
          <button class="option-chip ${USER.conditions.includes(o.value)?'selected':''}" data-group="conditions" data-value="${o.value}" onclick="toggleExclusive(this,['none','private'])">
            <span class="option-emoji">${o.emoji}</span>
            <span class="option-text"><span class="option-label">${o.label}</span>${o.hint?`<span class="option-hint">${o.hint}</span>`:''}</span>
            <span class="option-check">✓</span>
          </button>`).join('')}
      </div>
    </div>`;
}

function stepConnectApps() {
  const apps = [
    { id:'apple_health', icon:'🍎', name:'Apple Health', desc:'Steps, sleep, heart rate' },
    { id:'flo', icon:'🌸', name:'Flo', desc:'Cycle tracking & phase data' },
    { id:'myfitnesspal', icon:'🥗', name:'MyFitnessPal', desc:'Calories & nutrition logging' },
    { id:'samsung_health', icon:'📱', name:'Samsung Health', desc:'Steps, sleep, stress score' },
    { id:'dayonejournal', icon:'📓', name:'Day One Journal', desc:'Mood & journal entries' },
    { id:'garmin', icon:'⌚', name:'Garmin Connect', desc:'Fitness & HRV data' },
  ];
  return `
    <div class="animate-in">
      <div class="onboarding-question">Connect your existing apps</div>
      <div class="onboarding-sub">gUide reads your data — you don't enter anything manually. More apps = more personalised home screen. Optional.</div>
      <div class="app-connect-list">
        ${apps.map(a => `
          <div class="app-connect-item ${USER.connectedApps.includes(a.id)?'connected':''}" id="app-${a.id}" onclick="toggleAppConnect('${a.id}')">
            <div class="app-connect-icon">${a.icon}</div>
            <div><div class="app-connect-name">${a.name}</div><div style="font-size:11px;color:var(--text-light);margin-top:1px">${a.desc}</div></div>
            <div class="app-connect-status" id="status-${a.id}">${USER.connectedApps.includes(a.id)?'✓ Connected':'Tap to connect'}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

function toggleAppConnect(appId) {
  const el = document.getElementById(`app-${appId}`);
  const st = document.getElementById(`status-${appId}`);
  if (USER.connectedApps.includes(appId)) {
    USER.connectedApps = USER.connectedApps.filter(a => a !== appId);
    el.classList.remove('connected'); st.textContent = 'Tap to connect';
  } else {
    USER.connectedApps.push(appId);
    el.classList.add('connected'); st.textContent = '✓ Connected';
  }
}

function stepCommunityRole() {
  const opts = [
    { value:'reader', emoji:'📖', label:'Reader — I prefer to just explore', hint:'Browse what others share, no pressure to post' },
    { value:'sharer', emoji:'✍️', label:'Sharer — I love contributing', hint:'Your tips earn trust ratings from the community' },
    { value:'both', emoji:'🤝', label:'Both — I\'ll do whatever feels right', hint:'The most flexible option' },
  ];
  return `
    <div class="animate-in">
      <div class="onboarding-question">How do you want to show up in the community?</div>
      <div class="onboarding-sub">The gUide community is built on shared experience — not influencers or sponsored content.</div>
      <div class="option-list">
        ${opts.map(o => `
          <button class="option-chip ${USER.communityRole===o.value?'selected':''}" data-group="community-role" data-value="${o.value}" onclick="selectSingle(this,'community-role')">
            <span class="option-emoji">${o.emoji}</span>
            <span class="option-text"><span class="option-label">${o.label}</span><span class="option-hint">${o.hint}</span></span>
          </button>`).join('')}
      </div>
    </div>`;
}

function renderDoneScreen() {
  const badges = [];
  if (USER.goals.length) badges.push(...USER.goals.map(g => getGoalLabel(g)));
  if (USER.culturalFood && USER.culturalFood !== 'none') badges.push(getCultureLabel(USER.culturalFood));
  if (USER.conditions.length) badges.push(...USER.conditions.slice(0,2).map(c => getCondLabel(c)));
  if (USER.connectedApps.length) badges.push(`${USER.connectedApps.length} apps linked`);
  return `
    <div class="screen onboarding-screen">
      <div class="onboarding-top">
        <div class="progress-bar-track"><div class="progress-bar-fill" style="width:100%"></div></div>
      </div>
      <div class="done-screen">
        <div class="done-emoji">✨</div>
        <div class="done-title">You're all set, ${USER.name || 'friend'}!</div>
        <div class="done-sub">Your gUide is personalised and ready. Here's what we know about you:</div>
        <div class="profile-badges">${badges.map(b=>`<div class="profile-badge">${b}</div>`).join('')}</div>
        <button class="btn-continue" onclick="navigate('home')" style="background:var(--teal)">Open my gUide →</button>
      </div>
    </div>`;
}
