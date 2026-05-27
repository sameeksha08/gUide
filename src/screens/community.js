let communityTab = 'village';
let tipsFilter = 'all';
let activeSpeech = null;

function renderCommunity() {
  return buildCommunityScreen();
}

function buildCommunityScreen() {
  return `
    <div class="screen">
      <div class="community-header">
        <div class="community-title">Village 🌿</div>
        <div class="tab-bar">
          <button class="tab-btn ${communityTab==='village'?'active':''}" onclick="switchCommunityTab('village')">🌿 Village</button>
          <button class="tab-btn ${communityTab==='tips'?'active':''}" onclick="switchCommunityTab('tips')">💡 Tips</button>
        </div>
      </div>
      <div class="screen-scroll" id="community-scroll">
        ${communityTab==='village' ? renderVillageTab() : renderTipsTab()}
        <div style="height:20px"></div>
      </div>
      ${renderBottomNav('community')}
    </div>`;
}

function switchCommunityTab(tab) {
  communityTab = tab;
  activeSpeech = null;
  document.getElementById('app').innerHTML = buildCommunityScreen();
}

// ===== VILLAGE TAB — TOMODACHI LIFE STYLE =====
function renderVillageTab() {
  const culturalLabel = USER.culturalFood && USER.culturalFood !== 'none' ? getCultureLabel(USER.culturalFood) : null;
  return `
    <!-- Village scene with background placeholder -->
    <div class="village-scene">

      <!-- Background placeholder — swap with your drawn background image -->
      <div class="village-bg-placeholder">
        <div class="village-bg-placeholder-label">🖼 Village background image goes here — drop in your illustration</div>
      </div>

      <!-- Drawn CSS sky/ground for depth until image is added -->
      <div class="village-ground"></div>
      <div class="village-path"></div>

      <!-- CSS houses for depth -->
      <div class="village-buildings">
        <div class="village-house">
          <div class="house-roof" style="border-bottom:24px solid #e88c6c;"></div>
          <div class="house-body" style="width:36px;height:28px;background:#f5d5c0;"></div>
          <div class="house-door"></div>
        </div>
        <div class="village-house">
          <div class="house-roof" style="border-bottom:30px solid #5b8dd9;"></div>
          <div class="house-body" style="width:44px;height:34px;background:#c5daf5;"></div>
          <div class="house-door"></div>
        </div>
        <div class="village-house">
          <div class="house-roof" style="border-bottom:22px solid #7cbb6e;"></div>
          <div class="house-body" style="width:32px;height:26px;background:#d4f0ce;"></div>
          <div class="house-door"></div>
        </div>
        <div class="village-house">
          <div class="house-roof" style="border-bottom:26px solid #d4884e;"></div>
          <div class="house-body" style="width:38px;height:30px;background:#fce4d0;"></div>
          <div class="house-door"></div>
        </div>
      </div>

      <!-- Characters on the ground — tap to hear from them -->
      <div class="village-characters">
        ${VILLAGERS.map(v => renderVillageChar(v)).join('')}
      </div>
    </div>

    <div style="padding:10px 18px 4px;font-size:12px;color:var(--text-light);text-align:center">
      Tap a villager to hear from them 👆
    </div>

    ${culturalLabel ? `
      <div class="find-people-card" onclick="switchCommunityTab('tips')">
        <div class="find-people-title">🌏 Find others with your food tradition</div>
        <div class="find-people-sub">Explore ${culturalLabel} tips in the community →</div>
      </div>` : ''}

    <div class="activity-feed">
      <div class="section-label" style="padding:0 0 4px">Recent activity</div>
      ${renderActivityFeed()}
    </div>`;
}

function renderVillageChar(v) {
  const isActive = activeSpeech === v.id;
  return `
    <div class="village-char" onclick="showVillageSpeech('${v.id}')">
      ${isActive ? `<div class="village-speech show">${v.speech}</div>` : `<div class="village-speech"></div>`}
      <div class="village-char-avatar" style="background:${v.bg}">${v.avatar}</div>
      <div class="village-char-name">${v.name}</div>
    </div>`;
}

function showVillageSpeech(villagerId) {
  activeSpeech = activeSpeech === villagerId ? null : villagerId;
  const charsEl = document.querySelector('.village-characters');
  if (charsEl) {
    charsEl.innerHTML = VILLAGERS.map(v => renderVillageChar(v)).join('');
  }
}

