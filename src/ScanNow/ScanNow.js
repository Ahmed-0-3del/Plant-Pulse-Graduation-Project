/* eslint-disable react/style-prop-object */
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ScanNow() {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const cameraInputRef = useRef(null);

  function processFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
      setTimeout(() => {
        navigate("/scanning", {
          state: { image: event.target.result, imageFile: file },
        });
      }, 500);
    };
    reader.readAsDataURL(file);
  }

  function handleImageUpload(e) {
    processFile(e.target.files[0]);
  }

  function handleCameraCapture(e) {
    processFile(e.target.files[0]);
  }

  function handleCardClick() {
    document.getElementById("fileInput").click();
  }

  return (
    <div className="scannow-page">
      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">
              Scan Your <span className="highlight">Plant</span>
            </h1>
            <p className="page-subtitle">
              Upload a photo or use camera to analyze plant health
            </p>
          </div>

          <div className="upload-section">
            <div
              className="upload-card"
              onClick={handleCardClick}
              style={{ cursor: "pointer" }}
            >
              <div className="upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 6V30" stroke="#399B25" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M34 16L24 6L14 16" stroke="#399B25" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M42 30V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42H10C8.93913 42 7.92172 41.5786 7.17157 40.8284C6.42143 40.0783 6 39.0609 6 38V30" stroke="#399B25" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="upload-title">Upload Plant Photo</h3>
              <p className="upload-text">Drag and drop or click to browse</p>
              <p className="upload-formats">Supports: JPG, PNG, HEIC (Max 5MB)</p>

              {/* Upload from gallery */}
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>

            <div className="divider"><span>or</span></div>

            {/* Use Camera → يفتح الكاميرا مباشرة */}
            <button
              className="camera-btn"
              onClick={() => cameraInputRef.current && cameraInputRef.current.click()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Use Camera
            </button>

            {/* hidden camera input */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={handleCameraCapture}
            />
          </div>

          <div className="tips-section">
            <h3 className="tips-title">Tips for Best Results</h3>
            <div className="tips-list">
              {[
                "Take photos in good natural lighting",
                "Focus on affected areas or leaves",
                "Avoid blurry or low-quality images",
                "Include multiple leaves for better accuracy",
              ].map((tip) => (
                <div className="tip-item" key={tip}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <g clipPath="url(#clip0_437_1287)">
                      <path d="M18.1678 8.33332C18.5484 10.2011 18.2772 12.1428 17.3994 13.8348C16.5216 15.5268 15.0902 16.8667 13.3441 17.6311C11.5979 18.3955 9.64252 18.5381 7.80391 18.0353C5.9653 17.5325 4.35465 16.4145 3.24056 14.8678C2.12646 13.3212 1.57626 11.4394 1.68171 9.53615C1.78717 7.63294 2.54189 5.8234 3.82004 4.4093C5.09818 2.9952 6.82248 2.06202 8.70538 1.76537C10.5883 1.46872 12.516 1.82654 14.167 2.77916" stroke="#399B25" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.5 9.16671L10 11.6667L18.3333 3.33337" stroke="#399B25" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_437_1287">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ScanNow;
