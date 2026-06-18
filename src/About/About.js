import React from "react";

function About() {
  return (
    <div>
      {/* <!-- HERO BANNER --> */}
      <div className="about-hero">
        <img
          src="/Materials/about-hero.png"
          alt="PlantPulse Farm"
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* <!-- ABOUT SECTION --> */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-heading">
              <span>About</span> plantpulse
            </h2>
            <div className="about-quote">
              <p>
                Our project focuses on hydroponic lettuce cultivation, providing
                a smart system to monitor and maintain plant health. Users can
                track growth, check nutrient levels, and receive real-time
                notifications about their plants' condition. The app helps both
                beginners and experienced growers keep their lettuce healthy and
                thriving in a controlled environment.
              </p>
            </div>
          </div>
          <div className="about-image">
            <img src="/Materials/about-side.png" alt="Hydroponic Farm" />
          </div>
        </div>
      </section>

      {/* <!-- WHY CHOOSE US --> */}
      <section className="why-section">
        <h2 className="why-title">Why Choose us</h2>
        <div className="why-underline">
          <img
            src="/Materials/Line.png"
            alt="Underline"
            style={{ width: "158px", height: "4px;" }}
          />
        </div>

        <div className="why-grid">
          {/* <!-- Left column --> */}
          <div className="why-col">
            <div className="why-card">
              <div className="why-icon green">
                <img
                  src="/Materials/box-time.png"
                  alt="Fast"
                  style={{ width: "28px", height: "28px;" }}
                />
              </div>
              <h3>Fast & Reliable</h3>
              <p>
                Instant AI-powered disease detection for hydroponic lettuce
                farmers.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon orange">
                <img
                  src="/Materials/transaction-minus.png"
                  alt="Plan"
                  style={{ width: "28px", height: "28px;" }}
                />
              </div>
              <h3>Clear Action Plan</h3>
              <p>
                Users get disease ID, treatment, and prevention tips in simple
                language.
              </p>
            </div>
          </div>

          {/* <!-- Center image --> */}
          <div className="why-center-img">
            <img src="/Materials/about-center.png" alt="Farm Center" />
          </div>

          {/* <!-- Right column --> */}
          <div className="why-col">
            <div className="why-card">
              <div className="why-icon green">
                <img
                  src="/Materials/designtools.png"
                  alt="Design"
                  style={{ width: "28px", height: "28px;" }}
                />
              </div>
              <h3>User-Friendly Design</h3>
              <p>
                Simple interface: just capture an image and get insights, no
                expertise needed.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon orange">
                <img
                  src="/Materials/accessible.png"
                  alt="Accessible"
                  style={{ width: "28px", height: "28px;" }}
                />
              </div>
              <h3>Accessible Solution</h3>
              <p>
                Designed to work seamlessly on both mobile and web platforms for
                easy access anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
