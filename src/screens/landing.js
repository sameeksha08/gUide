function renderLanding() {
  return `
    <div class="screen landing-screen">
      <div class="landing-scroll">

        <!-- HERO -->
        <div class="landing-hero">
          <div class="landing-hero-inner">
            <div class="landing-logo">gUide</div>
            <div class="landing-tagline">Your lifelong health companion</div>
            <button class="landing-cta-btn" onclick="navigate('onboarding')">Get started — it's free</button>
            <button class="landing-skip-btn" onclick="skipToDemo()">Explore first →</button>
          </div>
        </div>

        <!-- WHAT IS GUIDE -->
        <div class="landing-section">
          <div class="landing-section-eyebrow">What is gUide?</div>
          <div class="landing-section-heading">Health advice that actually fits <em>your</em> life.</div>
          <div class="landing-section-body">
            gUide brings together your nutrition, cycle, fitness, and cultural food traditions
            into one personalised companion — not a generic plan built for someone else.
          </div>
        </div>

        <!-- DIVIDER -->
        <div class="landing-divider"></div>

        <!-- HOW IT WORKS -->
        <div class="landing-section">
          <div class="landing-section-eyebrow">How it works</div>
          <div class="landing-steps">

            <div class="landing-step">
              <div class="landing-step-num">01</div>
              <div class="landing-step-content">
                <div class="landing-step-title">Tell us about you</div>
                <div class="landing-step-desc">Answer a few real questions — your goals, your cultural background, how you eat, how you feel. No generic tick-boxes.</div>
              </div>
            </div>

            <div class="landing-step">
              <div class="landing-step-num">02</div>
              <div class="landing-step-content">
                <div class="landing-step-title">Connect your apps</div>
                <div class="landing-step-desc">Link Apple Health, Flo, MyFitnessPal and more. gUide reads your data so your home screen reflects how you actually are today.</div>
              </div>
            </div>

            <div class="landing-step">
              <div class="landing-step-num">03</div>
              <div class="landing-step-content">
                <div class="landing-step-title">Get insights made for you</div>
                <div class="landing-step-desc">Meal suggestions based on your cycle phase and energy. Community tips filtered by your goals. A buddy who knows your story.</div>
              </div>
            </div>

          </div>
        </div>

        <!-- PARTNER FOOTER -->
        <div class="landing-partner-bar">
          <div class="landing-partner-label">In partnership with</div>
          <div class="sanitarium-badge">
            <div class="sanitarium-cross">✚</div>
            <div class="sanitarium-text">
              <div class="sanitarium-name">SANITARIUM</div>
              <div class="sanitarium-sub">Health & Wellbeing</div>
            </div>
          </div>
        </div>

        <!-- FINAL CTA -->
        <div class="landing-final-cta">
          <button class="btn-primary" onclick="navigate('onboarding')">Build my profile →</button>
        </div>

        <div style="height:32px"></div>
      </div>
    </div>
  `;
}

function skipToDemo() {
  USER.name = 'Demo';
  USER.goals = ['energy', 'hormonal'];
  USER.gender = 'woman';
  USER.cycleTracking = 'yes';
  USER.culturalFood = 'south_asian';
  USER.cuisines = ['south_asian', 'mediterranean'];
  USER.dietStyle = 'vegetarian';
  USER.proteinScore = 2;
  USER.fitnessGoals = ['general_fitness'];
  USER.activityLevel = 'moderate';
  USER.sleepQuality = 3;
  USER.stressLevel = 3;
  USER.cookingFrequency = 'most_days';
  USER.conditions = ['pcos'];
  USER.connectedApps = ['apple_health', 'flo'];
  USER.communityRole = 'reader';
  populateTodayData();
  navigate('home');
}
