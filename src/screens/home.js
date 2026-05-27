function renderHome() {
  const name = USER.name || 'there';
  const insight = getGreetingInsight();
  const meals = getRecommendedMeals();
  const hasData = USER.connectedApps.length > 0;

  return `
    <div class="screen">
      <div class="home-header">
        <div class="home-greeting">Good morning, <em>${name}</em> 👋</div>
        <div class="home-insight-line">${insight}</div>
      </div>

      <div class="screen-scroll">
        ${hasData ? renderInsightTiles() : renderConnectBanner()}

        <!-- Crush It — always pinned first -->
        <div class="meal-section mt-14">
          <div class="section-label">Recommended for you today</div>
          ${renderCrushItCard()}
          ${SANITARIUM_PRODUCTS.vegieDelights.slice(0, 1).map(p => renderSanitariumMealCard(p)).join('')}
          ${meals.map(renderMealCard).join('')}
        </div>

        <!-- Ask Your Buddy -->
        <div class="ask-buddy-banner mt-14" onclick="navigate('chat')">
          <div class="buddy-img-placeholder">
            <div class="buddy-img-placeholder-text">buddy art here</div>
          </div>
          <div class="ask-buddy-text">
            <div class="ask-buddy-title">Ask your buddy anything</div>
            <div class="ask-buddy-sub">Why am I tired? What should I eat today?</div>
          </div>
          <div style="color:var(--text-light)">→</div>
        </div>

        <div style="height:20px"></div>
      </div>

      ${renderBottomNav('home')}
    </div>
  `;
}

function renderInsightTiles() {
  const t = USER.today;
  const tiles = [];

  if (t.steps !== null) tiles.push(`
    <div class="insight-tile">
      <div class="insight-tile-icon">👟</div>
      <div class="insight-tile-value">${t.steps.toLocaleString()}</div>
      <div class="insight-tile-label">steps today</div>
      <div class="insight-tile-note">${t.steps >= 8000 ? '🔥 Great effort!' : 'Keep moving'}</div>
    </div>`);

  if (t.sleepHours !== null) tiles.push(`
    <div class="insight-tile">
      <div class="insight-tile-icon">😴</div>
      <div class="insight-tile-value">${t.sleepHours}<span class="insight-tile-unit">h</span></div>
      <div class="insight-tile-label">sleep last night</div>
      <div class="insight-tile-note">${t.sleepHours >= 7.5 ? '✨ Well rested' : t.sleepHours < 6 ? '⚠️ Low — check tips' : 'Could be better'}</div>
    </div>`);

  if (t.cycleDay !== null) tiles.push(`
    <div class="insight-tile">
      <div class="insight-tile-icon">🌙</div>
      <div class="insight-tile-value">Day ${t.cycleDay}</div>
      <div class="insight-tile-label">of your cycle</div>
      <div class="insight-tile-note">${t.phase ? t.phase.charAt(0).toUpperCase() + t.phase.slice(1) + ' phase' : ''}</div>
    </div>`);

  if (t.caloriesLogged !== null) tiles.push(`
    <div class="insight-tile">
      <div class="insight-tile-icon">🍽️</div>
      <div class="insight-tile-value">${t.caloriesLogged}</div>
      <div class="insight-tile-label">kcal logged</div>
      <div class="insight-tile-note">Via MyFitnessPal</div>
    </div>`);

  if (t.mood !== null) {
    const moodEmoji = ['','😞','😕','😐','🙂','😊'][t.mood];
    tiles.push(`
    <div class="insight-tile">
      <div class="insight-tile-icon">${moodEmoji}</div>
      <div class="insight-tile-value">${['','Low','Meh','Okay','Good','Great'][t.mood]}</div>
      <div class="insight-tile-label">mood from journal</div>
      <div class="insight-tile-note">Via Day One</div>
    </div>`);
  }

  if (t.heartRateAvg !== null) tiles.push(`
    <div class="insight-tile">
      <div class="insight-tile-icon">❤️</div>
      <div class="insight-tile-value">${t.heartRateAvg}<span class="insight-tile-unit">bpm</span></div>
      <div class="insight-tile-label">avg heart rate</div>
      <div class="insight-tile-note">Resting HR</div>
    </div>`);

  if (t.phase) tiles.push(`
    <div class="insight-tile wide">
      <div class="insight-tile-icon">🌸</div>
      <div>
        <div class="insight-tile-value" style="font-size:16px">${t.phase.charAt(0).toUpperCase() + t.phase.slice(1)} phase</div>
        <div class="insight-tile-label" style="margin-top:3px">${getPhaseAdvice(t.phase)}</div>
      </div>
    </div>`);

  return `
    <div class="insight-tiles-section">
      <div class="section-label">Your data today</div>
      <div class="insight-tiles-grid">${tiles.join('')}</div>
    </div>`;
}

