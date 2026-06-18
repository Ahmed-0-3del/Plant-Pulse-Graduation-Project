import React from "react";

function WhyChooseUs() {
  return (
    <section className="wcu-section">
      <div className="wcu-badge">Why Choose Us</div>
      <h2 className="wcu-title">Powerful Features for Plant Care</h2>
      <p className="wcu-subtitle">
        Everything you need to keep your plants healthy and thriving
      </p>

      <div className="wcu-grid">
        <div className="wcu-card">
          <div className="wcu-icon green">
            <img
              src="/Materials/cube.png"
              alt="Fast & Reliable"
              width="28"
              height="28"
            />
          </div>
          <h3>Fast & Reliable</h3>
          <p>
            Instant AI-powered disease detection for hydroponic lettuce farmers.
          </p>
        </div>

        <div className="wcu-divider"></div>

        <div className="wcu-card">
          <div className="wcu-icon orange">
            <img
              src="/Materials/clipboard.png"
              alt="Clear Action Plan"
              width="28"
              height="28"
            />
          </div>
          <h3>Clear Action Plan</h3>
          <p>
            Users get disease ID, treatment, and prevention tips in simple
            language.
          </p>
        </div>

        <div className="wcu-divider"></div>

        <div className="wcu-card">
          <div className="wcu-icon green">
            <img
              src="/Materials/design.png"
              alt="User-Friendly Design"
              width="28"
              height="28"
            />
          </div>
          <h3>User-Friendly Design</h3>
          <p>
            Simple interface: just capture an image and get insights, no
            expertise needed.
          </p>
        </div>

        <div className="wcu-divider"></div>

        <div className="wcu-card">
          <div className="wcu-icon orange">
            <img
              src="/Materials/chart.png"
              alt="Accessible Solution"
              width="28"
              height="28"
            />
          </div>
          <h3>Accessible Solution</h3>
          <p>
            Designed to work seamlessly on both mobile and web platforms for
            easy access anywhere.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
