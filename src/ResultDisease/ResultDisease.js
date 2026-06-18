import React from "react";
import { useNavigate, useLocation } from "react-router-dom";


const DISEASE_DATA = {
  tip_burn: {
    displayName: "Tip Burn",
    description:
      "Leaf edge burn caused by calcium deficiency or excessive transpiration in inner leaves.",
    treatment: [
      "Run fans to circulate air around inner leaves",
      "Foliar spray 0.5% calcium chloride solution on leaves",
      "Lower nutrient solution EC to improve calcium absorption",
      "Reduce high-intensity light hours to slow excessive growth",
    ],
  },
  pythium_root_rot: {
    displayName: "Pythium Root Rot",
    description:
      "Root disease caused by Pythium fungus spreading through the hydroponic system.",
    treatment: [
      "Increase water aeration to maintain dissolved oxygen above 6 mg/L",
      "Keep water temperature between 18–20°C to suppress Pythium growth",
      "Add Trichoderma bio-control agent to nutrient solution",
      "Apply Mefenoxam or Fosetyl-Al fungicide to the solution",
    ],
  },
  botrytis_gray_mold: {
    displayName: "Gray Mold (Botrytis)",
    description:
      "Gray fungal mold caused by Botrytis cinerea, affecting leaves and stems in humid conditions.",
    treatment: [
      "Use oscillating fans to reduce humidity around plants below 85%",
      "Remove and dispose of infected leaves immediately before spores spread",
      "Spray Bacillus subtilis as a biological fungicide every 5–7 days",
      "Apply Iprodione or Fenhexamid fungicide as a preventive measure",
    ],
  },
  downy_mildew: {
    displayName: "Downy Mildew",
    description:
      "Fungal-like disease caused by Bremia lactucae, creating yellow spots and white mildew on leaves.",
    treatment: [
      "Keep humidity below 85% with proper ventilation and spacing",
      "Spray 1 tsp sodium bicarbonate per liter of water on affected leaves",
      "Apply Mandipropamid or Dimethomorph fungicide at first sign of infection",
      "Switch to Bremia-resistant lettuce varieties for future crops",
    ],
  },
};

/* ── Normalize disease name from API to match DISEASE_DATA key ── */
function normalizeDiseaseKey(rawName) {
  return (rawName || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")        // spaces → underscores
    .replace(/-/g, "_")          // hyphens → underscores
    .replace(/[^a-z0-9_]/g, ""); // remove special chars
}

/* ── SVG Icons ── */
const IconExclaimRed = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.0009 22.2454C17.5959 22.2454 22.2463 17.6048 22.2463 11.9999C22.2463 6.40495 17.5856 1.75452 11.9906 1.75452C6.38615 1.75452 1.75586 6.40495 1.75586 11.9999C1.75586 17.6048 6.396 22.2454 12.0009 22.2454ZM12.0013 20.5379C7.25957 20.5379 3.47229 16.7408 3.47229 11.9999C3.47229 7.26852 7.24929 3.46195 11.9906 3.46195C16.7216 3.46195 20.5281 7.26895 20.5384 11.9999C20.5483 16.7412 16.7314 20.5379 12.0004 20.5379M11.9906 13.8179C12.4723 13.8179 12.7436 13.5467 12.7534 13.0247L12.9043 7.72109C12.9146 7.20852 12.5126 6.82709 11.9803 6.82709C11.4377 6.82709 11.0563 7.19866 11.0661 7.7108L11.1969 13.0247C11.2067 13.5368 11.4883 13.8179 11.9906 13.8179ZM11.9906 17.0824C12.5627 17.0824 13.0749 16.6204 13.0749 16.0379C13.0749 15.4452 12.573 14.9931 11.9906 14.9931C11.3979 14.9931 10.9054 15.4551 10.9054 16.0379C10.9054 16.6105 11.4077 17.0824 11.9906 17.0824Z" fill="#D32F2F" />
  </svg>
);

const IconCheckGreen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.3726 0 0 5.3726 0 12C0 18.6273 5.3726 24 12 24C18.6273 24 24 18.6273 24 12C24 5.3726 18.6274 0 12 0ZM12 21.6C6.70657 21.6 2.40002 17.2934 2.40002 12C2.40002 6.70651 6.70651 2.40002 12 2.40002C17.2934 2.40002 21.6 6.70651 21.6 12C21.6 17.2934 17.2934 21.6 12 21.6ZM16.5189 7.71266L18.2158 9.40955L10.8 16.8564L6.35158 12.408L8.04841 10.7111L10.8 13.4626L16.5189 7.71266Z" fill="#399B25" />
  </svg>
);

const IconExclaimOrange = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
    <path d="M10.245 20.4909C15.84 20.4909 20.4904 15.8503 20.4904 10.2454C20.4904 4.65043 15.8297 0 10.2347 0C4.63029 0 0 4.65043 0 10.2454C0 15.8503 4.64014 20.4909 10.245 20.4909ZM10.2454 18.7834C5.50371 18.7834 1.71643 14.9863 1.71643 10.2454C1.71643 5.514 5.49343 1.70743 10.2347 1.70743C14.9657 1.70743 18.7723 5.51443 18.7826 10.2454C18.7924 14.9867 14.9756 18.7834 10.2446 18.7834M10.2347 12.0634C10.7164 12.0634 10.9877 11.7921 10.9976 11.2701L11.1484 5.96657C11.1587 5.454 10.7567 5.07257 10.2244 5.07257C9.68186 5.07257 9.30043 5.44414 9.31029 5.95629L9.441 11.2701C9.45086 11.7823 9.73243 12.0634 10.2347 12.0634ZM10.2347 15.3279C10.8069 15.3279 11.319 14.8659 11.319 14.2834C11.319 13.6907 10.8171 13.2386 10.2347 13.2386C9.642 13.2386 9.14957 13.7006 9.14957 14.2834C9.14957 14.856 9.65186 15.3279 10.2347 15.3279Z" fill="#FF8C27" />
  </svg>
);

