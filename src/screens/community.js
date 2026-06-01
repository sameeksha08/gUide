let communityTab = 'village';
let tipsFilter = 'all';
let activeSpeech = null;

function renderCommunity() { return buildCommunityScreen(); }

function buildCommunityScreen() {
  return `
    <div class="screen">
      ${renderDemoBar()}
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

// ===== VILLAGE TAB =====
function renderVillageTab() {
  const culturalLabel = USER.culturalFood && USER.culturalFood !== 'none' ? getCultureLabel(USER.culturalFood) : null;
  return `
    <div style="margin:12px 14px 0;position:relative;border-radius:20px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.15)">
      ${renderVillageSVG()}
    </div>

    <div style="padding:8px 14px 2px;font-size:11px;color:var(--text-light);text-align:center">
      Tap a villager to hear from them 👆
    </div>

    ${culturalLabel ? `
      <div class="find-people-card" onclick="switchCommunityTab('tips')">
        <div class="find-people-title">🌏 Find others with your food tradition</div>
        <div class="find-people-sub">Explore ${culturalLabel} tips →</div>
      </div>` : ''}

    <div class="activity-feed">
      <div class="section-label" style="padding:0 0 4px">Recent activity</div>
      ${renderActivityFeed()}
    </div>`;
}

function renderVillageSVG() {
  // Speech bubble content per villager
  const speeches = {
    priya: VILLAGERS.find(v=>v.id==='priya')?.speech || '',
    joel: VILLAGERS.find(v=>v.id==='joel')?.speech || '',
    amara: VILLAGERS.find(v=>v.id==='amara')?.speech || '',
    ravi: VILLAGERS.find(v=>v.id==='ravi')?.speech || '',
  };

  // Avatar colours per villager
  const avatars = {
    priya: { bg: '#ffb7c5', emoji: '👩🏽' },
    joel:  { bg: '#b5d5f5', emoji: '👨🏾' },
    amara: { bg: '#ffd59e', emoji: '👩🏿' },
    ravi:  { bg: '#c5e8c5', emoji: '👨🏽' },
  };

  // Which villager is active — show speech bubble
  const active = activeSpeech;

  return `
  <svg width="100%" viewBox="0 0 360 480" role="img" style="display:block">
    <title>gUide village</title>
    <desc>Village scene with 4 interactive villagers</desc>

    <!-- Sky -->
    <rect x="0" y="0" width="360" height="480" fill="#b8e4f0"/>
    <ellipse cx="80" cy="130" rx="110" ry="60" fill="#8aba6a"/>
    <ellipse cx="240" cy="120" rx="130" ry="65" fill="#7aaa5a"/>
    <ellipse cx="340" cy="140" rx="90" ry="50" fill="#8aba6a"/>
    <ellipse cx="60" cy="40" rx="32" ry="14" fill="#fff" opacity="0.9"/>
    <ellipse cx="85" cy="33" rx="22" ry="12" fill="#fff" opacity="0.9"/>
    <ellipse cx="40" cy="37" rx="18" ry="10" fill="#fff" opacity="0.85"/>
    <ellipse cx="270" cy="50" rx="28" ry="12" fill="#fff" opacity="0.85"/>
    <ellipse cx="293" cy="43" rx="20" ry="10" fill="#fff" opacity="0.85"/>

    <!-- Ground -->
    <rect x="0" y="150" width="360" height="330" fill="#7dc45a"/>

    <!-- Sandy path loop -->
    <ellipse cx="175" cy="340" rx="130" ry="80" fill="#d4b87a"/>
    <ellipse cx="175" cy="340" rx="105" ry="60" fill="#c4a060"/>
    <ellipse cx="175" cy="340" rx="90" ry="50" fill="#7dc45a"/>

    <!-- Garden bed -->
    <rect x="140" y="312" width="70" height="46" fill="#8b5a2a" rx="4"/>
    <rect x="143" y="315" width="64" height="40" fill="#6a3e18" rx="3"/>
    <circle cx="155" cy="326" r="5" fill="#5aaa30"/>
    <circle cx="168" cy="326" r="5" fill="#e05a20"/>
    <circle cx="181" cy="326" r="5" fill="#5aaa30"/>
    <circle cx="194" cy="326" r="5" fill="#e05a20"/>
    <circle cx="155" cy="340" r="5" fill="#e05a20"/>
    <circle cx="168" cy="340" r="5" fill="#5aaa30"/>
    <circle cx="181" cy="340" r="5" fill="#e05a20"/>
    <circle cx="194" cy="340" r="5" fill="#f5c135"/>
    <rect x="138" y="310" width="74" height="6" fill="#a06828" rx="2"/>
    <rect x="138" y="352" width="74" height="6" fill="#a06828" rx="2"/>
    <rect x="138" y="310" width="6" height="48" fill="#a06828" rx="2"/>
    <rect x="206" y="310" width="6" height="48" fill="#a06828" rx="2"/>

    <!-- Table -->
    <ellipse cx="175" cy="372" rx="18" ry="10" fill="#c8905a"/>
    <rect x="158" y="362" width="34" height="12" fill="#d4a060" rx="4"/>
    <rect x="161" y="374" width="5" height="8" fill="#b07840"/>
    <rect x="185" y="374" width="5" height="8" fill="#b07840"/>
    <rect x="170" y="355" width="10" height="9" fill="#c05a30" rx="2"/>
    <circle cx="175" cy="354" r="5" fill="#5aaa30"/>

    <!-- River -->
    <path d="M280,155 Q310,200 305,260 Q300,320 290,380 Q285,420 280,480" stroke="#5ab4e0" stroke-width="28" fill="none" stroke-linecap="round"/>
    <path d="M280,155 Q310,200 305,260 Q300,320 290,380 Q285,420 280,480" stroke="#7acaf5" stroke-width="18" fill="none" stroke-linecap="round"/>
    <path d="M290,200 Q295,215 290,230" stroke="#aaddff" stroke-width="2" fill="none" opacity="0.7"/>
    <path d="M295,260 Q300,275 295,290" stroke="#aaddff" stroke-width="2" fill="none" opacity="0.7"/>
    <ellipse cx="296" cy="350" rx="8" ry="5" fill="#5aaa30" opacity="0.8"/>
    <ellipse cx="284" cy="380" rx="6" ry="4" fill="#5aaa30" opacity="0.8"/>

    <!-- Bridge -->
    <rect x="252" y="288" width="50" height="14" fill="#a06828" rx="3"/>
    <rect x="252" y="288" width="50" height="6" fill="#b87830" rx="3"/>
    <rect x="252" y="288" width="4" height="18" fill="#8b5a18" rx="1"/>
    <rect x="266" y="288" width="4" height="18" fill="#8b5a18" rx="1"/>
    <rect x="280" y="288" width="4" height="18" fill="#8b5a18" rx="1"/>
    <rect x="294" y="288" width="4" height="18" fill="#8b5a18" rx="1"/>

    <!-- House 1 red roof -->
    <rect x="18" y="170" width="64" height="50" fill="#f5dfc0" rx="3"/>
    <rect x="32" y="193" width="16" height="27" fill="#a06828" rx="2"/>
    <circle cx="45" cy="207" r="1.5" fill="#6a3e10"/>
    <rect x="20" y="179" width="14" height="12" fill="#b8e4f5" rx="1"/>
    <line x1="27" y1="179" x2="27" y2="191" stroke="#90c8e0" stroke-width="1"/>
    <line x1="20" y1="185" x2="34" y2="185" stroke="#90c8e0" stroke-width="1"/>
    <rect x="50" y="179" width="14" height="12" fill="#b8e4f5" rx="1"/>
    <line x1="57" y1="179" x2="57" y2="191" stroke="#90c8e0" stroke-width="1"/>
    <line x1="50" y1="185" x2="64" y2="185" stroke="#90c8e0" stroke-width="1"/>
    <polygon points="10,172 50,142 90,172" fill="#c84030"/>
    <polygon points="14,172 50,145 86,172" fill="#e04838"/>
    <rect x="68" y="150" width="8" height="16" fill="#b03028"/>
    <circle cx="72" cy="146" r="4" fill="#ddd" opacity="0.7"/>
    <rect x="18" y="215" width="20" height="6" fill="#8b5a2a" rx="1"/>
    <circle cx="22" cy="213" r="3" fill="#f07880"/>
    <circle cx="28" cy="212" r="3" fill="#f5c135"/>
    <circle cx="34" cy="213" r="3" fill="#f07880"/>

    <!-- House 2 gold roof -->
    <rect x="130" y="155" width="72" height="55" fill="#f0e8d4" rx="3"/>
    <rect x="148" y="180" width="18" height="30" fill="#5a8ad4" rx="2"/>
    <circle cx="163" cy="196" r="1.5" fill="#3a5a9a"/>
    <circle cx="166" cy="168" r="7" fill="#b8e4f5"/>
    <circle cx="166" cy="168" r="5" fill="#d0eef8"/>
    <line x1="166" y1="163" x2="166" y2="173" stroke="#90c8e0" stroke-width="1"/>
    <line x1="161" y1="168" x2="171" y2="168" stroke="#90c8e0" stroke-width="1"/>
    <rect x="133" y="170" width="12" height="14" fill="#b8e4f5" rx="6" ry="3"/>
    <polygon points="120,158 166,118 212,158" fill="#c89030"/>
    <polygon points="124,158 166,122 208,158" fill="#e0a840"/>
    <line x1="145" y1="140" x2="130" y2="156" stroke="#c89030" stroke-width="1" opacity="0.5"/>
    <line x1="166" y1="122" x2="150" y2="156" stroke="#c89030" stroke-width="1" opacity="0.5"/>
    <line x1="187" y1="140" x2="208" y2="156" stroke="#c89030" stroke-width="1" opacity="0.5"/>
    <rect x="153" y="208" width="20" height="4" fill="#d4b480" rx="1"/>
    <rect x="150" y="212" width="26" height="4" fill="#c8a070" rx="1"/>

    <!-- House 3 teal roof -->
    <rect x="14" y="340" width="56" height="44" fill="#e8d8c4" rx="3"/>
    <rect x="26" y="360" width="14" height="24" fill="#5a9a7a" rx="2"/>
    <circle cx="36" cy="373" r="1.5" fill="#3a6a4a"/>
    <circle cx="44" cy="358" r="7" fill="#b8e4f5"/>
    <circle cx="44" cy="358" r="5" fill="#d0eef8"/>
    <polygon points="6,342 42,310 78,342" fill="#3a7a7a"/>
    <polygon points="10,342 42,313 74,342" fill="#4a9090"/>
    <rect x="70" y="370" width="10" height="10" fill="#c05030" rx="2"/>
    <circle cx="75" cy="368" r="5" fill="#5aaa30"/>

    <!-- Fence -->
    <rect x="82" y="340" width="3" height="20" fill="#c8a060" rx="1"/>
    <rect x="90" y="340" width="3" height="20" fill="#c8a060" rx="1"/>
    <rect x="98" y="340" width="3" height="20" fill="#c8a060" rx="1"/>
    <rect x="106" y="340" width="3" height="20" fill="#c8a060" rx="1"/>
    <rect x="80" y="345" width="31" height="3" fill="#c8a060" rx="1"/>
    <rect x="80" y="354" width="31" height="3" fill="#c8a060" rx="1"/>

    <!-- Trees -->
    <rect x="96" y="188" width="6" height="22" fill="#8b5a2a"/>
    <circle cx="99" cy="175" r="16" fill="#5aaa30"/>
    <circle cx="88" cy="182" r="11" fill="#4a9a20"/>
    <circle cx="110" cy="180" r="12" fill="#4a9a20"/>
    <rect x="56" y="210" width="5" height="18" fill="#8b5a2a"/>
    <circle cx="59" cy="198" r="14" fill="#5aaa30"/>
    <circle cx="54" cy="200" r="5" fill="#e07820"/>
    <circle cx="63" cy="196" r="4" fill="#e07820"/>
    <circle cx="58" cy="207" r="4" fill="#e07820"/>
    <rect x="314" y="185" width="6" height="24" fill="#6a4a1a"/>
    <polygon points="317,152 302,188 332,188" fill="#2a6a2a"/>
    <polygon points="317,162 305,192 329,192" fill="#3a7a3a"/>
    <rect x="336" y="190" width="5" height="20" fill="#6a4a1a"/>
    <polygon points="339,160 325,192 353,192" fill="#2a6a2a"/>
    <polygon points="339,170 327,196 351,196" fill="#3a7a3a"/>
    <circle cx="242" cy="200" r="14" fill="#5aaa30"/>
    <circle cx="231" cy="206" r="10" fill="#4a9a20"/>
    <circle cx="253" cy="208" r="11" fill="#4a9a20"/>

    <!-- Flowers -->
    <circle cx="115" cy="262" r="3" fill="#f5c135"/>
    <circle cx="122" cy="268" r="2.5" fill="#f07880"/>
    <circle cx="230" cy="340" r="3" fill="#f07880"/>
    <circle cx="238" cy="346" r="2" fill="#f5c135"/>
    <circle cx="60" cy="308" r="2.5" fill="#f5c135"/>

    <!-- Clothesline -->
    <rect x="110" y="408" width="3" height="28" fill="#a06828"/>
    <rect x="148" y="408" width="3" height="28" fill="#a06828"/>
    <line x1="111" y1="410" x2="149" y2="410" stroke="#888" stroke-width="1"/>
    <rect x="116" y="410" width="10" height="14" fill="#c8a0d0" rx="1"/>
    <rect x="130" y="410" width="12" height="12" fill="#f5c135" rx="1"/>

    <!-- Dock -->
    <rect x="225" y="386" width="50" height="7" fill="#c8905a" rx="2"/>
    <rect x="228" y="388" width="5" height="14" fill="#a06828" rx="1"/>
    <rect x="240" y="388" width="5" height="14" fill="#a06828" rx="1"/>
    <rect x="252" y="388" width="5" height="14" fill="#a06828" rx="1"/>
    <rect x="264" y="388" width="5" height="14" fill="#a06828" rx="1"/>

    <!-- Foreground grass -->
    <rect x="0" y="458" width="360" height="22" fill="#6aab4e"/>
    <rect x="0" y="468" width="360" height="12" fill="#5a9a3e"/>

    <!-- =============================== -->
    <!-- CHAR 1 — PRIYA — watering garden -->
    <g id="char-priya" onclick="toggleVillagerSpeech('priya')" style="cursor:pointer">
      <rect x="100" y="286" width="14" height="18" fill="#f0a060" rx="3"/>
      <rect x="100" y="302" width="5" height="12" fill="#4a6aaa" rx="2"/>
      <rect x="109" y="302" width="5" height="12" fill="#4a6aaa" rx="2"/>
      <rect x="86" y="289" width="14" height="5" fill="#f5c0a0" rx="2"/>
      <rect x="74" y="284" width="13" height="10" fill="#5a9ad0" rx="2"/>
      <line x1="74" y1="288" x2="66" y2="295" stroke="#5a9ad0" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="63" cy="298" r="1.5" fill="#7acaf5"/>
      <circle cx="60" cy="302" r="1" fill="#7acaf5"/>
      <ellipse cx="107" cy="315" rx="9" ry="3" fill="#5a9a3a" opacity="0.25"/>
      <!-- Avatar head — Priya -->
      <circle cx="107" cy="281" r="13" fill="${avatars.priya.bg}" stroke="#fff" stroke-width="2"/>
      <text x="107" y="286" text-anchor="middle" font-size="13" dominant-baseline="middle">${avatars.priya.emoji}</text>
      <!-- Active ring -->
      ${active==='priya' ? `<circle cx="107" cy="281" r="15" fill="none" stroke="#0ea5b0" stroke-width="2.5"/>` : ''}
      <!-- Speech bubble -->
      ${active==='priya' ? `
        <rect x="36" y="246" width="120" height="28" fill="white" rx="8" stroke="#e0d8c8" stroke-width="1"/>
        <polygon points="107,274 100,274 107,281" fill="white" stroke="#e0d8c8" stroke-width="1"/>
        <text x="96" y="256" text-anchor="middle" font-size="7.5" fill="#1035a8" font-weight="600">Methi water changed</text>
        <text x="96" y="266" text-anchor="middle" font-size="7.5" fill="#1035a8">my cycle — 42 resonates! 💛</text>
      ` : ''}
    </g>

    <!-- =============================== -->
    <!-- CHAR 2 — JOEL — carrying basket -->
    <g id="char-joel" onclick="toggleVillagerSpeech('joel')" style="cursor:pointer">
      <rect x="158" y="236" width="14" height="18" fill="#e8c040" rx="3"/>
      <rect x="159" y="241" width="12" height="12" fill="#f0e0a0" rx="1"/>
      <rect x="158" y="252" width="5" height="12" fill="#4a4a7a" rx="2"/>
      <rect x="167" y="252" width="5" height="12" fill="#4a4a7a" rx="2"/>
      <rect x="148" y="240" width="10" height="5" fill="#f5c0a0" rx="2"/>
      <rect x="172" y="240" width="10" height="5" fill="#f5c0a0" rx="2"/>
      <rect x="151" y="229" width="28" height="16" fill="#a06828" rx="3"/>
      <rect x="153" y="231" width="24" height="11" fill="#b87830" rx="2"/>
      <circle cx="158" cy="232" r="3.5" fill="#e05a20"/>
      <circle cx="166" cy="231" r="3" fill="#5aaa30"/>
      <circle cx="173" cy="232" r="3.5" fill="#f5c135"/>
      <ellipse cx="165" cy="265" rx="9" ry="3" fill="#5a9a3a" opacity="0.25"/>
      <!-- Avatar head — Joel -->
      <circle cx="165" cy="223" r="13" fill="${avatars.joel.bg}" stroke="#fff" stroke-width="2"/>
      <text x="165" y="228" text-anchor="middle" font-size="13" dominant-baseline="middle">${avatars.joel.emoji}</text>
      ${active==='joel' ? `<circle cx="165" cy="223" r="15" fill="none" stroke="#0ea5b0" stroke-width="2.5"/>` : ''}
      ${active==='joel' ? `
        <rect x="90" y="188" width="124" height="28" fill="white" rx="8" stroke="#e0d8c8" stroke-width="1"/>
        <polygon points="165,216 158,216 165,223" fill="white" stroke="#e0d8c8" stroke-width="1"/>
        <text x="152" y="198" text-anchor="middle" font-size="7.5" fill="#1035a8" font-weight="600">Zone 2 cardio dropped my</text>
        <text x="152" y="208" text-anchor="middle" font-size="7.5" fill="#1035a8">resting HR 8bpm in 2 months!</text>
      ` : ''}
    </g>

    <!-- =============================== -->
    <!-- CHAR 3 — AMARA — sitting on dock -->
    <g id="char-amara" onclick="toggleVillagerSpeech('amara')" style="cursor:pointer">
      <rect x="236" y="372" width="14" height="15" fill="#f0c060" rx="3"/>
      <rect x="236" y="385" width="5" height="12" fill="#5a5a9a" rx="2" transform="rotate(15,239,390)"/>
      <rect x="245" y="385" width="5" height="12" fill="#5a5a9a" rx="2" transform="rotate(-15,248,390)"/>
      <ellipse cx="237" cy="398" rx="4" ry="2.5" fill="#a06828"/>
      <ellipse cx="249" cy="397" rx="4" ry="2.5" fill="#a06828"/>
      <rect x="250" y="374" width="12" height="4" fill="#f5c0a0" rx="2"/>
      <ellipse cx="243" cy="398" rx="9" ry="3" fill="#5a7a9a" opacity="0.2"/>
      <!-- Avatar head — Amara -->
      <circle cx="243" cy="361" r="13" fill="${avatars.amara.bg}" stroke="#fff" stroke-width="2"/>
      <text x="243" y="366" text-anchor="middle" font-size="13" dominant-baseline="middle">${avatars.amara.emoji}</text>
      ${active==='amara' ? `<circle cx="243" cy="361" r="15" fill="none" stroke="#0ea5b0" stroke-width="2.5"/>` : ''}
      ${active==='amara' ? `
        <rect x="150" y="324" width="128" height="30" fill="white" rx="8" stroke="#e0d8c8" stroke-width="1"/>
        <polygon points="243,354 236,354 243,361" fill="white" stroke="#e0d8c8" stroke-width="1"/>
        <text x="214" y="334" text-anchor="middle" font-size="7.5" fill="#1035a8" font-weight="600">Egusi soup — iron, protein,</text>
        <text x="214" y="344" text-anchor="middle" font-size="7.5" fill="#1035a8">healthy fats. Try it! 🌍</text>
      ` : ''}
    </g>

    <!-- =============================== -->
    <!-- CHAR 4 — RAVI — walking dog -->
    <g id="char-ravi" onclick="toggleVillagerSpeech('ravi')" style="cursor:pointer">
      <rect x="52" y="390" width="14" height="18" fill="#8ab050" rx="3"/>
      <rect x="52" y="406" width="5" height="12" fill="#4a7030" rx="2" transform="rotate(-10,55,408)"/>
      <rect x="61" y="406" width="5" height="12" fill="#4a7030" rx="2" transform="rotate(10,64,408)"/>
      <rect x="66" y="393" width="14" height="4" fill="#f5c0a0" rx="2"/>
      <path d="M80,395 Q90,398 96,405" stroke="#888" stroke-width="1.5" fill="none"/>
      <rect x="90" y="402" width="20" height="12" fill="#c8905a" rx="5"/>
      <circle cx="106" cy="401" r="7" fill="#d4a060"/>
      <ellipse cx="101" cy="396" rx="4" ry="6" fill="#b07840" transform="rotate(-20,101,396)"/>
      <ellipse cx="111" cy="396" rx="4" ry="6" fill="#b07840" transform="rotate(20,111,396)"/>
      <path d="M90,406 Q82,398 85,392" stroke="#c8905a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <rect x="93" y="413" width="4" height="7" fill="#b07840" rx="2"/>
      <rect x="100" y="413" width="4" height="7" fill="#b07840" rx="2"/>
      <ellipse cx="59" cy="420" rx="9" ry="3" fill="#5a9a3a" opacity="0.25"/>
      <!-- Avatar head — Ravi -->
      <circle cx="59" cy="379" r="13" fill="${avatars.ravi.bg}" stroke="#fff" stroke-width="2"/>
      <text x="59" y="384" text-anchor="middle" font-size="13" dominant-baseline="middle">${avatars.ravi.emoji}</text>
      ${active==='ravi' ? `<circle cx="59" cy="379" r="15" fill="none" stroke="#0ea5b0" stroke-width="2.5"/>` : ''}
      ${active==='ravi' ? `
        <rect x="14" y="342" width="124" height="30" fill="white" rx="8" stroke="#e0d8c8" stroke-width="1"/>
        <polygon points="59,372 52,372 59,379" fill="white" stroke="#e0d8c8" stroke-width="1"/>
        <text x="76" y="352" text-anchor="middle" font-size="7.5" fill="#1035a8" font-weight="600">Hing in dal stopped my</text>
        <text x="76" y="362" text-anchor="middle" font-size="7.5" fill="#1035a8">bloating within a week! 🌿</text>
      ` : ''}
    </g>

  </svg>`;
}

function toggleVillagerSpeech(villagerId) {
  activeSpeech = activeSpeech === villagerId ? null : villagerId;
  const villageWrap = document.querySelector('#community-scroll > div:first-child');
  if (villageWrap) {
    villageWrap.innerHTML = renderVillageSVG();
  }
}

function renderActivityFeed() {
  const activities = [
    {avatar:'👩🏽',bg:'#ffb7c5',name:'Priya',action:'shared a tip about fenugreek for hormonal balance',time:'2h ago'},
    {avatar:'👨🏾',bg:'#b5d5f5',name:'Joel',action:'resonated with Sarah\'s sleep tip',time:'4h ago'},
    {avatar:'👩🏿',bg:'#ffd59e',name:'Amara',action:'posted a new tip about egusi soup nutrition',time:'6h ago'},
    {avatar:'👨🏽',bg:'#c5e8c5',name:'Ravi',action:'rated Priya\'s fenugreek tip ★★★★',time:'1d ago'},
  ];
  return activities.map(a=>`
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
      <button style="position:absolute;top:12px;right:14px;background:var(--cream-dark);border-radius:50%;width:28px;height:28px;font-size:13px;color:var(--text-mid);display:flex;align-items:center;justify-content:center;cursor:pointer;border:none" onclick="this.closest('.modal-overlay').remove()">✕</button>
      <div class="add-tip-title">Share a tip 💡</div>
      <div class="add-tip-sub">What's worked for you? The community learns from real experience.</div>
      <textarea class="tip-textarea" id="new-tip-text" placeholder="Share something that's genuinely helped you — be specific. What did you try, how long, what changed?" rows="4"></textarea>
      <div style="font-size:11px;font-weight:700;color:var(--text-mid);margin-top:12px;margin-bottom:6px">Category</div>
      <div class="tip-category-row">
        ${categories.map(c=>`<button class="tip-cat-chip" data-cat="${c}" onclick="selectTipCat(this)">${c.charAt(0).toUpperCase()+c.slice(1)}</button>`).join('')}
      </div>
      <button onclick="submitTip()" style="width:100%;padding:13px;background:var(--navy);color:var(--white);font-size:13px;font-weight:700;border-radius:var(--radius-md);margin-top:14px;font-family:var(--font-body);cursor:pointer;border:none">Post tip</button>
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
  COMMUNITY_TIPS.unshift({
    id:'t'+Date.now(), author:USER.name||'You', avatar:'🧑',
    avatarBg:'#e0f7f8', verified:false, category:cat,
    culturalContext:USER.culturalFood||null, content:text,
    stars:0, resonances:0, tried:0,
  });
  USER.tipsPosted = (USER.tipsPosted||0)+1;
  document.querySelector('.modal-overlay')?.remove();
  document.getElementById('app').innerHTML = buildCommunityScreen();
}

function rateTip(tipId,rating) {
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