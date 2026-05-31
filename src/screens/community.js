let communityTab = 'village';
let tipsFilter = 'all';
let activeSpeech = null;

function renderCommunity() { return buildCommunityScreen(); }

function buildCommunityScreen() {
  return `
    <div class="screen">
      <div class="community-header">
        <div class="community-header-row">
          <div class="community-title">Village 🌿</div>
          ${renderProfileIcon()}
        </div>
        <div class="tab-bar">
          <button class="tab-btn ${communityTab==='village'?'active':''}" onclick="switchCommunityTab('village')">🌿 Village</button>
          <button class="tab-btn ${communityTab==='tips'?'active':''}" onclick="switchCommunityTab('tips')">💡 Tips</button>
        </div>
      </div>
      <div class="screen-scroll" id="community-scroll">
        ${communityTab==='village' ? renderVillageTab() : renderTipsTab()}
        <div style="height:16px"></div>
      </div>
      ${renderBottomNav('community')}
    </div>`;
}

function switchCommunityTab(tab) {
  communityTab = tab; activeSpeech = null;
  document.getElementById('app').innerHTML = buildCommunityScreen();
}

function renderVillageTab() {
  const culturalLabel = USER.culturalFood&&USER.culturalFood!=='none' ? getCultureLabel(USER.culturalFood) : null;
  return `
    <div class="village-scene">
      <div class="village-bg-placeholder">
        <div class="village-bg-placeholder-label">🖼 Drop your village background image here</div>
      </div>
      <div class="village-ground"></div>
      <div class="village-path"></div>
      <div class="village-buildings">
        <div class="village-house"><div class="house-roof" style="border-bottom:22px solid #e88c6c"></div><div class="house-body" style="width:34px;height:26px;background:#f5d5c0"></div><div class="house-door"></div></div>
        <div class="village-house"><div class="house-roof" style="border-bottom:28px solid #5b8dd9"></div><div class="house-body" style="width:42px;height:32px;background:#c5daf5"></div><div class="house-door"></div></div>
        <div class="village-house"><div class="house-roof" style="border-bottom:20px solid #7cbb6e"></div><div class="house-body" style="width:30px;height:24px;background:#d4f0ce"></div><div class="house-door"></div></div>
        <div class="village-house"><div class="house-roof" style="border-bottom:24px solid #d4884e"></div><div class="house-body" style="width:36px;height:28px;background:#fce4d0"></div><div class="house-door"></div></div>
      </div>
      <div class="village-characters">
        ${VILLAGERS.map(v=>renderVillageChar(v)).join('')}
      </div>
    </div>
    <div style="padding:8px 14px 2px;font-size:11px;color:var(--text-light);text-align:center">Tap a villager to hear from them 👆</div>
    ${culturalLabel?`<div class="find-people-card" onclick="switchCommunityTab('tips')"><div class="find-people-title">🌏 Find others with your food tradition</div><div class="find-people-sub">Explore ${culturalLabel} tips →</div></div>`:''}
    <div class="activity-feed">
      <div class="section-label" style="padding:0 0 4px">Recent activity</div>
      ${renderActivityFeed()}
    </div>`;
}

function renderVillageChar(v) {
  const isActive = activeSpeech===v.id;
  return `
    <div class="village-char" onclick="showVillageSpeech('${v.id}')">
      ${isActive?`<div class="village-speech show">${v.speech}</div>`:`<div class="village-speech"></div>`}
      <div class="village-char-avatar" style="background:${v.bg}">${v.avatar}</div>
      <div class="village-char-name">${v.name}</div>
    </div>`;
}

function showVillageSpeech(id) {
  activeSpeech = activeSpeech===id ? null : id;
  const el = document.querySelector('.village-characters');
  if (el) el.innerHTML = VILLAGERS.map(v=>renderVillageChar(v)).join('');
}

function renderActivityFeed() {
  const activities = [
    {avatar:'👩🏽',bg:'#e0f7f8',name:'Priya',action:'shared a tip about fenugreek for hormonal balance',time:'2h ago'},
    {avatar:'👨🏾',bg:'#fef7dc',name:'Joel',action:'resonated with Sarah\'s sleep tip',time:'4h ago'},
    {avatar:'👩🏿',bg:'#e8ecfc',name:'Amara',action:'posted a new tip about egusi soup nutrition',time:'6h ago'},
    {avatar:'👨🏽',bg:'#e0f7f8',name:'Ravi',action:'rated Priya\'s fenugreek tip ★★★★',time:'1d ago'},
  ];
  return activities.map(a=>`<div class="activity-item"><div class="activity-avatar" style="background:${a.bg}">${a.avatar}</div><div><div class="activity-text"><strong>${a.name}</strong> ${a.action}</div><div class="activity-time">${a.time}</div></div></div>`).join('');
}

