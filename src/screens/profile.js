function renderProfile() {
  const name = USER.name || 'Your Profile';
  const goals = USER.goals.map(g=>getGoalLabel(g));
  const connectedCount = USER.connectedApps.length;

  // Calculate average rating from tips the user has posted
  const myTips = COMMUNITY_TIPS.filter(t=>t.author===(USER.name||'You'));
  const ratedTips = myTips.filter(t=>t.stars>0);
  const avgRating = ratedTips.length ? (ratedTips.reduce((sum,t)=>sum+t.stars,0)/ratedTips.length).toFixed(1) : null;

  const genderInsight = {
    woman:{title:'Female-specific insights active',text:'Recommendations account for the menstrual cycle, hormonal fluctuations, iron needs, and conditions like PCOS and endometriosis.'},
    man:{title:'Male-specific insights active',text:'Recommendations account for testosterone-related nutrition, muscle recovery, cardiovascular risk factors, and male hormone health.'},
    nonbinary:{title:'Inclusive health insights',text:'Recommendations are built around your specific goals and conditions — not binary assumptions about your body.'},
    private:{title:'Goal-based insights active',text:'Without gender info, we personalise based on your goals, conditions, and connected health data.'},
  }[USER.gender]||null;

  return `
    <div class="screen profile-screen">
      <div class="profile-header" style="position:relative">
        <button class="profile-close-btn" onclick="navigate(typeof previousScreen !== 'undefined' ? previousScreen : 'home')">✕</button>
        <div class="profile-avatar-circle">${name.charAt(0).toUpperCase()||'👤'}</div>
        <div class="profile-name">${name}</div>
        <div class="profile-sub">${USER.lifeStage?getLifeStageLabel(USER.lifeStage)+' · ':''} ${USER.culturalFood&&USER.culturalFood!=='none'?getCultureLabel(USER.culturalFood)+' · ':''} ${USER.dietStyle||'gUide member'}</div>

        <!-- Average rating -->
        ${avgRating ? `
          <div class="profile-rating-row">
            <div class="profile-avg-stars">
              ${[1,2,3,4,5].map(n=>`<span class="profile-avg-star" style="opacity:${n<=Math.round(parseFloat(avgRating))?1:0.3}">★</span>`).join('')}
            </div>
            <span class="profile-avg-label">${avgRating} avg community rating · ${ratedTips.length} tip${ratedTips.length!==1?'s':''}</span>
          </div>
        ` : USER.tipsPosted ? `
          <div style="margin-top:8px;font-size:11px;color:rgba(255,255,255,0.5)">${USER.tipsPosted} tip${USER.tipsPosted!==1?'s':''} shared — waiting for ratings</div>
        ` : ''}

        <div class="profile-stats">
          <div class="profile-stat"><div class="profile-stat-val">${USER.journalStreak||0}</div><div class="profile-stat-label">day streak</div></div>
          <div class="profile-stat"><div class="profile-stat-val">${connectedCount}</div><div class="profile-stat-label">apps linked</div></div>
          <div class="profile-stat"><div class="profile-stat-val">${USER.tipsPosted||0}</div><div class="profile-stat-label">tips shared</div></div>
        </div>
      </div>

      <div class="screen-scroll">
        ${genderInsight?`<div class="gender-insight-card" style="margin-top:12px"><div class="gender-insight-title">${genderInsight.title}</div><div class="gender-insight-text">${genderInsight.text}</div></div>`:''}

        <div class="profile-section" style="margin-top:12px">
          <div class="profile-section-title">My health goals</div>
          ${goals.length?goals.map(g=>`<div class="profile-row"><div class="profile-row-icon">🎯</div><div class="profile-row-label">${g}</div></div>`).join(''):`<div class="profile-row"><div class="profile-row-label" style="color:var(--text-light)">No goals set yet</div></div>`}
        </div>

        ${USER.lifeStage?`
          <div class="profile-section">
            <div class="profile-section-title">Life stage</div>
            <div class="profile-row"><div class="profile-row-icon">🌱</div><div class="profile-row-label">${getLifeStageLabel(USER.lifeStage)}</div></div>
          </div>`:''}

        <div class="profile-section">
          <div class="profile-section-title">Connected apps (${connectedCount})</div>
          ${USER.connectedApps.length?USER.connectedApps.map(a=>{
            const appNames={apple_health:'🍎 Apple Health',flo:'🌸 Flo',myfitnesspal:'🥗 MyFitnessPal',samsung_health:'📱 Samsung Health',dayonejournal:'📓 Day One',garmin:'⌚ Garmin'};
            return `<div class="profile-row"><div class="profile-row-label">${appNames[a]||a}</div><div class="profile-row-value" style="color:var(--teal)">✓ Connected</div></div>`;
          }).join(''):`<div class="profile-row" onclick="navigate('onboarding')"><div class="profile-row-icon">➕</div><div class="profile-row-label">Connect your first app</div><div class="profile-row-arrow">›</div></div>`}
        </div>

        <div class="profile-section">
          <div class="profile-section-title">Health profile</div>
          ${USER.conditions.length?`<div class="profile-row"><div class="profile-row-icon">🩺</div><div class="profile-row-label">Conditions</div><div class="profile-row-value">${USER.conditions.map(c=>getCondLabel(c)).join(', ')}</div></div>`:''}
          ${USER.cycleTracking&&USER.cycleTracking!=='na'?`<div class="profile-row"><div class="profile-row-icon">🌙</div><div class="profile-row-label">Cycle tracking</div><div class="profile-row-value">${USER.cycleTracking==='yes'?'Active':'Not set up'}</div></div>`:''}
          <div class="profile-row"><div class="profile-row-icon">⚡</div><div class="profile-row-label">Protein awareness</div><div class="profile-row-value">${['','Very low','Low','Moderate','Good','High'][USER.proteinScore||3]}</div></div>
        </div>

        <div class="profile-section">
          <div class="profile-section-title">Settings</div>
          <div class="profile-row" onclick="alert('Notifications settings would open here')"><div class="profile-row-icon">🔔</div><div class="profile-row-label">Notifications</div><div class="profile-row-arrow">›</div></div>
          <div class="profile-row" onclick="alert('Privacy settings would open here')"><div class="profile-row-icon">🔒</div><div class="profile-row-label">Privacy & data</div><div class="profile-row-arrow">›</div></div>
          <div class="profile-row" onclick="navigate('landing')"><div class="profile-row-icon">🔄</div><div class="profile-row-label">Reset & restart onboarding</div><div class="profile-row-arrow">›</div></div>
        </div>

        <div style="height:20px"></div>
      </div>
    </div>`;
}

function getLifeStageLabel(s) {
  const map={adolescence:'Adolescence',early_adulthood:'Early Adulthood',adulthood:'Adulthood',perimenopause:'Perimenopause / Menopause',post_menopause:'Post-Menopause',senior:'Senior'};
  return map[s]||s;
}