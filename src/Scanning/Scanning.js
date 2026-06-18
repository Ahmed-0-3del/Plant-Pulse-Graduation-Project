import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { scanPlant } from "../api/apiService";

function Scanning() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Uploading image...");
  const navigatedRef = useRef(false);

  const image = location.state?.image;
  const imageFile = location.state?.imageFile;

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(interval);
          return 85;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 400);

    const runScan = async () => {
      try {
        setStatusText("AI is analyzing...");

        // scanPlant() returns response.data from axios
        // API response shape: { status, message, data: { finalDecision, results, averageConfidence } }
        const apiResponse = await scanPlant(imageFile);

        console.log("=== Full API Response ===", JSON.stringify(apiResponse, null, 2));

        // Unwrap: apiResponse may be the full response or already .data
        // Try both: check if there's a nested .data with finalDecision
        const scanData =
          apiResponse?.data?.finalDecision !== undefined
            ? apiResponse.data
            : apiResponse?.finalDecision !== undefined
            ? apiResponse
            : apiResponse?.data || apiResponse;

        console.log("=== Extracted Scan Data ===", JSON.stringify(scanData, null, 2));

        const finalDecision = (scanData?.finalDecision || "")
          .toLowerCase()
          .trim();

        clearInterval(interval);
        setProgress(100);
        setStatusText("Analysis complete!");

        if (!navigatedRef.current) {
          navigatedRef.current = true;
          setTimeout(() => {
            if (finalDecision === "healthy") {
              navigate("/result-health", { state: { image, result: scanData } });
            } else if (finalDecision === "diseases" || finalDecision === "disease") {
              navigate("/result-disease", { state: { image, result: scanData } });
            } else if (finalDecision === "not-lettuce" || finalDecision === "not_lettuce" || finalDecision === "notlettuce") {
              navigate("/result-not-lettuce", { state: { image, result: scanData } });
            } else {
              // fallback: if we got results array, check first result
              const firstResult = scanData?.results?.[0];
              const label = (firstResult?.label || firstResult?.disease_name || "").toLowerCase();
              if (label === "healthy") {
                navigate("/result-health", { state: { image, result: scanData } });
              } else if (label.includes("not") || label.includes("lettuce") === false) {
                navigate("/result-not-lettuce", { state: { image, result: scanData } });
              } else {
                navigate("/result-disease", { state: { image, result: scanData } });
              }
            }
          }, 800);
        }
      } catch (err) {
        console.error("Scan error:", err?.response?.data || err.message);

        clearInterval(interval);
        setProgress(100);
        setStatusText("Analysis complete!");

        if (!navigatedRef.current) {
          navigatedRef.current = true;
          setTimeout(() => {
            navigate("/scan-now", {
              state: {
                scanError:
                  err?.response?.data?.message ||
                  "Failed to analyze image. Please try again.",
              },
            });
          }, 800);
        }
      }
    };

    if (imageFile) {
      runScan();
    } else {
      setTimeout(() => {
        if (!navigatedRef.current) {
          navigatedRef.current = true;
          navigate("/scan-now");
        }
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [navigate, image, imageFile]);

  const displayProgress = Math.min(Math.round(progress), 100);

  return (
    <div>
      <div className="scanning-page-wrapper">
        <div className="container">
          <h1>Scanning Your Plant...</h1>
          <p className="subtitle">
            AI is analyzing leaf texture, color, and patterns.
          </p>

          <div className="image-frame">
            <img
              src={image || "/Materials/Rectangle 3843.png"}
              alt="Plant being scanned"
            />
            <div className="corner corner-tl"></div>
            <div className="corner corner-tr"></div>
            <div className="corner corner-bl"></div>
            <div className="corner corner-br"></div>
            <div className="scan-circle"></div>
            <div className="scan-line"></div>
          </div>

          <div className="progress-section">
            <div className="progress-labels">
              <span>{statusText}</span>
              <span className="pct">{displayProgress}%</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${displayProgress}%`,
                  transition: "width 0.4s ease",
                }}
              ></div>
            </div>
          </div>

          <div className="status-row">
            <div className="status-card">
              <span className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="#888" strokeWidth="1.5" />
                  <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span>Detecting disease...</span>
            </div>
            <div className="status-card">
              <span className="icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1.667a8.333 8.333 0 100 16.666A8.333 8.333 0 0010 1.667z" stroke="#888" strokeWidth="1.5" />
                  <path d="M10 6.667v3.333l2.5 2.5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span>Checking leaf health...</span>
            </div>
          </div>

          <p className="footer-note">
            Please wait while we analyze your plant...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Scanning;
