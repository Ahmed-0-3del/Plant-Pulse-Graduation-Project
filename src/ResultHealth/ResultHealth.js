import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const IconCheckGreen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6273 5.3726 24 12 24C18.6273 24 24 18.6273 24 12C24 5.3726 18.6274 0 12 0ZM12 21.6C6.70657 21.6 2.40002 17.2934 2.40002 12C2.40002 6.70651 6.70651 2.40002 12 2.40002C17.2934 2.40002 21.6 6.70651 21.6 12C21.6 17.2934 17.2934 21.6 12 21.6ZM16.5189 7.71266L18.2158 9.40955L10.8 16.8564L6.35158 12.408L8.04841 10.7111L10.8 13.4626L16.5189 7.71266Z" fill="#399B25" />
  </svg>
);

const IconLeafOrange = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M10.9997 20C9.24379 20.0053 7.54999 19.3505 6.25425 18.1654C4.95852 16.9803 4.1555 15.3515 4.00447 13.6021C3.85344 11.8527 4.36543 10.1104 5.43888 8.72074C6.51234 7.33112 8.06886 6.3957 9.79974 6.1C15.4997 5 16.9997 4.48 18.9997 2C19.9997 4 20.9997 6.18 20.9997 10C20.9997 15.5 16.2197 20 10.9997 20Z" stroke="#FF8C27" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 21C2 18 3.85 15.64 7.08 15C9.5 14.52 12 13 13 12" stroke="#FF8C27" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBulb = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#C2E0BB" fillOpacity="0.83" />
    <path d="M9.9888 21.25H14.0108M14.0108 18.0325V17.127C14.0122 16.4301 14.1705 15.7425 14.4737 15.1151C14.777 14.4877 15.2176 13.9365 15.7628 13.5025C16.4739 12.9344 17.0475 12.2129 17.4406 11.3919C17.8337 10.5709 18.0361 9.67172 18.0328 8.7615C18.0273 5.44 15.3333 2.75 12.0123 2.75C8.6683 2.75 5.9668 5.4385 5.9668 8.7695C5.9668 10.682 6.8503 12.384 8.2318 13.491C9.3358 14.375 9.9883 15.7045 9.9883 17.1185V18.0325H14.0108Z" stroke="#399B25" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DEFAULT_CARE_TIPS = [
  "Keep EC between 0.8–1.6 and pH between 5.5–6.5",
  "Maintain water temperature at 18–22°C",
  "Provide 14–16 hours of light daily",
  "Check roots weekly — healthy roots are white and firm",
];

function ResultHealth() {
  const navigate = useNavigate();
  const location = useLocation();

  const image = location.state?.image;
  const result = location.state?.result;

  // result = scanData from Scanning.js = { finalDecision, results: [...], averageConfidence }
  const resultsArray = result?.results || [];
  const firstResult = resultsArray[0] || {};

  const description =
    firstResult.description ||
    "Your plant is healthy and showing no signs of disease or stress.";

  const confidence =
    firstResult.confidence != null
      ? Math.round(firstResult.confidence)
      : result?.averageConfidence != null
      ? Math.round(result.averageConfidence)
      : 94;

  const careTips =
    Array.isArray(firstResult.treatment) && firstResult.treatment.length > 0
      ? firstResult.treatment
      : DEFAULT_CARE_TIPS;

  return (
    <div className="result-healthy-page">
      <div className="breadcrumb">
        <div className="container">
          <span>Scan</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="active">Result</span>
        </div>
      </div>

      <main className="main-content">
        <div className="container">
          <div className="result-layout">
            {/* Image panel */}
            <div className="result-image">
              <div className="plant-header">
                <h3 className="plant-name">Romaine Lettuce</h3>
                <div className="status-badge healthy-badge">
                  <IconCheckGreen />
                  Healthy Condition
                </div>
              </div>
              <img
                src={image || "/Materials/Rectangle 3843.png"}
                alt="Scanned plant"
              />
              <button
                className="scan-another-btn"
                onClick={() => navigate("/scan-now")}
              >
                Scan Another Plant
              </button>
            </div>

            {/* Details panel */}
            <div className="result-details">
              <div className="result-header">
                <h2 className="result-title">Plant Scan Results</h2>
                <div className="completion-badge">
                  <IconCheckGreen />
                  Scan completed
                </div>
              </div>

              <div className="stats-cards">
                <div className="stat-card healthy-card">
                  <IconCheckGreen />
                  <div className="stat-card-text">
                    <div className="stat-main green-text">
                      Your plant is healthy and thriving!
                    </div>
                  </div>
                </div>

                <div className="stat-card accuracy-card">
                  <IconCheckGreen />
                  <div className="stat-card-text">
                    <div className="stat-label">Accuracy</div>
                    <div className="stat-main green-text">{confidence}%</div>
                  </div>
                </div>

                <div className="stat-card condition-card">
                  <IconLeafOrange />
                  <div className="stat-card-text">
                    <div className="stat-label">Leaf Condition</div>
                    <div className="stat-main orange-text">Excellent</div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3 className="section-heading">Plant Status</h3>
                <p className="section-text">{description}</p>
              </div>

              <div className="care-tips">
                <div className="tips-header">
                  <IconBulb />
                  <h3>Care Tips for Ongoing Health</h3>
                </div>
                <ul className="tips-list">
                  {careTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResultHealth;
