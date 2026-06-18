import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const cameraInputRef = useRef(null);

  function handleCameraCapture(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      navigate("/scanning", {
        state: { image: event.target.result, imageFile: file },
      });
    };
    reader.readAsDataURL(file);
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">🌱 AI-Powered Plant Healthcare</div>
        <h1 className="hero-title">
          Analyze Your Plant's Health Instantly with AI
        </h1>
        <p className="hero-desc">
          Upload an image or scan directly to detect diseases and learn care
          tips. Get instant diagnosis, treatment recommendations, and
          personalized plant care guidance.
        </p>
        <div className="hero-btns">
          <button
            className="hero-btn-primary"
            onClick={() => navigate("/scan-now")}
          >
            Upload Photo
            <img src="/Materials/Upload.png" alt="" style={{ width: "24px", height: "24px" }} />
          </button>

          {/* Start Scan → يفتح الكاميرا مباشرة */}
          <button
            className="hero-btn-secondary"
            onClick={() => cameraInputRef.current && cameraInputRef.current.click()}
          >
            Start Scan
            <span className="icon-wrapper">
              <img className="icon-default" src="/Materials/scan-barcode.png" alt="Scan" width="24" height="24" />
              <img className="icon-hover" src="/Materials/scan-barcode1.png" alt="Scan Hover" width="24" height="24" />
            </span>
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
      </div>

      <div className="hero-image">
        <img
          src="/Materials/Rectangle%203843.png"
          alt="Hydroponic Lettuce"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/Materials/hylettuce.png";
          }}
        />
      </div>
    </section>
  );
}

export default Hero;
