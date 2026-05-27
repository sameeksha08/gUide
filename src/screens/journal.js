function renderJournal() {
  const hasEntries = USER.journalEntries.length > 0;
  const hasData = USER.connectedApps.length > 0;

  return `
    <div class="screen">
      <div class="journal-header">
        <div class="journal-title">My Journal 📓</div>
        ${USER.journalStreak > 0 ? `
          <div class="journal-streak">🔥 ${USER.journalStreak}-day streak</div>
        ` : ''}
      </div>

      <div class="screen-scroll">
        <!-- Auto-capture banner -->
        <div class="autocapture-banner" style="margin-top:16px">
          <div style="font-size:20px">✨</div>
          <div class="autocapture-text">
            <strong>Auto-capture is on.</strong> Mention how you feel in chat and gUide will offer to save it to your journal automatically.
          </div>
        </div>

        <!-- Today's data snapshot -->
        ${hasData ? renderDataSnapshot() : ''}

        <!-- Compose -->
        <div class="journal-compose">
          <div class="journal-compose-label">Today's entry</div>
          <textarea
            class="journal-textarea"
            id="journal-text"
            placeholder="How are you feeling today? Any wins, struggles, or observations about your body, energy, or mood..."
            rows="4"
          ></textarea>
          <div class="journal-toolbar">
            <button class="journal-tool-btn" onclick="addMood()" title="Add mood">😊</button>
            <button class="journal-tool-btn" onclick="addVoice()" title="Voice note">🎙</button>
            ${hasData ? `<button class="journal-tool-btn" onclick="syncData()" title="Sync app data">📱 Add data</button>` : ''}
            <button class="journal-save-btn" onclick="saveJournalEntry()">Save entry</button>
          </div>
        </div>

        <!-- Past entries -->
        <div class="journal-entries">
          <div class="section-label">Past entries</div>
          ${hasEntries ? USER.journalEntries.slice().reverse().map(renderJournalEntry).join('') : `
            <div class="empty-state">
              <div class="empty-state-icon">📓</div>
              <div class="empty-state-text">No entries yet. Write your first one above — even a few words counts.</div>
            </div>
          `}
        </div>

        <div style="height:20px"></div>
      </div>

      ${renderBottomNav('journal')}
    </div>
  `;
}

function renderDataSnapshot() {
  const t = USER.today;
  const items = [];
  if (t.steps !== null) items.push({ val: t.steps.toLocaleString(), label: 'Steps' });
  if (t.sleepHours !== null) items.push({ val: `${t.sleepHours}h`, label: 'Sleep' });
  if (t.cycleDay !== null) items.push({ val: `Day ${t.cycleDay}`, label: 'Cycle' });
  if (!items.length) return '';
  return `
    <div class="data-snapshot" style="margin:12px 18px 0">
      ${items.map(i => `
        <div class="snapshot-item">
          <div class="snapshot-val">${i.val}</div>
          <div class="snapshot-label">${i.label}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderJournalEntry(entry) {
  return `
    <div class="journal-entry">
      <div class="entry-date">${entry.date}</div>
      ${entry.mood ? `<div class="entry-mood">${entry.mood}</div>` : ''}
      <div class="entry-text">${entry.text}</div>
    </div>
  `;
}

function saveJournalEntry() {
  const text = document.getElementById('journal-text')?.value?.trim();
  if (!text) return;

  const entry = {
    date: new Date().toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' }),
    text,
    mood: null,
    dataSnapshot: USER.today.steps ? `${USER.today.steps.toLocaleString()} steps` : null,
  };

  USER.journalEntries.push(entry);
  USER.journalStreak = (USER.journalStreak || 0) + 1;

  document.getElementById('app').innerHTML = renderJournal();
}

function addMood() {
  const moods = ['😊', '🙂', '😐', '😕', '😞'];
  const mood = moods[Math.floor(Math.random() * moods.length)];
  const textarea = document.getElementById('journal-text');
  if (textarea) textarea.value = (textarea.value ? textarea.value + ' ' : '') + mood + ' ';
  textarea?.focus();
}

function addVoice() {
  const textarea = document.getElementById('journal-text');
  if (textarea) {
    textarea.placeholder = '🎙 Voice recording would start here in the live app...';
  }
}

function syncData() {
  const t = USER.today;
  const parts = [];
  if (t.steps) parts.push(`Steps: ${t.steps.toLocaleString()}`);
  if (t.sleepHours) parts.push(`Sleep: ${t.sleepHours}h`);
  if (t.cycleDay) parts.push(`Cycle day ${t.cycleDay} (${t.phase} phase)`);
  if (t.mood) parts.push(`Mood: ${['','Low','Meh','Okay','Good','Great'][t.mood]}`);

  const textarea = document.getElementById('journal-text');
  if (textarea && parts.length) {
    textarea.value = (textarea.value ? textarea.value + '\n\n' : '') + `📊 Today's data: ${parts.join(' · ')}`;
  }
}
