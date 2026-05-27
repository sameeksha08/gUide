function renderProfile() {
  const name = USER.name || 'Your Profile';
  const goals = USER.goals.map(g => getGoalLabel(g));
  const connectedCount = USER.connectedApps.length;

  const genderInsight = {
    woman: { title: 'Female-specific insights active', text: 'Recommendations account for the menstrual cycle, hormonal fluctuations, iron needs, and conditions like PCOS and endometriosis.' },
    man: { title: 'Male-specific insights active', text: 'Recommendations account for testosterone-related nutrition, muscle recovery, cardiovascular risk factors, and male hormone health.' },
    nonbinary: { title: 'Inclusive health insights', text: 'Recommendations are built around your specific goals and conditions — not binary assumptions about your body.' },
    private: { title: 'Goal-based insights active', text: 'Without gender info, we personalise based on your goals, conditions, and connected health data.' },
  }[USER.gender] || null;

  return `
    <div class="screen">
      <div class="profile-header">
        <div class="profile-avatar-circle">
          ${name.charAt(0).toUpperCase() || '👤'}
        </div>
        <div class="profile-name">${name}</div>
        <div class="profile-sub">${USER.culturalFood && USER.culturalFood !== 'none' ? getCultureLabel(USER.culturalFood) + ' · ' : ''}${USER.dietStyle || 'gUide member'}</div>
        <div class="profile-stats">
          <div class="profile-stat">
            <div class="profile-stat-val">${USER.journalStreak || 0}</div>
            <div class="profile-stat-label">day streak</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-val">${connectedCount}</div>
            <div class="profile-stat-label">apps linked</div>
          </div>
          <div class="profile-stat">
            <div class="profile-stat-val">${USER.journalEntries.length}</div>
            <div class="profile-stat-label">entries</div>
          </div>
        </div>
      </div>

      <div class="screen-scroll">
        <!-- Gender insight -->
        ${genderInsight ? `
          <div class="gender-insight-card" style="margin-top:16px">
            <div class="gender-insight-title">${genderInsight.title}</div>
            <div class="gender-insight-text">${genderInsight.text}</div>
          </div>
        ` : ''}

        <!-- Goals -->
        <div class="profile-section" style="margin-top:16px">
          <div class="profile-section-title">My health goals</div>
          ${goals.length ? goals.map(g => `
            <div class="profile-row">
              <div class="profile-row-icon">🎯</div>
              <div class="profile-row-label">${g}</div>
            </div>
          `).join('') : `
            <div class="profile-row">
              <div class="profile-row-label" style="color:var(--text-light)">No goals set yet</div>
            </div>
          `}
        </div>

        <!-- Connected apps -->
        <div class="profile-section">
          <div class="profile-section-title">Connected apps (${connectedCount})</div>
          ${USER.connectedApps.length ? USER.connectedApps.map(a => {
            const appNames = { apple_health: '🍎 Apple Health', flo: '🌸 Flo', myfitnesspal: '🥗 MyFitnessPal', samsung_health: '📱 Samsung Health', dayonejournal: '📓 Day One Journal', garmin: '⌚ Garmin' };
            return `
              <div class="profile-row">
                <div class="profile-row-label">${appNames[a] || a}</div>
                <div class="profile-row-value" style="color:var(--teal)">✓ Connected</div>
              </div>
            `;
          }).join('') : `
            <div class="profile-row" onclick="navigate('onboarding')">
              <div class="profile-row-icon">➕</div>
              <div class="profile-row-label">Connect your first app</div>
              <div class="profile-row-arrow">›</div>
            </div>
          `}
        </div>

        <!-- Health profile -->
        <div class="profile-section">
          <div class="profile-section-title">Health profile</div>
          ${USER.conditions.length ? `
            <div class="profile-row">
              <div class="profile-row-icon">🩺</div>
              <div class="profile-row-label">Conditions</div>
              <div class="profile-row-value">${USER.conditions.map(c => getCondLabel(c)).join(', ')}</div>
            </div>
          ` : ''}
          ${USER.cycleTracking && USER.cycleTracking !== 'na' ? `
            <div class="profile-row">
              <div class="profile-row-icon">🌙</div>
              <div class="profile-row-label">Cycle tracking</div>
              <div class="profile-row-value">${USER.cycleTracking === 'yes' ? 'Active' : 'Not set up'}</div>
            </div>
          ` : ''}
          <div class="profile-row">
            <div class="profile-row-icon">⚡</div>
            <div class="profile-row-label">Protein awareness</div>
            <div class="profile-row-value">${['','Very low','Low','Moderate','Good','High'][USER.proteinScore || 3]}</div>
          </div>
        </div>

        <!-- Settings -->
        <div class="profile-section">
          <div class="profile-section-title">Settings</div>
          <div class="profile-row" onclick="alert('Notifications settings would open here')">
            <div class="profile-row-icon">🔔</div>
            <div class="profile-row-label">Notifications</div>
            <div class="profile-row-arrow">›</div>
          </div>
          <div class="profile-row" onclick="alert('Privacy settings would open here')">
            <div class="profile-row-icon">🔒</div>
            <div class="profile-row-label">Privacy & data</div>
            <div class="profile-row-arrow">›</div>
          </div>
          <div class="profile-row" onclick="navigate('landing')">
            <div class="profile-row-icon">🔄</div>
            <div class="profile-row-label">Reset & restart onboarding</div>
            <div class="profile-row-arrow">›</div>
          </div>
        </div>

        <div style="height:20px"></div>
      </div>

      ${renderBottomNav('profile')}
    </div>
  `;
}
