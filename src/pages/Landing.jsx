import React from 'react';

const earnings = [
  { name: 'Amara', amount: '₦184,500', description: 'Monthly earnings from Growth Plan' },
  { name: 'Tunde', amount: '₦122,000', description: 'Paid out after 6 weeks' },
  { name: 'Chinwe', amount: '₦98,700', description: 'Saved with smart interest' },
];

const benefits = [
  { title: 'Fast payouts', detail: 'Withdraw gains anytime with instant approval.' },
  { title: 'Secure growth', detail: 'Stay protected while earning up to 200k monthly interest.' },
  { title: 'Built for beginners', detail: 'Easy account setup and guided onboarding.' },
];

const steps = [
  { step: '01', title: 'Create account', detail: 'Sign up or log in and set up your profile in minutes.' },
  { step: '02', title: 'Choose a plan', detail: 'Pick the right package, lock in your growth, and earn interest.' },
  { step: '03', title: 'Watch earnings grow', detail: 'Receive monthly payouts, rewards, and faster account access.' },
];

export default function Landing({ onGetStarted }) {
  return (
    <main className="landing-page">
      <section id="home" className="landing-hero">
        <div className="hero-copy">
          <span className="hero-tag">Powered by SkillUp</span>
          <h1>Make smart money moves with a website built for growth.</h1>
          <p className="hero-text">
            Start earning from the moment you join. Grow your balance, enjoy up to <strong>₦200,000 monthly interest</strong>, and access your earnings whenever you need them.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" type="button" onClick={onGetStarted}>Get Started</button>
            <a href="#how-it-works" className="btn btn-ghost">How it works</a>
          </div>
          <div className="hero-stats">
            <div>
              <strong>3,450+</strong>
              <span>Active members</span>
            </div>
            <div>
              <strong>₦200k</strong>
              <span>Max monthly interest</span>
            </div>
            <div>
              <strong>95%</strong>
              <span>Repeat users</span>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-card">
            <div>
              <span className="panel-label">Earnings spotlight</span>
              <h2>Real users earning every month.</h2>
            </div>
            <div className="hero-earners">
              {earnings.map((item) => (
                <div key={item.name} className="earning-card">
                  <span>{item.name}</span>
                  <strong>{item.amount}</strong>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="landing-section">
        <div className="section-heading">
          <h2>About SkillUp</h2>
          <p>We help people earn extra income with a simple, secure website experience that feels familiar and powerful.</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((item) => (
            <div key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="landing-section">
        <div className="section-heading">
          <h2>How it works</h2>
          <p>Follow three clear steps to begin earning from your membership.</p>
        </div>
        <div className="steps-grid">
          {steps.map((item) => (
            <div key={item.step} className="step-card">
              <span className="step-number">{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section landing-cta" id="get-started">
        <div>
          <h2>Ready to start earning?</h2>
          <p>Sign up or log in now and take the first step toward higher monthly returns.</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={onGetStarted}>Create account</button>
      </section>
    </main>
  );
}