function renderActivityFeed() {
  const activities = [
    { avatar:'👩🏽', bg:'#e0f7f8', name:'Priya', action:'shared a tip about fenugreek for hormonal balance', time:'2h ago' },
    { avatar:'👨🏾', bg:'#fef7dc', name:'Joel', action:'resonated with Sarah\'s sleep tip', time:'4h ago' },
    { avatar:'👩🏿', bg:'#e8ecfc', name:'Amara', action:'posted a new tip about egusi soup nutrition', time:'6h ago' },
    { avatar:'👨🏽', bg:'#e0f7f8', name:'Ravi', action:'rated Priya\'s fenugreek tip ★★★★', time:'1d ago' },
  ];
  return activities.map(a => `
    <div class="activity-item">
      <div class="activity-avatar" style="background:${a.bg}">${a.avatar}</div>
      <div>
        <div class="activity-text"><strong>${a.name}</strong> ${a.action}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>`).join('');
}

// ===== TIPS TAB =====
function renderTipsTab() {
  const filters = ['all','hormonal','fitness','gut','energy','sleep','cultural'];
  const relevantTips = getRelevantTips();
  const filtered = tipsFilter==='all' ? relevantTips
    : tipsFilter==='cultural' ? relevantTips.filter(t => t.culturalContext===USER.culturalFood || t.category==='cultural')
    : relevantTips.filter(t => t.category===tipsFilter);
  return `
    <div class="tips-filters">
      ${filters.map(f=>`<button class="filter-pill ${tipsFilter===f?'active':''}" onclick="setTipsFilter('${f}')">${f==='all'?'All tips':f.charAt(0).toUpperCase()+f.slice(1)}</button>`).join('')}
    </div>
    <div style="padding:10px 18px 0;font-size:12px;color:var(--text-light);font-style:italic">
      ${USER.culturalFood && USER.culturalFood!=='none' ? `Showing ${getCultureLabel(USER.culturalFood)} tips first — ranked by your profile` : 'Tips ranked by what matches your health goals'}
    </div>
    <div class="tips-list">
      ${filtered.length ? filtered.map(renderFullTipCard).join('') : `<div class="empty-state"><div class="empty-state-icon">💡</div><div class="empty-state-text">No tips in this category yet.</div></div>`}
    </div>`;
}

function setTipsFilter(filter) {
  tipsFilter = filter;
  document.getElementById('community-scroll').innerHTML = renderTipsTab() + '<div style="height:20px"></div>';
}

function renderFullTipCard(tip) {
  return `
    <div class="community-tip-card">
      <div class="tip-card-author">
        <div class="tip-author-avatar" style="background:${tip.avatarBg}">${tip.avatar}</div>
        <div style="flex:1">
          <div class="tip-author-name">${tip.author}</div>
          <div class="tip-star-rating" id="stars-${tip.id}">
            ${[1,2,3,4,5].map(n=>`<span class="tip-star" onclick="rateTip('${tip.id}',${n})" style="opacity:${n<=tip.stars?1:0.3}">★</span>`).join('')}
          </div>
        </div>
        ${tip.verified?'<span class="tip-verified">✓ Verified</span>':''}
      </div>
      <div class="tip-tag">${tip.category}</div>
      <div class="tip-content">${tip.content}</div>
      <div class="tip-actions">
        <button class="tip-action-btn" id="res-${tip.id}" onclick="toggleResonance('${tip.id}')">✨ Resonates (${tip.resonances})</button>
        <button class="tip-action-btn" id="tried-${tip.id}" onclick="toggleTried('${tip.id}')">💡 Tried it (${tip.tried})</button>
      </div>
    </div>`;
}

function rateTip(tipId, rating) {
  const tip = COMMUNITY_TIPS.find(t=>t.id===tipId);
  if (tip) { tip.stars=rating; const el=document.getElementById(`stars-${tipId}`); if(el) el.innerHTML=[1,2,3,4,5].map(n=>`<span class="tip-star" onclick="rateTip('${tipId}',${n})" style="opacity:${n<=rating?1:0.3}">★</span>`).join(''); }
}
function toggleResonance(tipId) {
  const tip=COMMUNITY_TIPS.find(t=>t.id===tipId); const btn=document.getElementById(`res-${tipId}`);
  if(!tip||!btn)return;
  if(btn.classList.contains('resonated')){btn.classList.remove('resonated');tip.resonances--;}else{btn.classList.add('resonated');tip.resonances++;}
  btn.textContent=`✨ Resonates (${tip.resonances})`;
}
function toggleTried(tipId) {
  const tip=COMMUNITY_TIPS.find(t=>t.id===tipId); const btn=document.getElementById(`tried-${tipId}`);
  if(!tip||!btn)return;
  if(btn.classList.contains('tried')){btn.classList.remove('tried');tip.tried--;}else{btn.classList.add('tried');tip.tried++;}
  btn.textContent=`💡 Tried it (${tip.tried})`;
}
