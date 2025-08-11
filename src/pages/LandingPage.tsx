import React from "react";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div id="crai-root">
      <header className="crai-hero crai-bleed">
        <div className="crai-ai-net" aria-hidden="true">
          {/* 🔁 Replace this with your actual SVG */}
          <svg width="100%" height="100%" viewBox="0 0 800 600">
            <circle cx="400" cy="300" r="200" fill="rgba(255,255,255,0.1)" />
          </svg>
        </div>
        <div className="crai-wrap">
          <h1>Your Story. Our Design.</h1>
          <p className="tagline">
            Creator-grade AI for music, voice, video, avatars, and brand kits — built for partners.
          </p>
        </div>
      </header>

      <div className="crai-bar crai-bleed"></div>

      <section className="hero-section crai-bleed">
        <div className="crai-wrap">
          <div className="panel coming">
            <h2>🚀 COMING SOON</h2>
            <p>
              We’re crafting tools, workflows, and APIs that make creative work faster, better, and more fun.
              Join the launch list to get early updates and perks.
            </p>
          </div>
        </div>
      </section>

      {/* 🔧 Add more sections here: teaser, roadmap, email capture, socials, footer */}
    </div>
  );
};

export default LandingPage;