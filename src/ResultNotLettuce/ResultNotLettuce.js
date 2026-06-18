import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const IconWarning = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      stroke="#FF8C27"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#FFF3E0"
    />
    <line
      x1="12"
      y1="9"
      x2="12"
      y2="13"
      stroke="#FF8C27"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="17"
      x2="12.01"
      y2="17"
      stroke="#FF8C27"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

function ResultNotLettuce() {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state?.image;

  return (
    <div className="result-disease-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container">
          <span>Scan</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="active">Result</span>
        </div>
      </div>

      <main className="main-content">
        <div className="container">
          <div className="result-layout">
            {/* LEFT — uploaded image */}
            <div className="result-image">
              <div className="plant-header">
                <h3 className="plant-name">Unknown Plant</h3>
                <div
                  className="status-badge disease-badge"
                  style={{
                    backgroundColor: "#FFF3E0",
                    color: "#FF8C27",
                    borderColor: "#FF8C27",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                      stroke="#FF8C27"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <line
                      x1="12"
                      y1="9"
                      x2="12"
                      y2="13"
                      stroke="#FF8C27"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="12"
                      y1="17"
                      x2="12.01"
                      y2="17"
                      stroke="#FF8C27"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Not Lettuce
                </div>
              </div>
              <img
                src={image || "/Materials/ImageWithFallback.png"}
                alt="Uploaded image"
              />
              <button
                className="scan-another-btn"
                onClick={() => navigate("/scan-now")}
              >
                Scan a Lettuce Plant
              </button>
            </div>

            {/* RIGHT — message */}
            <div className="result-details">
              <div className="result-header">
                <h2 className="result-title">Plant Scan Results</h2>
              </div>

              {/* Warning card */}
              <div
                style={{
                  background: "#FFF8F0",
                  border: "1.5px solid #FF8C27",
                  borderRadius: "16px",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  textAlign: "center",
                  marginBottom: "24px",
                }}
              >
                <IconWarning />
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: "700",
                    color: "#333",
                    margin: 0,
                  }}
                >
                  This doesn't look like lettuce!
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  Our AI is trained specifically to detect diseases in{" "}
                  <strong>lettuce plants</strong>. The image you uploaded does
                  not appear to be a lettuce plant, so we can't provide an
                  accurate diagnosis.
                </p>
              </div>

              {/* Tips section */}
              <div className="info-section">
                <h3 className="section-heading">What to do next?</h3>
                <ul className="tips-list" style={{ paddingLeft: "18px" }}>
                  <li>
                    Make sure you are photographing a{" "}
                    <strong>lettuce plant</strong> leaf.
                  </li>
                  <li>
                    Take the photo in good lighting with the leaf clearly
                    visible.
                  </li>
                  <li>
                    Avoid photographing the soil, pot, or background — focus on
                    the leaf.
                  </li>
                  <li>
                    Try a close-up shot of a single leaf for best results.
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResultNotLettuce;