function renderConnectBanner() {
  return `
    <div class="connect-banner" onclick="navigate('profile')">
      <div class="connect-banner-icon">📱</div>
      <div class="connect-banner-text">
        <div class="connect-banner-title">Connect your apps for live insights</div>
        <div class="connect-banner-sub">Steps, sleep, cycle & mood — all in one place</div>
      </div>
      <div class="connect-banner-arrow">→</div>
    </div>`;
}

function renderCrushItCard() {
  const p = SANITARIUM_PRODUCTS.crushIt;
  return `
    <div class="crush-it-card" onclick="openRecipeModal('crush_it')">
      <div class="crush-it-emoji">${p.emoji}</div>
      <div class="crush-it-info">
        <div class="crush-it-badge">✚ SANITARIUM</div>
        <div class="crush-it-name">${p.name}</div>
        <div class="crush-it-why">${p.why} · Tap for recipe</div>
      </div>
    </div>`;
}

function renderSanitariumMealCard(meal) {
  return `
    <div class="meal-card" onclick="openRecipeModal('${meal.id}')">
      <div class="meal-card-emoji">${meal.emoji}</div>
      <div class="meal-card-info">
        <div style="display:inline-flex;align-items:center;gap:4px;background:var(--gold-light);border:1px solid var(--gold);border-radius:5px;padding:2px 8px;font-size:10px;font-weight:800;color:var(--navy);margin-bottom:4px">✚ Sanitarium · Vegie Delights</div>
        <div class="meal-card-name">${meal.name}</div>
        <div class="meal-card-why">${meal.why}</div>
        <div class="meal-card-meta">
          ${meal.tags.slice(0,2).map(t => `<span class="meal-meta-tag">#${t}</span>`).join('')}
          <span class="meal-meta-tag">⏱ ${meal.time}</span>
        </div>
      </div>
    </div>`;
}

function renderMealCard(meal) {
  return `
    <div class="meal-card" onclick="openRecipeModal('${meal.name.replace(/'/g,'').replace(/\s+/g,'-').toLowerCase()}', ${JSON.stringify(meal).replace(/"/g,'&quot;')})">
      <div class="meal-card-emoji">${meal.emoji}</div>
      <div class="meal-card-info">
        <div class="meal-card-name">${meal.name}</div>
        <div class="meal-card-why">${meal.why}</div>
        <div class="meal-card-meta">
          ${meal.tags ? meal.tags.slice(0,2).map(t => `<span class="meal-meta-tag">#${t}</span>`).join('') : ''}
          ${meal.time ? `<span class="meal-meta-tag">⏱ ${meal.time}</span>` : ''}
        </div>
      </div>
    </div>`;
}

function openRecipeModal(id, mealData) {
  let meal;
  if (id === 'crush_it') {
    meal = SANITARIUM_PRODUCTS.crushIt;
  } else if (id === 'vd_burger' || id === 'vd_sausage') {
    meal = SANITARIUM_PRODUCTS.vegieDelights.find(p => p.id === id);
  } else if (mealData) {
    meal = mealData;
  }
  if (!meal || !meal.recipe) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  const isSanitarium = meal.isSanitarium;

  overlay.innerHTML = `
    <div class="recipe-modal" style="position:relative">
      <button class="recipe-modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      <div class="recipe-modal-emoji">${meal.emoji}</div>
      <div class="recipe-modal-name">${meal.name}</div>
      <div class="recipe-modal-why">${meal.why || ''}</div>

      ${isSanitarium ? `
        <div class="sanitarium-tag">
          <span class="sanitarium-tag-cross">✚</span>
          <span class="sanitarium-tag-text">Sanitarium Health & Wellbeing${meal.brand === 'Sanitarium' && meal.id !== 'crush_it' ? ' · Vegie Delights' : ''}</span>
        </div>
        ${meal.recipe.note ? `<p style="font-size:12px;color:var(--text-mid);line-height:1.5;margin-bottom:16px">${meal.recipe.note}</p>` : ''}
      ` : ''}

      <div class="recipe-section-label">Ingredients</div>
      <ul class="recipe-ingredients">
        ${meal.recipe.ingredients.map(ing => `
          <li class="recipe-ingredient ${ing.sanitarium ? 'sanitarium-item' : ''}">
            ${ing.text}${ing.sanitarium ? ' <span style="font-size:10px;font-weight:700;color:var(--gold-dark)">(Sanitarium)</span>' : ''}
          </li>
        `).join('')}
      </ul>

      <div class="recipe-section-label">Method</div>
      <div class="recipe-steps">
        ${meal.recipe.steps.map((step, i) => `
          <div class="recipe-step">
            <div class="recipe-step-num">${i + 1}</div>
            <div class="recipe-step-text">${step}</div>
          </div>
        `).join('')}
      </div>

      ${!isSanitarium && meal.recipe.note ? `<p style="font-size:11px;color:var(--text-light);margin-top:14px;line-height:1.5">${meal.recipe.note}</p>` : ''}
    </div>
  `;

  document.getElementById('app').appendChild(overlay);
}
