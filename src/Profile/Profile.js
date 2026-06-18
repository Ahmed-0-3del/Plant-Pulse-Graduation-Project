import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  logout,
  getScanStats,
  saveProfileImage,
  loadProfileImage,
} from "../api/apiService";

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({ name: "", email: "", role: "" });
  const [scanStats, setScanStats] = useState({ totalScans: 0, healthy: 0, diseased: 0 });
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ text: "", type: "" });
  const [profileImg, setProfileImg] = useState(null);

  // Password flow: step = "form" | "otp" | "done"
  const [pwStep, setPwStep] = useState("form");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getProfile();
        const d = res?.data || res;
        const name = d?.name || localStorage.getItem("userName") || "User";
        const email = d?.email || localStorage.getItem("userEmail") || "";
        const role = d?.role || "user";
        setUserData({ name, email, role });
        setEditName(name);
        localStorage.setItem("userName", name);
        const img = loadProfileImage(email) || localStorage.getItem("profileImage");
        setProfileImg(img);
      } catch (_) {
        const name = localStorage.getItem("userName") || "User";
        const email = localStorage.getItem("userEmail") || "";
        setUserData({ name, email, role: "user" });
        setEditName(name);
        const img = loadProfileImage(email) || localStorage.getItem("profileImage");
        setProfileImg(img);
      } finally {
        setLoadingProfile(false);
      }
      try {
        const s = await getScanStats();
        setScanStats(s?.data || s || { totalScans: 0, healthy: 0, diseased: 0 });
      } catch (_) {}
    };
    fetchAll();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const imgData = ev.target.result;
      setProfileImg(imgData);
      localStorage.setItem("profileImage", imgData);
      const email = userData.email || localStorage.getItem("userEmail");
      saveProfileImage(email, imgData);
      window.dispatchEvent(new Event("profileImageUpdated"));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      setProfileMsg({ text: "Name cannot be empty.", type: "error" });
      return;
    }
    setSavingProfile(true);
    setProfileMsg({ text: "", type: "" });
    try {
      const res = await updateProfile({ name: editName.trim() });
      console.log("updateProfile response:", res);
      setUserData((prev) => ({ ...prev, name: editName.trim() }));
      localStorage.setItem("userName", editName.trim());
      setProfileMsg({ text: "✓ Name updated successfully!", type: "success" });
      setIsEditing(false);
    } catch (err) {
      const errData = err.response?.data;
      const status = err.response?.status;
      const msg = errData?.message || errData?.error || errData?.msg || err.message || "Update failed.";
      setProfileMsg({ text: `[${status}] ${String(msg)}`, type: "error" });
    } finally {
      setSavingProfile(false);
      setTimeout(() => setProfileMsg({ text: "", type: "" }), 4000);
    }
  };

  // ── Password flow ──────────────────────────────────────────
  const showPwMsg = (text, type = "error", ms = 4000) => {
    setPwMsg({ text, type });
    if (ms) setTimeout(() => setPwMsg({ text: "", type: "" }), ms);
  };

  // Step 1: validate passwords then send OTP to email
  const handleSendOtp = async () => {
    if (!newPassword || !confirmPassword) { showPwMsg("Please fill in both password fields."); return; }
    if (newPassword.length < 6) { showPwMsg("Password must be at least 6 characters."); return; }
    if (newPassword !== confirmPassword) { showPwMsg("Passwords don't match!"); return; }
    setPwLoading(true);
    try {
      const email = userData.email || localStorage.getItem("userEmail");
      await forgotPassword(email);
      setPwStep("otp");
      showPwMsg("✓ OTP sent to your email. Check your inbox.", "success", 0);
    } catch (err) {
      console.error("forgotPassword error:", err.response?.data);
      const msg = err.response?.data?.message || err.response?.data?.error || "Failed to send OTP.";
      showPwMsg(String(msg));
    } finally {
      setPwLoading(false);
    }
  };

  // Step 2: verify OTP
  const handleVerifyOtp = async () => {
    if (!otpCode.trim()) { showPwMsg("Please enter the OTP code."); return; }
    setPwLoading(true);
    try {
      const email = userData.email || localStorage.getItem("userEmail");
      await verifyResetCode({ email, otp: otpCode.trim() });
      // Step 3: now reset password
      await resetPassword({ email, newPassword });
      setPwStep("done");
      showPwMsg("✓ Password changed successfully!", "success", 0);
      setNewPassword(""); setConfirmPassword(""); setOtpCode("");
    } catch (err) {
      console.error("verifyOtp/resetPw error:", err.response?.data);
      const msg = err.response?.data?.message || err.response?.data?.error || "Invalid OTP or failed to update password.";
      showPwMsg(String(msg));
    } finally {
      setPwLoading(false);
    }
  };

  const handleLogout = () => {
    const email = userData.email || localStorage.getItem("userEmail");
    logout(email);
    navigate("/login");
  };

  // ── UI helpers ─────────────────────────────────────────────
  const MsgBox = ({ msg }) => msg.text ? (
    <div style={{
      padding: "12px 16px", margin: "12px 0", borderRadius: "8px", textAlign: "center",
      backgroundColor: msg.type === "success" ? "#d4edda" : "#f8d7da",
      color: msg.type === "success" ? "#155724" : "#721c24",
      fontSize: "14px", fontWeight: "500",
    }}>{msg.text}</div>
  ) : null;

  const EyeBtn = ({ open, onToggle }) => (
    <button type="button" onClick={onToggle} style={{
      position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
      background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center",
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2">
        {open
          ? <><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></>
          : <><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></>
        }
      </svg>
    </button>
  );

  const inputStyle = {
    width: "100%", padding: "13px 16px", fontSize: "15px", fontFamily: "inherit",
    color: "#333", background: "#fff", border: "1.5px solid #ddd", borderRadius: "10px",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };
  const btnGreen = (disabled) => ({
    width: "100%", padding: "13px", backgroundColor: disabled ? "#aaa" : "#399B25",
    color: "white", border: "none", borderRadius: "10px",
    cursor: disabled ? "not-allowed" : "pointer",
    marginTop: "16px", fontSize: "15px", fontWeight: "600",
  });

  if (loadingProfile) return (
    <div className="profile-page" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <p style={{ color: "#399B25", fontSize: "18px" }}>Loading profile...</p>
    </div>
  );

  return (
    <div className="profile-page">
      <main>
        <div className="profile-grid">

          {/* ── Sidebar ── */}
          <aside className="sidebar-card">
            <div className="avatar-wrap" style={{ position: "relative", display: "inline-block" }}>
              <div className="avatar-circle">
                <img src={profileImg || "/Materials/Frame-1525-1.png"} alt="User" />
              </div>
              <button
                title="Change photo"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  backgroundColor: "#399B25", border: "2px solid #fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", position: "absolute", bottom: "2px", right: "2px",
                  padding: 0,
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
            </div>

            <p className="user-name">{userData.name}</p>
            <p className="user-email">{userData.email}</p>

            <div style={{ display: "flex", gap: "10px", margin: "12px 0", justifyContent: "center" }}>
              {[{ l: "Total", v: scanStats.totalScans }, { l: "Healthy", v: scanStats.healthy }, { l: "Diseased", v: scanStats.diseased }].map(s => (
                <div key={s.l} style={{ textAlign: "center", padding: "8px 10px", background: "#f5f5f5", borderRadius: "8px" }}>
                  <div style={{ fontWeight: "700", fontSize: "18px", color: "#399B25" }}>{s.v}</div>
                  <div style={{ fontSize: "11px", color: "#888" }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div className="sidebar-menu">
              <button className={`menu-item profile-sheet${activeTab === "profile" ? " active" : ""}`} onClick={() => setActiveTab("profile")}>
                <img src="/Materials/PersonIcon.png" alt="" style={{ width: "22px", height: "22px" }} />
                <span>Profile</span>
              </button>
              <button className={`menu-item change-pw${activeTab === "password" ? " active" : ""}`} onClick={() => { setActiveTab("password"); setPwStep("form"); setPwMsg({ text: "", type: "" }); }}>
                <img src="/Materials/password-checkIcon.png" alt="" style={{ width: "22px", height: "22px" }} />
                <span>Change Password</span>
              </button>
              <button className="menu-item logout" onClick={handleLogout}>
                <img src="/Materials/OUT.png" alt="" style={{ width: "22px", height: "22px" }} />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* ── Info Card ── */}
          <div className={`info-card${isEditing ? " edit-mode" : ""}`}>

            {activeTab === "profile" ? (
              <>
                <div className="info-header">
                  <h2>Personal Information</h2>
                  <button className="edit-btn" disabled={savingProfile} onClick={() => {
                    if (isEditing) handleSaveProfile();
                    else { setIsEditing(true); setProfileMsg({ text: "", type: "" }); }
                  }}>
                    <span>{savingProfile ? "Saving..." : isEditing ? "Save" : "Edit"}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                </div>

                <MsgBox msg={profileMsg} />

                {/* Name field */}
                <div className="field-group">
                  <p className="field-label">Name <span className="required-star">*</span></p>
                  {isEditing ? (
                    <input
                      style={{ ...inputStyle, borderColor: "#399B25" }}
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSaveProfile()}
                      autoFocus
                    />
                  ) : (
                    <p className="field-value">{userData.name || "—"}</p>
                  )}
                </div>

                {/* Email - read only */}
                <div className="field-group">
                  <p className="field-label">Email</p>
                  <p className="field-value">{userData.email || "—"}</p>
                </div>

                {/* Role - read only */}
                <div className="field-group">
                  <p className="field-label">Role</p>
                  <p className="field-value" style={{ textTransform: "capitalize" }}>{userData.role || "user"}</p>
                </div>

                <div className="field-group">
                  <p className="field-label">Total Scans</p>
                  <p className="field-value">{scanStats.totalScans}</p>
                </div>
                <div className="field-group">
                  <p className="field-label">Healthy Scans</p>
                  <p className="field-value" style={{ color: "#399B25" }}>{scanStats.healthy}</p>
                </div>
                <div className="field-group" style={{ borderBottom: "none" }}>
                  <p className="field-label">Diseased Scans</p>
                  <p className="field-value" style={{ color: "#e53935" }}>{scanStats.diseased}</p>
                </div>

                {isEditing && (
                  <button onClick={() => { setIsEditing(false); setEditName(userData.name); setProfileMsg({ text: "", type: "" }); }}
                    style={{ marginTop: "12px", background: "none", border: "1px solid #ccc", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", color: "#666", fontSize: "14px" }}>
                    Cancel
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="info-header">
                  <h2>Change Password</h2>
                </div>

                <MsgBox msg={pwMsg} />

                {/* ── STEP 1: Enter new password ── */}
                {pwStep === "form" && (
                  <>
                    <p style={{ color: "#888", fontSize: "13px", marginBottom: "20px" }}>
                      Enter your new password. We'll send a verification code to <strong>{userData.email}</strong> to confirm.
                    </p>

                    <div className="field-group">
                      <p className="field-label">New Password <span style={{ color: "red" }}>*</span></p>
                      <div style={{ position: "relative" }}>
                        <input
                          style={{ ...inputStyle, paddingRight: "44px" }}
                          type={showNewPw ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <EyeBtn open={showNewPw} onToggle={() => setShowNewPw(!showNewPw)} />
                      </div>
                    </div>

                    <div className="field-group" style={{ borderBottom: "none" }}>
                      <p className="field-label">Confirm Password <span style={{ color: "red" }}>*</span></p>
                      <div style={{ position: "relative" }}>
                        <input
                          style={{ ...inputStyle, paddingRight: "44px" }}
                          type={showConfirmPw ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                        />
                        <EyeBtn open={showConfirmPw} onToggle={() => setShowConfirmPw(!showConfirmPw)} />
                      </div>
                    </div>

                    <button onClick={handleSendOtp} disabled={pwLoading} style={btnGreen(pwLoading)}>
                      {pwLoading ? "Sending OTP..." : "Send Verification Code"}
                    </button>
                  </>
                )}

                {/* ── STEP 2: Enter OTP ── */}
                {pwStep === "otp" && (
                  <>
                    <p style={{ color: "#555", fontSize: "14px", marginBottom: "20px", lineHeight: "1.6" }}>
                      We sent a verification code to <strong>{userData.email}</strong>. Enter it below to confirm the password change.
                    </p>

                    <div className="field-group" style={{ borderBottom: "none" }}>
                      <p className="field-label">Verification Code (OTP) <span style={{ color: "red" }}>*</span></p>
                      <input
                        style={{ ...inputStyle, letterSpacing: "6px", fontSize: "20px", textAlign: "center" }}
                        type="text"
                        placeholder="- - - - - -"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/, ""))}
                        onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                        autoFocus
                      />
                    </div>

                    <button onClick={handleVerifyOtp} disabled={pwLoading} style={btnGreen(pwLoading)}>
                      {pwLoading ? "Verifying..." : "Confirm & Change Password"}
                    </button>

                    <button onClick={() => { setPwStep("form"); setPwMsg({ text: "", type: "" }); }}
                      style={{ width: "100%", padding: "10px", background: "none", border: "1px solid #ddd", borderRadius: "10px", marginTop: "10px", cursor: "pointer", color: "#666", fontSize: "14px" }}>
                      ← Back
                    </button>

                    <p style={{ fontSize: "13px", color: "#999", marginTop: "12px", textAlign: "center" }}>
                      Didn't receive the code?{" "}
                      <button onClick={handleSendOtp} disabled={pwLoading}
                        style={{ background: "none", border: "none", color: "#399B25", cursor: "pointer", fontSize: "13px", fontWeight: "600", padding: 0 }}>
                        Resend
                      </button>
                    </p>
                  </>
                )}

                {/* ── STEP 3: Done ── */}
                {pwStep === "done" && (
                  <div style={{ textAlign: "center", padding: "30px 0" }}>
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                    <h3 style={{ color: "#399B25", marginBottom: "8px" }}>Password Changed!</h3>
                    <p style={{ color: "#888", fontSize: "14px", marginBottom: "24px" }}>Your password has been updated successfully.</p>
                    <button onClick={() => { setPwStep("form"); setPwMsg({ text: "", type: "" }); }}
                      style={{ ...btnGreen(false), width: "auto", padding: "10px 24px" }}>
                      Change Again
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
