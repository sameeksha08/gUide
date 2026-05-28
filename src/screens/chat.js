let chatMessages = [];
let chatInited = false;

function renderChat() {
  if (!chatInited) {
    chatInited = true;
    const phase = USER.today.phase || USER.cyclePhase;
    const name = USER.name || 'there';
    let greeting = `Hey ${name}! `;
    if (phase) greeting += `You're in your ${phase} phase right now — I can help with meals, energy, or answer anything about what's going on in your body. What's on your mind?`;
    else if (USER.goals.length) greeting += `I can see your main goals are ${USER.goals.slice(0,2).map(g=>getGoalLabel(g)).join(' and ')}. What can I help you with today?`;
    else greeting += `Ask me anything — nutrition, cycle health, sleep, fitness, or cultural food. I'm here.`;
    chatMessages = [{ role:'guide', text:greeting, time:'Just now' }];
  }

  const phase = USER.today.phase;
  const quickChips = [
    phase==='menstrual' ? '🩸 What to eat on my period' : null,
    phase==='ovulation' ? '🌸 Ovulation meal ideas' : null,
    USER.today.sleepHours !== null && USER.today.sleepHours < 7 ? '😴 I\'m tired today' : null,
    USER.goals.includes('hormonal') ? '🌀 Hormone-friendly meals' : null,
    USER.culturalFood && USER.culturalFood!=='none' ? `🌏 ${getCultureLabel(USER.culturalFood)} meals` : null,
    '💪 Plant protein ideas',
    '🧠 Mood & food connection',
    '💧 Hydration tips',
  ].filter(Boolean).slice(0, 4);

  return `
    <div class="screen chat-screen-wrap">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-title">
          <img src="ai chat 3.png" style="width:44px;height:44px;border-radius:50%;object-fit:cover">
          <div>
            <div class="chat-name">Your Buddy</div>
            <div class="chat-status">Ask me anything about your health</div>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div class="chat-body">
        <div class="chat-messages" id="chat-msgs">
          ${chatMessages.map(renderMessage).join('')}
        </div>

        <!-- Quick chips -->
        <div class="quick-chips">
          ${quickChips.map(chip=>`<button class="quick-chip" onclick="sendQuickChip(this)">${chip}</button>`).join('')}
        </div>

        <!-- Input -->
        <div class="chat-input-area">
          <input class="chat-input" id="chat-input" type="text" placeholder="Ask your buddy anything..." onkeydown="if(event.key==='Enter') sendChatMessage()" />
          <button class="chat-send-btn" onclick="sendChatMessage()">→</button>
        </div>
      </div>

      <!-- Bottom nav stays visible -->
      ${renderBottomNav('chat')}
    </div>`;
}

