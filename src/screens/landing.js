function renderLanding() {
  const isDemo = USER.name === 'Demo';
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
            Yes, there are a lot of apps that track your health — but gUide does it all for you,
            in one convenient spot. Your nutrition, cycle, fitness, sleep, and cultural food traditions,
            brought together and turned into something actually useful.
          </div>
        </div>

        <!-- HOW IT WORKS -->
        <div class="landing-section" style="padding-top:0">
          <div class="landing-section-eyebrow">How it works</div>
          <div class="landing-steps">
            <div class="landing-step">
              <div class="landing-step-num">01</div>
              <div>
                <div class="landing-step-title">Tell us about you</div>
                <div class="landing-step-desc">Real questions about your goals, background, how you eat, how you feel. Every answer shapes what comes next.</div>
              </div>
            </div>
            <div class="landing-step">
              <div class="landing-step-num">02</div>
              <div>
                <div class="landing-step-title">Connect your apps</div>
                <div class="landing-step-desc">Link Apple Health, Flo, MyFitnessPal and more. gUide reads your data so your home screen reflects today.</div>
              </div>
            </div>
            <div class="landing-step">
              <div class="landing-step-num">03</div>
              <div>
                <div class="landing-step-title">Discover what works for you</div>
                <div class="landing-step-desc">Meal suggestions, community wisdom, and a buddy — guiding your self-discovery of health that's truly yours.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- SANITARIUM PARTNER -->
        <div class="landing-partner-bar">
          <a href="https://www.sanitarium.com" target="_blank" class="sanitarium-logo-placeholder" title="Visit Sanitarium">
            <img src="LOGO.png" style="width:130px;height:44px;object-fit:contain">
          </a>
        </div>

        <!-- FINAL CTA + back button if exploring -->
        ${isDemo ? `
          <div class="explore-back-bar">
            <button class="explore-back-btn" onclick="navigate('onboarding')">Create my account →</button>
            <button class="explore-back-skip" onclick="navigate('home')">Keep exploring</button>
          </div>
        ` : `
          <div class="landing-final-cta">
            <button class="btn-primary" onclick="navigate('onboarding')">Build my profile →</button>
          </div>
        `}

        <div style="height:24px;background:var(--cream)"></div>
      </div>
    </div>`;
}

function skipToDemo() {
  USER.name = 'Demo';
  USER.goals = ['energy','hormonal'];
  USER.gender = 'woman';
  USER.cycleTracking = 'yes';
  USER.culturalFood = 'south_asian';
  USER.cuisines = ['south_asian','mediterranean'];
  USER.dietStyle = 'vegetarian';
  USER.proteinScore = 2;
  USER.fitnessGoals = ['general_fitness'];
  USER.activityLevel = 'moderate';
  USER.sleepQuality = 3;
  USER.stressLevel = 3;
  USER.cookingFrequency = 'most_days';
  USER.conditions = ['pcos'];
  USER.connectedApps = ['apple_health','flo'];
  USER.communityRole = 'reader';
  USER.lifeStage = 'early_adulthood';
  populateTodayData();
  navigate('home');
}