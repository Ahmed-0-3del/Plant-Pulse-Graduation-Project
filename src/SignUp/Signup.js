import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { register, login, googleAuth } from "../api/apiService";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        gender: formData.gender,
      });
      await login({ email: formData.email, password: formData.password });
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again.";
      setError(typeof msg === "string" ? msg : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign Up using access_token flow → send to backend
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      setError("");
      try {
        // Get user info from Google using the access token
        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoRes.json();

        // Send google id_token or access_token to backend
        await googleAuth(tokenResponse.access_token);
        navigate("/");
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          "Google sign up failed. Please try again.";
        setError(typeof msg === "string" ? msg : "Google sign up failed.");
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      setError("Google sign up was cancelled or failed.");
    },
  });

  const eyeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  return (
    <div className="signup-page-wrapper">
      <div className="card">
        <h1>Create New Account</h1>
        <p className="subtitle">Sign up now and start your journey with us easily</p>

        {error && (
          <div
            style={{
              padding: "10px 14px",
              marginBottom: "16px",
              borderRadius: "8px",
              backgroundColor: "#fdecea",
              color: "#c62828",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {/* ── Google Sign Up Button ── */}
        <button
          type="button"
          onClick={() => handleGoogleLogin()}
          disabled={googleLoading || loading}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "11px 16px",
            marginBottom: "16px",
            border: "1.5px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
            cursor: googleLoading || loading ? "not-allowed" : "pointer",
            fontSize: "15px",
            fontWeight: "500",
            color: "#444",
            opacity: googleLoading ? 0.7 : 1,
            transition: "background 0.2s, box-shadow 0.2s",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
        >
          {/* Google SVG logo */}
          <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.1-6.1C34.36 3.09 29.43 1 24 1 14.7 1 6.82 6.7 3.48 14.8l7.12 5.53C12.28 13.47 17.67 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.7c-.55 2.94-2.2 5.43-4.68 7.1l7.17 5.57C43.27 37.2 46.52 31.3 46.52 24.5z"/>
            <path fill="#FBBC05" d="M10.6 28.33A14.44 14.44 0 019.5 24c0-1.5.26-2.95.72-4.3L3.1 14.17A22.94 22.94 0 001 24c0 3.68.88 7.16 2.43 10.25l7.17-5.92z"/>
            <path fill="#34A853" d="M24 47c5.55 0 10.2-1.84 13.6-4.97l-7.17-5.57c-1.89 1.27-4.3 2.04-6.43 2.04-6.33 0-11.72-4.27-13.63-10.03l-7.17 5.92C6.82 41.3 14.7 47 24 47z"/>
          </svg>
          {googleLoading ? "Signing up with Google..." : "Sign up with Google"}
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }} />
          <span style={{ color: "#aaa", fontSize: "13px", whiteSpace: "nowrap" }}>or sign up with email</span>
          <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading || googleLoading}
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading || googleLoading}
            />
          </div>

          <div className="field">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={loading || googleLoading}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                fontSize: "14px",
                backgroundColor: "#fff",
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading || googleLoading}
              />
              <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                {eyeIcon}
              </button>
            </div>
          </div>

          <div className="field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-wrap">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirmPassword"
                placeholder="Re-enter Your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading || googleLoading}
              />
              <button type="button" className="toggle-pw" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {eyeIcon}
              </button>
            </div>
          </div>

          <button
            className="btn-primary"
            type="submit"
            disabled={loading || googleLoading}
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="signin-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
