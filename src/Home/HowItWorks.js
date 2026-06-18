import React from "react";

function HowItWorks() {
  return (
    <section className="hiw-section">
      <div className="hiw-badge">Simple Process</div>
      <h2 className="hiw-title">How It Works</h2>
      <p className="hiw-subtitle">
        Get instant plant health analysis in just four simple steps
      </p>

      <div className="hiw-grid">
        <div className="hiw-card">
          <div className="hiw-icon green">
            <img
              src="/Materials/Upload1.png"
              alt="Upload"
              style={{ width: "28px", height: "28px" }}
            />
          </div>
          <h3>Upload Photo</h3>
          <p>
            Take a photo of your plant or upload an existing image from your
            device
          </p>
        </div>

        <div className="hiw-divider"></div>

        <div className="hiw-card">
          <div className="hiw-icon orange">
            <img
              src="/Materials/scan.png"
              alt="Scan"
              style={{ width: "28px", height: "28px" }}
            />
          </div>
          <h3>AI Scans & Analyzes</h3>
          <p>
            Our advanced AI system analyzes the plant using deep learning models
          </p>
        </div>

        <div className="hiw-divider"></div>

        <div className="hiw-card">
          <div className="hiw-icon green">
            <img
              src="/Materials/shield.png"
              alt="Detect"
              style={{ width: "28px", height: "28px" }}
            />
          </div>
          <h3>Detects Issues</h3>
          <p>Identifies diseases, pests, or confirms your plant is healthy</p>
        </div>

        <div className="hiw-divider1"></div>

        <div className="hiw-card">
          <div className="hiw-icon orange">
            <img
              src="/Materials/bulb.png"
              alt="Tips"
              style={{ width: "28px", height: "28px" }}
            />
          </div>
          <h3>Get Care Tips</h3>
          <p>
            Receive treatment recommendations and personalized care guidance
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
