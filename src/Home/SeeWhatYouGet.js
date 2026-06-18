import React from "react";

function SeeWhatYouGet() {
  return (
    <section className="swyg-section">
      <div className="swyg-badge">Instant Results</div>
      <h2 className="swyg-title">See What You'll Get</h2>
      <p className="swyg-subtitle">
        Comprehensive analysis results with actionable insights
      </p>

      <div className="swyg-grid">
        {/* <!-- LEFT CARD — Disease Detected --> */}
        <div className="swyg-card swyg-card--red">
          <div className="swyg-card-header">
            <div className="swyg-status-icon swyg-status-icon--red">
              <img
                src="/Materials/alert.png"
                alt="Alert"
                width="22"
                height="22"
              />
            </div>
            <div>
              <h3>Disease Detected</h3>
              <p>Early Blight (Alternaria)</p>
            </div>
          </div>

          <div className="swyg-card-img">
            <img
              src="/Materials/ImageWithFallback.png"
              alt="Diseased Plant"
              onError={(e) => { e.target.onerror = null; e.target.src = "/Materials/hylettuce.png"; }}
            />
          </div>

          <div className="swyg-stats">
            <div className="swyg-stat">
              <span className="swyg-stat-value green">92%</span>
              <span className="swyg-stat-label">Accuracy</span>
            </div>
            <div className="swyg-stat">
              <span className="swyg-stat-value orange">Medium</span>
              <span className="swyg-stat-label">Severity</span>
            </div>
            <div className="swyg-stat">
              <span className="swyg-stat-value green">7–14</span>
              <span className="swyg-stat-label">Days Recovery</span>
            </div>
          </div>

          <div className="swyg-tips">
            <h4>Recommended Treatment Steps</h4>
            <ol>
              <li>Change the water immediately</li>
              <li>Adjust nutrient solution</li>
              <li>Avoid excessive light</li>
              <li>Remove affected leaves</li>
            </ol>
          </div>
        </div>

        {/* <!-- RIGHT CARD — No Issues Detected --> */}
        <div className="swyg-card swyg-card--green">
          <div className="swyg-card-header">
            <div className="swyg-status-icon swyg-status-icon--green">
              <img
                src="/Materials/check.png"
                alt="Healthy"
                width="22"
                height="22"
              />
            </div>
            <div>
              <h3>No Issues Detected</h3>
              <p>Your plant is healthy!</p>
            </div>
          </div>

          <div className="swyg-card-img">
            <img
              src="/Materials/Rectangle%203843.png"
              alt="Healthy Plant"
              onError={(e) => { e.target.onerror = null; e.target.src = "/Materials/hylettuce.png"; }}
            />
          </div>

          <div className="swyg-stats">
            <div className="swyg-stat">
              <span className="swyg-stat-value green">92%</span>
              <span className="swyg-stat-label">Accuracy</span>
            </div>
            <div className="swyg-stat">
              <span className="swyg-stat-value green">
                <img src="/Materials/leaf.png" alt="" width="14" height="14" />{" "}
                Excellent
              </span>
              <span className="swyg-stat-label">Leaf Condition</span>
            </div>
            <div className="swyg-stat">
              <span className="swyg-stat-value green">
                <img
                  src="/Materials/check-circle.png"
                  alt=""
                  width="14"
                  height="14"
                />{" "}
                Optimal
              </span>
              <span className="swyg-stat-label">Nutrition</span>
            </div>
          </div>

          <div className="swyg-tips">
            <h4>Care Tips for Ongoing Health</h4>
            <ul>
              <li>Use clean, fresh water</li>
              <li>Maintain proper temperature</li>
              <li>Provide balanced lighting</li>
              <li>Ensure good air circulation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeeWhatYouGet;