function renderTipsTab() {
  const filters = ['all','hormonal','fitness','gut','energy','sleep','cultural'];
  const relevantTips = getRelevantTips();
  const filtered = tipsFilter==='all' ? relevantTips
    : tipsFilter==='cultural' ? relevantTips.filter(t=>t.culturalContext===USER.culturalFood||t.category==='cultural')
    : relevantTips.filter(t=>t.category===tipsFilter);
  return `
    <div class="tips-filters">
      ${filters.map(f=>`<button class="filter-pill ${tipsFilter===f?'active':''}" onclick="setTipsFilter('${f}')">${f==='all'?'All tips':f.charAt(0).toUpperCase()+f.slice(1)}</button>`).join('')}
    </div>
    <button class="add-tip-btn" onclick="showAddTipModal()">✏️ Share a tip with the community</button>
    <div style="padding:8px 14px 0;font-size:11px;color:var(--text-light);font-style:italic">
      ${USER.culturalFood&&USER.culturalFood!=='none'?`Showing ${getCultureLabel(USER.culturalFood)} tips first`:'Tips ranked by your health goals'}
    </div>
    <div class="tips-list">
      ${filtered.length ? filtered.map(renderFullTipCard).join('') : `<div class="empty-state"><div class="empty-state-icon">💡</div><div class="empty-state-text">No tips in this category yet. Be the first!</div></div>`}
    </div>`;
}

function setTipsFilter(filter) {
  tipsFilter = filter;
  document.getElementById('community-scroll').innerHTML = renderTipsTab()+'<div style="height:16px"></div>';
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

function showAddTipModal() {
  const categories = ['hormonal','fitness','gut','energy','sleep','cultural','mental'];
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.onclick = (e)=>{ if(e.target===overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="add-tip-form">
      <button style="position:absolute;top:12px;right:14px;background:var(--cream-dark);border-radius:50%;width:28px;height:28px;font-size:13px;color:var(--text-mid);display:flex;align-items:center;justify-content:center;cursor:pointer" onclick="this.closest('.modal-overlay').remove()">✕</button>
      <div class="add-tip-title">Share a tip 💡</div>
      <div class="add-tip-sub">What's worked for you? The community learns from real experience.</div>
      <textarea class="tip-textarea" id="new-tip-text" placeholder="Share something that's genuinely helped you — be specific. What did you try, how long did it take, what changed?" rows="4"></textarea>
      <div style="font-size:11px;font-weight:700;color:var(--text-mid);margin-top:12px;margin-bottom:6px">Category</div>
      <div class="tip-category-row">
        ${categories.map(c=>`<button class="tip-cat-chip" data-cat="${c}" onclick="selectTipCat(this)">${c.charAt(0).toUpperCase()+c.slice(1)}</button>`).join('')}
      </div>
      <button onclick="submitTip()" style="width:100%;padding:13px;background:var(--navy);color:var(--white);font-size:13px;font-weight:700;border-radius:var(--radius-md);margin-top:14px;font-family:var(--font-body);cursor:pointer">Post tip</button>
    </div>`;
  document.getElementById('app').appendChild(overlay);
}

function selectTipCat(btn) {
  document.querySelectorAll('.tip-cat-chip').forEach(c=>c.classList.remove('selected'));
  btn.classList.add('selected');
}

function submitTip() {
  const text = document.getElementById('new-tip-text')?.value?.trim();
  const cat = document.querySelector('.tip-cat-chip.selected')?.dataset.cat || 'general';
  if (!text || text.length < 20) {
    alert('Please write at least a sentence — the more detail the better!');
    return;
  }
  const newTip = {
    id: 't' + Date.now(),
    author: USER.name || 'You',
    avatar: '🧑',
    avatarBg: '#e0f7f8',
    verified: false,
    category: cat,
    culturalContext: USER.culturalFood || null,
    content: text,
    stars: 0,
    resonances: 0,
    tried: 0,
  };
  COMMUNITY_TIPS.unshift(newTip);
  USER.tipsPosted = (USER.tipsPosted||0) + 1;
  document.querySelector('.modal-overlay')?.remove();
  document.getElementById('app').innerHTML = buildCommunityScreen();
}

function rateTip(tipId, rating) {
  const tip=COMMUNITY_TIPS.find(t=>t.id===tipId);
  if(tip){tip.stars=rating;const el=document.getElementById(`stars-${tipId}`);if(el)el.innerHTML=[1,2,3,4,5].map(n=>`<span class="tip-star" onclick="rateTip('${tipId}',${n})" style="opacity:${n<=rating?1:0.3}">★</span>`).join('');}
}
function toggleResonance(tipId) {
  const tip=COMMUNITY_TIPS.find(t=>t.id===tipId);const btn=document.getElementById(`res-${tipId}`);
  if(!tip||!btn)return;
  if(btn.classList.contains('resonated')){btn.classList.remove('resonated');tip.resonances--;}else{btn.classList.add('resonated');tip.resonances++;}
  btn.textContent=`✨ Resonates (${tip.resonances})`;
}
function toggleTried(tipId) {
  const tip=COMMUNITY_TIPS.find(t=>t.id===tipId);const btn=document.getElementById(`tried-${tipId}`);
  if(!tip||!btn)return;
  if(btn.classList.contains('tried')){btn.classList.remove('tried');tip.tried--;}else{btn.classList.add('tried');tip.tried++;}
  btn.textContent=`💡 Tried it (${tip.tried})`;
}