const IconBulb = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#C2E0BB" fillOpacity="0.83" />
    <path d="M9.9888 21.25H14.0108M14.0108 18.0325V17.127C14.0122 16.4301 14.1705 15.7425 14.4737 15.1151C14.777 14.4877 15.2176 13.9365 15.7628 13.5025C16.4739 12.9344 17.0475 12.2129 17.4406 11.3919C17.8337 10.5709 18.0361 9.67172 18.0328 8.7615C18.0273 5.44 15.3333 2.75 12.0123 2.75C8.6683 2.75 5.9668 5.4385 5.9668 8.7695C5.9668 10.682 6.8503 12.384 8.2318 13.491C9.3358 14.375 9.9883 15.7045 9.9883 17.1185V18.0325H14.0108Z" stroke="#399B25" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ResultDisease() {
  const navigate = useNavigate();
  const location = useLocation();

  const image = location.state?.image;
  const result = location.state?.result;

  // result = scanData from Scanning.js = { finalDecision, results: [...], averageConfidence }
  // results array contains objects with: disease_name, label, confidence, description, treatment
  const resultsArray = result?.results || [];
  const firstResult = resultsArray[0] || {};

  // Build disease key from API response — try disease_name first, then label
  const rawName = firstResult.disease_name || firstResult.label || "";
  const diseaseKey = normalizeDiseaseKey(rawName);
  const diseaseInfo = DISEASE_DATA[diseaseKey] || {};

  // Display values: prefer live API data, fall back to local DISEASE_DATA
  const displayName =
    firstResult.disease_name ||
    diseaseInfo.displayName ||
    rawName ||
    "Disease Detected";

  const accuracy =
    firstResult.confidence != null
      ? Math.round(firstResult.confidence)
      : result?.averageConfidence != null
      ? Math.round(result.averageConfidence)
      : diseaseInfo.accuracy || 0;

  const description =
    firstResult.description ||
    diseaseInfo.description ||
    "A disease was detected on your plant. Please follow the treatment steps below.";

  const treatment =
    (Array.isArray(firstResult.treatment) && firstResult.treatment.length > 0)
      ? firstResult.treatment
      : diseaseInfo.treatment || [
          "Consult a plant specialist for further diagnosis.",
        ];

  const isUncertain = firstResult.status === "uncertain" || accuracy < 60;
  const severity = accuracy >= 80 ? "High" : accuracy >= 60 ? "Medium" : "Low";
  const severityColor =
    accuracy >= 80 ? "#d32f2f" : accuracy >= 60 ? "#FF8C27" : "#888";

  return (
    <div className="result-disease-page">
      {/* Breadcrumb */}
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
            {/* LEFT */}
            <div className="result-image">
              <div className="plant-header">
                <h3 className="plant-name">Romaine Lettuce</h3>
                <div className="status-badge disease-badge">
                  <IconExclaimRed />
                  Issue Detected
                </div>
              </div>
              <img
                src={image || "/Materials/ImageWithFallback.png"}
                alt="Scanned plant"
              />
              <button
                className="scan-another-btn"
                onClick={() => navigate("/scan-now")}
              >
                Scan Another Plant
              </button>
            </div>

            {/* RIGHT */}
            <div className="result-details">
              <div className="result-header">
                <h2 className="result-title">Plant Scan Results</h2>
                <div className="completion-badge">
                  <IconCheckGreen />
                  Scan completed
                </div>
              </div>

              {/* 3 stat cards */}
              <div className="stats-cards">
                <div className="stat-card disease-card">
                  <IconExclaimRed />
                  <div className="stat-card-text">
                    <div className="stat-label">Detected Disease</div>
                    <div className="stat-main" style={{ color: "#D32F2F" }}>
                      {displayName}
                    </div>
                  </div>
                </div>

                <div className="stat-card accuracy-card">
                  <IconCheckGreen />
                  <div className="stat-card-text">
                    <div className="stat-label">Accuracy</div>
                    <div className="stat-main" style={{ color: "#399B25" }}>
                      {accuracy}%
                    </div>
                  </div>
                </div>

                <div className="stat-card severity-card">
                  <IconExclaimOrange />
                  <div className="stat-card-text">
                    <div className="stat-label">Severity</div>
                    <div className="stat-main" style={{ color: severityColor }}>
                      {severity}
                    </div>
                  </div>
                </div>
              </div>

              {/* Plant Status */}
              <div className="info-section">
                <h3 className="section-heading">Plant Status</h3>
                <p className="section-text">{description}</p>
                {isUncertain && (
                  <p style={{ marginTop: "8px", fontSize: "12px", color: "#FF8C27", fontStyle: "italic" }}>
                    ⚠ Low confidence — try retaking the photo in better lighting.
                  </p>
                )}
              </div>

              {/* Treatment Steps */}
              <div className="care-tips">
                <div className="tips-header">
                  <IconBulb />
                  <h3>Recommended Treatment Steps</h3>
                </div>
                <ul className="tips-list">
                  {treatment.map((step, i) => (
                    <li key={i}>{step}</li>
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

export default ResultDisease;
