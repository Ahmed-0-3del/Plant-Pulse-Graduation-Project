import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "/api/v1"
    : "https://plant-pules-api.vercel.app/api/v1";

const api = axios.create({ baseURL: BASE_URL });

// attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["token"] = token;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const url = err.config?.url || "";
    // only auto-logout on 401 for non-profile endpoints
    if (status === 401 && !url.includes("/users/profile")) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// ─── helpers ──────────────────────────────────────────────────
// Save profile image keyed by email so it survives logout/login
const imgKey = (email) => `profileImage_${email || "default"}`;

export const saveProfileImage = (email, dataUrl) => {
  if (dataUrl) localStorage.setItem(imgKey(email), dataUrl);
};

export const loadProfileImage = (email) =>
  localStorage.getItem(imgKey(email)) || null;

// ─── AUTH ──────────────────────────────────────────────────────
export const register = async ({ name, email, password, confirmPassword, gender }) => {
  const { data } = await api.post("/auth/signup", { name, email, password, confirmPassword, gender });
  return data;
};

export const login = async ({ email, password }) => {
  const { data } = await api.post("/auth/signin", { email, password });
  if (data?.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    // after login, fetch profile to get name & persist it
    try {
      const profileRes = await axios.get(`${BASE_URL}/users/profile`, {
        headers: { token: data.token },
      });
      const p = profileRes.data?.data || profileRes.data;
      if (p?.name) localStorage.setItem("userName", p.name);
      // restore saved profile image for this email
      const savedImg = loadProfileImage(email);
      if (savedImg) {
        localStorage.setItem("profileImage", savedImg);
        window.dispatchEvent(new Event("profileImageUpdated"));
      } else {
        localStorage.removeItem("profileImage");
        window.dispatchEvent(new Event("profileImageUpdated"));
      }
    } catch (_) {}
  }
  return data;
};

export const logout = (email) => {
  // keep profile image keyed by email — don't lose it on logout
  const img = localStorage.getItem("profileImage");
  const userEmail = email || localStorage.getItem("userEmail");
  localStorage.clear();
  if (img && userEmail) localStorage.setItem(imgKey(userEmail), img);
};

// POST /auth/google
export const googleAuth = async (googleToken) => {
  const { data } = await api.post("/auth/google", { token: googleToken });
  if (data?.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", "true");
    if (data.user?.email) localStorage.setItem("userEmail", data.user.email);
    if (data.user?.name) localStorage.setItem("userName", data.user.name);
  }
  return data;
};

// ─── SCAN ──────────────────────────────────────────────────────
export const scanPlant = async (imageFile) => {
  const formData = new FormData();
  formData.append("images", imageFile);
  const { data } = await api.post("/scan/predict", formData);
  return data;
};

export const getScanStats = async () => {
  const { data } = await api.get("/scan/stats");
  return data;
};

export const getRecentScans = async () => {
  const { data } = await api.get("/scan/recent");
  return data;
};

// ─── PROFILE ──────────────────────────────────────────────────
export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

// PUT /users/profile  { name }
export const updateProfile = async ({ name }) => {
  const { data } = await api.put("/users/profile", { name });
  if (name) localStorage.setItem("userName", name);
  return data;
};

export const deleteAccount = async () => {
  const { data } = await api.delete("/users/profile");
  return data;
};

// ─── PASSWORD ─────────────────────────────────────────────────
export const forgotPassword = async (email) => {
  const { data } = await api.post("/password/forgot-password", { email });
  return data;
};

export const verifyResetCode = async ({ email, otp }) => {
  const { data } = await api.post("/password/verify-reset-code", { email, otp });
  return data;
};

// POST /password/reset-password { email, newPassword }
export const resetPassword = async ({ email, newPassword }) => {
  const { data } = await api.post("/password/reset-password", { email, newPassword });
  return data;
};

// ─── CONTACT ──────────────────────────────────────────────────
export const sendContactMessage = async ({ firstName, lastName, email, phone, message }) => {
  const { data } = await api.post("/contact/message", { firstName, lastName, email, phone, message });
  return data;
};

export default api;
