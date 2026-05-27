// ===== ROUTER =====
let currentScreen = 'landing';

function navigate(screen) {
  currentScreen = screen;

  // Reset chat when navigating away
  if (screen !== 'chat') {
    // Keep chat state
  }

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
  if (renderer) {
    document.getElementById('app').innerHTML = renderer();
  }
}

function renderBottomNav(active) {
  const items = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'community', icon: '🌿', label: 'Village' },
    { id: 'journal', icon: '📓', label: 'Journal' },
    { id: 'chat', icon: '✨', label: 'gUide' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];
  return `
    <nav class="bottom-nav">
      ${items.map(item => `
        <button class="nav-item ${active === item.id ? 'active' : ''}" onclick="navigate('${item.id}')">
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  navigate('landing');
});