function renderMessage(msg) {
  const isGuide = msg.role==='guide';
  return `
    <div class="message ${isGuide?'guide':'user'}">
      <div class="message-bubble">${msg.text}</div>
      <div class="message-time">${msg.time}</div>
      ${msg.journalChip ? `<div class="journal-chip" onclick="saveToJournal('${msg.text.replace(/'/g,"\\'").replace(/\n/g,' ')}')">📓 Save this to my journal</div>` : ''}
    </div>`;
}

function sendQuickChip(btn) { handleChat(btn.textContent); }

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input?.value?.trim();
  if (!text) return;
  input.value = '';
  handleChat(text);
}

function handleChat(text) {
  const now = new Date().toLocaleTimeString('en-AU',{hour:'2-digit',minute:'2-digit'});
  chatMessages.push({role:'user',text,time:now});
  const reply = generateReply(text);
  const isEmotional = /tired|exhausted|anxious|stressed|sad|low|feeling|struggling|hard day|overwhelmed/.test(text.toLowerCase());
  refreshChatMessages();
  setTimeout(()=>{
    chatMessages.push({role:'guide',text:reply,time:now,journalChip:isEmotional});
    refreshChatMessages();
  },700);
}

function refreshChatMessages() {
  const el = document.getElementById('chat-msgs');
  if (el) { el.innerHTML = chatMessages.map(renderMessage).join(''); el.scrollTop = el.scrollHeight; }
}

function generateReply(text) {
  const lower = text.toLowerCase();
  const phase = USER.today.phase || USER.cyclePhase;
  const cultural = USER.culturalFood;

  if (/tired|exhausted|no energy/.test(lower)) {
    const sleep = USER.today.sleepHours;
    let r = `Fatigue usually has a nutritional reason. `;
    if (sleep && sleep < 7) r += `You only got ${sleep}h sleep, which is a big part of it. `;
    if (phase==='luteal') r += `You're also in your luteal phase, which drains energy. `;
    r += `Try iron-rich plant foods today — spinach, lentils, tofu with vitamin C. The Crush It shake from Sanitarium is also a quick energy + protein hit if you need something fast.`;
    return r;
  }
  if (/period|menstrual|cramps/.test(lower)) {
    return `During your period, your body loses iron — focus on iron-rich plant foods. Spinach, lentils, tofu and edamame are all great. Pair them with vitamin C (tomatoes, capsicum, lemon) to boost absorption. Anti-inflammatory foods like turmeric and ginger can help with cramps. Warm meals tend to feel better than cold right now.${cultural&&cultural!=='none'?` I've got ${getCultureLabel(cultural)} recipes on your home screen that would work well.`:''}`;
  }
  if (/protein|muscle|strength|gym|workout/.test(lower)) {
    const score = USER.proteinScore;
    if (score && score < 3) return `You mentioned during setup that protein is something you struggle with. For plant-based eating, aim to combine sources — lentils + rice, tofu + edamame, yoghurt + seeds. The Sanitarium Vegie Delights range is also a really easy way to add protein to a meal without much thinking. The Crush It shake gives 30g plant protein if you need a quick hit.`;
    return `For your fitness goals, plant protein is totally workable — you just need more variety than meat-eaters. Tofu, tempeh, lentils, chickpeas, edamame, Greek yoghurt, and eggs all stack up. Sanitarium Vegie Delights are great for easy weeknight meals.`;
  }
  if (/sleep|insomnia/.test(lower)) {
    return `Sleep is the biggest lever for health. ${USER.today.sleepHours?`You got ${USER.today.sleepHours}h last night. `:''}Nutritionally: magnesium before bed (pumpkin seeds, dark chocolate), tart cherries have real melatonin evidence, and avoid big meals within 2 hours of sleeping. Consistent wake time matters more than anything.`;
  }
  if (/hormone|pcos|endometriosis/.test(lower)) {
    if (USER.conditions.includes('pcos')) return `For PCOS, insulin resistance is often the root cause — so low-GI foods, less refined carbs, and getting enough plant protein and fibre are the most evidence-based changes. Inositol (found in legumes and wholegrains) and omega-3s have solid research too. All the meals on your home screen are already designed to support this.`;
    return `Hormonal balance is influenced hugely by nutrition: blood sugar stability (protein with every meal), gut health (your gut processes oestrogen), omega-3 fats, and minerals like zinc and magnesium. All the meals suggested on your home screen support this.`;
  }
  if (/sanitarium|vegie delights|crush it/.test(lower)) {
    return `Sanitarium has been making plant-based food in Australia since 1898 — they're actually one of the OGs of plant protein here. Vegie Delights are their meat-alternative range — sausages, burgers, mince. Great for easy weeknight protein. The Crush It shake is their high-protein meal replacement — 30g plant protein per serve, designed to genuinely crush hunger. Check your home screen for recipe ideas using both!`;
  }
  return `That's a great one to dig into. Based on your profile — ${USER.goals.slice(0,2).map(g=>getGoalLabel(g)).join(', ')}${phase?`, ${phase} phase`:''}${cultural&&cultural!=='none'?`, ${getCultureLabel(cultural)} food tradition`:''} — your home screen recommendations are the best starting point. Is there something more specific I can help you with?`;
}

function saveToJournal(text) {
  USER.journalEntries.push({
    date: new Date().toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'}),
    text: `[From chat] ${text.slice(0,200)}`,
    mood: null,
  });
  document.querySelectorAll('.journal-chip').forEach(c=>{c.textContent='✓ Saved to journal';c.style.background='#e0f7f8';c.style.color='var(--teal)';});
}
