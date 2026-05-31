let currentScreen = 'landing';

function navigate(screen) {
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