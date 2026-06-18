import React, { useState } from "react";
import { sendContactMessage } from "../api/apiService";

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ text: "", type: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ text: "", type: "" });
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setStatus({ text: "Please fill in all required fields!", type: "error" });
      return;
    }
    setLoading(true);
    try {
      await sendContactMessage(formData);
      setStatus({
        text: `Thank you ${formData.firstName}! We'll get back to you soon.`,
        type: "success",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Failed to send message. Please try again.";
      setStatus({ text: msg, type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ text: "", type: "" }), 4000);
    }
  };

  return (
    <div>
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Any question or remarks? Just write us a message!</p>
      </section>

      <div className="contact-wrapper">
        <div className="contact-card">
          <div className="info-panel">
            <h2>Contact Information</h2>
            <p className="tagline">Say something to start a live chat!</p>
            <div className="info-item">
              <div className="info-icon">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              +1012 3456 789
            </div>
            <div className="info-item">
              <div className="info-icon">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              info@plantpulse.com
            </div>

          </div>

          <div className="form-panel">
            {status.text && (
              <div
                style={{
                  padding: "12px",
                  marginBottom: "16px",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "14px",
                  backgroundColor:
                    status.type === "success" ? "#d4edda" : "#f8d7da",
                  color: status.type === "success" ? "#155724" : "#721c24",
                }}
              >
                {status.text}
              </div>
            )}

            <div className="form-row">
              <div className="field">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="field">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
            <div className="field field-full">
              <label>Message *</label>
              <textarea
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                rows="5"
              />
            </div>
            <button
              className="btn-send"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
