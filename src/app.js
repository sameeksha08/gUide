let currentScreen = 'landing';
let previousScreen = 'home';

function navigate(screen) {
  previousScreen = currentScreen;
  currentScreen = screen;
  const screens = {
    landing: renderLanding,
    onboarding: renderOnboarding,
    home: renderHome,
    community: renderCommunity,
    journal: renderJournal,
    chat: renderChat,
    profile: renderProfile,
  };
  const renderer = screens[screen];
  if (renderer) document.getElementById('app').innerHTML = renderer();
}

// Shows a "create account" bar when user is exploring in demo mode
function renderDemoBar() {
  if (USER.name !== 'Demo') return '';
  return `
    <div class="demo-back-bar">
      <span class="demo-back-label">You're exploring gUide</span>
      <button class="demo-back-btn" onclick="navigate('landing')">← Create account</button>
    </div>`;
}

// Bottom nav — no profile tab
function renderBottomNav(active) {
  const items = [
    { id:'home', icon:'🏠', label:'Home' },
    { id:'community', icon:'🌿', label:'Village' },
    { id:'journal', icon:'📓', label:'Journal' },
    { id:'chat', icon:'✨', label:'Buddy' },
  ];
  return `
    <nav class="bottom-nav">
      ${items.map(item => `
        <button class="nav-item ${active===item.id?'active':''}" onclick="navigate('${item.id}')">
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
        </button>
      `).join('')}
    </nav>`;
}

// Instagram-style profile icon shown in screen headers
function renderProfileIcon() {
  const initial = USER.name ? USER.name.charAt(0).toUpperCase() : '👤';
  return `
    <button class="header-profile-btn" onclick="navigate('profile')" title="Your profile">
      ${initial}
    </button>`;
}

document.addEventListener('DOMContentLoaded', () => {
  navigate('landing');
});